import { useEffect, useState } from "react";
import { getDailyMetrics } from "../utils/api/config/axios.GetApi";
import toast, { Toaster } from "react-hot-toast";
import { any, number } from "zod";

function PieData() {
	const [isHovered, setIsHovered] = useState(false);
	const [completedStudents, setCompletedStudents] = useState<number>(0);
	const [notCompletedStudents, setNotCompletedStudents] = useState<number>(0);
	const [completePersantage, setCompletePersantage] = useState<number>(0);
	const [totalStudents, setTotalStudents] = useState<number>(0);
	const [notCompletePersantage, setNotCompletedPersantage] = useState<number>(0);

	useEffect(() => {
		const dailyMetricsHandler = async () => {
			const response: any = await getDailyMetrics();
			console.log(response, "ook");
			if (response.status === 200) {
				console.log(response.data, "hdgh");
				const notCompletedStudents = response.data.totalStudents - response.data.yesterdaySolvedStudentsCount;
				const completPersantage = (response.data.yesterdaySolvedStudentsCount / response.data.totalStudents) * 100;
				setNotCompletedStudents(notCompletedStudents);
				setCompletedStudents(response.data.yesterdaySolvedStudentsCount);
				setCompletePersantage(completPersantage);
				setTotalStudents(response.data.totalStudents);
				setNotCompletedPersantage(100 - completPersantage);
			} else if (response.response.status === 404) {
				toast.error("Ooops...! Couldn't find Daily metrics");
			} else {
				toast.error(`${response.response.data.errors[0].message}`);
			}
		};
		dailyMetricsHandler();
	}, []);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className="grid grid-cols-5 h-full w-full grid-rows-5   g1">
				<div className="col-span-3 pt-10 pb-10 p-2 row-span-5">
					<div className="h-full w-full flex justify-center  bg-[#ece8e0]/50 shadow-xl  items-center rounded-full mb-10">
						<div
							className={`h-full  w-full flex justify-center items-center rounded-full transform transition duration-500 hover:scale-105  ${
								isHovered ? "bg-[#ffefff]/50  border-8  border-red-600 " : "border-8 border-green-600"
							}`}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}>
							<div className="flex flex-col justify-center ">
								<h1 className={isHovered ? "text-slate-600 text-lg text-center font-bold" : "text-lg text-center font-bold"}>Students</h1>
								<h1 className={isHovered ? "text-center text-lg font-bold" : "text-slate-500 text-center text-lg font-bold"}>
									{isHovered ?  `${notCompletedStudents}/${totalStudents}`:  `${completedStudents}/${totalStudents}`}
								</h1>
								<h1 className={isHovered ? "  text-center  text-lg font-bold" : "text-slate-500 text-center text-lg  font-bold"}>
									{isHovered ? `${notCompletePersantage.toFixed(1)}%` : `${completePersantage.toFixed(1)}%`}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span- row-span-5 flex    pt-24 col-start-4">
					<div className="flex  flex-col gap-2">
						<div className="w-[9rem] h-6 border   rounded-full  bg-blue-100">
							<div className="h-6 bg-teal-800 flex text-white justify-center rounded-full" style={{ width: "45%" }}>
								<h1>45%</h1>
							</div>
						</div>
						<div className="w-[9rem] h-6  rounded-full  bg-blue-100">
							<div className="h-6 bg-indigo-600/60 flex text-white justify-center rounded-full" style={{ width: "85%" }}>
								<h1>85%</h1>
							</div>
						</div>
						<div className="w-[9rem] h-6  rounded-full  bg-blue-100">
							<div className="h-6 bg-red-600 flex text-white justify-center rounded-full" style={{ width: "65%" }}>
								<h1>65%</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PieData;
