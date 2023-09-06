import { IAdmin, Admin } from "../model";

export class AdminRepository {
	async create(adminData: Partial<IAdmin>): Promise<IAdmin> {
		const admin = await Admin.create(adminData);
		return admin;
	}

	async findById(id: string): Promise<IAdmin | null> {
		const admin = await Admin.findById(id).exec();
		return admin;
	}

	async findByPhone(phone: string): Promise<IAdmin | null> {
		const admin = await Admin.findOne({ phone }).exec();
		return admin;
	}

	async update(id: string, adminData: Partial<IAdmin>): Promise<IAdmin | null> {
		const admin = await Admin.findByIdAndUpdate(id, adminData, { new: true }).exec();
		return admin;
	}

	async delete(id: string): Promise<void> {
		await Admin.findByIdAndDelete(id).exec();
	}
}

