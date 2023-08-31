import { Students } from "../lib/database/model";
import { getLastSubmissionDate, getProfile, getTotalSolved } from "./leetcode";

/**
 * The LeetCodeChecker function processes a list of students, retrieves their LeetCode profiles,
 * calculates their total solved submissions and last submission date, and updates their information in
 * the database.
 */

export const LeetStudentProfileUpdate = async () => {
	const students = await Students.find({});

	// Concurrency: Process students concurrently
	await Promise.all(
		students.map(async (student) => {
			try {
				const leetcodeProfile = await getProfile(student.leetcodeId);
				const totalSubmissions = getTotalSolved(leetcodeProfile!);
				const lastsubmissionDate = getLastSubmissionDate(leetcodeProfile!);

				student.solved = {
					all: totalSubmissions.all,
					easy: totalSubmissions.easy,
					medium: totalSubmissions.medium,
					hard: totalSubmissions.hard
				};
				student.lastSubmissionDate = lastsubmissionDate;

				await student.save();
			} catch (error: any) {
				console.error(`Error processing student ${student._id}: ${error.message}`);
			}
		})
	);
};
