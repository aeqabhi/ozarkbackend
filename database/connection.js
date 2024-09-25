const mongoose = require("mongoose");
const URL = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("connection succesfull...");
    } catch (err) {
        console.log("unable to connect with database :"+err);
    }
}

connectDB();