import React from "react";

const BudgetOverview = () => {
  const months_list = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Budget Overview</h2>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        {/* Budget Stats */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Total Budget</p>
            <p className="text-lg font-semibold text-green-600">₹30,000</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-lg font-semibold text-red-500">₹24,500</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Remaining Budget</p>
            <p className="text-lg font-semibold text-blue-500">₹5,500</p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex flex-col items-end">
          <label htmlFor="month" className="text-sm text-gray-600 mb-1">
            Select Month
          </label>
          <select
            id="month"
            name="month"
            className="p-2 border border-gray-300 rounded w-40"
          >
            {months_list.map((val, index) => (
              <option key={index} value={index}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
