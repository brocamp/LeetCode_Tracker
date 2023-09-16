import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { reqAuth, validateRequest } from "../middleware";
import { StudentService } from "../service";
import { StudentDTO } from "../../database/model";
import { studentValidator } from "./validator";

const router = express.Router();

const Service = container.resolve(StudentService);

router.post("/add", studentValidator, validateRequest, async (req: Request, res: Response) => {
	const data = req.body as StudentDTO;
	const result = await Service.createStudent(data);
	res.status(200).json({ message: "Successfully added to database", result });
});

router.get("/daily-metrics", reqAuth, async (req: Request, res: Response) => {
	const matrics = await Service.dailyMetrics();
	res.status(200).json(matrics);
});

router.get("/leaderboard", reqAuth, async (req: Request, res: Response) => {
	const rank = await Service.leaderboard();
	res.status(200).json(rank);
});

router.get("/all", reqAuth, async (req: Request, res: Response) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const result = await Service.findAll(limit, page);
	res.json({ result });
});

router.get("/search", reqAuth, async (req: Request, res: Response) => {
	const query = req.query.query as string;

	const result = await Service.search(query);
	res.json({ result });
});

router.get("/not-doing", reqAuth, async (req: Request, res: Response) => {
	const result = await Service.findStudentsNotDone();
	res.json({ result });
});

router.get("/weekly-metrics", reqAuth, async (req: Request, res: Response) => {
	const lastWeekReport = await Service.weeklyMetrics();
	res.json({ lastWeekReport });
});

export { router as StudentRouter };
