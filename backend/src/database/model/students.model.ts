import mongoose, { Document, Schema } from "mongoose";

export interface Solved {
	all: number;
	easy: number;
	medium: number;
	hard: number;
}

export interface StudentDTO {
	name: string;
	lastName: string;
	batch: string;
	domain: string;
	phone: string;
	email: string;
	leetcodeId: string;
}

export interface IStudent extends Document {
	name: string;
	lastName: string;
	batch: string;
	domain: string;
	phone: string;
	email: string;
	leetcodeId: string;
	solved: Solved;
	totalNotSubmissionCount: number;
	lastSubmissionDate: string;
	totalSolvedCountInThisWeek: number;
	solvedQuestionsInThisWeek: string[];
}

const studentSchema = new Schema<IStudent>(
	{
		name: {
			type: String,
			required: true
		},
		lastName: {
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
			unique: true,
			required: true
		},
		solved: {
			all: { type: Number, default: 0 },
			easy: { type: Number, default: 0 },
			medium: { type: Number, default: 0 },
			hard: { type: Number, default: 0 }
		},
		totalNotSubmissionCount: {
			type: Number,
			default: 0
		},
		lastSubmissionDate: {
			type: String
		},
		totalSolvedCountInThisWeek: {
			type: Number,
			default: 0
		},
		solvedQuestionsInThisWeek: {
			type: [String],
			default: []
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id;
				delete ret.__v;
			}
		}
	}
);

export const Students = mongoose.model<IStudent>("Student", studentSchema);
