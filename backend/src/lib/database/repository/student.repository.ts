import { IStudent, Students } from "../model/students.model";


interface ILeaderBoard {
	name: string;
	leetcodeId: string;
	totalSolvedCountInThisWeek: number;
}

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

	async getMetrics(): Promise<{ submissionCount: number }[]> {
		// Get the current date
		const currentDate = new Date();
		const startTime = currentDate.getTime() - 14 * 60 * 60 * 1000;

		return Students.aggregate([
			{
				$project: {
					_id: 0,
					submission: { $toInt: "$lastSubmissionDate" }
				}
			},
			{
				$addFields: {
					submission: {
						$multiply: [1000, "$submission"]
					}
				}
			},
			{
				$match: {
					submission: {
						$gte: startTime
					}
				}
			},
			{
				$group: {
					_id: null,
					submissionCount: { $sum: 1 }
				}
			},
			{
				$project: {
					_id: 0,
					submissionCount: 1
				}
			}
		]);
	}

	async countStudents(): Promise<number> {
		return Students.find().countDocuments();
	}

	async leaderBoard(): Promise<ILeaderBoard[]> {
		return Students.aggregate([
			{
				$match: { totalSolvedCountInThisWeek: { $ne: 0 } }
			},
			{
				$sort: { totalSolvedCountInThisWeek: -1 }
			},
			{
				$limit: 5
			},
			{
				$project: {
					_id: 0,
					name: 1,
					leetcodeId: 1,
					totalSolvedCountInThisWeek: 1
				}
			}
		]);
	}
}
