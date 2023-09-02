import Analytic from "../Features/Analytic";
import PieData from "../components/PieData";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="flex flex-row">
				<div className=" w-[35%] p-1 ">
					<Sidebar />
				</div>
				<div className=" w-full  h-[43rem] overflow-hidden ">
          <div className="overflow-auto ">
          <Outlet />
          <Analytic/>
          </div>
					
				</div>
			</div>
		</>
	);
}

export default Home;
