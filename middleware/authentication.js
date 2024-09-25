const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


const Authentication = (req, res, next) => {
    try {
        const token = req.header("Authorization");  
        if (!token) {
            res.json({ message: "Authentication error", status: 0 })
        }

        const isAuth = jwt.verify(token, SECRET_KEY);
        if (!isAuth) {
            res.json({ message: "Authentication error", status: 0 })
        }
        next();

    } catch (err) {

        res.json({ message: err.message, status: 0 })
        next();
    }
}

module.exports = Authentication;