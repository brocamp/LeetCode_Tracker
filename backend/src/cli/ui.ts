import { intro, spinner, note, outro, text } from "@clack/prompts";
import color from "picocolors";

const s = spinner();

export const print = (text: string) => {
	console.log(color.green("◇") + "  " + text);
};

export const printError = (text: string) => {
	console.log(color.red("◇") + "  " + text);
};

export const printIntro = () => {
	intro(color.bgCyan(color.white(" LeetCode Checker ")));
	note("A leetcode checker bot for monitoring students to improve their problme solving .");
	s.start("Starting");
};

export const printQRCode = (qr: string) => {
	s.stop("Client is ready!");
	note(qr, "Scan the QR code below to login to Whatsapp Web.");
	s.start("Waiting for QR code to be scanned");
};

export const printLoading = () => {
	s.stop("Authenticated!");
	s.start("Logging in");
};

export const printAuthenticated = () => {
	s.stop("Session started!");
	s.start("Opening session");
};

export const printAuthenticationFailure = () => {
	s.stop("Authentication failed!");
};

export const printOutro = () => {
	s.stop("Loaded!");
	outro("The system is Ready to use.");
};
