import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Dashboard</h1>
      <div className="flex justify-center mt-5">
        <p className="text-lg">Welcome to your dashboard!</p>
      </div>
      <div className="flex justify-center mt-5">
        <p className="text-lg">
          Here you can manage your transactions and budgets.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
