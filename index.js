const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })
const port = process.env.PORT;
require("./database/connection");
const cors = require("cors")
const category_router = require("./router/category_router");
const subcategory_router = require("./router/subcategory_router");
const admin_router = require("./router/admin_router");
const blog_router = require("./router/blog_router");
const testimonial_router = require("./router/testimonials_router")
const enquiry_router = require("./router/enquiry_router")

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
app.use("/category", category_router);
app.use("/subcategory", subcategory_router);
app.use("/blogs", blog_router)
app.use("/testimonials", testimonial_router)
app.use("/enquiry", enquiry_router)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})