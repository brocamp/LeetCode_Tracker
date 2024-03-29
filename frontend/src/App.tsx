
import "./App.css";
// import { privateRoutes,routes } from "./utils/routes/routes";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorComponent from "./components/ErrorComponent";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import Analytic from "./Features/Analytic";
import { BrowserRouter } from "react-router-dom";

import LeaderBoard from "./Features/LeaderBorde";
import AllStudentData from "./components/AllStudentData";
import StudentsNotdone from "./components/StudentsNotdone";
import StudentLogin from "./components/StudentLogin";

// App component
const App = () => {
	return (
		<>
			<div className="bg-[#ece8e0] h-[66rem] p-4 ">
				<BrowserRouter>
					<Routes>
						{/* Auth Route */}
						<Route path="/auth" element={<Login />} />
						<Route path="/auth-student" element={<StudentLogin />} />
						{/*  */}
						{/* ProtectedRoute */}
						<Route element={<ProtectedRoute />}>
							<Route path="/" element={<Home />}>
								<Route index element={<Analytic />} />
								<Route path="leaderborde" element={<LeaderBoard />} />
								<Route path="students" element={<AllStudentData />} />
								<Route path="notdone" element={<StudentsNotdone />} />
							</Route>
							<Route path="*" element={<ErrorComponent />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
};

export default App;

