/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configure email transport using the default SMTP transport and a Gmail acco
// Make sure to enable "less secure apps" option in your Gmail account
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vaxo.gr2@gmail.com",
    pass: "etuna1mancho",
  },
});

// Function to send email
exports.sendEmail = functions.https.onCall((data, context) => {
  const mailOptions = {
    from: data.email,
    to: "your-email@gmail.com", // Your email
    subject: data.subject,
    text: `Message from ${data.fullname} (${data.email}): ${data.message}`,
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return {success: true};
    })
    .catch((error) => {
      return {success: false, error: error.message};
    });
});
