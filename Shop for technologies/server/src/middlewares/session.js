const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        const token = req.headers["x-authorization"];
        if (token) {
            try {
                const payload = verifyToken(token);
                req.user = payload;
            } catch (err) {
                res.status(403).json({ message: "You don't have credentials! Please login or register." });
                return;
            }
        }
        next();
    }
}
module.exports = {
    session
}