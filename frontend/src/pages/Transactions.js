import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { createTransaction, getAllTransaction } from "../api";
import { useParams } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useParams();
  const { currentUserData } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    id: null,
    category: "",
    amount: "",
    type: "income",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    const transactionRecords = await getAllTransaction({ userId });
    console.log(transactionRecords.data);
    setTransactions(transactionRecords.data.data);
  };

  const handleSubmit = async (e) => {
    console.log(form);
    const transObj = {
      userId: currentUserData._id,
      amount: form.amount,
      category: form.category,
      type: form.type,
      date: Date.now(),
      description: form.description,
    };
    console.log(currentUserData);
    e.preventDefault();
    const createTrans = await createTransaction(transObj);
    if (form.id !== null) {
      // Edit
      setTransactions(transactions.map((t) => (t.id === form.id ? form : t)));
    } else {
      // Add
      setTransactions([
        ...transactions,
        { ...form, date: Date.now(), id: currentUserData._id },
      ]);
    }
    setForm({
      id: null,
      category: "",
      amount: "",
      description: "",
      type: "income",
    });
  };

  const handleEdit = (tx) => setForm(tx);
  const handleDelete = (id) =>
    setTransactions(transactions.filter((t) => t.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-bold">Transactions Management</h2>
      <Card className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
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
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            type="submit"
            className="md:col-span-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
          >
            {form.id !== null ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>

        <table className="w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 border">Category</th>
              <th className="py-2 px-3 border">Description</th>
              <th className="py-2 px-3 border">Amount</th>
              <th className="py-2 px-3 border">Type</th>
              <th className="py-2 px-3 border">Date</th>
              <th className="py-2 px-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border">{tx.category}</td>
                  <td className="py-2 px-3 border">{tx.description}</td>
                  <td className="py-2 px-3 border">₹{tx.amount}</td>
                  <td className="py-2 px-3 border capitalize">{tx.type}</td>
                  <td className="py-2 px-3 border">{tx.date}</td>
                  <td className="py-2 px-3 border space-x-2">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Transactions;
