const express = require("express");
const router = express.Router();
const subcategory_model = require("../database/models/subcategory");

//Get all subcategories
router.get("/get_all_subcategories", async (req, res) => {
    try {
        const data = await subcategory_model.find();
        res.json({ data: data, message: "success to get subcategory data", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "unable to get subcategories", status: 0 });
    }
})

//get the one subcategory
router.post("/get_one_subcategories", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await subcategory_model.findOne({ _id: id });
        res.json({ data: data, message: "success to get subcategory data", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "unable to get subcategories", status: 0 });
    }
})

//Create the subCategory
router.post("/create_subcategory", async (req, res) => {
    try {
        const { subcategory_name, subcategory_slug, category_id } = req.body;
        // console.log(req.body);
        if (!subcategory_name || !subcategory_slug || !category_id) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = new subcategory_model({ subcategory_name, subcategory_slug, category_id });
        await data.save();
        return res.json({ message: "subcategory created", status: 1 })

    } catch (err) {
        console.log(err)
        res.json({ message: "unable to create subcategory", status: 0 });
    }
})

//update subcategory
router.post("/update_subcategory", async (req, res) => {
    try {
        const { subcategory_name, subcategory_slug, category_id, id } = req.body;
        if (!subcategory_name || !subcategory_slug, !category_id) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = await subcategory_model.findByIdAndUpdate({ _id: id }, { subcategory_name, subcategory_slug, category_id });
        await data.save();
        res.json({ message: "subcategory updated successfully", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "unable to update subcategory", status: 0 });
    }
})

//delete subcategory
router.post("/delete_subcategory", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ message: "Delete subcategory", status: 0 });
        }
        const subcategory_data = await subcategory_model.findByIdAndDelete({ _id: id });
        let data;
        if (subcategory_data) {
            data = await subcategory_model.find({});
        }
        res.json({ message: "Deleted successfully", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to delete subcategory", status: 0 });
    }
})


module.exports = router;