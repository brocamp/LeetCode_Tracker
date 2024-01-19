import { AxiosRequestConfig } from "axios";
import { apiRequest, headerConfg } from "./axios.Config";

export const deleteStudentData = async (id: string) => {
	const config: AxiosRequestConfig = {
		method: "DELETE",
		url: `api/student/delete/` + id,
		headers: headerConfg()
	};
	return await apiRequest(config);
};
