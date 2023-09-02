import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar"

export default function Layout() {
    return (
      <>
      <div className="m-1">
      <Navbar />
          <Outlet />
          </div>
      </>
    );
  }