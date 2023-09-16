
import { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { weeklyMetrics } from "../utils/api/config/axios.GetApi";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
export function LineChart() {
	const date: any = [];
	const setudentsCount: any = [];
	useEffect(() => {
		const getWeeklyMetrics = async () => {
			const response: any = await weeklyMetrics();
			response.data.lastWeekReport.map((dayObject: any) => {
				date.push(dayObject.day);
				setudentsCount.push(dayObject.totalStudentsSolved);
			});
		};
		getWeeklyMetrics();
	}, []);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const
			},
			title: {
				display: true,
				text: "Sample chart"
			}
		}
	};

	const labels = date;
	console.log(labels, "labels");

	// Replace this array with your actual data
	const rawData = setudentsCount;
	console.log(rawData, "rowdta");

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Dataset 2",
				data: rawData,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)"
			}
		]
	};

	return (
		<>
			<Line options={options} data={data} />
		</>
	);

}
