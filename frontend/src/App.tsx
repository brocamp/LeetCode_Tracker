import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
     <div className="bg-[#ece8e0] w-screen h-screen ">
				<Navbar />
				<Login />
			</div>
		</>
	);
}

export default App;
