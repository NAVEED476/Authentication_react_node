const mongoose = require("mongoose")


const Register = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    confirm:{
        type:String,
        required:true
    }

}) 

module.exports = mongoose.model("registers",Register)