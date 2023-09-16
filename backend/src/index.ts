import "dotenv/config";
import "reflect-metadata";

import * as cli from "./cli/ui";
import app from "./app";

import { connectMongoDb } from "./config";
import { LeetcodeDailyUpdateTask, WeeklyDatabaseUpdateTask } from "./handler/cronjob";

const start = async () => {
	cli.printIntro();

	await connectMongoDb(process.env.MONGO_URI!);

	LeetcodeDailyUpdateTask.start();

	WeeklyDatabaseUpdateTask.start();

	app.listen(process.env.PORT!, () => {
		cli.print(`App is Running on port ${process.env.PORT} `);
		cli.printOutro();
	});
};

start();
