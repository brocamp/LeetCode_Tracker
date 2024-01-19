import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	let storedValue: any = localStorage.getItem("adminAuth");
	return JSON.parse(storedValue) ? <Outlet /> : <Navigate to={"auth"} />;
}

export default ProtectedRoute;
