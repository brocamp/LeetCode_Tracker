import express from "express";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/api", (req, res) => {
	res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
