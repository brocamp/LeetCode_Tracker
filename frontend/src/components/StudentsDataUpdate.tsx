import { useEffect, useState } from "react";
import { editeStudentData } from "../utils/api/config/axios.PostAPi";
import { toast } from "react-hot-toast";

function StudentsDataUpdate(data: any) {
	const [formdata,setFormData]=useState({
		  name:"",
		  lastName:"",
		  email:"",
		  domain:"",
		  batch:"",
		  phone:"",
		  leetcodeId:""
	});
	useEffect(()=>{
		setFormData({
			...formdata,
			name:data.data.name,
			lastName:data.data.lastName,
			email:data.data.email,
			domain:data.data.domain,
			batch:data.data.batch,
			phone:data.data.phone,
			leetcodeId:data.data.leetcodeId
		})
	},[])

	const formSubmit=async(id:string)=>{
		const response:any = await editeStudentData(id,formdata);
		if(response.status === 200){
          toast.success("Data succesufully updated")
		}else if(response.status === 400){
		  toast.error("leetcode id is not exist or student not found")
		}else{
			toast.error("Oops...! something went wrong")
		}
	}

	return (
		<>
			<section className="max-w-4xl p-8 mx-auto bg-white rounded-md shadow-2xl mt-5">
				<h2 className="text-lg font-semibold text-gray-700 capitalize">Update UserData</h2>
				<form>
					<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
						<div>
							<label className="text-gray-700 " htmlFor="username">
								First Name
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
								    onChange={e=>
										setFormData({
										  ...formdata,
										  name:e.target.value
										})
									  }
									value={formdata.name}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="First name"
									name="name"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="username">
								Laste Name
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
								    onChange={e=>
                                      setFormData({
										...formdata,
										name:e.target.value
									  })
									}
									value={formdata.lastName}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									name="lastName"
								/>
							</div>
						</div>

						<div>
							<label className="text-gray-700 " htmlFor="password">
								Domain
							</label>
							<div className="flex  hover:border-black/70 items-center mt-2 cursor-pointer shadow-sm border-2 mb-3 py-3 px-3 rounded-lg ">
								<select onChange={e=>
                                      setFormData({
										...formdata,
										domain:e.target.value
									  })
									} value={formdata.domain} name="domain" placeholder="Domain" className="w-full cursor-pointer outline-none border-none">
									<option value="MERN">MERN</option>
									<option value="MEAN">MEAN</option>
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
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="passwordConfirmation">
								Batch
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
								    onChange={e=>
										setFormData({
										  ...formdata,
										  batch:e.target.value
										})
									  }
								    name="batch"
									value={formdata.batch}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="e.g:BCE55"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="passwordConfirmation">
								Whatsapp Number
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
								  onChange={e=>
									setFormData({
									  ...formdata,
									  phone:e.target.value
									})
								  }
								    name="phone"
									value={formdata.phone}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Whatsapp Number"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="passwordConfirmation">
								Mail
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2  py-3 px-3 rounded-lg ">
								<input
								   onChange={e=>
									setFormData({
									  ...formdata,
									  email:e.target.value
									})
								  }
								    name="email"
								    value={formdata.email}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Mail"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="passwordConfirmation">
								Leetcode user name
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
								   onChange={e=>
									setFormData({
									  ...formdata,
									  leetcodeId:e.target.value
									})
								  }
								    name="leetcodeId"
									value={formdata.leetcodeId}
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="First name"
								/>
							</div>
						</div>
					</div>
					<div className="mt-6 flex justify-end gap-x-4">
						<button
						    onClick={()=>formSubmit(data.data._id)}
							type="button"
							className="py-2.5 px-4 inline-flex justify-center bg-black  hover:-translate-y-1 transition-all duration-500 items-center gap-2 rounded-md border border-transparent font-semibold  text-white  text-sm "
							data-hs-overlay="#hs-sign-out-alert">
							Confirm
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default StudentsDataUpdate;
