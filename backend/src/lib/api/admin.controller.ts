import express, { Request, Response } from "express";
import { container } from "tsyringe";

import * as jwt from "jsonwebtoken";
import { IPayload, reqAuth } from "./middleware";
import AdminService from "../service/admin.service";
import { SendOTP } from "./utils";

const router = express.Router();

const Service = container.resolve(AdminService);

router.post("/signin", async (req: Request, res: Response) => {
	const { phone } = req.body;
	const admin = await Service.SignIn(phone);
	await SendOTP(admin.otp as number, admin.phone);
	res.status(200).json({ message: "otp sended to your mobile number" });
});

router.post("/verify-otp", async (req: Request, res: Response) => {
	const { otp, phone } = req.body;
	const admin = await Service.VerifyOtp(otp, phone);
	const payload: IPayload = {
		userId: admin._id,
		phone: admin.phone,
		role: "admin"
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
	res.status(200).json({ token });
});

router.get("/profile", reqAuth, async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	const profile = await Service.GetProfile(userId);
	res.json(profile);
});

export { router as AdminRouter };
