const nodemailer = require("nodemailer");
const sendEmail = async (to, subject, body) => {
  const mailSettings = {
    service: "gmail",
    auth: {
      user: process.env.Gmail,
      pass: process.env.GmailPassword,
    },
  };
  const transporter = nodemailer.createTransport(mailSettings);

  return transporter.sendMail({
    from: mailSettings.auth.user,
    to: to,
    subject: subject,
    text: body,
  });
};

module.exports = sendEmail;
