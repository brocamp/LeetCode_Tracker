/**
 * This function checks if a given question titleslug
 * is already solved. If the title slug is not in the list of already solved questions,
 * it adds it and returns true. Otherwise, if the title slug is already in the list, it returns false.
 */
export function isAlreadySolvedOrNot(alreaySolvedQuestions: string[], titleSlug: string): boolean {
	if (!alreaySolvedQuestions.includes(titleSlug)) return true;
	else return false;
}

/**
 * The function `isToday` checks if a given timestamp corresponds to the current date.
 * @param {string} timestamp - The `timestamp` parameter is a string representing a Unix timestamp.
 * @returns a boolean value indicating whether the given timestamp represents the current date or not.
 */
export function isToday(timestamp: string): boolean {
	const dateFromTimestamp = new Date(+timestamp * 1000);
	const currentDate = new Date();
	return dateFromTimestamp.toDateString() === currentDate.toDateString();
}

export function IsAlreadyInDb(alreaySolvedQuestions: string[], titleSlug: string): boolean {
	if (!alreaySolvedQuestions.includes(titleSlug)) {
		alreaySolvedQuestions.push(titleSlug);
		return true;
	} else {
		return false;
	}
}
