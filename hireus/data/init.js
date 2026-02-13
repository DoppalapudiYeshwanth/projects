const mongoose = require("mongoose");
const path = require("path");
const jobs = require("./data");
const Job = require("../models/jobSchema");
// const Candidate = require("../models/candidateSchema");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});


const dbUrl  = process.env.ATLAS_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main().then(() => {
  console.log("MongoDB Atlas Connected Successfully");
})
.catch((err) => {
  console.log("Connection Error:", err);
});

const initDb = async()=>{
  await Job.insertMany(jobs);
  console.log("Data inserted");
  mongoose.connection.close();
}

initDb();