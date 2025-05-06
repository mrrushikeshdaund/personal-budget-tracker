import React, { useEffect, useState } from "react";
import BudgetChart from "./BudgetChart";
import CategoryPieChart from "./CategoryPieChart";
import { Card } from "@mui/material";
import BudgetOverview from "./BudgetOverview";
import { useParams } from "react-router-dom";
import { getAllTransaction } from "../api";
import { useSelector } from "react-redux";

const CharSection = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const { totalBudget } = useSelector((state) => state.budget);
  const { totalExpense } = useSelector((state) => state.transaction);
  const { userId } = useParams();

  useEffect(() => {
    getAllTransactionData();
  }, [userId]);

  const getAllTransactionData = async () => {
    const allTX = await getAllTransaction({ userId });
    console.log("chart ", allTX.data.data);
    setPieChartData(
      allTX.data.data.map(({ category, amount }) => ({ category, amount }))
    );
  };
  return (
    <div className="flex flex-col gap-5  bg-gray-100">
      <BudgetOverview />
      <div className="flex gap-4">
        <Card className="w-1/2 p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Budget Chart</h2>
          <BudgetChart budget={totalBudget} expenses={totalExpense} />
        </Card>
        <Card className="w-1/2 p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Category Pie Chart</h2>
          <CategoryPieChart expenses={pieChartData} />
        </Card>
      </div>
    </div>
  );
};

export default CharSection;
