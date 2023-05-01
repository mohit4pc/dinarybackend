const User = require("../models/userModel")
const ErrorResponse = require("../utils/errorResponse")

// Sign Up Api
exports.signUp = async (req, res, next) => {
    const { email } = req.body;;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail is already Registred", 400))
    }
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            success: true,
            user,
            message: "User Create SuccessFully."
        })
    } catch (error) {
        next(error)
    }
}

// Sign In Api

exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return next(new ErrorResponse("Please add an E-mail !", 403))
        } if (!password) {
            return next(new ErrorResponse("Please add a Password !", 403))
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials !"), 403)
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Invalid Credentials !"), 403)
        }
        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken()
    res
        .status(codeStatus)
        .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({ success: true, token, user })
}

exports.logout = (req, res, next) => {
    res.clearCookie('token'),
        res.status(200).json({
            success: true,
            message: "Logout SuccessFully."
        })
}
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({
        success: true,
        user
    })
}