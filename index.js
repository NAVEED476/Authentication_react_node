const express = require("express")
const mongoose = require("mongoose")
const Register = require("./model")
var jwt = require('jsonwebtoken')

const app = express();

mongoose.connect("mongodb+srv://naveed:naveed@cluster0.tkhg8.mongodb.net/test").then((res) => console.log("db connected")).catch("not connected")




app.use(express.json())


app.post("/add", async (req, res) => {

    try {
        const { name, email, password, confirm} = req.body;
        let exist = await Register.findOne({ email })
        if (exist) {
            return res.status(400).send("user already exist")
        }
        let namecheck = new Register.findOne({name})
        if(namecheck){
            return res.status(400).send("username already exists")
        }
        if (password !== confirm) {
            return res.status(400).send("passwords or not matching")
        }
        
            let newuser = new Register({
                name: name,
                email: email,
                password: password,
                confirm: confirm,
            })
        

        await newuser.save()
        res.status(200).send("user register successfull")

    }
    catch (err) {
        console.log(err)
    }

})

app.post("/login",async(req,res)=>{
    let {email,password} = req.body;

    let exist = await Register.findOne({email})

    if(!exist){
        return res.status(400).send("email is not exist")
    }
    if(exist.password !== password){
        return res.status(400).send("invvalid password")
    }

    const payload = {
        user:{
            id:exist.id
        }
    }

    jwt.sign(payload,"naveed",(err,token)=>{
        if(err) throw err;
        return res.json({token})
    })




})

app.get("/",async (req,res)=>{
    return res.send("hello")
})


app.listen(1234, () => {
    console.log("app is runnig")
})