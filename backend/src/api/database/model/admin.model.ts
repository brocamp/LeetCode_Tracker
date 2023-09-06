import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
	name: string;
	phone: string;
	otp: number | null;
	isVerified: boolean;
}

const adminSchema = new Schema<IAdmin>({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	otp: {
		type: Number
	},
	isVerified: {
		type: Boolean,
		required: true
	}
});

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
