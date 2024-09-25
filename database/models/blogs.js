const mongoose = require("mongoose");

const blogs_schema = new mongoose.Schema({
    heading: String,
    blog_url: String,
    blog_date: String,
    blog_image: String,
    // isActivate: Boolean,
    short_description: String,
    title: String,
    meta_description: String,
    description: String
})

const blogs_model = new mongoose.model("blogs_model", blogs_schema);
module.exports = blogs_model;