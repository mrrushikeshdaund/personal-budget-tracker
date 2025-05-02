import React from "react";

import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
