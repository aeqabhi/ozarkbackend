const express = require("express");
const vision_values_model = require("../database/models/visionandvalues");
const router = express.Router();

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     }
// })

// const upload = multer({ storage: storage })

router.post("/vision_values", async (req, res) => {
    try {
        const { vision_heading, vision_content, values_heading, values_content, _id } = req.body;

        console.log(req.body)
        if (!vision_heading || !vision_content || !values_heading || !values_content) {
            return res.json({ message: "please fill all the fields", status: 0 })
        }

        // if (req.file) {
        //     const image = req.file.filename;
        //     const imageURL = `http://localhost:5000/uploads/${image}`
        //     await story_model.findByIdAndUpdate({ _id: id }, { heading, content, image: imageURL })
        // } else {
        //     await story_model.findByIdAndUpdate({ _id: id }, { heading, content })
        // }

        await vision_values_model.findByIdAndUpdate({ _id: _id }, { vision_heading, vision_content, values_heading, values_content });
        return res.json({ message: "Vision and values submited successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ message: "Server error !", error: err, status: 0 });
    }
})

router.get("/vision_values", async (req, res) => {
    try {
        const data = await vision_values_model.findOne();
        if (!data) {
            return res.json({ message: "Unable to get vision and values data", status: 0 })
        }
        res.json({ message: "Get data successfully", status: 1, data: data })
    } catch (err) {
        res.json({ message: "Server error !", error: err, status: 0 });
    }
})


module.exports = router;