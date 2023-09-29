import LeaderBorderStatic from "../components/LeaderBoardStatic";
import { LineChart } from "../components/LineChart";
import PieData from "../components/PieData";

function Analytic() {
	return (
		<>
			<div className="p-7 mb-2">
				<div className="grid grid-cols-12 h-[38rem]  grid-rows-9 gap-4">
					<div className="col-span-5 h-[20rem] shadow-lg hover:scale-100 hover:translate-4 rounded-2xl bg-white p-5 row-span-4">
						<h1 className="text-lg font-semibold text-slate-500 ml-24">Daily overall statistics</h1>
						<PieData />
					</div>
					<div className="col-span-7 h-[20rem] rounded-2xl  bg-white row-span-4 col-start-6">
						<div className="p-6 ">
							<LeaderBorderStatic />
						</div>
					</div>
					<div className="col-span-12 h-[25rem] rounded-2xl   bg-white p-5 flex justify-center row-span-5 row-start-5">
						<LineChart />
					</div>
				</div>
			</div>
		</>
	);
}

export default Analytic;
