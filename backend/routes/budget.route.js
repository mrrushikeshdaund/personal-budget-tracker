const express = require("express");
const router = express.Router();
const budgetModel = require("../models/budget.model");

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const budgets = await budgetModel.find({ userId });
    res
      .status(200)
      .json({ message: "Budgets fetched successfully", data: budgets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new budget
router.post("/create", async (req, res) => {
  try {
    const { userId, month, year, amount } = req.body;
    if (!userId || !month || !year || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the budget for the month and year already exists
    const existingBudget = await budgetModel.findOne({
      userId,
      month,
      year,
    });
    if (existingBudget) {
      return res.status(400).json({ message: "Budget already exists" });
    }
    // Create a new budget
    const newBudget = new budgetModel({
      userId,
      month,
      year,
      amount,
    });
    await newBudget.save();
    // Return the created budget
    res.status(200).json({ message: "Budget created successfully", newBudget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an existing budget
router.put("/update", async (req, res) => {
  try {
    const { userId, month, year, amount } = req.body;
    const budgetRecord = await budgetModel.findOne({ userId });
    // Find the budget to update
    const budget = await budgetModel.findOne({ userId, month, year });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    // Update the budget
    budget.amount = amount;
    await budget.save();
    // Return the updated budget
    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
