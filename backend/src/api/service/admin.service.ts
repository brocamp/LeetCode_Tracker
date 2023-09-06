import { autoInjectable } from "tsyringe";
import AdminRepository from "../database/repository/admin.repository";
import { BadRequestError } from "../errors/badrequest.error";

@autoInjectable()
class AdminService {
	constructor(private readonly repository: AdminRepository) {}

	public SignIn = async (phone: string) => {
		const AdminExist = await this.repository.findByPhone(phone);
		if (!AdminExist) throw new BadRequestError("admin dosent exist");
		const otp = Math.floor(1000 + Math.random() * 9000);
		AdminExist.otp = otp;
		await AdminExist.save();
		return AdminExist;
	};

	public VerifyOtp = async (otp: number, phone: string) => {
		const admin = await this.repository.findByPhone(phone);
		if (!admin) throw new BadRequestError("no admin found");
		console.log(otp, admin.otp);
		const isOtpCorrect = admin.otp == otp;
		if (!isOtpCorrect) throw new BadRequestError("otp is not correct");
		admin.otp = null;
		await admin.save();
		return admin;
	};

	public GetProfile = async (id: string) => {
		const admin = await this.repository.findById(id);
		if (!admin) throw new BadRequestError("no admin found");
		return admin;
	};
}

export default AdminService;
