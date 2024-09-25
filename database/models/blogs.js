const mongoose = require("mongoose");

const blogs_schema = new mongoose.Schema({
    blog_heading: String,
    blog_url: String,
    blog_date: String,
    blog_image: String,
    isActivate: Boolean,
})

const blogs_model = new mongoose.model("blogs_model", blogs_schema);
module.exports = blogs_model;