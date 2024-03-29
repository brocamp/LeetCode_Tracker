import { LeetCode, UserProfile } from "leetcode-query";
import { logger } from "../config";

const leetcode = new LeetCode();

/**
 * The function `getProfile` retrieves a user profile from the LeetCode API based on a given user ID.
 * @param {string} userId - A string representing the user ID of the user whose profile is being
 * retrieved.
 * @returns a Promise that resolves to either a UserProfile object or undefined.
 */
const getProfile = async (userId: string): Promise<UserProfile | undefined> => {
	try {
		const user = await leetcode.user(userId);
		if (user) return user;
		else null;
	} catch (error) {
		logger.error(error);
	}
};

/**
 * The function `getTotalSolved` returns the total number of solved problems for a given user,
 * categorized by difficulty level.
 * @param {UserProfile} user - The `user` parameter is of type `UserProfile`. It represents the user's
 * profile information, including their matched user and submission statistics.
 * @returns The function `getTotalSolved` returns an object with the following properties:
 */
const getTotalSolved = (user: UserProfile) => {
	try {
		const acSubmissionNum = user.matchedUser?.submitStats.acSubmissionNum!;
		return {
			all: acSubmissionNum[0].count,
			easy: acSubmissionNum[1].count,
			medium: acSubmissionNum[2].count,
			hard: acSubmissionNum[3].count
		};
	} catch (error) {
		logger.error(error);
	}
};

/**
 * The function `getRecentSubmissionList` returns the recent submission list of a user.
 * @param {UserProfile} user - The user parameter is of type UserProfile.
 * @returns The recentSubmissionList property of the user object.
 */

const getRecentSubmissionList = (user: UserProfile) => {
	return user.recentSubmissionList;
};

export { getProfile, getTotalSolved, getRecentSubmissionList };
