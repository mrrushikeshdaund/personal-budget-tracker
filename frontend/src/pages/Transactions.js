import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  updateTransaction,
} from "../api";
import { useParams } from "react-router-dom";
import { setAlertMessage, setAlertOpen, setSeverity } from "../redux/userSlice";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [deleteBtn, setDeleteBtn] = useState(false);
  const { currentUserData } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    _id: null,
    category: "",
    amount: "",
    type: "income",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllTransactions();
  }, [form]);

  const getAllTransactions = async () => {
    const transactionRecords = await getAllTransaction({ userId });
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

    if (form._id !== null) {
      // Edit
      const updatedObj = {
        transactionId: form._id,
        amount: form.amount,
        category: form.category,
        type: form.type,
        date: Date.now(),
        description: form.description,
      };
      const updatedTransaction = await updateTransaction(updatedObj);
      console.log(updatedTransaction.status);
      dispatch(setAlertOpen(true));
      dispatch(setSeverity("success"));
      dispatch(setAlertMessage(updateTransaction.message));
    } else {
      // Add
      const createTrans = await createTransaction(transObj);
      if (createTrans.status === 200) {
        dispatch(setAlertOpen(true));
        dispatch(setSeverity("success"));
        dispatch(setAlertMessage(createTrans.data.message));
      } else {
        dispatch(setAlertOpen(true));
        dispatch(setSeverity("error"));
        dispatch(setAlertMessage(createTrans.data.message));
      }
    }
    setForm({
      _id: null,
      category: "",
      amount: "",
      description: "",
      type: "income",
    });
    setDeleteBtn(false);
  };

  const handleEdit = (tx) => {
    setForm(tx);
    setDeleteBtn(true);
  };

  const handleDelete = async (id) => {
    const transactionId = id;
    console.log(id);
    const deleteTransactionRecord = await deleteTransaction(transactionId);
    setTransactions(transactions.filter((t) => t._id !== id));
    if (deleteTransactionRecord.status === 200) {
      dispatch(setAlertOpen(true));
      dispatch(setSeverity("success"));
      dispatch(setAlertMessage(deleteTransactionRecord.data.message));
    } else {
      dispatch(setAlertOpen(true));
      dispatch(setSeverity("error"));
      dispatch(setAlertMessage(deleteTransactionRecord.data.message));
    }
  };

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
            {form._id !== null ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
        <div className="h-[50vh] overflow-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-100 ">
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
                  <tr key={tx._id} className="hover:bg-gray-50 ">
                    <td className="py-2 px-3 border">{tx.category}</td>
                    <td className="py-2 px-3 border">{tx.description}</td>
                    <td className="py-2 px-3 border">₹{tx.amount}</td>
                    <td className="py-2 px-3 border capitalize">{tx.type}</td>
                    <td className="py-2 px-3 border">
                      {tx.date.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 border space-x-2">
                      <button
                        onClick={() => handleEdit(tx)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tx._id)}
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

export default Transactions;
