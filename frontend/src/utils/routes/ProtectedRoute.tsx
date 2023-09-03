import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	var storedValue:any = localStorage.getItem("adminAuth")
	return JSON.parse(storedValue) ? <Outlet /> : <Navigate to={"auth"} />;
}

export default ProtectedRoute;
