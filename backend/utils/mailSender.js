const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"EDUSOFT" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    };
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log(error);
    console.log("Error occured while creating the transporter or sending mail");
  }
};

module.exports = mailSender;
