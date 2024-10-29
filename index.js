const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })
const port = process.env.PORT;
require("./database/connection");
const cors = require("cors")

const admin_router = require("./router/admin_router");
const blog_router = require("./router/blog_router");
const testimonial_router = require("./router/testimonials_router")
const enquiry_router = require("./router/enquiry_router")
const service_router = require("./router/services_router");
const banner_router = require("./router/banner_router");
const story_router = require("./router/story_router");
const team_router = require("./router/team_router")
const vision_values_router = require("./router/vision_values_router")

//Middlewares
app.use(cors())
app.use(express.json())
const Authentication = require("./middleware/authentication");
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send("HELLO FROM OZARK...")
})

//routers
app.use("/admin", admin_router)
app.use("/services", service_router)
app.use("/blogs", blog_router)
app.use("/testimonials", testimonial_router)
app.use("/enquiry", enquiry_router)
app.use("/banners", banner_router)
app.use("/about", story_router)
app.use("/about", team_router)
app.use("/about", vision_values_router)



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})