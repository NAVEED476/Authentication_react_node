const mongoose = require("mongoose")
const express = require("express")
const register = require("./model1")

const app = express()



mongoose.connect("mongodb+srv://naveed:naveed@cluster0.tkhg8.mongodb.net/test").then(res => console.log("db connected")).catch("not connected")

app.use(express.json())

app.post("/post", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await register.findOne({ name })
        const email_exist = await register.findOne({ email })
        if (exist) {
            return res.status(400).send("user already exists")
        }
        if (email_exist) {
            return res.status(400).send("email is alredy present")
        }


        let newuser = new register({
            name: name,
            email: email,
            password: password
        })

        await newuser.save()
        return res.status(200).send("user registration is successful")
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
})



app.listen(2345, () => {
    console.log("listening port 2345")
})