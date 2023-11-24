const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { promisify } = require('util');
const logger = require('../config/logger.js');

const { mailUser, password, host } = require('../config/config.js');

const createTransporter = () => {
  return nodemailer.createTransport({
    host,
    port: 465, // 587
    secure: true,
    requireTLS: true,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
    auth: {
      user: mailUser,
      pass: password,
    },
  });
};

const renderEmailTemplate = async (file, data) => {
  const renderFileAsync = promisify(ejs.renderFile);
  return renderFileAsync(`${__dirname}/template/${file}`, data);
};

const sendEmail = async (options = {}) => {
  try {
    // Render the email template
    const html = await renderEmailTemplate(options.file, options.data);

    // Create the transporter
    const transporter = createTransporter();

    // Configure the email options
    const mailOptions = {
      from: mailUser,
      to: options.emailTo,
      subject: options.subject,
      html: html,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Send the email and wait for the response
    const info = await transporter.sendMail(mailOptions);

    logger.info('Email sent:', info.response);
    return {
      status: 200,
      message: 'Email sent successfully',
    };
  } catch (error) {
    logger.error('Error sending email:', error);
    throw new Error('Email not sent');
  }
};

module.exports = sendEmail;
