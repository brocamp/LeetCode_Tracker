import express, { Request, Response } from "express";
import { container } from "tsyringe";

import * as jwt from "jsonwebtoken";
import { IPayload, reqAuth, validateRequest } from "../middleware";
import { AdminService } from "../service";
import { SendOTP } from "../utils";
import { messageValidator, otpValidator, signinValidator } from "./validator";

const router = express.Router();

const Service = container.resolve(AdminService);

router.post("/signin", signinValidator, validateRequest, async (req: Request, res: Response) => {
	const { phone } = req.body;
	const admin = await Service.SignIn(phone);
	await SendOTP(admin.otp as number, admin.phone);
	res.status(200).json({ message: "otp sended to your mobile number" });
});

router.post("/verify-otp", otpValidator, validateRequest, async (req: Request, res: Response) => {
	const { otp, phone } = req.body;
	const admin = await Service.VerifyOtp(otp, phone);
	const payload: IPayload = {
		userId: admin._id,
		phone: admin.phone,
		role: "admin"
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRE! });
	res.status(200).json({ token });
});

router.get("/profile", reqAuth, async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	const profile = await Service.GetProfile(userId);
	res.json(profile);
});

router.post("/message", reqAuth, messageValidator, validateRequest, async (req: Request, res: Response) => {
	// NEED TO IMPLEMENT
	res.status(200).json({ message: "okay" });
});

export { router as AdminRouter };
