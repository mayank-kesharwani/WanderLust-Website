const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")

//mongoose connection
main().then(()=>{
    console.log("Connected to DB")
}).catch(err => console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

const initDB = async()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj)=>({...obj, owner: "66be2e33174c96cd070a82d4"}))
    await Listing.insertMany(initData.data)
    console.log("Data is inserted")
}
initDB()