import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getNotDoneStudents, searchStudentsNotDone } from "../utils/api/config/axios.GetApi";
import axios from "axios";
import { Ring } from "@uiball/loaders";
type UserData = [
	{
		batch: string;
		domain: string;
		email: string;
		lastSubmissionDate: string;
		leetcodeId: string;
		name: string;
		phone: string;
		solved: {
			all: number;
			easy: number;
			medium: number;
			hard: number;
		};
		solvedQuestionsInThisWeek: string[];
		totalNotSubmissionCount: number;
		totalSolvedCountInThisWeek: number;
		_id: string;
	}
];
const StudentsNotdone = () => {
	const [uiControle, setUiControll] = useState(false);
	const [svgData, setSvgData] = useState("") as any;
	const [searchInput, setSearchInput] = useState("") as any;
	const [isInputEmpty, setIsInputEmpty] = useState(true);
	const [allStudentsData, setAllStudentsData] = useState<UserData[]>([]);

	let timer: number | undefined;
	useEffect(() => {
		const handleLeaderBoard = async () => {
			if (isInputEmpty) {
				const response: any = await getNotDoneStudents();
				if (response?.status === 200) {
					setAllStudentsData(response.data.result);
				} else if (response.response.status === 404) {
					toast.error("Ooops...! Couldn't find rank table");
				} else {
					toast.error(`${response.response.data.errors[0].message}`);
				}
			} else {
				const response:any = await searchStudentsNotDone(searchInput)
				console.log(response,"response coming frontend");
				if (response?.status === 200) {
					setAllStudentsData(response.data.result);
				} else if (response.response.status === 404) {
					toast.error("Ooops...! Couldn't find rank table");
				} 
			}
		
		};
	
		handleLeaderBoard();
	}, [searchInput]);
	const handleShowStudent = (userName: string) => {
		axios.get(`https://leetcard.jacoblin.cool/${userName}?ext=heatmap&theme=forest`).then((response: any) => {
			setSvgData(response.data);
			setUiControll(true);
		});
	};
	const clearSvgData = () => {
		setSvgData("");
		setUiControll(false);
	};
	const handleInputChange = (event:any) => {
		const value = event.target.value
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			setSearchInput(event.target.value);
		}, 1000);
		if (value === "") {
			setSearchInput("");
			setIsInputEmpty(true);
		} else {
			setIsInputEmpty(false);
		}
	}

	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" h-[43rem]   p-5 rounded-lg mt-3 w-full bg-white border border-slate-200">
				<div className="flex flex-row justify-between">
					<div className="mb-3 w-[50%] flex justify-between">
						<div>
							<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
								Search
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg
										className="w-4 h-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 20">
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
										/>
									</svg>
								</div>
								<input
									id="default-search"
									className="block w-[30rem] h-10 p-4 pl-10 text-sm outline-none  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-black "
									placeholder="Search students..."
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
					<div className=" flex justify-end pb-4">
						<div className="text-center">
							<button
								type="button"
								className="block w-64 shadow-lg bg-black py-2 mt-2 rounded-lg cursor-pointer   text-white font-semibold mb-2"
								data-hs-overlay="#hs-sign-out-alert">
								Send warning
							</button>
						</div>
						<div
							id="hs-sign-out-alert"
							className="hs-overlay mt-36   hidden w-full h-full fixed top-0  left-0 z-[60] overflow-x-hidden overflow-y-auto">
							<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
								<div className="relative flex flex-col bg-white shadow-lg rounded-xl">
									<div className="absolute top-2 right-2">
										<button
											type="button"
											className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
											data-hs-overlay="#hs-sign-out-alert">
											<span className="sr-only">Close</span>
											<svg
												className="w-3.5 h-3.5"
												width={8}
												height={8}
												viewBox="0 0 8 8"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
													fill="currentColor"
												/>
											</svg>
										</button>
									</div>
									<div className="p-4 sm:p-10 text-center overflow-y-auto">
										{/* Icon */}
										<span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-red-600  text-yellow-500">
											<svg
												className="w-5 h-5"
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												viewBox="0 0 16 16">
												<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
											</svg>
										</span>
										{/* End Icon */}
										<h3 className="mb-2 text-2xl font-bold text-red-600">Send Warning</h3>
										<p className="text-black">Are you sure you would like to send warning....?</p>
										<div className="mt-6 flex justify-center gap-x-4">
											<a
												className="py-2.5 px-4 inline-flex justify-center items-center gap-2 hover:-translate-y-1 transition-all duration-500 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600  text-sm "
												href="#">
												Cancel
											</a>
											<button
												type="button"
												className="py-2.5 px-4 inline-flex justify-center  hover:-translate-y-1 transition-all duration-500 items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white  text-sm "
												data-hs-overlay="#hs-sign-out-alert">
												Send
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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

				<div className="   mt-5 h-[27rem] pb-2  overflow-auto w-auto">
					{allStudentsData?.map((dataObject: any, index: number) => {
						return (
							<div
								key={index}
								className="  mt-3 h-12  bg-white justify-evenly items-center border flex flex-row border-slate-400 gap-2  rounded-lg">
								<div className="   pt-1 flex  h-8 w-full">
									<>
										<button
											onClick={() => handleShowStudent(dataObject.leetcodeId)}
											type="button"
											className="py-3 ml-4 cursor-pointer px-4 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent font-semibold  hover:-translate-y-1 transition-all duration-500  bg-blue-100 text-blue-800 underline underline-offset-2    text-sm dark:focus:ring-offset-gray-800"
											data-hs-overlay="#hs-static-backdrop-modal">
											view
										</button>
										<div
											id="hs-static-backdrop-modal"
											className="hs-overlay hidden fixed inset-0 z-[60] overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
											data-hs-overlay-keyboard="false">
											<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0  ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
												<div className="flex flex-col bg-white border shadow-sm rounded-xl">
													<div className="flex justify-between items-center py-2 px-4">
														<div className="pt-4">
															<h3 className="ml-5  text-2xl font-semibold">LeetCode HeatMap</h3>
														</div>
														<button
															type="button"
															onClick={clearSvgData}
															className="hs-dropdown-toggle inline-flex flex-shrink-0  justify-center bg-[#ece8e0] rounded-xl  items-center h-8 w-8  text-gray-500"
															data-hs-overlay="#hs-static-backdrop-modal">
															<span className="sr-only">Close</span>
															<svg
																className="w-3.5 h-3.5"
																width={8}
																height={8}
																viewBox="0 0 8 8"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
																	fill="currentColor"
																/>
															</svg>
														</button>
													</div>
													<div className="p-4 overflow-y-auto">
														{uiControle ? (
															<span className="pt-3  px-4 block text-lg font-bold text-gray-800 dark:text-white">
																<svg
																	className="rounded-lg borde border-gray-500"
																	width="450"
																	height=""
																	viewBox="0 0 500 320"
																	version="1.1"
																	xmlns="http://www.w3.org/2000/svg"
																	xmlnsXlink="http://www.w3.org/1999/xlink"
																	dangerouslySetInnerHTML={{ __html: svgData }}
																/>
															</span>
														) : (
															<div className="w-full ml-52 h-72 pt-24">
																<Ring size={50} lineWeight={7} speed={2} color="black" />
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									</>
									<span className=" ml-10 text-md font-medium ">{index + 1}</span>
								</div>
								<div className="  pt-1 flex justify-center h-8 w-full">
									<span className=" text-md font-medium ">{dataObject.name}</span>
								</div>
								<div className="  pt-1 flex justify-center h-8 w-full">
									<span className=" text-md font-medium ">{dataObject.batch}</span>
								</div>
								<div className=" pt-1 flex justify-center h-8 w-full">
									<span className=" text-md font-medium ">{dataObject.leetcodeId}</span>
								</div>
							</div>
						);
					})}
				</div>
				{/* <div className="mt-2 rounded-full">
					<div className=" bg-[#ece8e0] rounded-xl shadow-lg border border-slate-300 mrounded-lg h-14">
						<div className="p">
							<nav className=" ml-5  items-center rounded-lg  space-x-2">
								<span
									onClick={handlePrev}
									className="text-gray-500 cursor-pointer hover:text-black p-4 inline-flex items-center gap-2 rounded-md">
									<span aria-hidden="true">«</span>
									<span className="sr-only">Previous</span>
								</span>
								{Array.from({ length: totalpageNumber }, (_, index) => (
									<span
										key={index + 1}
										className={`w-10 h-10 ${
											currentPage === index + 1 ? "bg-black text-white" : "text-gray-500 hover:text-black"
										} p-4 inline-flex cursor-pointer items-center text-sm font-medium rounded-full`}
										onClick={() => handlePageChange(index + 1)}>
										{index + 1}
									</span>
								))}
								<span
									className="text-gray-500 cursor-pointer hover:text-black p-4 inline-flex items-center gap-2 rounded-md"
									onClick={handleNext}>
									<span className="sr-only">Next</span>
									<span aria-hidden="true">»</span>
								</span>
							</nav>
						</div>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default StudentsNotdone;


