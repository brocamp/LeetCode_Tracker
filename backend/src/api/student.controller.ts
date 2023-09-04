import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { reqAuth } from "./middleware";
import { StudentService } from "../lib/service/student.service";
import { StudentDTO } from "../lib/database/model";

const router = express.Router();

const Service = container.resolve(StudentService);

router.post("/add", reqAuth, async (req: Request, res: Response) => {
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

router.get("/search", reqAuth, async (req: Request, res: Response) => {
	const query = req.query.query as string;
	const result = await Service.search(query);
	res.json({ result });
});

export { router as StudentRouter };
