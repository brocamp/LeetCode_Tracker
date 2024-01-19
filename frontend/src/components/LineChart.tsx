import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { weeklyMetrics } from "../utils/api/config/axios.GetApi";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export function LineChart() {
	const [date, setDate] = useState([]);
	const [studentsCount, setStudentsCount] = useState([]);

	useEffect(() => {
		const getWeeklyMetrics = async () => {
			const response: any = await weeklyMetrics();
			const newDate: any = [];
			const newStudentsCount: any = [];

			response.data.lastWeekReport.forEach((dayObject: any) => {
				newDate.push(dayObject.day);
				newStudentsCount.push(dayObject.totalStudentsSolved);
			});

			setDate(newDate);
			setStudentsCount(newStudentsCount);
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
				text: "Weekly analytics chart"
			}
		}
	};

	const labels = date;

	// Replace this array with your actual data
	const rawData = studentsCount;

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "solved",
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
