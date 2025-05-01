const mongoose = require("mongoose");
const BudgetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  month: Number,
  year: Number,
  amount: Number,
});

const budgetModel = mongoose.model("Budget", BudgetSchema);
module.exports = budgetModel;
