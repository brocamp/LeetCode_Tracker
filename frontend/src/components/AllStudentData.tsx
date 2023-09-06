import React, { useEffect, useState } from "react";
import { getAllStudents } from "../utils/api/config/axios.GetApi";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { ReactSVG } from "react-svg";

function AllStudentData() {
	const [allStudentsData, setAllStudentsData] = useState() as any;
	const [std, setStd] = useState() as any;

	useEffect(() => {
		const handleLeaderBoard = async () => {
			const response: any = await getAllStudents();
			if (response?.status === 200) {
				console.log(response, "response");
				setAllStudentsData(response.data.result.students);
			} else if (response.response.status === 404) {
				toast.error("Ooops...! Couldn't find rank table");
			} else {
				toast.error(`${response.response.data.errors[0].message}`);
			}
		};
		handleLeaderBoard();
	}, []);

	const handleShowStudent = (userName:string) => {
		axios.get(`https://leetcard.jacoblin.cool/${userName}?ext=heatmap&theme=forest`).then((response: any) => {
			console.log(response, "ressssssss");
			setStd(response.data);
			console.log(response.data, "ssa");
		});
	};

	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" h-16 bg-[#ece8e0] p-1 justify-center items-center border flex flex-row border-slate-300 shadow-xl  gap-2  rounded-lg">
				<div className="bg-slate-300 rounded-lg pt-1 border border-slate-400 flex justify-center h-8 w-full">
					<span className=" text-lg font-medium ">No</span>
				</div>
				<div className="bg-slate-300 rounded-lg  border border-slate-400  pt-1 flex justify-center h-8 w-full">
					<span className=" text-lg font-medium ">Name</span>
				</div>
				<div className="bg-slate-300 rounded-lg border border-slate-400 pt-1 flex justify-center h-8 w-full">
					<span className=" text-lg font-medium ">Batch</span>
				</div>
				<div className="bg-slate-300 rounded-lg border border-slate-400 pt-1 flex justify-center h-8 w-full">
					<span className=" text-lg font-medium ">User Name</span>
				</div>
			</div>
			<div className="h-[40rem] mt-1 overflow-auto w-auto">
				{allStudentsData?.map((dataObject: any, index: number) => {
					return (
						<div
							key={dataObject._id}
							className=" h-12 mt-3 p-1 bg-white justify-evenly items-center border flex flex-row border-slate-400 gap-2  rounded-lg">
							<div onMouseEnter={()=>handleShowStudent(dataObject.leetcodeId)} className="  pt-1 flex  h-8 w-full">
								<div className="hs-tooltip  pl-5 inline-block [--trigger:hover]">
									<div className="hs-tooltip-toggle block text-center">
										<span className="inline-flex  items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											<span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full" />
											Vieew
										</span>
                    <div 
                    className="flex justify-center">

                   
										<div
											className="hs-tooltip-content w-full flex justify-center  p-5 border-black/30 hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute invisible z-10   text-left rounded-lg "
											role="tooltip">

												<svg
                           className="rounded-xl   shadow-2xl"
													width="500"
													height="320"
													viewBox="0 0 500 320"
													version="1.1"
													xmlns="http://www.w3.org/2000/svg"
													xmlnsXlink="http://www.w3.org/1999/xlink"
													dangerouslySetInnerHTML={{ __html: std }}
												/>
										</div>
                    </div>
									</div>
								</div>
								<span className="ml-6 text-lg font-medium ">{index + 1}</span>
							</div>
							<div className="  pt-1 flex justify-center h-8 w-full">
								<span className=" text-lg font-medium ">{dataObject.name}</span>
							</div>
							<div className="  pt-1 flex justify-center h-8 w-full">
								<span className=" text-lg font-medium ">{dataObject.batch}</span>
							</div>
							<div className=" pt-1 flex justify-center h-8 w-full">
								<span className=" text-lg font-medium ">{dataObject.leetcodeId}</span>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default AllStudentData;
