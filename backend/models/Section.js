const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;
