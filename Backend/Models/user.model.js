const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ["Citizen", "Lawyer", "Admin"], required: true, default:"Citizen" },
    contactInfo: { type: String, required: true },
    location: { type: String },
    contactNo: { type: Number, required: true },
    isAnonymous: { type: Boolean, default: false },
}, {
    versionKey: false,
    timestamps: true
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = { UserModel };

