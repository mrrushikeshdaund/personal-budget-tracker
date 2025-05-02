import React from "react";

const BudgetOverview = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Budget Overview</h2>
      <div className="flex gap-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Total Budget</p>
          <p className="text-lg font-semibold text-green-600">$30,000</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <p className="text-lg font-semibold text-red-500">$24,500</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-500 text-sm">Remaining Budget</p>
          <p className="text-lg font-semibold text-blue-500">$5,500</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
