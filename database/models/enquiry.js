const mongoose = require("mongoose");

const enquiry_schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject:String,
    Message:String,
}, { timestamps: true })

const enquiry_model = new mongoose.model("enquiry_model", enquiry_schema);
module.exports = enquiry_model;