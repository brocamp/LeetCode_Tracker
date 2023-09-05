import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
	puppeteer: {
		args: ["--no-sandbox"]
	},
	authStrategy: new LocalAuth({
		clientId: undefined,
		dataPath: "./"
	})
});

export { client };
