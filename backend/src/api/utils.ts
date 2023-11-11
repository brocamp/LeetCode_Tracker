import axios from "axios";

/**
 * The SendOTP function sends an OTP (One-Time Password) to a specified phone number using the Fast2SMS
 * API.
 * @param {number} otp - The `otp` parameter is the one-time password that you want to send to the
 * user's phone number for verification.
 * @param {string} phone - The `phone` parameter is a string that represents the phone number to which
 * the OTP (One-Time Password) will be sent.
 */

export const SendOTP = async (otp: number, phone: string) => {
	try {
		const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
		const apiKey = process.env.NODE_ENV == "dev" ? "" : process.env.OTP_API_KEY;
		const requestData = {
			variables_values: String(otp),
			route: "otp",
			numbers: phone
		};

		const headers = {
			authorization: apiKey
		};

		await axios.post(apiUrl, requestData, { headers });
	} catch (error) {
		console.log(error);
	}
};
