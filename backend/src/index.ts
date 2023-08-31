import "dotenv/config";
import "reflect-metadata";
import { connectMongoDb } from "./config";
import app from "./app";

const start = async () => {
	await connectMongoDb(process.env.MONGO_URI!);
	app.listen(4000, () => {
		console.log("App is listening on port 4000");
	});
};

start();
