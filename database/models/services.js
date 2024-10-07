const mongoose = require("mongoose");

const services_schema = new mongoose.Schema({
    service_name: {
        type:String,
        default:null
    },
    service_url: {
        type:String,
        default:null
    },
    short_description: {
        type:String,
        default:null
    },
    image: {
        type:String,
        default:null
    },
    title: {
        type:String,
        default:null
    },
    meta_description:{
        type:String,
        default:null
    },
    description: {
        type:String,
        default:null
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const services_model = new mongoose.model("services_model", services_schema);
module.exports = services_model;
