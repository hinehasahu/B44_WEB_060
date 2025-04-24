const express = require("express")
const { AuthenticationMW } = require("../Middleware/Auth.middleware")
const { UserModel } = require("../Models/user.model")
const {CrimeReportModel} = require("../Models/crimeReport.model" || "../Models/CrimeReport.model" )
const CrimeReportRouter = express.Router()
CrimeReportRouter.get("/healthy",(req,res)=>{
    res.send("crimeReport test passed")
})
CrimeReportRouter.get("/all", AuthenticationMW(["Admin", "Lawyer", "Citizen"]), async (req, res) => {
    try {
        const userID = req.userID; // middleware adds `userID` to req
        const userRole = req.role; // middleware adds `role` to req
        const user = await UserModel.findById(userID);
        if (userRole === "Admin") {
            const reports = await CrimeReportModel.find();
            return res.status(200).json({message: "All Crime Reports (Admin access)",reports});
        }
        if (userRole === "Lawyer" || userRole === "Citizen") {
            const userReports = await CrimeReportModel.find({ reportedBy: userID });
            if (userReports.length > 0) {
                return res.status(200).json({message: `User: ${user.name}. All your Crime Reports.`,reports: userReports});
            }
            return res.status(203).json({ message: "No crime reports found for this user." });
        }
        return res.status(403).json({ message: "Unauthorized role." });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error });
    }
});


CrimeReportRouter.post("/registerCrime", AuthenticationMW(["Citizen"]), async (req, res) => {
    try {
        const userID = req.userID; // middleware adds `userID` to req
        // const userRole = req.role; // middleware adds `role` to req
        const user = await UserModel.findOne({_id:userID});
        if(user){
            const userReports = await CrimeReportModel.create({ reportedBy: userID, ...req.body });
            return res.status(200).json({message: `User: ${user.name}. Crime Reports registered.`,reports: userReports});
        }
        return res.status(404).json({message: `User not found and fails to register crime.`});

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error });
    }
});


CrimeReportRouter.put("/updateReport/:id", AuthenticationMW(["Citizen"]), async (req, res) => {
    try {
        const caseID = req.params.id
        const userID = req.userID; // middleware adds `userID` to req
        // const userRole = req.role; // middleware adds `role` to req
        const user = await UserModel.findOne({_id:userID});
        if(user){
            const updatedReport = await CrimeReportModel.updateOne({_id:caseID},{ $set:req.body });
            return res.status(200).json({message: `User: ${user.name}. Report updated sucessfully.`,reports: updatedReport});
        }
        return res.status(404).json({message: `User not found or fails to make update report.`});

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error });
    }
});

module.exports = {CrimeReportRouter}
