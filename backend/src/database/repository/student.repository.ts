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

	async find() {
		return await Students.find({});
	}

	async findAll(limit: number, page: number) {
		const totalStudents = await Students.countDocuments();
		const totalPages = Math.ceil(totalStudents / limit);
		const skip = (page - 1) * limit;
		const students = await Students.find().skip(skip).limit(limit).exec();
		return {
			totalStudents,
			totalPages,
			currentPage: page,
			students
		};
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

	async searchNotDone(query: string) {
		const fuzzyQuery = new RegExp(this.escapeRegex(query), "gi");

		const result = await Students.find({
			$or: [
				{
					name: { $regex: fuzzyQuery },
					totalNotSubmissionCount: { $gt: 3 }
				},
				{
					batch: { $regex: fuzzyQuery },
					totalNotSubmissionCount: { $gt: 3 }
				},
				{
					domain: { $regex: fuzzyQuery },
					totalNotSubmissionCount: { $gt: 3 }
				},
				{
					email: query,
					totalNotSubmissionCount: { $gt: 3 }
				},
				{
					leetcodeId: query,
					totalNotSubmissionCount: { $gt: 3 }
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

		// Calculate the starting time of yesterday (12:00 AM)
		const startTime = new Date(currentDate);
		startTime.setHours(0, 0, 0, 0); // Set to 00:00:00:000

		// Get the Unix timestamp in milliseconds
		const unixTimestamp = startTime.getTime();

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
						$gte: unixTimestamp
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
				$limit: 100
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
		const results = await Students.find({
			totalNotSubmissionCount: {
				$gte: 3
			}
		});
		return results;
	}

	async findByPhone(phone: string) {
		const student = await Students.findOne({ phone });
		return student;
	}

	async deleteStudent(id: string) {
		const student = await Students.findByIdAndDelete(id);
		return student;
	}

	async editProfile(id: string, data: StudentDTO) {
		return await Students.updateOne(
			{ _id: id },
			{
				$set: {
					name: data.name,
					lastName: data.lastName,
					batch: data.batch,
					domain: data.domain,
					phone: data.phone,
					email: data.email,
					leetcodeId: data.leetcodeId
				}
			}
		);
	}
}
