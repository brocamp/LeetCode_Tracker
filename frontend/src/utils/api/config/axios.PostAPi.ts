import { AxiosRequestConfig } from "axios";
import { apiRequest, headerConfg } from "../config/axios.Config";
import { verifyPayload } from "../api.Types/axios.Postapi.Types";
import { studentAuth } from "../../validation/formValidation";

export const adminAuth = async (Phone: string) => {
	const config: AxiosRequestConfig = {
		method: "POST",
		url: `api/admin/signin`,
		data: { phone: Phone }
	};
	return await apiRequest(config);
};

export const adminVerify = async (verifyPayload: verifyPayload) => {
	const config: AxiosRequestConfig = {
		method: "POST",
		url: `api/admin/verify-otp`,
		data: verifyPayload
	};
	return await apiRequest(config);
};

export const studentsAuth = async (authPayload: studentAuth) => {
	const config: AxiosRequestConfig = {
		method: "POST",
		url: `api/student/add`,
		headers: headerConfg(),
		data: authPayload
	};
	return await apiRequest(config);
};
