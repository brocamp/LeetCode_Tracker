import { useState } from "react";
import { OtpData, PhoneNumberData, useOtpValidation, usePhoneNumberValidate } from "../utils/validation/formValidation";
import Navbar from "./Navbar";
import { adminAuth, adminVerify } from "../utils/api/config/axios.PostAPi";
import { verifyPayload } from "../utils/api/api.Types/axios.Postapi.Types"; 
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
	const [otp, setOtp] = useState(true);
	const [number,setNumber] = useState("")
  const {errors,handleSubmit,register} = usePhoneNumberValidate();
  const data = useOtpValidation();
  const navigate = useNavigate() 
	const handlePhoneNumber = async(data:PhoneNumberData) => {	
		   // Admin authenrication Api
		   const response:any = await adminAuth(data.phone);
		   if(response.status === 200){
			setOtp(false);
			setNumber(data.phone)
		   }else if(response.response.status === 404){
			toast.error("Ooops..! Error occured");
		   }else{
			toast.error("Ooops...! Invalid mobile phone provide a valid phone")
		}
	}

	const hanldleFormOtp = async (data:OtpData)=> {
		const verifyPayload:verifyPayload = {
			 otp:Number(data.otp),
			 phone:number
		}
		// Admin OTP verify Api
		const response:any = await adminVerify(verifyPayload);
		if(response.status === 200){
            var isLoggedIn = true
			localStorage.setItem("adminToken",response.data.token);
			localStorage.setItem("adminAuth", JSON.stringify(isLoggedIn));
			toast.success("SuccesFully logged in")
			navigate('/');
		}else if(response.response.status === 404){
			toast.error("Ooops..! Error occured")
		}else{
			toast.error("Ooops...! Invalied OTP");
		}
		
	};
	return (
    <>
    <Toaster position="top-center"reverseOrder={false}  />
    <Navbar/>
    <div className="flex  pt-28 justify-center">
			<div className="flex w-full lg:w-1/2  relative justify-center items-center space-y-8">
				<div className="w-full   px-8 md:px-32 rounded-2xl lg:px-24">
					{otp ? (
						<form onSubmit={handleSubmit(handlePhoneNumber)} key={"phone"} className="bg-white h-[20rem]  rounded-2xl shadow-2xl p-12">
							<h1 className="text-gray-800 font-bold text-2xl mb-1">Hey, Admin</h1>
							{
								errors.phone?.message ? <span className="text-sm font-normal text-red-600 mb-8">{errors.phone?.message}</span> : 							<p className="text-sm font-normal text-gray-600 mb-8">Enter your Registred Number to get sign in</p>

							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-8 py-2 px-3 rounded-lg ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-400"
									fill="currentColor"
									viewBox="0 0 16 16">
									<path
										d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"
										fill="#bababa"></path>
									<path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="#bababa"></path>
								</svg>
								<input className="pl-2 w-full cursor-pointer   outline-none border-none" type="text" placeholder="Phone"
                {...register("phone")}
                 />
							</div>
							<input
								type="submit"
								className="block w-full bg-black mt-5 py-2 rounded-lg cursor-pointer  hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
							/>
						</form>
					) : (
						<form key={"otp"} onSubmit={data.handleSubmit(hanldleFormOtp)}  className="bg-white h-[20rem] rounded-2xl shadow-2xl p-12">
							<h1 className="text-gray-800 font-bold text-2xl mb-1">Verify</h1>
							{
									data.errors.otp?.message ? <span className="text-sm font-normal text-red-600 mb-8">{data.errors.otp?.message}</span> : <p className="text-sm font-normal text-gray-600 mb-8">Enter the OTP to verify</p>
							}
							<div className="flex items-center cursor-pointer shadow-sm border-2 mb-8 py-2 px-3 rounded-lg ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-400"
									fill="currentColor"
									viewBox="0 0 16 16">
									<path
										d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
										fill="#9c9c9c"></path>
								</svg>
								<input  {...data.register("otp")} className="pl-2 w-full cursor-pointer   outline-none border-none" type="text" placeholder="OTP" />
							</div>
							<input
								type="submit"
               
								className="block w-full bg-black mt-5 py-2 rounded-lg cursor-pointer  hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
							/>
						</form>
					)}
				</div>
			</div>
		</div>
    </>
		
	);
};

export default Login;
