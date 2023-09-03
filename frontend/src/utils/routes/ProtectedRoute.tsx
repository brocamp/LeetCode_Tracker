import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	const user = true;
	let superUser = user;
	return superUser ? <Outlet /> : <Navigate to={"auth"} />;
}

export default ProtectedRoute;
