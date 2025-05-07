import React from "react";

import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlertOpen } from "../redux/userSlice";
import ToastAlert from "../components/ToastAlert";

const Dashboard = () => {
  const { alertOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 ">
          <Outlet />

          {alertOpen && <ToastAlert />}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
