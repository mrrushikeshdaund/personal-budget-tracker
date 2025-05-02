const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/user.route"));
app.use("/api/budget", require("./routes/budget.route"));
app.use("/api/transaction", require("./routes/transcation.route"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Server running..."));
  })
  .catch((err) => console.error(err));
