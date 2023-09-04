import express, { Request, Response } from "express";
import { container } from "tsyringe";

import { reqAuth } from "./middleware";
import { StudentService } from "../lib/service/student.service";

const router = express.Router();

const Service = container.resolve(StudentService);

router.get("/daily-metrics", reqAuth, async (req: Request, res: Response) => {
	const matrics = await Service.dailyMetrics();
	res.status(200).json(matrics);
});

router.get("/leaderboard", reqAuth, async (req: Request, res: Response) => {
	const rank = await Service.leaderboard();
	res.status(200).json(rank);
});

export { router as StudentRouter };
