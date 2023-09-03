import morgan from "morgan";
import winston from "winston";
const { combine, timestamp, json, errors } = winston.format;

/* The  code block is creating a logger object using the
Winston library. */
const logger = winston.createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.File({
			filename: "error.log",
			level: "error",
			format: combine(errors({ stack: true }), timestamp(), json())
		})
	]
});

/* The code block is creating a logger object called `reqLogger` using the Winston library. This logger
is specifically configured to handle HTTP request logs. */
const reqLogger = winston.createLogger({
	level: "http",
	format: combine(
		timestamp({
			format: "YYYY-MM-DD hh:mm:ss.SSS A"
		}),
		json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "app-info.log",
			level: "http"
		})
	]
});

/* The `morganMiddleware` constant is creating a middleware function using the `morgan` library. This
middleware function is used to log HTTP request information. */
const morganMiddleware = morgan(
	function (tokens, req, res) {
		return JSON.stringify({
			method: tokens.method(req, res),
			url: tokens.url(req, res),
			status: Number.parseFloat(tokens.status(req, res)!),
			content_length: tokens.res(req, res, "content-length"),
			response_time: Number.parseFloat(tokens["response-time"](req, res)!)
		});
	},
	{
		stream: {
			write: (message) => {
				const data = JSON.parse(message);
				reqLogger.http(`incoming-request`, data);
			}
		}
	}
);

export { logger, morganMiddleware };
