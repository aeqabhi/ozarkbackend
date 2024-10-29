const express = require("express");
const router = express.Router();
const multer = require('multer');
const team_model = require("../database/models/team");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

//Create team 
router.post("/add_team_member", upload.single("image"), async (req, res) => {
    try {
        const { name, designation } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename
        }

        console.log(req.body);

        if (!name || !designation || !image) {
            return res.json({ message: "Please fill all the fields.", status: 0 })
        }

        const data = new team_model({ name, designation, image });
        await data.save();

        res.json({ message: "Member added successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

// Get All team member 
router.get("/get_all_team_members", async (req, res) => {
    try {
        const data = await team_model.find();
        if (!data) {
            return res.json({ message: "Unable to fetch team data", status: 0 });
        }
        res.json({ message: "Get team Data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

// Get member By Id
router.post("/get_team_member_by_id", async (req, res) => {
    try {
        const { id } = req.body;

        const data = await team_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to fetch team data", status: 0 });
        }
        console.log(data);
        res.json({ message: "Get team Data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

//Update member
router.post("/update_team_member", upload.single("image"), async (req, res) => {
    try {
        const { name, designation, id } = req.body;


        if (!name || !designation ) {
            return res.json({ message: "Please fill all the fields.", status: 0 })
        }
        if (req.file) {
            const image = req.file.filename;
            const imageURL = `http://localhost:5000/uploads/${image}`
            await team_model.findByIdAndUpdate({ _id: id }, { name, designation, image: imageURL })
        } else {
            await team_model.findByIdAndUpdate({ _id: id }, { name, designation })
        }

        return res.json({ message: "team member updated successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ error: err, message: "Server error !", status: 0 });
    }
})

//Delete member
router.post("/delete_team_member", async (req, res) => {
    try {
        const { id } = req.body;
        const deleteMember = await team_model.findByIdAndDelete({ _id: id });
        if (!deleteMember) {
            return res.json({ message: "Unable to delete team member", status: 0 });
        }
        const data = await team_model.find({});
        res.json({ message: "Team member Deleted", status: 1, data: data });
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
            changeStatus = await team_model.findByIdAndUpdate({ _id: id }, { status: true });
        } else {
            changeStatus = await team_model.findByIdAndUpdate({ _id: id }, { status: false });
        }
        if (!changeStatus) {
            res.json({ message: "Unable to change status", status: 0 })
        }
        const data = await team_model.find({});
        res.json({ message: "Status changed.", status: 1, data: data })
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;