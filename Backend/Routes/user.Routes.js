const express = require("express")
require("dotenv").config()

const { UserModel } = require("../Models/user.model")
const UserRouter = express.Router()

// const nodemailer = require("nodemailer")

const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

UserRouter.get("/healthy",async(req,res)=>{
    res.send("user router test passed.")
})


UserRouter.post("/signup", async(req,res)=>{
    try {
        const {email,password} = req.body 
        const user = await UserModel.findOne({email:email})
        if(user){
            return res.status(401).json({message:"Already register, you can signin-now."})
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        await UserModel.create({...req.body, password:hashedPassword})
        return res.status(200).json({message:"Signup sucessfully."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong while makeing signup req.",error})
    }
})


UserRouter.post("/signin", async(req,res)=>{
    try {
        const {email,password} = req.body 
        const user = await UserModel.findOne({email})
        if(! user){
            return res.status(401).json({message:"Signup first, you can able to signin."})
        }
        const isMatch = await bcrypt.compare(password, user.password) 
        if(! isMatch){
            return res.status(403).json({message:"Password not match, please re-confirm."})
        }
        const token = jwt.sign({userID:user._id, role:user.role},process.env.SECURED_KEY, {expiresIn:"1d"})
        const refreshToken = jwt.sign({userID:user._id, role:user.role},process.env.SECURED_KEY_2, {expiresIn:"7d"})
        // console.log(user)
        return res.status(200).json({message:"Signin sucessfully",user,token,refreshToken})
    } 
    catch (error) {
        return res.status(500).json({message:"Something went wrong while makeing signin req.",error})
    }
})



module.exports = {UserRouter}


// UserRouter.post("/reset-password", async(req,res)=>{
//     try {

        
//         // nodemailer.createTransport({
//         //     host: "smtp.gmail.com",
//         //     port: 587,
//         //     secure: false, // true for port 465, false for other ports
//         //     auth: {
//         //       user: process.env.GOOGLE_EMAIL,
//         //       pass: process.env.GOOGLE_PASSWORD,
//         //     },
//         //   });

//         // await transporter.sendMail({
//         //     from: `JustiGo: Hi ${user.name}`, // sender address
//         //     to: `${user.email}`, // list of receivers
//         //     subject: "Hello ✔", // Subject line
//         //     text: "Hello world?", // plain text body
//         //     html: "<b>Hello world?</b>", // html body
//         // });
        
//     } catch (error) {
//         return res.status(500).json({message:"Something went wrong while makeing reset-password req.",error})
//     }
// })