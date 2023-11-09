import { studentAuth, useStudentAuth } from "../utils/validation/formValidation";
import { studentsAuth } from "../utils/api/config/axios.PostAPi";
import { Toaster, toast } from "react-hot-toast";
import { Waveform } from "@uiball/loaders";
import { useState } from "react";
function StudentLogin() {
    const { errors, handleSubmit, reset, register } = useStudentAuth();
    const [loader,setLoader]  = useState(false)
    const handleStudentsAuth = async (data: studentAuth) => {
        setLoader(true);
        if(loader){
            toast('Please waite request under process!', {
                icon: '⏳',
                duration:580,
                style:{background:"" , width:"30rem",borderColor:"#D2042D",borderWidth:".2rem", borderRadius:"3rem"}
              })
        }else{
            const response: any = await studentsAuth(data);
            if (response?.status === 200) {
                setLoader(false)
                toast.success("Successfully registered");
                reset();
            } else if (response?.response.status === 400) {
                setLoader(false)
                toast.error(`${response?.response.data.errors[0].message}`);
            } else {
                setLoader(false)
                toast.error("Somthing went wrong");
            }
        }
        
    };
    return (
        <div >
            <Toaster position="top-center"  reverseOrder={false} />
            <div className="flex mt-5 h-[62rem]  justify-center">
                <div className="flex w-full  lg:w-1/2   justify-center items-center ">
                    <div className="w-full   md:px-32 rounded-2xl lg:px-24">
                        <form
                            key={"studentAuth"}
                            onSubmit={handleSubmit(handleStudentsAuth)}
                            className="bg-white h-[rem]  rounded-2xl shadow-2xl p-10">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-gray-800 mb-5 font-bold text-2xl ">
                                    Hey, Amigo...🚀 <br />{" "}
                                </h1>
                                <div className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0">
                                    <img className="h-10" src="/logo-black.png" alt="scds" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-start">
                                {errors.name ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.name?.message}</span>
                                ) : (
                                    <p className="ml-2 mb-1">First Name</p>
                                )}
                                <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm  border-2 mb-3 py-2 px-3 rounded-lg ">
                                    <input
                                        className="pl-2 w-full cursor-pointer   outline-none border-none"
                                        type="text"
                                        placeholder="First name"
                                        {...register("name")}
                                    />
                                </div>
                                {errors.lastName ? (
                                    <span className="text-sm font-normal text-red-600 ">{errors.lastName?.message}</span>
                                ) : (
                                    <p className="ml-2 mb-1">Last Name</p>
                                )}
                                <div className="flex items-center  hover:border-black/70 cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
                                    <input
                                        className="pl-2 w-full cursor-pointer   outline-none border-none"
                                        type="text"
                                        placeholder="Last name"
                                        {...register("lastName")}
                                    />
                                </div>
                            </div>
                            {errors.domain?.message ? (
                                <span className="text-sm font-normal text-red-600 mb-8">{errors.domain?.message}</span>
                            ) : (
                                <p className="ml-2 mb-1">Domain</p>
                            )}

                            {
                               loader && (<div className=" absolute pt-[4rem] md:pl-[12rem] pl-[7rem]">
                               <Waveform 
                                size={40}
                                lineWeight={3.5}
                                speed={1} 
                                color="black" 
                               />
                            </div>)
                            }
                              
                            <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
                                <select
                                    placeholder="Domain"
                                    className="w-full cursor-pointer outline-none border-none"
                                    {...register("domain")}>
                                    <option value="MEAN">MEAN</option>
                                    <option value="MERN">MERN</option>
                                    <option value="PYTHON">PYTHON</option>
                                    <option value="GO">GO</option>
                                    <option value="JAVA">JAVA</option>
                                    <option value="RUBY">RUBY</option>
                                    <option value="SWIFT">SWIFT</option>
                                    <option value="FLUTTER">FLUTTER</option>
                                    <option value=".NET">.NET</option>
                                    <option value="ML">ML</option>
                                    <option value="DATASCIENCE">DATA SCIENCE</option>
                                    <option value="DATAENGINEERING">DATA ENGINEERING</option>
                                    <option value="CYBERSECURITY">CYBERSECURITY</option>
                                    <option value="NODEJS">NODEJS</option>
                                    <option value="DEVOPS">DEVOPS</option>
                                    <option value="LOWCODE">LOWCODE</option>
                                    <option value="GAMEDEVELOPEMENT">GAME DEVELOPEMENT</option>
                                    <option value="FRONTEND">FRONT END</option>
                                    <option value="KOTLIN">KOTLIN</option>
                                    <option value="SPRIN GBOOT">SPRING BOOT</option>
                                </select>
                            </div>
                            {errors.batch?.message ? (
                                <span className="text-sm font-normal text-red-600 mb-8">{errors.batch?.message}</span>
                            ) : (
                                <p className="ml-2 mb-1">Batch</p>
                            )}
                            <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
                                <input
                                    className="pl-2 w-full cursor-pointer   outline-none border-none"
                                    type="text"
                                    placeholder="e.g: BCE55"
                                    {...register("batch")}
                                />
                            </div>
                            {errors.phone?.message ? (
                                <span className="text-sm font-normal text-red-600 mb-8">{errors.phone?.message}</span>
                            ) : (
                                <p className="ml-2 mb-1">Whatsapp number</p>
                            )}
                            <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm border-2 mb-2 py-2 px-3 rounded-lg ">
                                <input
                                    className="pl-2 w-full cursor-pointer   outline-none border-none"
                                    type="text"
                                    placeholder="Whatsapp number"
                                    {...register("phone")}
                                />
                            </div>

                            {errors.email?.message ? (
                                <span className="text-sm font-normal text-red-600 mb-8">{errors.email?.message}</span>
                            ) : (
                                <p className="ml-2 mb-1">Mail</p>
                            )}
                            <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
                                <input
                                    className="pl-2 w-full cursor-pointer   outline-none border-none"
                                    type="text"
                                    placeholder="Mail"
                                    {...register("email")}
                                />
                            </div>

                            {errors.leetcodeId?.message ? (
                                <span className="text-sm font-normal text-red-600 mb-8">{errors.leetcodeId?.message}</span>
                            ) : (
                                <p className="ml-2 mb-1">Leetcode user name</p>
                            )}
                            <div className="flex  hover:border-black/70 items-center cursor-pointer shadow-sm border-2 mb-8 py-2 px-3 rounded-lg ">
                                <input
                                    className="pl-2 w-full cursor-pointer   outline-none border-none"
                                    type="text"
                                    placeholder="User name"
                                    {...register("leetcodeId")}
                                />
                            </div>
                            <input
                                type="submit"
                                className="block w-full bg-black mt-5 py-2 rounded-lg cursor-pointer  hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                            />
                        </form>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default StudentLogin;

