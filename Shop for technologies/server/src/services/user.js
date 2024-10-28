const { Users } = require("../models/user");
const bcrypt = require("bcrypt");

async function register(username, password, email) {
    const userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("User with this username already exist!");
    }
    const userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("User with this email already exist!");
    }
    const newUser = new Users({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    })
    await newUser.save();
    return newUser;
}

async function login(username, password) {
    const user = await Users.findOne({ username }).lean();
    if (!user) {
        throw new Error("Username or password don't match!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Username or password don't match!");
    }
    return user;
}

async function changePassword(userId, newPassword) {
    const user = await Users.findById(userId).lean();
    const isPasswordExist = await bcrypt.compare(newPassword, user.password);
    if (isPasswordExist) {
        throw new Error("New password can't be the old password!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.findByIdAndUpdate(userId, { $set: { password: hashedPassword } });
    return user;
}

async function checkUserId(userId) {
    const users = await Users.find().lean();
    const isValid = users.find(el => el._id.toString() == userId);
    if (isValid) {
        return true;
    }
    return false;
}

function getUserById(userId) {
    const user = Users.findById(userId);
    return user;
}

module.exports = {
    getUserById,
    login,
    register,
    changePassword,
    checkUserId
}