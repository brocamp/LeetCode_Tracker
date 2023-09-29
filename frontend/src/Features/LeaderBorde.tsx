import { useEffect, useState } from "react";
import LeaderBoard from "../components/LeaderBoard";
import { getLeaderboard } from "../utils/api/config/axios.GetApi";
import { Toaster, toast } from "react-hot-toast";

const LeaderBorder = () => {
	const [leaderBordRank, setLeaderBoardRank] = useState() as any;
	useEffect(() => {
		const handleLeaderBoard = async () => {
			const response: any = await getLeaderboard();
			if (response?.status === 200) {
				setLeaderBoardRank(response.data.rank);
			} else if (response.response.status === 404) {
				toast.error("Ooops...! Couldn't find rank table");
			} else {
				toast.error(`${response.response.data.errors[0].message}`);
			}
		};
		handleLeaderBoard();
	}, []);
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className="p-5 h-[38rem] ">
				<div className="flex mr-6 justify-end">

					<div className="text-center">
						<button
							type="button"
							className="block w-64 shadow-lg bg-black py-2 mt-2 rounded-lg cursor-pointer   text-white font-semibold mb-2"
							data-hs-overlay="#hs-sign-out-alert">
							Publish LeaderBoard
						</button>
					</div>
					<div
						id="hs-sign-out-alert"
						className="hs-overlay  bg-black/20  hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
						<div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
							<div className="relative flex flex-col top-56 bg-white shadow-lg rounded-xl">
								<div className="absolute top-5 bg-[#ece8e0] rounded-xl  right-6">
									<button
										type="button"
										className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-black hover:text-   transition-all text-sm"
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
									<span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-green-600  text-yellow-500">
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
									<h3 className="mb-2 text-2xl font-bold text-gray-800">Publish Learderbord</h3>
									<p className="text-black">Are you sure you would like to publish leader board?</p>
									<div className="mt-6 flex justify-center gap-x-4">
										<a
											className="py-2.5 px-4 inline-flex justify-center items-center gap-2 hover:-translate-y-1 transition-all duration-500 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600  text-sm "
											href="#">
											Cancel
										</a>
										<button
											type="button"
											className="py-2.5 px-4 inline-flex justify-center bg-black  hover:-translate-y-1 transition-all duration-500 items-center gap-2 rounded-md border border-transparent font-semibold  text-white  text-sm "
											data-hs-overlay="#hs-sign-out-alert">
											Publish
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="p-5   h-[38rem]">
					{leaderBordRank?.map((object: any, index: number) => {
						
						return <LeaderBoard index={index} rank={object} />;
					})}
				</div>
			</div>
		</>
	);
};


export default LeaderBorder;
