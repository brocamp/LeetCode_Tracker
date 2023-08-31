import mongoose from "mongoose";
import { IStudent, Students } from "../model/students.model";
export class StudentRepository {
	async create(user: IStudent): Promise<IStudent> {
		return Students.create(user);
	}

	async findById(userId: string): Promise<IStudent | null> {
		return Students.findById(userId);
	}

	async findAll(): Promise<IStudent[]> {
		return Students.find();
	}

	async update(userId: string, updates: Partial<IStudent>): Promise<IStudent | null> {
		return Students.findByIdAndUpdate(userId, updates, { new: true });
	}

	async delete(userId: string): Promise<void> {
		await Students.findByIdAndDelete(userId);
	}
}
