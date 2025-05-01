const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  category: String,
  type: { type: String, enum: ["income", "expense"] },
  date: Date,
  description: String,
});
const transactionModel = mongoose.model("Transaction", TransactionSchema);
module.exports = transactionModel;
