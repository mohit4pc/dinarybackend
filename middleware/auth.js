const ErrorResponse = require("../utils/errorResponse");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return new next("Not Authenticated to access this route", 401)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return new next("Not Authenticated to access this route", 401)
    }
}
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse("Access Denied, You must an Admin !", 401))
    }
    next()
}