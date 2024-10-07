const mongoose = require("mongoose");

const blogs_schema = new mongoose.Schema({
    heading: String,
    blog_url: String,
    blog_date: String,
    image: String,
    short_description: String,
    title: String,
    meta_description: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
})

const blogs_model = new mongoose.model("blogs_model", blogs_schema);
module.exports = blogs_model;