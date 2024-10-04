const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "dda96868713cbd",
    pass: "79b8de79fc71a8",
  },
});

exports.sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log("Email sent: " + info.response);
  });
};
