const express = require("express");
const router = express.Router();
const multer = require('multer');
const story_model = require("../database/models/stories");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post("/story", upload.single("image"), async (req, res) => {
    try {
        const { heading, content, id } = req.body;
        if (!heading || !content) {
            return res.json({ message: "please fill all the fields", status: 0 })
        }

        if (req.file) {
            const image = req.file.filename;
            const imageURL = `http://localhost:5000/uploads/${image}`
            await story_model.findByIdAndUpdate({ _id: id }, { heading, content, image: imageURL })
        } else {
            await story_model.findByIdAndUpdate({ _id: id }, { heading, content })
        }

        return res.json({ message: "Story submited successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ message: "Server error !", error: err, status: 0 });
    }
})

router.get("/story", async (req, res) => {
    try {
        const data = await story_model.findOne();
        if (!data) {
            return res.json({ message: "Unable to get story data", status: 0 })
        }
        console.log(data);
        res.json({ message: "Get story data successfully", status: 1, data: data })
    } catch (err) {
        res.json({ message: "Server error !", error: err, status: 0 });
    }
})


module.exports = router;