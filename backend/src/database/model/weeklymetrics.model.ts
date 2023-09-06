import mongoose, { Document, Schema } from "mongoose";

export interface IWeeklymetrics extends Document {
	totalStudentsSolved: number;
	day: string;
}

const weeklymetricsSchema = new Schema<IWeeklymetrics>(
	{
		totalStudentsSolved: {
			type: Number,
			required: true
		},
		day: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export const WeeklyMetrics = mongoose.model<IWeeklymetrics>("WeeklyMetric", weeklymetricsSchema);
