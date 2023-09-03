import { logger } from "../config";
import { Students } from "../lib/database/model";
import { getLastSubmissionDate, getProfile, getTotalSolved, getRecentSubmissionList } from "./leetcode";

export const LeetStudentProfileUpdate = async () => {
	const students = await Students.find({});

	// Concurrency: Process students concurrently
	await Promise.all(
		students.map(async (student) => {
			try {
				const leetcodeProfile = await getProfile(student.leetcodeId);
				const totalSubmissions = getTotalSolved(leetcodeProfile!)!;
				const lastsubmissionDate = getLastSubmissionDate(leetcodeProfile!);
				const recentSubmissions = getRecentSubmissionList(leetcodeProfile!);

				student.solved = {
					all: totalSubmissions.all,
					easy: totalSubmissions.easy,
					medium: totalSubmissions.medium,
					hard: totalSubmissions.hard
				};
				student.lastSubmissionDate = lastsubmissionDate;

				//leaderboard daily updater
				const solvedToday = recentSubmissions?.filter((submission) => {
					return (
						submission.statusDisplay === "Accepted" &&
						isToday(submission.timestamp) &&
						isAlreadySolvedOrNot(student.solvedQuestionsInThisWeek, submission.titleSlug)
					);
				});

				student.totalSolvedCountInThisWeek += solvedToday!.length;

				await student.save();
			} catch (error: any) {
				logger.error(error);
			}
		})
	);

	function isAlreadySolvedOrNot(alreaySolvedQuestions: string[], titleSlug: string) {
		if (!alreaySolvedQuestions.includes(titleSlug)) {
			alreaySolvedQuestions.push(titleSlug);
			return true;
		} else {
			return false;
		}
	}
	// Check if the date from the timestamp is today
	function isToday(timestamp: string): boolean {
		const dateFromTimestamp = new Date(+timestamp * 1000);
		const currentDate = new Date();
		return dateFromTimestamp.toDateString() === currentDate.toDateString();
	}
};
