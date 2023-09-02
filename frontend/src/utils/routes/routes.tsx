import { Navigate} from "react-router-dom";
import App from "../../App";
import Layout from "./Layout";
import Login from "../../components/Login";
import Home from "../../pages/Home";
import ErrorComponent from "../../components/ErrorComponent";


export  function privateRoutes() {
    return {
      element: < Layout />,
      children: [
        { path: "/", element: <Home/> ,children:[
            { path: "/settings", element: <div><h1>"/ setting"</h1></div> },
            { path: "/ok", element: <div><h1>"/okkokkok"</h1></div> },
        ] },
       
      ],
      errorElement: <ErrorComponent />
    }
}

export  function routes() {
    return [
      { path: "/login", element: <Login /> },
      
    ];
  }