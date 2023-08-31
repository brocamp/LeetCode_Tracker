import { Navigate } from "react-router-dom";
import App from "../../App";
import Layout from "./Layout";
import Login from "../../components/Login";
import Home from "../../components/Home";


export  function privateRoutes() {
    return {
      element: < Layout />,
      children: [
        { path: "/", element: <Home/> },
        { path: "/settings", element: <div><h1>"/ setting"</h1></div> },
        { path: "*", element: <Navigate to="/" replace /> },
      ]
    }
}

export  function routes() {
    return [
      { path: "/login", element: <Login /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ];
  }