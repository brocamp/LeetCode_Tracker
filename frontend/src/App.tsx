
import "./App.css";
// import { privateRoutes,routes } from "./utils/routes/routes";
import { Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorComponent from "./components/ErrorComponent";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import Analytic from "./Features/Analytic";
import { BrowserRouter } from "react-router-dom";
import LeaderBorderStatic from "./components/LeaderBorderStatic";
import LeaderBoard from "./Features/LeaderBorde";
import StudentsDetails from "./Features/StudentsDetails";
import AllStudentData from "./components/AllStudentData";
import StudentsNotdone from "./components/StudentsNotdone";



// App component
const  App = () =>{
	return (
		<>


		<div className="bg-[#ece8e0] p-4  w-screen h-[85rem] ">
		<BrowserRouter>
		   <Routes>

			{/* Auth Route */}
            <Route path="/auth" element={<Login/>} />
			{/*  */}

			{/* ProtectedRoute */}
			<Route element={<ProtectedRoute/>}>
			<Route path="/" element={<Home/>}>
		    <Route index element={<Analytic/>} />
			<Route path="leaderborde" element={<LeaderBoard/>}/>
			<Route path="students/*" element={<StudentsDetails/>}>
			<Route index element={<AllStudentData/>}/>
			<Route path="notdone" element={<StudentsNotdone/>} />
			</Route>
			</Route>
			<Route path="*" element={<ErrorComponent/>} />
			</Route>
			{/*  */}

			{/* Catching invallied routes */}
		
		   </Routes>
		   </BrowserRouter>
		</div>
		</> 
	)
	
  }
  
  export default App;
