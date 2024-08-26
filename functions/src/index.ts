import functions = require("firebase-functions");
import nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Create the Cloud Function
exports.sendEmail = functions.https.onCall((data: any, context: any) => {
  const mailOptions = {
    from: "vaxo.gr2@gmail.com",
    to: data.email, // or any other destination
    subject: `Contact form submission from ${data.name}`,
    text: data.message,
  };

  // Returning the result of transporter.sendMail() as a promise
  return transporter.sendMail(mailOptions)
    .then((info: any) => {
      console.log("Email sent successfully", info);
      return {success: true, message: "Email sent successfully"};
    })
    .catch((error: any) => {
      console.error("Error sending email", error);
      return {success: false, error: error.message};
    });
});
