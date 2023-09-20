
import { useEffect, useState } from "react";
import { getAllStudents, searchStudents } from "../utils/api/config/axios.GetApi";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";


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
    const [svgData, setSvgData] = useState('') as any;
    const [totalpageNumber, setTotalPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [uiControle,setUiControll] = useState(false);
    let time:any 


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
    const apiCall =(userName: string)=>{
        axios.get(`https://leetcard.jacoblin.cool/${userName}?ext=heatmap&theme=forest`).then((response: any) => {
            setSvgData(response.data);
            setUiControll(true);
            clearTimeout(time) 
        });
    }
    const handleShowStudent = (userName: string) => {
         time = setTimeout(()=>{
            apiCall(userName);
        },100)
        
    };
    const clearSvgData = () => {
        setSvgData('');
        setUiControll(false)
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
                                    <div className="hs-tooltip inline-block ml-5 [--trigger:click] ">
                                        <a className="hs-tooltip-toggle block text-center" href="javascript:;">
                                            <span
                                                onClick={() => handleShowStudent(dataObject.leetcodeId)}
                                                onMouseLeave={clearSvgData}
                                                className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full" />
                                                View
                                            </span>
                                            <div
                                                    className="hs-tooltip-content  hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible hidden opacity-0 transition-opacity  absolute invisible z-10 max-w-xs "
                                                    role="tooltip">
                                                        {
                                                            uiControle && (<span className="pt-3  px-4 block text-lg font-bold text-gray-800 dark:text-white">
                                                            <svg
                                                                className="rounded-lg border mt-36 ml-32 border-gray-500"
                                                                width="500"
                                                                height="320"
                                                                viewBox="0 0 500 320"
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                dangerouslySetInnerHTML={{ __html:svgData}}
                                                            />
                                                        </span>)
                                                        }
                                                    
                                                </div>  
                                        </a>
                                    </div>

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

