const mongoose = require("mongoose");

const banner_schema = new mongoose.Schema({
    heading: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
});


banner_schema.pre("save", function (next) {
    if (this.isModified("image")) {
        this.image = `http://localhost:5000/uploads/${this.image}`
    }
    next();
})

const banner_model = new mongoose.model("banner_model", banner_schema);
module.exports = banner_model;