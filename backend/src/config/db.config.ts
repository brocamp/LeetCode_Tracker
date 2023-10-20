import mongoose from "mongoose";
import { DatabaseConnectionError } from "../api/errors";

export const connectMongoDb = async (connectionUri: string) => {
	try {
		await mongoose.connect(connectionUri);
		console.log("Database Connected Successfully");
	} catch (error) {
		throw new DatabaseConnectionError();
	}
};
