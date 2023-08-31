import "express-async-errors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { NotFoundError } from "./lib/errors";
import { AdminRouter } from "./lib/api";
import { errorHandler } from "./lib/api/middleware";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.set("trust proxy", true);

app.use(morgan("dev"));

app.use("/api/admin", AdminRouter);

app.all("*", (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
