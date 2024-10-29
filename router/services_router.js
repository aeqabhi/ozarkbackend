const express = require("express");
const router = new express.Router();
const service_model = require("../database/models/services");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


//GET ALL SERVICES
router.get("/get_all_services", async (req, res) => {
    try {
        const data = await service_model.find({});
        res.json({ message: "success to get services data", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to get services", status: 0 });
    }
})

// GET ONE  SERVICE 
router.post("/get_service_by_id", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await service_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get service data", status: 0 })
        }
        res.json({ message: "success to get service data", status: 1, data: data })

    } catch (err) {
        console.log(err);
        res.json({ message: "Unable to get services", status: 0 });
    }
})

//CREATE ServiceS
router.post("/create_service", upload.single("image"), async (req, res) => {
    try {
        let { service_name, service_url, short_desc, meta_title, meta_desc, description } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename;
        }

        console.log(req.body);
        console.log(req.file);

        if (!service_name || !service_url || service_name == "undefined" || service_url == "undefined") {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const isServiceExist = await service_model.findOne({
            service_url: service_url.toLowerCase().split(" ").join("-")
        })

        if (isServiceExist) {
            return res.json({ message: "Service already exist", status: 0 });
        }


        service_url = service_url.toLowerCase().split(" ").join("-");
        const data = new service_model({ service_name, service_url, short_desc, meta_title, meta_desc, description, image })

        await data.save();
        res.json({ message: "service created", status: 1 });
    } catch (err) {
        console.log(err);
    }
})


//UPDATE SERVICE
router.post("/update_service", upload.single("image"), async (req, res) => {
    try {
        let { service_name, service_url, short_desc, meta_title, meta_desc, description, id } = req.body;

        //check empty
        if (!service_name || !service_url) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        console.log(req.body);
        //check duplicity
        service_url = service_url.toLowerCase().split(" ").join("-");
        const isServiceExist = await service_model.findOne({
            service_url: service_url
        })

   
        if (isServiceExist && isServiceExist._id != id) {
            return res.json({ message: "Service Already exist", status: 0 });
        }

        let data;
        if (req.file) {
            const image = req.file.filename;
            data = await service_model.findByIdAndUpdate({ _id: id }, { service_name, service_url, short_desc, meta_title, meta_desc, description, image });
        } else {
            data = await service_model.findByIdAndUpdate({ _id: id }, { service_name, service_url, short_desc, meta_title, meta_desc, description });
        }


        const updateData = await service_model.find({});
        res.json({ message: "Updated successfully", status: 1, data: updateData });


    } catch (err) {
        console.log(err);
    }
})

//Delete services
router.post("/delete_service", async (req, res) => {
    try {
        const { id } = req.body;
        const data = await service_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Service does not exist", status: 0 });
        }
        const dataAfterDelete = await service_model.find({});
        res.json({ message: "Deleted successfully", status: 1, data: dataAfterDelete });
    } catch (err) {
        console.log(err);
    }
})

//Change status
router.post("/change_status", async (req, res) => {
    try {
        const id = req.body.id;
        const status = req.body.status;

        if (status === true) {
            await service_model.findByIdAndUpdate({ _id: id }, { status: false });
            const data = await service_model.find({});
            res.json({ message: "Category Deactivated", status: 1, data: data, activeStatus: 0 })
        } else {
            await service_model.findByIdAndUpdate({ _id: id }, { status: true });
            const data = await service_model.find({});
            res.json({ message: "Category Activated", status: 1, data: data, activeStatus: 1 })
        }

    } catch (err) {
        console.log(err);
    }
})




module.exports = router;