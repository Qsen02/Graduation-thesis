const { Users } = require("../models/user");
const bcrypt = require("bcrypt");

async function register(username, password, email) {
    const userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("Потребител с това име вече съществува!");
    }
    const userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("Потребител с този имейл вече съществува!");
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
        throw new Error("Името или паролата не съответстват!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Името или паролата не съответстват!");
    }
    return user;
}

async function changePassword(userId, newPassword) {
    const user = await Users.findById(userId).lean();
    const isPasswordExist = await bcrypt.compare(newPassword, user.password);
    if (isPasswordExist) {
        throw new Error("Новата парола не може да бъде старата!");
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
    const user = Users.findById(userId).populate("basket").populate("orderHistory");
    return user;
}

async function clearBasket(userId) {
    await Users.findByIdAndUpdate(userId, { $set: { basket: [] } });
}

async function editUser(userId, username, email) {
    await Users.findByIdAndUpdate(userId, {
        $set: {
            username: username,
            email: email
        }
    });
}

module.exports = {
    getUserById,
    login,
    register,
    changePassword,
    checkUserId,
    clearBasket, editUser
}