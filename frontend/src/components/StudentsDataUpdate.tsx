

function StudentsDataUpdate(data: any) {
	console.log(data, "dataa");

	return (
		<>
			{/* <div>{data.data.name}</div> */}
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
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="First name"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="emailAddress">
								Last Name
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="Last Name"
								/>
							</div>
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="password">
								Domain
							</label>
							<div className="flex  hover:border-black/70 items-center mt-2 cursor-pointer shadow-sm border-2 mb-3 py-3 px-3 rounded-lg ">
                                <select
                                    placeholder="Domain"
                                    className="w-full cursor-pointer outline-none border-none"
                                    >
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
						</div>
						<div>
							<label className="text-gray-700 " htmlFor="passwordConfirmation">
                            Batch
							</label>
							<div className="flex  hover:border-black/70 items-center mt-1 cursor-pointer shadow-sm  border-2 mb-3 py-3 px-3 rounded-lg ">
								<input
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
									className="pl-2 w-full cursor-pointer   outline-none border-none"
									type="text"
									placeholder="First name"
								/>
							</div>
						</div>
					</div>
                    <div className="mt-6 flex justify-end gap-x-4">

															<button
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
