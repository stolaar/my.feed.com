const nodemailer = require("nodemailer");

const sendEmail = ({ recepient, subject, body, attachments }) => {
  const { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;
  
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT || 587,
    secure: false,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: recepient,
    subject,
    html: body,
    attachments: attachments || null
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
