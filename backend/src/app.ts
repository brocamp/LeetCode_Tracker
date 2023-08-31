import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { NotFoundError } from "./lib/errors";
import { errorHandler } from "./api/middleware";
import { AdminRouter } from "./api";

const app = express();

app.use(express.json());

app.set("trust proxy", true);


app.use(morgan("dev"));

app.use("/api/admin", AdminRouter);

app.all("*", (req: Request, res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
