const mongoose = require("mongoose");

const crimeReportSchema = new mongoose.Schema({
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        incidentType: { type: String, required: true },
        date: { type: Date, required: true , default:Date.now},
        time: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        evidenceFiles: [{ type: String }], // URLs or file paths
        witnesses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Witness" }],
        lawyerComments: [{
            lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
            comment: { type: String },
            timestamp: { type: Date, default: Date.now }
        }],
        hearingRecords: [{date: { type: Date, required: true },notes: { type: String },audioFile: { type: String },isFinalHearing: { type: Boolean, default: false }}],
        verdict: {judgeName: { type: String },decision: { type: String },reasoning: { type: String },decisionDate: { type: Date }},
        status: {type: String,enum: ["Pending", "Under Investigation", "Closed"],default: "Pending"},
        caseComplexity: { type: String }, // could be enum too: Low | Medium | High
        aiPrediction: { type: String },
        shareLinks: {public: { type: String },private: { type: String }}
    },
    {timestamps: true,versionKey: false}
);

const CrimeReportModel = mongoose.model("CrimeReports", crimeReportSchema);

module.exports = { CrimeReportModel };
