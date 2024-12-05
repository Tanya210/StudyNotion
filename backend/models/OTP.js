const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(email, "Verification Email", emailTemplate(otp));
  } catch (error) {
    console.log("Error occured while sending verification email");
    console.log(error.message);
    throw new Error(`Error occured while sending Verification email`);
  }
}

// pre save hook
otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
