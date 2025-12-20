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

const initDb = async function(){
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
};
initDb();