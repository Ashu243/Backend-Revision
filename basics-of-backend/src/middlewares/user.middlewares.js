const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken')

const VerifyUser = asyncHandler(async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')) throw new ApiError(401, "Unauthorized User")
    
    
        const token = authHeader.split("Bearer ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decoded._id).select("-password")
        if(!user) throw new ApiError(401, "Invalid Access Token")
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Token Expired or Invalid")
    }

})

module.exports = {VerifyUser}