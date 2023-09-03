import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../lib/errors/custom.error";
import { logger } from "../../config";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	try {
		logger.error(err.stack || err);
		if (err instanceof CustomError) {
			return res.status(err.statusCode).send({ errors: err.serializeErrors() });
		}
		res.status(400).send({
			errors: [{ message: "Something went wrong" }]
		});
	} catch (error) {
		logger.error(error);
	}
};
