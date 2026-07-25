const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const generateAccessAndRefreshToken = async (user) => {

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateAccessToken()

    return { accessToken, refreshToken }

}

const Register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const isUserExists = await User.findOne({ email })

    if (isUserExists) throw new ApiError(400, 'User Already Exists')

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password
    })

    

    return res
        .status(200)
        .json(
            new ApiResponse(200, "user registered successfully", user)
        )
        
})


const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) throw new ApiError(400, "All fields are required")

    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, "user not found")

    const isMatch = await user.comparePassword(password)

    if (!isMatch) throw new ApiError(400, "email or password is incorrect")

    const loggedInUser = await User.findById( user._id ).select("-password")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(loggedInUser)

    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "logged In successful", loggedInUser, accessToken)
    )

})

const getUser = asyncHandler(async(req, res)=>{
    const search = req.query.search
    if(!search || search.length==0) throw new ApiError(400, "Search value is required")

    const user = await User.find({
        username: {$regex: search, $options: 'i'}
    })
    .limit(10)
    .select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "user fetched successfully", user)
    )

})



module.exports = { Register, Login, getUser }