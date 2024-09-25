const express = require("express");
const router = express.Router();
const enquiry_model = require("../database/models/enquiry")


router.get("/get_enquiry", async (req, res) => {
    try {
        const data = await enquiry_model.find({});
        res.json({ data: data, message: "success to get enquiry data", status: 1 });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;