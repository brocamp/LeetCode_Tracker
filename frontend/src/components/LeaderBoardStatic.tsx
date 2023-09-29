function LeaderBoardStatic() {
	return (
		<>
			<div className="grid grid-cols-3  grid-rows-5 gap-6">
				<div className="row-span-3 h-[10rem] transform transition duration-500 hover:scale-105 bg-amber-600/40 p-2 flex justify-center rounded-t-2xl w-full col-start-1 row-start-3">
					<div className="flex items-center overflow-hidden space-x-4">
						<span className="h-10 bg-white rounded-full w-10" />
						<div className="font-medium text-black">
							<div>Pranav</div>
						</div>
					</div>
				</div>
				<div className="row-span-5 h-[18rem] transform transition duration-500 hover:scale-105 w-full bg-indigo-400  flex justify-center rounded-t-2xl col-start-2 row-start-1">
					<div className="flex items-center overflow-hidden space-x-4">
						<span className="h-10 bg-white rounded-full w-10" />
						<div className="font-medium text-black">
							<div>Ajay</div>
						</div>
					</div>
				</div>
				<div className="row-span-4 transform transition duration-500 hover:scale-105  h-[14rem] w-full bg-slate-500  flex justify-center rounded-t-2xl  col-start-3 row-start-2">
					<div className="flex items-center overflow-hidden space-x-4">
						<span className="h-10 bg-white rounded-full w-10" />
						<div className="font-medium text-black">
							<div>Magesh</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LeaderBoardStatic;
