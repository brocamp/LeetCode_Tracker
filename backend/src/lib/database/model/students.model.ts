import mongoose, { Document, Schema } from "mongoose";

interface ProblemHistoryEntry {
	problemId: string;
	difficulty: string;
	solutionStatus: string;
}

export interface Solved {
	all: number;
	easy: number;
	medium: number;
	hard: number;
}

export interface IStudent extends Document {
	name: string;
	batch: string;
	domain: string;
	phone: string;
	email: string;
	leetcodeId: string;
	solved: Solved;
	lastSubmissionDate: string;
	sevenDaySubmissionCount: number;
	problemHistory: ProblemHistoryEntry[];
}

const studentSchema = new Schema<IStudent>({
	name: {
		type: String,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	leetcodeId: {
		type: String,
		required: true
	},
	solved: {
		all: { type: Number, default: 0 },
		easy: { type: Number, default: 0 },
		medium: { type: Number, default: 0 },
		hard: { type: Number, default: 0 }
	},
	lastSubmissionDate: {
		type: String
	},
	sevenDaySubmissionCount: {
		type: Number,
		default: 0
	},
	problemHistory: [
		{
			problemId: { type: String, required: true },
			difficulty: { type: String, required: true },
			solutionStatus: { type: String, required: true }
		}
	]
});

export const Students = mongoose.model<IStudent>("Students", studentSchema);
