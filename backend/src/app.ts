import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import { NotFoundError } from "./api/errors";
import { AdminRouter, StudentRouter } from "./api/controller";
import { errorHandler } from "./api/middleware";
import { morganMiddleware } from "./config";

const app = express();

app.use(express.json());

app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60
	})
);

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(cors({ origin: "*" }));

app.set("trust proxy", 1);

app.use(morganMiddleware);

app.use("/api/admin", AdminRouter);

app.use("/api/student", StudentRouter);

app.all("*", (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
