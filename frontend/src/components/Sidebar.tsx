import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();
	const handleSignOut = () => {
		localStorage.removeItem("adminToken");
		localStorage.removeItem("adminAuth");
		navigate("/auth");
	};
     
	const path = useLocation();
	console.log(path,'pathjhh');
	

	

	return (
		<>
			<div className="flex overflow-hidden shadow-lg rounded-lg  flex-col justify-between border-e bg-white">
				<div className="px-4  py-6">
					<div className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0">
						<span className="ml-3 text-2xl underline underline-offset-4 text-black font-semibold antialiased">LeetCode Tracker</span>
					</div>
					<ul className="mt-6 space-y-1">
						<li>
							<Link to={'/'}
								className={ path.pathname === "/" ? "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 text-gray-700" : "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500" }>
								Statics
							</Link>
						</li>
						<li>
							<Link to={'/leaderborde'}
								className={ path.pathname === "/leaderborde" ? "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 text-gray-700" : "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500" }>
								Leader Bord
							</Link>
						</li>
						<li>
							<Link to={'/students'}
                                 className={ path.pathname === "/students" ? "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 text-gray-700" : "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500" }>
                                Students
							</Link>
						</li>
						<li>
							<Link to={'/notdone'}
                                 className={ path.pathname === "/notdone" ? "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 text-gray-700" : "block rounded-lg px-4 py-2 text-lg font-medium text-gray-500" }>								
								 Students Notdone
							</Link>
						</li>
					</ul>
				</div>
				<div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
					<a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
						<img
							alt="Man"
							src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
							className="h-10 w-10 rounded-full object-cover"
						/>
						<div>
							<p className="text-xs">
								<strong className="block font-medium">BrototypeAdmin</strong>
								<span>Admin@gmail.com </span>
							</p>
						</div>
						<div className="ml-24">
							<h1 onClick={handleSignOut} className="underline cursor-pointer hover:text-red-600">
								Sign out
							</h1>
						</div>
					</a>
				</div>
			</div>
			<div className="h-62    bg-white p-2 rounded-lg shadow-2xl mt-2">
				<div className="flex flex-row">
					<div className="animate-ping mt-4 ml-2 w-3 h-3 rounded-full bg-indigo-700"></div>
					<h3 className=" rounded-lg px-2  py-2 text-md font-medium text-gray-500">Send new Question </h3>
				</div>

				<textarea
					className="w-[100%] outline-gray-400 p-2 pl-3 bg-slate-50  shadow-xl border h-44 resize-none  rounded-lg "
					name=""
					id=""></textarea>
				<button
					type="submit"
					className="block w-full shadow-lg bg-black py-2 mt-2 rounded-lg cursor-pointer   text-white font-semibold mb-2">
					Post
				</button>
			</div>
		</>
	);
};

export default Sidebar;
