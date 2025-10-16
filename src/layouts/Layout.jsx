import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
