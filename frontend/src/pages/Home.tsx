import { useEffect } from "react";
import Analytic from "../Features/Analytic";
import Navbar from "../components/Navbar";
import PieData from "../components/PieData";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function Home() {
	useEffect(()=>{
		toast.success('Successfully loged in')
	},[])
	return (
		<>
		 <Toaster position="top-right"reverseOrder={false} />
			<Navbar />
			<div className="flex flex-row">
				<div className=" w-[35%] p-1 ">
					<Sidebar />
				</div>
				<div className=" w-full  h-[43rem] overflow-hidden ">
					<div className="overflow-auto ">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
