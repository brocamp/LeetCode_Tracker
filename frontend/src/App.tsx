
import "./App.css";
// import { privateRoutes,routes } from "./utils/routes/routes";
import { Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorComponent from "./components/ErrorComponent";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import Analytic from "./Features/Analytic";
import { BrowserRouter } from "react-router-dom";



// App component
const  App = () =>{
	return (
		<>


		<div className="bg-[#ece8e0] p-4  w-screen h-screen ">
		<BrowserRouter>
		   <Routes>

			{/* Auth Route */}
            <Route path="/auth" element={<Login/>} />
			{/*  */}

			{/* ProtectedRoute */}
			<Route element={<ProtectedRoute/>}>
			<Route path="/" element={<Home/>}>
		    <Route index element={<Analytic/>} />
			</Route>
			</Route>
			{/*  */}

			{/* Catching invallied routes */}
			<Route path="*" element={<ErrorComponent/>} />
			{/*  */}
		   </Routes>
		   </BrowserRouter>
		</div>
		</> 
	)
	
  }
  
  export default App;
