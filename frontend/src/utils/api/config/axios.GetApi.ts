import { AxiosRequestConfig } from "axios";
import { apiRequest, headerConfg } from "../config/axios.Config";

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

export const getAllStudents=async(pageNumber:number)=>{
	console.log(pageNumber,'page number')
	
	   const config:AxiosRequestConfig={
		  method:"GET",
		  url:`api/student/all?page=${pageNumber}`,
		  headers:headerConfg()
	   };
	   return await apiRequest(config);
}

export const getNotDoneStudents= async ()=>{
	const config:AxiosRequestConfig={
		method:"GET",
		url:"api/student/not-doing",
		headers:headerConfg()
	 };
	 return await apiRequest(config)
}
export const searchStudents=async(query:string)=>{
	   const config:AxiosRequestConfig={
		  method:"GET",
		  url:`api/student/search?query=${query}`,
		  headers:headerConfg()
	   };
	   return await apiRequest(config);
}