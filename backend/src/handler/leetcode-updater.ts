import { logger } from "../config";
import { Students, WeeklyMetrics } from "../database/model";
import { StudentRepository } from "../database/repository";
import { getProfile, getTotalSolved, getRecentSubmissionList } from "./leetcode";
import { isToday, isAlreadySolvedOrNot, IsAlreadyInDb } from "./utils";
import pLimit from "p-limit";


/* This queue allows a maximum of 2 concurrent executions of the code block passed to it. It ensures that only 2
students' profiles are updated at a time, preventing excessive resource usage and potential
performance issues. */
const queue = pLimit(2);

/**
 * The LeetStudentProfileUpdate function updates the profiles of Leet students by retrieving their
 * LeetCode submissions, calculating their total solved count and recent submissions, and updating
 * their profile information in the database.
 */
export const LeetStudentProfileUpdate = async () => {
	let studentRepository = new StudentRepository();

	const students = await studentRepository.find();

	// Concurrency: Process students concurrently
	await Promise.all(
		students.map(async (student) => {
			await queue(async () => {
				try {
					// Getting leetcode profile
					const leetcodeProfile = await getProfile(student.leetcodeId);
					// Getting total questions solved by difficulty
					const totalSubmissions = getTotalSolved(leetcodeProfile!)!;
					// Getting recent array of  submission
					const recentSubmissions = getRecentSubmissionList(leetcodeProfile!);

					student.solved = {
						all: totalSubmissions.all,
						easy: totalSubmissions.easy,
						medium: totalSubmissions.medium,
						hard: totalSubmissions.hard
					};
					// finding the recent submissionDate is today or not
					student.lastSubmissionDate =
						recentSubmissions?.find((problem) => {
							return (
								isToday(problem.timestamp) &&
								problem.statusDisplay === "Accepted" &&
								isAlreadySolvedOrNot(student.solvedQuestionsInThisWeek, problem.titleSlug)
							);
						})?.timestamp || student.lastSubmissionDate;

					// if the last submisson date is not today will updating the totalNotSubmissionCount
					if (isToday(student.lastSubmissionDate)) {
						student.totalNotSubmissionCount = 0;
					} else {
						student.totalNotSubmissionCount++;
					}

					// filtering out total questions solved  today from the recentsubmission list and saving in the database
					const solvedToday = recentSubmissions?.filter((submission) => {
						return (
							submission.statusDisplay === "Accepted" &&
							isToday(submission.timestamp) &&
							IsAlreadyInDb(student.solvedQuestionsInThisWeek, submission.titleSlug)
						);
					});

					student.totalSolvedCountInThisWeek += solvedToday!.length;

					await student.save();
				} catch (error: any) {
					logger.error(error.stack);
				}
			});
		})
	);

	/* This code block is responsible for updating the weekly metrics of student submissions. */
	let submissionResult = await studentRepository.getMetrics();

	const currentDate = new Date();

	const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });

	await WeeklyMetrics.create({
		totalStudentsSolved: submissionResult[0]?.submissionCount || 0,
		day: currentDay
	});
};

export const weeklyUpdate = async () => {
	const students = await Students.find({});

	await Promise.all(
		students.map(async (student) => {
			await queue(async () => {
				student.totalSolvedCountInThisWeek = 0;
				await student.save();
			});
		})
	);
};
