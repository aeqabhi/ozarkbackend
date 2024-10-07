const express = require("express");
const router = express.Router();
const blogs_model = require("../database/models/blogs");
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

//Create Blog
router.post("/create-blog", upload.single("image"), async (req, res) => {
    try {

        let { heading, blog_url, blog_date, title, short_description, meta_description, description } = req.body;

        let image;
        if (req.file) {
            image = req.file.filename;
        }
        console.log(req.body);
        if (!heading || !blog_url) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const isExist = await blogs_model.findOne({
            blog_url: blog_url.toLowerCase().split(" ").join("-")
        });
        if (isExist) {
            return res.json({ message: "Blog already exist !", status: 0 });
        }

        blog_url = blog_url.toLowerCase().split(" ").join("-");
        const data = await new blogs_model({ heading, blog_url, blog_date, image, title, short_description, meta_description, description })
        await data.save();
        res.json({ message: "Blog created", status: 1 });
    } catch (err) {
        res.json({ message: "Unable to create blog : " + err, status: 0 });
    }
})


//Get all Blog_data
router.get("/get_blogs", async (req, res) => {
    try {
        const data = await blogs_model.find();
        res.json({ message: "Get blogs data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

//Get one Blogs_data
router.post("/get_blog_byId", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await blogs_model.findOne({ _id: id });
        res.json({ message: "Get blog", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})
//Get Activated Blogs_data
router.get("/get_activated_blogs", async (req, res) => {
    try {
        const data = await blogs_model.find({ status: true });
        res.json({ message: "Get activated blogs", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

//Update blog
router.post("/update_blog", upload.single("image"), async (req, res) => {
    try {
        const { heading, blog_url, blog_date, title, short_description, meta_description, description, id } = req.body;

        let updateData = {
            heading, blog_url, blog_date, title, short_description, meta_description, description
        };

        const isExist = await blogs_model.findOne({
            blog_url: updateData.blog_url.toLowerCase().split(" ").join("-")
        });
        if (isExist && isExist._id != id) {
            return res.json({ message: "Blog already exist !", status: 0 });
        }
        updateData.blog_url = updateData.blog_url.toLowerCase().split(" ").join("-");

        if (req.file) {
            updateData.blog_image = req.file.filename;
        }



        const data = await blogs_model.findByIdAndUpdate({ _id: id }, updateData);
        if (!data) {
            return res.json({ message: "Blog not found", status: 0 })
        }
        res.json({ message: "Blog updated successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


//delete blog
router.post("/delete_blog", async (req, res) => {
    try {
        const id = req.body.id;
        const blog = await blogs_model.findById({ _id: id });
        if (!blog) {
            return res.status(404).send({ message: "Blog not found", status: 0 });
        }
        const delete_blog = await blogs_model.findByIdAndDelete({ _id: id });
        let data;
        if (delete_blog) {
            data = await blogs_model.find({});
        }
        res.status(200).send({ message: "Blog deleted successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


//Activate of deactivate
router.post("/change_status", async (req, res) => {
    try {
        const status = req.body.status;
        const id = req.body.id;

        if (status === true) {
            await blogs_model.findByIdAndUpdate({ _id: id }, { status: false })
            const data = await blogs_model.find({});
            res.json({ message: "Blog Deactivated", status: 1, data: data, activeStatus: 0 })
        } else {
            await blogs_model.findByIdAndUpdate({ _id: id }, { status: true })
            const data = await blogs_model.find({});
            res.json({ message: "Blog Activated", status: 1, data: data, activeStatus: 1 })
        }


    } catch (err) {
        console.log(err);
    }
})


module.exports = router;