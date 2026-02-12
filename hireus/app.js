const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

const express = require("express");
const mongoose = require("mongoose");
const method_override = require("method-override");
const expressLayouts = require("express-ejs-layouts");

const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const errorHandler = require("./middleware/errorHandling");

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


app.use(jobRoutes);
app.use(candidateRoutes);


app.use(errorHandler);


app.get("/apply/:id",(req,res)=>{
    res.send("Working");
});

app.listen(8080, () => {
  console.log("Port 8080 server started");
});
