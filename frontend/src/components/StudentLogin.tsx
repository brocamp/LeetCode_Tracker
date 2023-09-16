import Navbar from "./Navbar";
import { studentAuth, useStudentAuth } from "../utils/validation/formValidation";
import { studentsAuth } from "../utils/api/config/axios.PostAPi";
import { Toaster,toast } from "react-hot-toast";

function StudentLogin() {
	const { errors, handleSubmit, reset,register } = useStudentAuth();

	const handleStudentsAuth =  async(data: studentAuth) => {
          const response:any = await studentsAuth(data);
                if(response?.status === 200){
                    toast.success("Successfully registrated");
                    reset()
                }else if(response?.response.status === 400){
                    toast.error(`${response?.response.data.errors[0].message}`);
                    reset()
                }else{
                    toast.error("Somthing went wrong");
                    reset()
                }
	};
	return (
		<>
         <Toaster position="top-center" reverseOrder={false} />
			<Navbar />
			<div className="flex h-[50rem]  justify-center">
				<div className="flex w-full lg:w-1/2  relative justify-center items-center space-y-8">
					<div className="w-full   md:px-32 rounded-2xl lg:px-24">
						<form
							key={"studentAuth"}
                            
							onSubmit={handleSubmit(handleStudentsAuth)}
							className="bg-white h-[rem]  rounded-2xl shadow-2xl p-10">
							<h1 className="text-gray-800 mb-5 font-bold text-2xl ">
								Hey, Amigo 🚀 <br />{" "}
							</h1>
							
							{
								errors.name? <span className="text-sm font-normal text-red-600 mb-8">{errors.name?.message}</span> :<p className="ml-2 mb-1">Name</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
								<input
                                   
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Name"
									{...register("name")}
								/>
							</div>
							{
								errors.domain?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.domain?.message}</span> :<p className="ml-2 mb-1">Domain</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
								<select placeholder="Domain" className="w-full cursor-pointer outline-none border-none" {...register("domain")}>
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
								</select>
							</div>
                            {
								errors.batch?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.batch?.message}</span> :<p className="ml-2 mb-1">Batch</p>
							}
                            <div className="flex items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
								<input
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Batch"
									{...register("batch")}
								/>
							</div>
                            {
								errors.batch?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.phone?.message}</span> :<p className="ml-2 mb-1">Whatsapp number</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-2 py-2 px-3 rounded-lg ">
								<input
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Whatsapp number"
									{...register("phone")}
								/>
							</div>
							
                            {
								errors.email?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.email?.message}</span> :<p className="ml-2 mb-1">Mail</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-3 py-2 px-3 rounded-lg ">
								<input
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Mail"
									{...register("email")}
								/>
							</div>
							
                            {
								errors.leetcodeId?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.leetcodeId?.message}</span> :<p className="ml-2 mb-1">Leetcode user name</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-8 py-2 px-3 rounded-lg ">
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
		</>
	);
}

export default StudentLogin;
