import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5000
});

export const apiRequest = async (config: AxiosRequestConfig) => {
	try {
		const response = await api(config);
		return response;
	} catch (error) {
		console.error(error, "errr");
		return error;
	}
};

export const headerConfg = () => {
	const token = localStorage.getItem("adminToken");
	if (token) {
		return {
			Authorization: ` Bearer ${token}`
		};
	}
};
