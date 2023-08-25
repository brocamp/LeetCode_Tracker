import { multiselect } from "@clack/prompts";

async function run() {
	const additionalTools = await multiselect({
		message: "Select additional tools.",
		options: [
			{ value: "eslint", label: "ESLint", hint: "recommended" },
			{ value: "prettier", label: "Prettier" },
			{ value: "gh-action", label: "GitHub Action" }
		],
		required: false
	});
}
run();
