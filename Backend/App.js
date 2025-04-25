const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config()

const PORT = process.env.PORT || 5000

const {UserRouter} = require("./Routes/user.Routes")
const {CrimeReportRouter} = require("./Routes/crimeReport.Routes")
const {WitnessRouter} = require("./Routes/witness.Routes")
const {ConnectToDB} = require("./config/mongoose.db")
ConnectToDB()
app.use(cors())
app.use(express.json())

app.get("/test", async(req,res)=>{
    res.send("API healthy test")
})


app.use("/user",UserRouter)
app.use("/crimeReport",CrimeReportRouter)
app.use("/witness",WitnessRouter)

app.use((req,res)=>{
    res.status(404).json({message:"This request is not found."})
})


app.listen(PORT, ()=>{
    console.log("Server started",PORT)
})