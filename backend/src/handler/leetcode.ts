import { LeetCode, UserProfile } from "leetcode-query";

const leetcode = new LeetCode();

/**
 * The function `getProfile` retrieves a user profile from the LeetCode API based on a given user ID.
 * @param {string} userId - A string representing the user ID of the user whose profile is being
 * retrieved.
 * @returns a Promise that resolves to either a UserProfile object or undefined.
 */
const getProfile = async (userId: string): Promise<UserProfile | undefined> => {
	const user = await leetcode.user(userId);
	if (user) return user;
	else null;
};

/**
 * The function `getTotalSolved` returns the total number of solved problems for a given user,
 * categorized by difficulty level.
 * @param {UserProfile} user - The `user` parameter is of type `UserProfile`. It represents the user's
 * profile information, including their matched user and submission statistics.
 * @returns The function `getTotalSolved` returns an object with the following properties:
 */
const getTotalSolved = (user: UserProfile) => {
	const acSubmissionNum = user.matchedUser?.submitStats.acSubmissionNum!;
	return {
		all: acSubmissionNum[0].count,
		easy: acSubmissionNum[1].count,
		medium: acSubmissionNum[2].count,
		hard: acSubmissionNum[3].count
	};
};

/**
 * The function `getLastSubmissionDate` returns the timestamp of the most recent submission in a user's
 * submission list.
 * @param {UserProfile} user - UserProfile object that contains information about a user, including
 * their recent submission list.
 * @returns The timestamp of the most recent submission in the user's recent submission list.
 */
const getLastSubmissionDate = (user: UserProfile) => {
	return user.recentSubmissionList![0].timestamp;
};

export { getProfile, getLastSubmissionDate, getTotalSolved };
