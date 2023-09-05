import { logger } from "../config";
import { WeeklyMetrics } from "../lib/database/model";
import { StudentRepository } from "../lib/database/repository/student.repository";
import { getProfile, getTotalSolved, getRecentSubmissionList } from "./leetcode";

/**
 * The LeetStudentProfileUpdate function updates the profiles of Leet students by retrieving their
 * LeetCode submissions, calculating their total solved count and recent submissions, and updating
 * their profile information in the database.
 */
export const LeetStudentProfileUpdate = async () => {
	let studentRepository = new StudentRepository();

	const students = await studentRepository.findAll();

	// Concurrency: Process students concurrently
	await Promise.all(
		students.map(async (student) => {
			try {
				const leetcodeProfile = await getProfile(student.leetcodeId);
				const totalSubmissions = getTotalSolved(leetcodeProfile!)!;
				const recentSubmissions = getRecentSubmissionList(leetcodeProfile!);

				student.solved = {
					all: totalSubmissions.all,
					easy: totalSubmissions.easy,
					medium: totalSubmissions.medium,
					hard: totalSubmissions.hard
				};

				student.lastSubmissionDate =
					recentSubmissions?.find((submission) => {
						return submission.statusDisplay === "Accepted";
					})?.timestamp || "00000000";

				if (isToday(student.lastSubmissionDate)) {
					student.totalNotSubmissionCount = 0;
				} else {
					student.totalNotSubmissionCount++;
				}

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

	/* This code block is retrieving metrics from the `studentRepository` and creating a new entry in the
	`WeeklyMetrics` collection in the database.
	 */
	let result = await studentRepository.getMetrics();
	const currentDate = new Date();
	const currentDayAbbreviation = currentDate.toLocaleString("en-US", { weekday: "long" });
	await WeeklyMetrics.create({
		totalStudentsSolved: result[0]?.submissionCount || 0,
		day: currentDayAbbreviation
	});


	/**
	 * This function checks if a given question titleslug
	 * is already solved. If the title slug is not in the list of already solved questions,
	 * it adds it and returns true. Otherwise, if the title slug is already in the list, it returns false.
	 */
	function isAlreadySolvedOrNot(alreaySolvedQuestions: string[], titleSlug: string) {
		if (!alreaySolvedQuestions.includes(titleSlug)) {
			alreaySolvedQuestions.push(titleSlug);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * The function `isToday` checks if a given timestamp corresponds to the current date.
	 * @param {string} timestamp - The `timestamp` parameter is a string representing a Unix timestamp.
	 * @returns a boolean value indicating whether the given timestamp represents the current date or not.
	 */
	function isToday(timestamp: string): boolean {
		const dateFromTimestamp = new Date(+timestamp * 1000);
		const currentDate = new Date();
		return dateFromTimestamp.toDateString() === currentDate.toDateString();
	}
};
