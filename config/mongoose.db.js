const mongoose = require("mongoose")

const ConnectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected sucessfully.")
    }
    catch(error){
        console.log("Fails to connect to DB",error)
    }
}

module.exports = {ConnectToDB}