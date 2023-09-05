import { IStudent, StudentDTO, Students } from "../model";

interface ILeaderBoard {
	name: string;
	leetcodeId: string;
	totalSolvedCountInThisWeek: number;
}

export class StudentRepository {
	async create(user: StudentDTO): Promise<IStudent> {
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

	async findByLeetCodeId(userId: string) {
		const student = await Students.findOne({ leetcodeId: userId });
		return student;
	}

	async search(query: string) {
		const fuzzyQuery = new RegExp(this.escapeRegex(query), "gi");

		const result = await Students.find({
			$or: [
				{
					name: { $regex: fuzzyQuery }
				},
				{
					batch: { $regex: fuzzyQuery }
				},
				{
					domain: { $regex: fuzzyQuery }
				},
				{
					email: query
				},
				{
					leetcodeId: query
				}
			]
		});

		return result;
	}

	escapeRegex(text: string) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}

	async getMetrics(): Promise<{ submissionCount: number }[]> {
		// Get the current date
		const currentDate = new Date();
		const startTime = currentDate.getTime() - 23 * 60 * 60 * 1000;

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
					batch: 1,
					totalSolvedCountInThisWeek: 1
				}
			}
		]);
	}

	async findStudentsNotDone() {
		const today = new Date();
		const yesterday = today.getTime() - 24 * 60 * 60 * 1000;
		const results = await Students.find({
			$and: [
				{
					lastSubmissionDate: {
						$lt: yesterday
					}
				},
				{
					totalNotSubmissionCount: {
						$gte: 3
					}
				}
			]
		});
		return results;
	}
}
