const ejs = require('ejs');
const nodemailer = require('nodemailer');
const config = require('../config/vars');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'testingpurpose331@gmail.com',
    pass: 'wcpbevylqjxngjtc'
  },
});

const sendEmail = async (to, subject, templateFilePath, templateData, attachments) => {
  try {
    const html = await ejs.renderFile(templateFilePath, templateData);

    const mailOptions = {
      from: "testingpurpose331@gmail.com",
      to,
      subject,
      text: 'sample text', // You can customize this if needed
      html,
      attachments: attachments 
    };

    const info = await transporter.sendMail(mailOptions);
    return 'success';
  } catch (error) {
    console.error('Error sending email: ', error);
    return 'failure';
  }
};

module.exports = { sendEmail };
