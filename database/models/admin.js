const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const admin_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

admin_schema.methods.generateToken = async function () {
    try {
        const token = await jwt.sign({ email: this.email }, SECRET_KEY, {
            expiresIn: "15d"
        });
        // console.log(token);
        return token;
    } catch (err) {
        console.log(err);
    }
}

const admin_model = new mongoose.model("admin_model", admin_schema);
module.exports = admin_model;