const express = require("express")

const { WitnessModel } = require("../Models/witness.model");
const { default: mongoose } = require("mongoose");

const WitnessRouter = express.Router()

WitnessRouter.get("/healthy", (req, res) => {
    res.send("WR working, test passed.");
  });



WitnessRouter.get("/all/:id", async (req, res) => {
    try {
      const crimeID = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(crimeID)) {
        return res.status(400).json({ message: "Invalid Crime ID." });
      }
  
      const witnesses = await WitnessModel.find({ crimeId: crimeID });
  
      if (witnesses.length > 0) {
        return res.status(200).json({ message: "Your witnesses.", witnesses });
      }
  
      return res.status(200).json({ message: "No witnesses found." });
  
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
  });



WitnessRouter.post("/addWitness/:id", async (req, res) => {
    try {
      const crimeID = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(crimeID)) {
        return res.status(400).json({ message: "Invalid Crime ID." });
      }
  
      const { name, statement, contactInfo, isAnonymous = false } = req.body;
  
      if (!name || !statement || !contactInfo) {
        return res.status(400).json({ message: "Name, statement, and contactInfo are required." });
      }
  
      const isDuplicate = await WitnessModel.findOne({ crimeId: crimeID, name });
  
      if (isDuplicate) {
        return res.status(403).json({ message: "Witness already added." });
      }
  
      const witness = await WitnessModel.create({ crimeId: crimeID, name, statement, contactInfo, isAnonymous });
  
      return res.status(200).json({ message: "Witness added successfully.", witness });
  
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
});



WitnessRouter.put("/updateWitness/:id", async (req, res) => {
    try {
      const witnessID = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(witnessID)) {
        return res.status(400).json({ message: "Invalid Witness ID." });
      }
  
      const witness = await WitnessModel.findByIdAndUpdate(witnessID, req.body, { new: true });
  
      if (!witness) {
        return res.status(404).json({ message: "Witness not found." });
      }
  
      return res.status(200).json({ message: "Witness updated successfully.", witness });
  
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
});



WitnessRouter.delete("/deleteWitness/:id", async (req, res) => {
    try {
      const witnessID = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(witnessID)) {
        return res.status(400).json({ message: "Invalid Witness ID." });
      }
  
      const witness = await WitnessModel.findByIdAndDelete(witnessID);
  
      if (!witness) {
        return res.status(404).json({ message: "Witness not found." });
      }
  
      return res.status(200).json({ message: "Witness deleted successfully." });
  
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
});


module.exports = {WitnessRouter}