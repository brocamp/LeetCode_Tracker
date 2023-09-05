import { autoInjectable } from "tsyringe";
import { StudentRepository } from "../database/repository/student.repository";
import { StudentDTO } from "../database/model";
import { getProfile } from "../../handler/leetcode";
import { BadRequestError } from "../errors";

@autoInjectable()
export class StudentService {
	constructor(private readonly repository: StudentRepository) {}

	public dailyMetrics = async () => {
		//get lastsubmission count of students
		const students = await this.repository.getMetrics();

		//get total count
		const totalCount = await this.repository.countStudents();

		return {
			totalStudents: totalCount,
			yesterdaySolvedStudentsCount: students[0]?.submissionCount || 0
		};
	};

	public leaderboard = async () => {
		const topLeetcodeSolvers = await this.repository.leaderBoard();
		return { rank: topLeetcodeSolvers };
	};

	public search = async (query: string) => {
		const result = await this.repository.search(query);
		return result;
	};

	public createStudent = async (data: StudentDTO) => {
		const userId = await getProfile(data.leetcodeId);
		if (!userId?.matchedUser) throw new BadRequestError("LeetCodeId dosen't exist");
		let student = await this.repository.findByLeetCodeId(data.leetcodeId);
		if (student) throw new BadRequestError("This profile already exist in database");
		const result = await this.repository.create(data);
		return result;
	};

	public findStudentsNotDone = async () => {
		const result = await this.repository.findStudentsNotDone();
		return result;
	};
}
