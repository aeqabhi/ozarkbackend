const mongoose = require("mongoose");

const team_schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    designation: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    status:{
        type:Boolean,
        default:true
    }
})

team_schema.pre("save", function (next) {
    if (this.isModified("image")) {
        this.image = `http://localhost:5000/uploads/${this.image}`
    }
    next()
})

const team_model = new mongoose.model("team_model", team_schema);
module.exports = team_model;
