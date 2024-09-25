const express = require("express");
const router = express.Router();
const admin_model = require("../database/models/admin")

//Admin Login
router.post("/admin-login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "Email and password are required", status: 0 });
        }
        const isAdmin = await admin_model.findOne({ email, password });
        if (!isAdmin) {
            return res.json({ message: "Invalid email or password", status: 0 });
        }
        const token = await isAdmin.generateToken()
        res.json({ message: "Login successfull", status: 1, token: token });
    } catch (err) {
        console.log(err);
        res.json({ message: "Login failed", status: 0 });
    }
})


//Reset Password
router.post("/reset_password", async (req, res) => {
    try {
        const { email, password, confirm_password,flag } = req.body;

        if (flag == 1) {
            if (!email) {
                return res.json({ message: "Email is required", status: 0 });
            }

            const emailExist = await admin_model.findOne({ email: email });
            if (!emailExist) {
                return res.json({ message: "Email not found", status: 0 });
            }
            return res.json({ message: "Email found", status: 1 })
        } else {
            const emailExist = await admin_model.findOne({ email: email });
            const id = emailExist._id;
            if (!password || !confirm_password) {
                return res.json({ message: "Both password and confirmation are required", status: 0 });
            }

            if (password !== confirm_password) {
                return res.json({ message: "Passwords do not match", status: 0 });
            }

            const updatePass = await admin_model.findByIdAndUpdate(id, { password: password });
            if (!updatePass) {
                return res.json({ message: "Failed to reset password", status: 0 });
            }
            res.json({ message: "Password reset successfully", status: 1 });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 0 });
    }
});


module.exports = router;