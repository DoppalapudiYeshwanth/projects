const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

const express = require("express");
const mongoose = require("mongoose");
const method_override = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const hrRoutes = require("./routes/hrRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const errorHandler = require("./middleware/errorHandling");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const dbUrl = process.env.ATLAS_URL;


async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log("Connection Error:", err));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/boilerplate");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(method_override("_method"));
app.use(cookieParser());

const jwt = require("jsonwebtoken");
const People = require("./models/peopleSchema");

app.use(async (req, res, next) => {
  res.locals.user = null;

  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = await People.findById(decoded.id).select("-password");
    }
  } catch (err) {
    res.locals.user = null;
  }

  next();
});

app.use(hrRoutes);
app.use(candidateRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);

app.use(errorHandler);


app.listen(8080, () => {
  console.log("Port 8080 server started");
});
