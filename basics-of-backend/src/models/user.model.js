const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config();


const userSchema = mongoose.Schema({
    username:{
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: [6, 'password must contains 6 characters']
    },
    refreshToken: {
        type: String
    },
    
}, {
    timestamps: true
})


userSchema.pre('save', async function(){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}





const User = mongoose.model('User', userSchema)
module.exports = User

