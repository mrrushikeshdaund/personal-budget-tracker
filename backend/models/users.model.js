const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
