import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
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
