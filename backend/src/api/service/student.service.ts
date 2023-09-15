import { autoInjectable } from "tsyringe";
import { StudentRepository } from "../../database/repository";
import { weeklymetricsRepository } from "../../database/repository";
import { StudentDTO } from "../../database/model";
import { BadRequestError } from "../errors";
import { getProfile } from "../../handler/leetcode";

@autoInjectable()
export class StudentService {
	constructor(
		private readonly studentRepository: StudentRepository,
		private readonly weeklymetricsRepository: weeklymetricsRepository
	) {}

	public dailyMetrics = async () => {
		//get lastsubmission count of students
		const students = await this.studentRepository.getMetrics();

		console.log(students);
		//get total count
		const totalCount = await this.studentRepository.countStudents();

		return {
			totalStudents: totalCount,
			yesterdaySolvedStudentsCount: students[0]?.submissionCount || 0
		};
	};

	public leaderboard = async () => {
		const topLeetcodeSolvers = await this.studentRepository.leaderBoard();
		return { rank: topLeetcodeSolvers };
	};

	public findAll = async (limit: number, page: number) => {
		const result = await this.studentRepository.findAll(limit, page);
		return result;
	};

	public search = async (query: string) => {
		const result = await this.studentRepository.search(query);
		return result;
	};

	public createStudent = async (data: StudentDTO) => {
		const userId = await getProfile(data.leetcodeId);
		if (!userId?.matchedUser) throw new BadRequestError("LeetCodeId dosen't exist");
		let student = await this.studentRepository.findByLeetCodeId(data.leetcodeId);
		if (student) throw new BadRequestError("This profile already exist");
		const result = await this.studentRepository.create(data);
		return result;
	};

	public findStudentsNotDone = async () => {
		const result = await this.studentRepository.findStudentsNotDone();
		return result;
	};

	public weeklyMetrics = async () => {
		const result = await this.weeklymetricsRepository.weeklyMetrics();
		return result;
	};
}
