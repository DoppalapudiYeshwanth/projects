const mongoose = require("mongoose");
const data = require("../init/data");
const Listing = require("../models/listing");

async function main(){
    mongoose.connect("mongodb+srv://yeshwanthd2006_db_user:yeshwanth2006D@airbnbproject.bcjspuj.mongodb.net/?appName=AirBnbProject")
}

main().then(() => {
  console.log("MongoDB Atlas Connected Successfully");
})
.catch((err) => {
  console.log("Connection Error:", err);
});

const initDb = async () => {
  await Listing.deleteMany({});

  const listingsWithOwner = data.data.map((listing) => ({
    ...listing,
    owner: "694beffc87287a3f0c3a9256" ,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("Database initialized with sample listings");
};

initDb();