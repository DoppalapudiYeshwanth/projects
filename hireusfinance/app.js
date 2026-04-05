require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;
const dbUrl = process.env.ATLAS_URL;


mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});