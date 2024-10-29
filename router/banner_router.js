const express = require("express");
const router = express.Router();
const banner_model = require("../database/models/banner")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

//Create Banner
router.post("/create_banner", upload.single("image"), async (req, res) => {
    try {
        const { heading, content, title } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename
        }

        if (!heading || !content || !title || !image) {
            return res.json({ message: "Please fill all the fields.", status: 0 })
        }

        const data = new banner_model({ heading, title, content, image });
        await data.save();

        res.json({ message: "Banner created successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

// Get All Banners 
router.get("/get_all_banners", async (req, res) => {
    try {
        const data = await banner_model.find();
        if (!data) {
            return res.json({ message: "Unable to fetch banner data", status: 0 });
        }
        res.json({ message: "Get Banner Data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

// Get Banner By Id
router.post("/get_banner_by_id", async (req, res) => {
    try {
        const { id } = req.body;

        const data = await banner_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to fetch banner data", status: 0 });
        }
        res.json({ message: "Get Banner Data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

//Update Banner
router.post("/update_banner", upload.single("image"), async (req, res) => {
    try {
        const { heading, content, title, id } = req.body;


        if (!heading || !content || !title) {
            return res.json({ message: "Please fill all the fields.", status: 0 })
        }
        if (req.file) {
            const image = req.file.filename;
            const imageURL = `http://localhost:5000/uploads/${image}`
            await banner_model.findByIdAndUpdate({ _id: id }, { heading, content, title, image: imageURL })
        } else {
            await banner_model.findByIdAndUpdate({ _id: id }, { heading, content, title })
        }

        return res.json({ message: "Banner updated successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

//Delete Banner
router.post("/delete_banner", async (req, res) => {
    try {
        const { id } = req.body;
        const deleteBanner = await banner_model.findByIdAndDelete({ _id: id });
        if (!deleteBanner) {
            return res.json({ message: "Unable to delete Banner", status: 0 });
        }
        const data = await banner_model.find({});
        res.json({ message: "Banner Deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})


//change_status
router.post("/change_status", async (req, res) => {
    try {
        const { id, status } = req.body;
        let changeStatus;
        if (status == false) {
            changeStatus = await banner_model.findByIdAndUpdate({ _id: id }, { status: true });
        } else {
            changeStatus = await banner_model.findByIdAndUpdate({ _id: id }, { status: false });
        }
        if (!changeStatus) {
            res.json({ message: "Unable to change status", status: 0 })
        }
        const data = await banner_model.find({});
        res.json({ message: "Status changed.", status: 1, data: data })
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;