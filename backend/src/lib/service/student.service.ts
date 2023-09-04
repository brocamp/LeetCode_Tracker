import { autoInjectable } from "tsyringe";
import { StudentRepository } from "../database/repository/student.repository";

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
}
