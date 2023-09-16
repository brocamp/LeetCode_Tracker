import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
	return (
		<>
			<Navbar />
			<div className="flex flex-row">
				<div className=" w-[35%] p-1 ">
					<Sidebar />
				</div>
				<div className=" w-full overflow-hidden ">
					<div className="overflow-auto ">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
