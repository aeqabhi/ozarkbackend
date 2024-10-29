const mongoose = require("mongoose");

const story_schema = new mongoose.Schema({
    heading: {
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
    }
})

const story_model = new mongoose.model("story_model", story_schema);
module.exports = story_model;
