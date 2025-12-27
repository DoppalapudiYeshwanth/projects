const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const data = require("../init/data");
const Listing = require("../models/listing");

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

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Database initialized with sample listings");

  mongoose.connection.close();
};

initDb();