import mongoose from "mongoose";
import { DatabaseConnectionError } from "../lib/errors";
import { print } from "../cli/ui";

export const connectMongoDb = async (connectionUri: string) => {
	try {
		await mongoose.connect(connectionUri);
		print("Database Connected Successfully");
	} catch (error) {
		throw new DatabaseConnectionError();
	}
};
