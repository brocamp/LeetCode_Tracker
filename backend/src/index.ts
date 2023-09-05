import "dotenv/config";
import "reflect-metadata";

import qrcode from "qrcode-terminal";
import { Events } from "whatsapp-web.js";

import { client } from "./config";

import * as cli from "./cli/ui";
import app from "./app";

import { connectMongoDb } from "./config";
import { LeetcodeUpdaterTask } from "./handler/cronjob";

const start = async () => {
	cli.printIntro();

	await connectMongoDb(process.env.MONGO_URI!);

	client.on(Events.QR_RECEIVED, (qr: string) => {
		qrcode.generate(qr, { small: true }, (qrcode: string) => {
			cli.printQRCode(qrcode);
		});
	});

	client.on(Events.LOADING_SCREEN, (percent: string) => {
		if (percent == "0") {
			cli.printLoading();
		}
	});

	client.on(Events.AUTHENTICATED, () => {
		cli.printAuthenticated();
	});

	// WhatsApp authentication failure
	client.on(Events.AUTHENTICATION_FAILURE, () => {
		cli.printAuthenticationFailure();
	});

	// WhatsApp ready
	client.on(Events.READY, () => {
		// Print outro
		cli.printOutro();
	});

	// WhatsApp message
	client.on(Events.MESSAGE_RECEIVED, async (message: any) => {
		console.log(message);
	});

	await client.initialize();

	LeetcodeUpdaterTask.start();

	app.listen(process.env.PORT!, () => {
		cli.print(`App is Running on port ${process.env.PORT} `);
		cli.printOutro();
	});
};

start();
