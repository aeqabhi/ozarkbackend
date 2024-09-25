const mongoose = require("mongoose");

const subcategory_schema = new mongoose.Schema({
    category_id: String,
    subcategory_name: String,
    subcategory_slug: String,
    title: String,
    meta_desc: String,
    description: String,
}, { timestamps: true })

const subcategory_model = new mongoose.model("subcategory_model", subcategory_schema);
module.exports = subcategory_model;