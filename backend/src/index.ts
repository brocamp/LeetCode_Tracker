import "dotenv/config";
import app from "./app";
import { connectMongoDb, logger } from "./config";
import { LeetcodeDailyUpdateTask, WeeklyDatabaseUpdateTask } from "./handler/cronjob";

const start = async () => {
	await connectMongoDb(process.env.MONGO_URI!);

	LeetcodeDailyUpdateTask.start();

	WeeklyDatabaseUpdateTask.start();

	app.listen(process.env.PORT!, () => {
		console.log(`server is Running on port ${process.env.PORT} `);
	});
};

["uncaughtException", "unhandledRejection"].forEach((event) =>
	process.on(event, (err) => {
		logger.error(`something bad happened : ${event}, msg: ${err.stack || err}`);
		process.exit(1);
	})
);

start();
