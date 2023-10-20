import express, { Request, Response } from "express";
import { reqAuth, validateRequest } from "../middleware";
import { StudentDTO } from "../../database/model";
import { studentValidator } from "./validator";
import { getProfile } from "../../handler/leetcode";
import { BadRequestError } from "../errors";
import { StudentRepository, WeeklymetricsRepository } from "../../database/repository";

const router = express.Router();
const studentRepository = new StudentRepository();
const weeklymetricsRepository = new WeeklymetricsRepository();

router.post("/add", studentValidator, validateRequest, async (req: Request, res: Response) => {
	const data = req.body as StudentDTO;
	const userId = await getProfile(data.leetcodeId);
	if (!userId?.matchedUser) throw new BadRequestError("LeetCodeId dosen't exist");
	const phone = await studentRepository.findByPhone(data.phone);
	if (phone) throw new BadRequestError("Phone number already registerd");
	let student = await studentRepository.findByLeetCodeId(data.leetcodeId);
	if (student) throw new BadRequestError("This profile already exist");
	const result = await studentRepository.create(data);
	res.status(200).json({ message: "Successfully added to database", result });
});

router.get("/daily-metrics", reqAuth, async (req: Request, res: Response) => {
	const studentsSolvedCount = await weeklymetricsRepository.getLastDaySubmissionCount();
	//get total count
	const totalCount = await studentRepository.countStudents();
	const matrics = {
		totalStudents: totalCount,
		yesterdaySolvedStudentsCount: studentsSolvedCount[0]?.totalStudentsSolved || 0
	};
	res.status(200).json(matrics);
});

router.get("/leaderboard", reqAuth, async (req: Request, res: Response) => {
	const topLeetcodeSolvers = await studentRepository.leaderBoard();
	const rank = { rank: topLeetcodeSolvers };
	res.status(200).json(rank);
});

router.get("/all", reqAuth, async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const result = await studentRepository.findAll(limit, page);
	res.json({ result });
});

router.get("/search", reqAuth, async (req: Request, res: Response) => {
	const query = req.query.query as string;

	const result = await studentRepository.search(query);
	res.json({ result });
});

router.get("/not-doing", reqAuth, async (req: Request, res: Response) => {
	const result = await studentRepository.findStudentsNotDone();
	res.json({ result });
});

router.get("/weekly-metrics", reqAuth, async (req: Request, res: Response) => {
	let lastWeekReport = await weeklymetricsRepository.weeklyMetrics();
	lastWeekReport = lastWeekReport.reverse();
	res.json({ lastWeekReport });
});

export { router as StudentRouter };
