import "dotenv/config";
import "reflect-metadata";
import { connectMongoDb, logger } from "./config";
import app from "./app";
import * as cli from "./cli/ui";
import { LeetcodeUpdaterTask } from "./handler/cronjob";
import { Client, Message, Events, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
let client: Client;
const start = async () => {
	try {
		cli.printIntro();

		await connectMongoDb(process.env.MONGO_URI!);

		client = new Client({
			puppeteer: {
				args: ["--no-sandbox"]
			},
			authStrategy: new LocalAuth({
				clientId: undefined,
				dataPath: "./"
			})
		});

		client.on(Events.QR_RECEIVED, (qr: string) => {
			qrcode.generate(qr, { small: true }, (qrcode: string) => {
				cli.printQRCode(qrcode);
			});
		});

		client.on(Events.LOADING_SCREEN, (percent) => {
			if (percent == "0") {
				cli.printLoading();
			}
		});

		client.on(Events.AUTHENTICATED, () => {
			cli.printAuthenticated();
		});

		client.on(Events.AUTHENTICATION_FAILURE, () => {
			cli.printAuthenticationFailure();
		});

		client.on(Events.READY, () => {
			cli.printOutro();
			// Replace 'groupName' with the name of the group you want to send messages to
		});

		client.on(Events.MESSAGE_RECEIVED, async (message: Message) => {
			// const newMessage = new MessageMedia("Hi", { type: "chat" });

			// Send the message to the group
			await client.sendMessage("120363150997316775@g.us", "hello");
		});

		await client.initialize();

		LeetcodeUpdaterTask.start();

		app.listen(process.env.PORT!, () => {
			cli.print(`App is Running on port ${process.env.PORT} `);
		});
	} catch (error) {
		console.log(error);
		logger.error(error);
	}
};

start();
export { client };
