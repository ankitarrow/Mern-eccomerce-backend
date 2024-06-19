const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,
    mobile:Number,
    address:String,
    resetPasswordToken: {
        type: String,
        default: null
      },
      resetPasswordExpires: {
        type: Date,
        default: null
      },
},{
    timestamps : true
})


const userModel =  mongoose.model("user",userSchema)


module.exports = userModel