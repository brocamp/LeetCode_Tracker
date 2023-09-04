import "dotenv/config";
import "reflect-metadata";
import { connectMongoDb, logger } from "./config";
import app from "./app";
import * as cli from "./cli/ui";
import { LeetcodeUpdaterTask } from "./handler/cronjob";
import qrcode from "qrcode-terminal";
const start = async () => {
	try {
		cli.printIntro();

		await connectMongoDb(process.env.MONGO_URI!);

		LeetcodeUpdaterTask.start();

		app.listen(process.env.PORT!, () => {
			cli.print(`App is Running on port ${process.env.PORT} `);
		});
	} catch (error) {
		console.log(error);
		logger.error(error);
	}
};

start();
