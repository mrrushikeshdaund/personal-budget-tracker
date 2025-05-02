const express = require("express");
const router = express.Router();
const transactionModel = require("../models/transcation.model");

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const transactions = await transactionModel.find({ userId });
    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { userId, amount, category, type, date, description } = req.body;
    if (!userId || !amount || !category || !type || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create a new transaction
    const newTransaction = new transactionModel({
      userId,
      amount,
      category,
      type,
      date,
      description,
    });
    await newTransaction.save();
    // Return the created transaction
    res.status(200).json({
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating transaction", error });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { transactionId, amount, category, type, date, description } =
      req.body;
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }
    // Find the transaction to update
    const transaction = await transactionModel.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    // Update the transaction
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.type = type || transaction.type;
    transaction.date = date || transaction.date;
    transaction.description = description || transaction.description;
    await transaction.save();
    // Return the updated transaction
    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating transaction", error });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }
    // Find the transaction to delete
    const transaction = await transactionModel.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    // Delete the transaction
    await transaction.remove();
    // Return a success message
    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Error deleting transaction", error });
  }
});

module.exports = router;
