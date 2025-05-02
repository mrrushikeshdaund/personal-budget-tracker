import React from "react";
import BudgetChart from "./BudgetChart";
import CategoryPieChart from "./CategoryPieChart";
import { Card } from "@mui/material";
import BudgetOverview from "./BudgetOverview";

const CharSection = () => {
  return (
    <div className="flex flex-col gap-5  bg-gray-100">
      <BudgetOverview />
      <div className="flex gap-4">
        <Card className="w-1/2 p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Budget Chart</h2>
          <BudgetChart budget={30000} expenses={24500} />
        </Card>
        <Card className="w-1/2 p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Category Pie Chart</h2>
          <CategoryPieChart
            expenses={[
              { category: "Groceries", amount: 5000 },
              { category: "Rent", amount: 12000 },
              { category: "Utilities", amount: 2500 },
              { category: "Entertainment", amount: 3000 },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default CharSection;
