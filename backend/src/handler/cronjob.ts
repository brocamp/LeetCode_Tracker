import cron from "node-cron";
import { LeetStudentProfileUpdate, weeklyUpdate } from "./leetcode-updater";
import * as cli from "../cli/ui";

/* The code is defining a task called `LeetcodeUpdaterTask` using the `cron.schedule` function from the
`node-cron` library. This task is scheduled to run every day at midnight (0 hours and 0 minutes)
using the cron expression `"0 0 * * *"`. */
export const LeetcodeDailyUpdateTask = cron.schedule(
	"*/1 * * * * ",
	async () => {
		cli.print("Students LeetCode Data Updating");
		await LeetStudentProfileUpdate();
	},
	{
		scheduled: true,
		timezone: "Asia/Kolkata"
	}
);

export const WeeklyDatabaseUpdateTask = cron.schedule(
	"0 23 * * 0",
	async () => {
		cli.print("weekly updating db");
		await weeklyUpdate();
	},
	{
		scheduled: true,
		timezone: "Asia/Kolkata"
	}
);
// ' */1 * * * * ' you can test the job for running every minute using this
