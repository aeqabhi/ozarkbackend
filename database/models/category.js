const mongoose = require("mongoose");

const category_schema = new mongoose.Schema({
    category_name: String,
    category_slug: String,
    short_desc: String,
    image: String,
    meta_title: String,
    meta_desc: String,
    description: String,
}, { timestamps: true })

const category_model = new mongoose.model("category_model", category_schema);
module.exports = category_model;