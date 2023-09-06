import { WeeklyMetrics } from "../model";

export class weeklymetricsRepository {
	async weeklyMetrics() {
		return WeeklyMetrics.aggregate([
			{
				$sort: { createdAt: -1 }
			},
			{
				$limit: 7
			},
			{
				$project: {
					_id: 0,
					totalStudentsSolved: 1,
					day: 1
				}
			}
		]);
	}
}
