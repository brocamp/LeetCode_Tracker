
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function StudentsDetails() {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<div className=" h-[35rem]  p-5 rounded-lg mt-3 w-full bg-indigo-500 border border-slate-200">
				<Outlet />
			</div>
		</>
	);
}

export default StudentsDetails;
