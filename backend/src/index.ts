import "dotenv/config";
import "reflect-metadata";
import { connectMongoDb } from "./config";
import app from "./app";
import * as cli from "./cli/ui";
import { LeetcodeUpdaterTask } from "./handler/cronjob";

const start = async () => {
	cli.printIntro();

	await connectMongoDb(process.env.MONGO_URI!);

	LeetcodeUpdaterTask.start();

	app.listen(process.env.PORT!, () => {
		cli.print(`App is Running on port ${process.env.PORT} `);
		cli.printOutro();
	});
};

start();
