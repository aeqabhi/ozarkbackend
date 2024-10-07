const express = require("express");
const testimonials_model = require("../database/models/testimonials");
const router = express.Router();
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

//Create testimonials
router.post("/create_testimonial", upload.single("image"), async (req, res) => {
    try {
        const { name, designation, content } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename;
        }

        if (!name || !designation || !content || !image) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }

        const isExist = await testimonials_model.findOne({
            name: name.toLowerCase()
        });
        if (isExist) {
            return res.json({ message: "Already exist", status: 0 })
        }

        const data = new testimonials_model({ name, designation, content, image })
        await data.save();
        res.json({ message: "Testimonial created", status: 1 })
    } catch (err) {
        console.log(err);
    }
})

//Get Testimonials
router.get("/get_testimonials", async (req, res) => {
    try {
        const data = await testimonials_model.find();
        res.json({ message: "Successfully get testimonials data", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
})

//Get One Testimonial
router.post("/get_one_testimonials", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonials_model.findOne({ _id: id });
        res.json({ message: "Successfully get testimonials data", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
})

//update Testimonials
router.post("/update_testimonials", upload.single("image"), async (req, res) => {
    try {

        const { name, designation, content, id } = req.body;
        if (!name || !designation || !content) {
            return res.json({ "message": "Please provide all the fields", status: 0 });
        }
        if (req.file) {
            const image = req.file.filename;
            const data = await testimonials_model.findByIdAndUpdate({ _id: id }, { name, designation, content, image });
            if (!data) {
                return res.json({ "message": "Unable to update testimonials", status: 0 });
            }
            res.json({ message: "testimonials updated successfully", status: 1 });
        } else {
            const data = await testimonials_model.findByIdAndUpdate({ _id: id }, { name, designation, content });
            if (!data) {
                return res.json({ "message": "Unable to update testimonials", status: 0 });
            }
            res.json({ message: "testimonials updated successfully", status: 1 });
        }

    } catch (err) {
        console.log(err)
        res.json({ "message": "Unable to update testimonials", status: 0 });
    }
})


// Delete Testimonials 
router.post("/delete_testimonials", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonials_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete testimonials", status: 0 })
        }
        const newData = await testimonials_model.find({});
        res.json({ message: "deleted successfully", status: 1, data: newData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to delete testimonials", status: 0 })
    }
})


//change status
router.post("/change_status", async (req, res) => {
    try {
        const { id } = req.body;
        const { status } = req.body;

       

        if (status === true) {
            await testimonials_model.findByIdAndUpdate({ _id: id }, { status: false });
            const data = await testimonials_model.find({});
            res.json({ message: "Testimonial Deactivated", status: 1, data: data });
        } else {
            await testimonials_model.findByIdAndUpdate({ _id: id }, { status: true });
            const data = await testimonials_model.find({});
            res.json({ message: "Testimonial Activated", status: 1, data: data });
        }
    } catch (err) {
        console.log(err);
    }

})

module.exports = router;