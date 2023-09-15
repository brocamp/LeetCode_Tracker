import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { BadRequestError } from "../errors";

export interface IPayload {
	userId: string;
	phone: string;
	role: "admin" | "student";
}

declare global {
	namespace Express {
		interface Request {
			user?: IPayload;
		}
	}
}

export const reqAuth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		throw new BadRequestError("UnAuthorized Request");
	}
	try {
		const decoed = jwt.verify(token, process.env.JWT_SECRET!) as IPayload;
		req.user = decoed;
		next();
	} catch (error) {
		throw new BadRequestError("UnAuthorized Request");
	}
};
