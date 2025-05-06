import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/userSlice";
import { getAllBudgetRecords, getAllTransaction } from "../api";
import { useParams } from "react-router-dom";
import { setTotalExpense, setTransactionData } from "../redux/transactionSlice";
import { setBudgetsData, setTotalBudget } from "../redux/budgetSlice";

const BudgetOverview = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { selectedMonth } = useSelector((state) => state.user);
  const { transactionData, totalExpense } = useSelector(
    (state) => state.transaction
  );
  const { budgetsData, totalBudget } = useSelector((state) => state.budget);
  const [totalRemaingBudget, setTotalRemaingBudget] = useState(0);
  const months_list = [
    "Select Month",
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

  useEffect(() => {
    getAllTransactionRecord();
    getAllBudget();
  }, [userId]);

  useEffect(() => {
    if (transactionData.length > 0) {
      calculateData();
    }
    setTotalRemaingBudget(totalBudget - totalExpense);
  }, [transactionData, budgetsData]);

  const calculateData = async () => {
    const sumList = transactionData
      .filter((ele) => ele.type === "expense")
      .reduce((sum, ele) => sum + ele.amount, 0);
    dispatch(setTotalExpense(sumList));
    const budgetTotal = budgetsData.reduce((sum, ele) => sum + ele.amount, 0);
    dispatch(setTotalBudget(budgetTotal));
  };

  const getAllTransactionRecord = async () => {
    const allRecords = await getAllTransaction({ userId });
    dispatch(setTransactionData(allRecords.data.data));
  };

  const getAllBudget = async () => {
    const allRecords = await getAllBudgetRecords({ userId });
    dispatch(setBudgetsData(allRecords.data.data));
  };
  const handleMonthChange = async (e) => {
    dispatch(setSelectedMonth(e.target.value));
    await calculateData();
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Budget Overview</h2>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        {/* Budget Stats */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Total Budget</p>
            <p className="text-lg font-semibold text-green-600">
              ₹{totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Total Expenses</p>
            <p className="text-lg font-semibold text-red-500">
              ₹{totalExpense.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500 text-sm">Remaining Budget</p>
            <p className="text-lg font-semibold text-blue-500">
              ₹{totalRemaingBudget.toLocaleString()}
            </p>
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
            value={selectedMonth}
            onChange={handleMonthChange}
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
