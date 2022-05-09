//initailly i want to create a schema 


const mongoose = require("mongoose")


const Register = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model("users",Register)