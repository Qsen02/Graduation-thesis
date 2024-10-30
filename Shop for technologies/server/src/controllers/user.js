const { Router } = require("express");
const { checkUserId, getUserById, register, login, changePassword } = require("../services/user");
const { body, validationResult } = require("express-validator");
const { setToken } = require("../services/token");
const { isUser } = require("../middlewares/guard");

const userRouter = Router();

userRouter.post("/register",
    body("username").trim().isLength({ min: 3 }),
    body("email").trim().isLength({ min: 3 }).isEmail(),
    body("password").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    body("repass").trim().custom((value, { req }) => req.body.password == value),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Данните ти не са в правилен формат!");
            }
            const user = await register(fields.username, fields.password, fields.email);
            const token = setToken(user);
            res.json({
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                orderHistory: user.orderHistory,
                basket: user.basket,
                accessToken: token
            })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    async(req, res) => {
        const fields = req.body;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Данните ти не са в правилен формат!");
            }
            const user = await login(fields.username, fields.password);
            const token = setToken(user);
            res.json({
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                orderHistory: user.orderHistory,
                basket: user.basket,
                accessToken: token
            })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.get("/logout", isUser(), (req, res) => {
    res.status(200).json({ message: "Logout was successful" });
})

userRouter.put("/changePassword/:userId", isUser(),
    body("newPassword").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    async(req, res) => {
        const userId = req.params.userId;
        const newPassword = req.body.newPassword;
        const isValid = await checkUserId(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw new Error("Данните ти не са в правилен формат!");
            }
            const newUser = await changePassword(userId, newPassword);
            res.json(newUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.get("/:userId", async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId).lean();
    res.json(user);
})

module.exports = {
    userRouter
}