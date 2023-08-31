import "dotenv/config";
import "reflect-metadata";
import { connectMongoDb } from "./config";
import app from "./app";
import * as cli from "./cli/ui";

const start = async () => {
	cli.printIntro();

	await connectMongoDb(process.env.MONGO_URI!);

	app.listen(process.env.PORT!, () => {
		console.log("App is listening on port 4000");
	});

	cli.printOutro();
};

start();
