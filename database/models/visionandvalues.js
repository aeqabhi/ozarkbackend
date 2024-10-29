const mongoose = require("mongoose");

const vision_values_schema = new mongoose.Schema({
    vision_heading: {
        type: String,
        default: null
    },
    vision_content: {
        type: String,
        default: null
    },
    values_heading: {
        type: String,
        default: null
    },
    values_content: {
        type: String,
        default: null
    }
})

const vision_values_model = new mongoose.model("vision_values_model", vision_values_schema);
module.exports = vision_values_model;