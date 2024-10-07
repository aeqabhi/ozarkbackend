const mongoose = require("mongoose");

const testimonials_schema = new mongoose.Schema({
    image: String,
    name: String,
    designation: String,
    content: String,
    status: {
        type: Boolean,
        default: true
    }
})

const testimonials_model = new mongoose.model("testimonials_model", testimonials_schema);
module.exports = testimonials_model;