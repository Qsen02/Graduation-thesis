const jwt = require("jsonwebtoken");

const secret = "Very secret json web token";

function setToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        password: user.password,
        email: user.password,
        isAdmin: user.isAdmin
    }

    const token = jwt.sign(payload, secret, { expiresIn: "3d" });
    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, secret);

    return payload;
}

module.exports = {
    setToken,
    verifyToken
}