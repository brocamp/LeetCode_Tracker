import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom.error";
import { logger } from "../../config";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	try {
		if (err instanceof CustomError) {
			return res.status(err.statusCode).send({ errors: err.serializeErrors() });
		}
		logger.error(err.stack || err);
		res.status(400).send({
			errors: [{ message: err.message }]
		});
	} catch (error) {
		logger.error(error);
	}
};
