
import "./App.css";
import { privateRoutes,routes } from "./utils/routes/routes";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// App component
function App() {
	const user = true
	// Combine and conditionally include routes based on authentication status
	const router = createBrowserRouter([
	  user ? privateRoutes() : {},
	  ...routes(),
	]);
	// Provide the router configuration using RouterProvider
	return (
		<>
		<div className="bg-[#ece8e0] p-4  w-screen h-[51rem] ">
		<RouterProvider router={router} />
		</div>
		</> 
	)
	
  }
  
  export default App;
