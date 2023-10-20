import cron from "node-cron";
import { LeetStudentProfileUpdate, weeklyUpdate } from "./leetcode-updater";

/* The code is defining a task called `LeetcodeDailyUpdateTask` using the `cron.schedule` function from
the `node-cron` library. This task is scheduled to run every day at 23:15 (11:15 PM) in the
Asia/Kolkata timezone. */
export const LeetcodeDailyUpdateTask = cron.schedule(
	"30 23 * * *",
	async () => {
		console.log("Students LeetCode Data Updating");
		await LeetStudentProfileUpdate();
	},
	{
		scheduled: true,
		timezone: "Asia/Kolkata"
	}
);

/* The code is defining a task called `WeeklyDatabaseUpdateTask` using the `cron.schedule` function
from the `node-cron` library. This task is scheduled to run every Sunday at 23:00 (11:00 PM) in the
Asia/Kolkata timezone. */
export const WeeklyDatabaseUpdateTask = cron.schedule(
	"0 23 * * 0",
	async () => {
		console.log("weekly updating db");
		await weeklyUpdate();
	},
	{
		scheduled: true,
		timezone: "Asia/Kolkata"
	}
);
