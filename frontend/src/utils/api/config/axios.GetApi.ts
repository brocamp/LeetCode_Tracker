import { AxiosRequestConfig } from "axios";
import { apiRequest, headerConfg } from "./axios.Config";

export const getDailyMetrics = async () => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: "api/student/daily-metrics",
		headers: headerConfg()
	};
	return await apiRequest(config);
};
export const getLeaderboard = async () => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: "api/student/leaderboard",
		headers: headerConfg()
	};
	return await apiRequest(config);
};

export const getAllStudents = async (pageNumber: number) => {
	const pageLimit = 100;
	const config: AxiosRequestConfig = {
		method: "GET",
		url: `api/student/all?page=${pageNumber}&limit=${pageLimit}`,
		headers: headerConfg()
	};
	return await apiRequest(config);
};

export const getNotDoneStudents = async () => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: "api/student/not-doing",
		headers: headerConfg()
	};
	return await apiRequest(config);
};
export const searchStudents = async (query: string) => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: `api/student/search?query=${query}`,
		headers: headerConfg()
	};
	return await apiRequest(config);
};

export const searchStudentsNotDone = async (query: string) => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: `api/student/search/not?query=${query}`,
		headers: headerConfg()
	};
	return await apiRequest(config);
};

export const weeklyMetrics = async () => {
	const config: AxiosRequestConfig = {
		method: "GET",
		url: "api/student/weekly-metrics",
		headers: headerConfg()
	};
	return await apiRequest(config);
};
