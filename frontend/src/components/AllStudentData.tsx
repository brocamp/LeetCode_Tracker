import { useEffect, useState } from "react";
import { getAllStudents, searchStudents } from "../utils/api/config/axios.GetApi";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Ring,DotSpinner } from "@uiball/loaders";

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
let timer: number | undefined;



function AllStudentData() {
	const [allStudentsData, setAllStudentsData] = useState<UserData[]>([]);
	const [svgData, setSvgData] = useState("") as any;
	const [totalpageNumber, setTotalPageNumber] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [uiControle, setUiControll] = useState(false);
	let time: any;

	const [searchInput, setSearchInput] = useState("") as any;
	const [isInputEmpty, setIsInputEmpty] = useState(true);

	useEffect(() => {
		const handleAllStudents = async () => {
			if (isInputEmpty) {
				const response: any = await getAllStudents(currentPage);
				if (response?.status === 200) {
					setTotalPageNumber(response.data.result.totalPages);

					setAllStudentsData(response.data.result.students);
				} else if (response.response.status === 404) {
					toast.error("Ooops...! Couldn't find rank table");
				} else {
					toast.error(`${response.response.data.errors[0].message}`);
				}
			} else {
				// caling search api
				const response: any = await searchStudents(searchInput);
				if (response?.status === 200) {
					setAllStudentsData(response.data.result);
					setTotalPageNumber(0);
				} else if (response.response.status === 404) {
					toast.error("Ooops...! Couldn't find rank table");
				} else {
					toast.error(`${response.response.data.errors[0].message}`);
				}
				// setAllStudentsData([])
			}
		};
		handleAllStudents();
	}, [currentPage, searchInput]);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handlePrev = () => {
		if (currentPage != 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleNext = () => {
		if (totalpageNumber != currentPage) {
			setCurrentPage((prev) => prev + 1);
		}
	};

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
	const handleInputChange = (event: any) => {
		const inputValue = event.target.value;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			setSearchInput(event.target.value);
		}, 1000);
		if (inputValue === "") {
			setSearchInput("");
			setIsInputEmpty(true);
		} else {
			setIsInputEmpty(false);
		}
	};

	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" h-[43rem]   p-5 rounded-lg mt-3 w-full bg-white border border-slate-200">
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
								onChange={handleInputChange}
								id="default-search"
								className="block w-[30rem] h-10 p-4 pl-10 text-sm outline-none  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-black "
								placeholder="Search students..."
							/>
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
											className="hs-overlay hidden w-full  h-full fixed top-60 left-0 ml-24 z-[60]  overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]"
											data-hs-overlay-keyboard="false">
											<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0  ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
												<div className="flex flex-col bg-white border shadow-sm rounded-xl">
													<div className="flex justify-between items-center py-2 px-4">
                                                       <div className="pt-4">
                                                       <h3 className="ml-5  text-2xl font-semibold">
                                                            LeetCode HeatMap
                                                        </h3>
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
									<span className=" ml-10 text-md font-medium ">
										{currentPage === 1 ? currentPage * 0 + (index + 1) : currentPage * 10 + (index + 1)}
									</span>
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
				<div className="mt-2 rounded-full">
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
				</div>
			</div>
		</>
	);
}

export default AllStudentData;
