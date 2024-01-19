import express, { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IPayload, reqAuth, validateRequest } from "../middleware";
import { SendOTP } from "../utils";
import { messageValidator, otpValidator, signinValidator } from "./validator";
import { AdminRepository } from "../../database/repository";
import { BadRequestError } from "../errors";

const router = express.Router();

const repository = new AdminRepository();

router.post("/signin", signinValidator, validateRequest, async (req: Request, res: Response) => {
	const { phone, resend } = req.body as { phone: string; resend: boolean };
	const Admin = await repository.findByPhone(phone);
	if (!Admin) throw new BadRequestError("admin dosent exist");
	const otp = Math.floor(1000 + Math.random() * 9000);
	Admin.otp = otp;
	await Admin.save();
	await SendOTP(Admin.otp as number, Admin.phone);
	res.status(200).json({ message: "otp sended to your mobile number" });
});

router.post("/verify-otp", otpValidator, validateRequest, async (req: Request, res: Response) => {
	const { otp, phone } = req.body;
	const admin = await repository.findByPhone(phone);
	if (!admin) throw new BadRequestError("no admin found");
	const isOtpCorrect = admin.otp == otp;
	if (!isOtpCorrect) throw new BadRequestError("otp is not correct");
	admin.otp = null;
	await admin.save();
	const payload: IPayload = {
		userId: admin._id,
		phone: admin.phone,
		role: "admin"
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRE!
	});
	res.status(200).json({ token });
});

router.get("/profile", reqAuth, async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	const admin = await repository.findById(userId);
	if (!admin) throw new BadRequestError("no admin found");
	res.json(admin);
});

router.post("/message", reqAuth, messageValidator, validateRequest, async (req: Request, res: Response) => {
	// NEED TO IMPLEMENT
	res.status(200).json({ message: "okay" });
});

export { router as AdminRouter };
