import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import { NotFoundError } from "./lib/errors";
import { AdminRouter } from "./api";
import { errorHandler } from "./api/middleware";
import { morganMiddleware } from "./config";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.set("trust proxy", true);

app.use(morganMiddleware);

app.use("/api/admin", AdminRouter);

app.all("*", (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
