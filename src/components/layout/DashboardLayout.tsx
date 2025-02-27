import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import SidebarMobile from "../dashboard/SidebarMobile";

const DashboardLayout = () => {
  return (
    <div>
      <div className="relative flex min-h-[100vh] ">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className=" bg-gray-900 md:hidden">
          <SidebarMobile />
        </div>
        <div className="  -ml-5 flex-1 overflow-auto bg-slate-900 text-white    ">
          <div className="mx-auto w-11/12 max-w-maxContent  ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
