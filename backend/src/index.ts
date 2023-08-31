import "dotenv/config";
import "reflect-metadata";
import cron from "node-cron";
import { connectMongoDb } from "./config";
import app from "./app";
import * as cli from "./cli/ui";
import { LeetcodeUpdaterTask } from "./handler/cronjob";

const start = async () => {
	cli.printIntro();

	await connectMongoDb(process.env.MONGO_URI!);

	LeetcodeUpdaterTask.start();

	app.listen(process.env.PORT!, () => {
		cli.print(`App is listening on port ${process.env.PORT} `);
		cli.printOutro();
	});
};

start();
