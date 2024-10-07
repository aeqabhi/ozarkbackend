const mongoose = require("mongoose");

const category_schema = new mongoose.Schema({
    category_name: String,
    category_slug: String,
    short_desc: String,
    image: String,
    meta_title: String,
    meta_desc: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


category_schema.pre("save", async function (next) {
    try {
        this.category_slug = this.category_slug.toLowerCase().split(" ").join("-");
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
})




const category_model = new mongoose.model("category_model", category_schema);
module.exports = category_model;