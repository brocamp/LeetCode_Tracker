import nodemailer from "nodemailer";
import { IStudent, Students } from "../database/model";

export interface MailOptions {
	from: string;
	to: string;
	subject: string;
	text: string;
}
export const sendMail = async (mailOptios: MailOptions) => {
	const transport = nodemailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL,
			pass: process.env.GMAIL_APP_PASSWORD
		}
	});

	await transport.sendMail(mailOptios);
};

export const sendBatchMail = async (students: IStudent[]) => {
	for (const student of students) {
		let lastMailSendDate = student.lastMailSendDate;
		if (student.totalNotSubmissionCount >= 3 && isMoreThanNDaysAgo(lastMailSendDate!, 3)) {
			await sendMail({
				from: process.env.MAIL!,
				to: student.email,
				subject: process.env.SUBJECT!,
				text: process.env.MAILTEXT!
			});
			await Students.findByIdAndUpdate(student.id, {
				lastMailSendDate: new Date()
			});
		}
	}
};

const isMoreThanNDaysAgo = (date: Date, days: number): boolean => {
	const currentDate = new Date();
	const timeDifference = currentDate.getTime() - date.getTime();
	const daysDifference = timeDifference / (1000 * 3600 * 24);
	return daysDifference >= days;
};
