const express = require("express");
const router = express.Router();
const category_model = require("../database/models/category");
const multer = require("multer");

//Using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage })

//Get all categories
router.get("/get_all_categories", async (req, res) => {
    try {
        const data = await category_model.find();
        res.json({ data: data, message: "success to get category data", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "unable to get categories", status: 0 });
    }
})

//Get One categories
router.post("/get_one_category", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.json({ message: "Invalid ID" })
        }
        const data = await category_model.findOne({ _id: id });
        res.json({ data: data, message: "success to get category data", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "unable to get category", status: 0 });
    }
})

//Create the Category
router.post("/create_category", upload.single("image"), async (req, res) => {
    try {
        const { category_name, category_slug, short_desc, meta_title, meta_desc, description } = req.body;
        let image;
        console.log(req.body);
        if (req.file) {
            image = req.file.filename;
        }
        if (!category_name || !category_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const isCateExist = await category_model.findOne({
            category_slug: category_slug.toLowerCase().split(" ").join("-")
        });

        if (isCateExist) {
            return res.json({ message: "Category Already exist", status: 0 });
        }

        const data = new category_model({ category_name, category_slug, short_desc, meta_title, meta_desc, description, image });
        await data.save();
        return res.json({ message: "Category created", status: 1 })

    } catch (err) {
        console.log(err)
        res.json({ message: "Unable to create category", status: 0 });
    }

    
})

//update category
router.post("/update_category", upload.single("image"), async (req, res) => {
    try {
        let { category_name, category_slug, short_desc, meta_title, meta_desc, description, id } = req.body;

        if (!category_name || !category_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const isCateExist = await category_model.findOne({
            category_slug: category_slug.toLowerCase().split(" ").join("-")
        });


        if (isCateExist && isCateExist._id != id) {
            return res.json({ message: "Category Already exist", status: 0 });
        }

        let image;
        if (req.file) {
            image = req.file.filename;
        }

        category_slug = category_slug.toLowerCase().split(" ").join("-")

        const data = await category_model.findByIdAndUpdate({ _id: id }, { category_name, category_slug, short_desc, meta_title, meta_desc, description, image });
        if (!data) {
            return res.json({ "message": "Unable to update category", status: 0 });
        }
        res.json({ message: "category updated successfully", status: 1 });


    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to update category", status: 0 });
    }
})

//delete category
router.post("/delete_category", async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.json({ message: "Delete category ", status: 0 });
        }
        const delete_category = await category_model.findByIdAndDelete({ _id: id });
        let data;
        if (delete_category) {
            data = await category_model.find({});
        }
        res.json({ message: "Deleted successfully", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to delete category", status: 0 });
    }
})

//status
router.post("/change_status", async (req, res) => {
    try {
        const id = req.body.id;
        const status = req.body.status;

        if (status === true) {
            await category_model.findByIdAndUpdate({ _id: id }, { status: false });
            const data = await category_model.find({});
            res.json({ message: "Category Deactivated", status: 1, data: data, activeStatus: 0 })
        } else {
            await category_model.findByIdAndUpdate({ _id: id }, { status: true });
            const data = await category_model.find({});
            res.json({ message: "Category Activated", status: 1, data: data, activeStatus: 1 })
        }

    } catch (err) {
        console.log(err);
    }
})


module.exports = router;