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



CrimeReportRouter.get("/case/:id", AuthenticationMW(["Admin", "Lawyer", "Citizen"]), async (req, res) => {
    try {
        const userID = req.userID; // middleware adds `userID` to req
        const caseID = req.params.id; // caseID from params
        const user = await UserModel.findById(userID);
        const ReportedCase = await CrimeReportModel.findOne({_id:caseID})
        if (ReportedCase) {
                return res.status(200).json({message: `User: ${user.name}, Case ID: ${caseID}. Your Crime Reports.`,reports: ReportedCase});
            }
        else{
            return res.status(203).json({ message: "No crime reports register yet by you." });
        }
    } 
        catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error });
    }
});


CrimeReportRouter.post("/registerCrime", AuthenticationMW(["Citizen"]), async (req, res) => {
    try {
        const userID = req.userID; // middleware adds `userID` to req
        // const userRole = req.role; // middleware adds `role` to req
        const user = await UserModel.findOne({_id:userID});
        if(user){
            const isCaseRegisteredAlready = await CrimeReportModel.findOne({reportedBy:userID, incidentType:req.body.incidentType})
            if(isCaseRegisteredAlready){
                return res.status(201).json({message:"Your case is register your case in our DB."})
            }
            const userReports = await CrimeReportModel.create({ reportedBy: userID, ...req.body });
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                  user: process.env.GOOGLE_EMAIL,
                  pass: process.env.GOOGLE_PASSWORD,
                },
              });
              await transporter.sendMail({
                from: 'JustiGo: JustiGo ptv. ltd.', // sender address
                to: user.email, // list of receivers
                subject: "Your Register Case Detail.", // Subject line
                html: `
                <h2 style="color:#0a58ca;">📄 Crime Report Confirmation – JustiGo Pvt. Ltd.</h2>
                <p>Dear ${user.name},</p>
                <p>Thank you for registering your case with <strong>JustiGo Pvt. Ltd.</strong>. We have successfully recorded your report in our system.</p>
                <p>Please review the details below and keep this email for your records. If you notice any errors or wish to provide additional information, feel free to contact our team.</p>
                <hr style="margin: 20px 0;" />
                <h3>📝 Crime Report Details:</h3>
                <p><strong>Case ID:</strong> ${userReports._id}</p>
                <p><strong>Lawyer ID:</strong> ${req.body.lawyerComments[0].lawyerId}</p>
                <p><strong>Witnesses ID:</strong> ${req.body.witnesses.join(", ")}</p>
                <p><strong>Reported By:</strong> ${user.name}</p>
                <p><strong>Incident Type:</strong> ${req.body.incidentType}</p>
                <p><strong>Date:</strong> ${req.body.date}</p>
                <p><strong>Time:</strong> ${req.body.time}</p>
                <p><strong>Location:</strong> ${req.body.location}</p>
                <p><strong>Description:</strong> ${req.body.description}</p> 
                <p><strong>Evidence Files:</strong> ${req.body.evidenceFiles.join(", ")}</p>
                <p><strong>Case Complexity:</strong> ${req.body.caseComplexity}</p>
                <p><strong>Status:</strong> ${req.body.status}</p>
                <p><strong>AI Prediction:</strong> ${req.body.aiPrediction}</p>
                <p><strong>Public Share Link:</strong> ${req.body.shareLinks.public}</p>
                <p><strong>Private Share Link:</strong> ${req.body.shareLinks.private}</p>
                <hr style="margin: 20px 0;" />
                <p style="font-size: 14px; color: #555;">
                    📌 Please keep this email safe for future reference. This is an automated message – do not reply to this email.
                    For support or corrections, contact us at 
                    <a href="mailto:support@justigo.com">support@justigo.com</a>.
                </p>
                <p style="font-size: 13px; color: #888;">JustiGo Pvt. Ltd. | Your Justice Companion</p>
                `
              });
            return res.status(200).json({message: `User: ${user.name}. Crime Reports registered and same send via mail`});
        }
        return res.status(404).json({message: `User not found and fails to register crime.`});
    } catch (error) {
        console.log(error)
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
