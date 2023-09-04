import { useEffect, useState } from "react";
import { getDailyMetrics } from "../utils/api/config/axios.GetApi";
import toast, { Toaster } from 'react-hot-toast';

function PieData() {
	const [isHovered, setIsHovered] = useState(false);
	const [completedStudents,setCompletedStudents]=useState();
	const [notCompletedStudents,setNotCompletedStudents] = useState();
	const [completePersantage,setCompletePersantage] = useState();

	    useEffect(()=>{
		const dailyMetricsHandler =async()=>{
				const response:any = await getDailyMetrics();
				console.log(response,'ook');
				if(response.status === 200){
                    console.log(response.data,'hdgh');
					
				}else if(response.response.status === 404){
					toast.error("Ooops...! Couldn't find Daily metrics");
				}else{
					toast.error(`${response.response.data.errors[0].message}`);
				}
		};
       dailyMetricsHandler()
	},[])
    
	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<>
		 <Toaster position="top-center"reverseOrder={false}  />
		<div className="grid grid-cols-5 h-full w-full grid-rows-5   g1">
			<div className="col-span-3 pt-10 pb-10 p-2 row-span-5">
				<div className="h-full w-full flex justify-center  bg-[#ece8e0]/50 shadow-xl  items-center rounded-full mb-10">
					<div
						className={`h-full  w-full flex justify-center items-center rounded-full transform transition duration-500 hover:scale-105  ${
							isHovered ? "bg-[#ffefff]/50  border-8  border-red-600 " :"border-8 border-green-600"
						}`}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
							<div className="flex flex-col ">
							<h1 className={isHovered ? "text-slate-600 text-lg font-bold" : "text-lg font-bold"}>
							Students 
						</h1>
						<h1 className={isHovered ? " text-lg font-bold" : "text-slate-500 text-lg font-bold"}>
							{isHovered ? " 400 / 900 " : "500 / 900 "}
						</h1>
						<h1 className={isHovered ? " pl-5  text-lg font-bold" : "text-slate-500 text-lg pl-5 font-bold"}>
							{isHovered ? " 36% " : "64%"}
						</h1>
							</div>
						
					</div>
				</div>
			</div>
			<div className="col-span- row-span-5 flex    pt-24 col-start-4">
				<div className="flex  flex-col gap-2">
					<div className="w-[9rem] h-6 border   rounded-full  bg-blue-100">
						<div className="h-6 bg-teal-800 flex text-white justify-center rounded-full" style={{ width: "45%" }} >
                        <h1>45%</h1>
                        </div>
					</div>
                    <div className="w-[9rem] h-6  rounded-full  bg-blue-100">
						<div className="h-6 bg-indigo-600/60 flex text-white justify-center rounded-full" style={{ width: "85%" }} >
                        <h1>85%</h1>
                        </div>
					</div>
                     <div className="w-[9rem] h-6  rounded-full  bg-blue-100">
						<div className="h-6 bg-red-600 flex text-white justify-center rounded-full" style={{ width: "65%" }} >
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
