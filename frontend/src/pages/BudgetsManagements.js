import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import {
  createBudget,
  deleteBudgetRecord,
  getAllBudgetRecords,
  updateBudgetRecord,
} from "../api";

const BudgetsManagements = () => {
  const [budgets, setBudgets] = useState([]);
  const { userId } = useParams();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const { currentUserData } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    _id: null,
    month: 0,
    year: 0,
    amount: 0,
  });

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
    getAllBudgets();
  }, [userId]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getAllBudgets = async () => {
    const getAllRecords = await getAllBudgetRecords({ userId });
    console.log(getAllRecords);
    setBudgets(getAllRecords.data.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBudget = {
      userId: userId,
      month: Number(form.month),
      year: Number(form.year),
      amount: Number(form.amount),
    };

    try {
      if (form._id !== null) {
        // Update budget
        const updateBudget = {
          _id: form._id,
          userId: userId,
          amount: Number(form.amount),
        };
        await updateBudgetRecord(updateBudget);
        setDeleteBtn(false);
      } else {
        // Create new budget
        await createBudget(newBudget);
        console.log("New budget created:", newBudget);
      }

      // Refresh list
      await getAllBudgets();

      // Reset form
      setForm({
        _id: null,
        month: 0,
        year: 2000,
        amount: 0,
      });
    } catch (error) {
      console.error("Error submitting budget:", error);
    }
  };

  const handleEdit = (tx) => {
    setForm(tx);
    setDeleteBtn(true);
  };

  const handleDelete = async (BId) => {
    await deleteBudgetRecord(BId);
    setBudgets(budgets.filter((row) => row._id !== BId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Budgets Management</h2>
      <Card className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            disabled={deleteBtn}
            className="p-2 border border-gray-300 rounded"
          >
            {months_list.map((val, index) => (
              <option key={index} value={index}>
                {val}
              </option>
            ))}
          </select>
          <input
            name="year"
            placeholder="Year"
            type="number"
            value={form.year}
            disabled={deleteBtn}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="amount"
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="md:col-span-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
          >
            {form._id !== null ? "Update Budgets" : "Add Budgets"}
          </button>
        </form>
        <div className="h-[50vh] overflow-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100 ">
              <tr>
                <th className="py-2 px-3 border">Month</th>
                <th className="py-2 px-3 border">Year</th>
                <th className="py-2 px-3 border">Amount</th>
                <th className="py-2 px-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No budgets found
                  </td>
                </tr>
              ) : (
                budgets.map((budgetRow) => (
                  <tr key={budgetRow._id} className="hover:bg-gray-50 ">
                    <td className="py-2 px-3 border">
                      {months_list[budgetRow.month]}
                    </td>
                    <td className="py-2 px-3 border">{budgetRow.year}</td>
                    <td className="py-2 px-3 border">₹{budgetRow.amount}</td>
                    <td className="py-2 px-3 border space-x-2">
                      <button
                        onClick={() => handleEdit(budgetRow)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(budgetRow._id)}
                        className={`${
                          deleteBtn
                            ? "bg-grey-500 text-white px-2 py-1 rounded"
                            : "bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        } `}
                        disabled={deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BudgetsManagements;
