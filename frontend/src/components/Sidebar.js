import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AvtarImage, getCurrentUser } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserData } from "../redux/userSlice";
import IconButton from "@mui/material/IconButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [userId]);

  const getUserData = async () => {
    const currentUser = await getCurrentUser({ userId });
    setUserData(currentUser.data.data);
    dispatch(setCurrentUserData(currentUser.data.data));
  };

  const handleTransactionOverview = () => {
    navigate(`/dashborad/${userId}/transactionOverview`);
    setActiveTab("transactionOverview");
  };

  const handleOverview = () => {
    navigate(`/dashborad/${userId}/overview`);
    setActiveTab("overview");
  };

  const handleTransactionManagement = () => {
    navigate(`/dashborad/${userId}/transactionsManagements`);
    setActiveTab("transactionsManagements");
  };

  const handleBudgetsManagement = () => {
    navigate(`/dashborad/${userId}/budgetsManagements`);
    setActiveTab("budgetsManagements");
  };

  const getClassName = (tabName) =>
    `cursor-pointer hover:text-yellow-300 ${
      activeTab === tabName ? "font-bold text-yellow-300" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        Personal Budget Tracker
      </h1>
      <div className="flex items-center justify-center mt-2">
        <img
          src={AvtarImage}
          alt="User Avatar"
          className="rounded-full w-24 h-24 border-2 border-yellow-300"
        />
      </div>
      <div className="flex gap-5 ml-5 mr-5">
        <IconButton size="large">
          <SettingsOutlinedIcon className=" text-white" />
        </IconButton>
        <IconButton size="large">
          <NotificationsNoneOutlinedIcon className=" text-white" />
        </IconButton>
        <IconButton size="large">
          <LogoutOutlinedIcon className=" text-white" />
        </IconButton>
      </div>
      <h2 className="text-xl font-bold ">Welcome, {userData?.email}</h2>

      <div className="border-b border-gray-600 my-2"></div>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleOverview}
        className={activeTab === "overview" ? "font-bold text-yellow-300 " : ""}
      >
        Budgets Overview
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleBudgetsManagement}
        className={
          activeTab === "budgetsManagements" ? "font-bold text-yellow-300" : ""
        }
      >
        Budgets Management
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleTransactionOverview}
        className={
          activeTab === "transactionOverview" ? "font-bold text-yellow-300" : ""
        }
      >
        Transactions Overview
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleTransactionManagement}
        className={
          activeTab === "transactionsManagements"
            ? "font-bold text-yellow-300"
            : ""
        }
      >
        Transactions Management
      </div>
    </div>
  );
};

export default Sidebar;
