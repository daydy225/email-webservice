const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { promisify } = require('util');
const logger = require('../config/logger.js');

const {
  mailUser,
  password,
  clientId,
  clientSecret,
  refreshToken,
  service,
} = require('../config/config.js');

// const createTransporter = () => {
//   return nodemailer.createTransport({
//     host: HOST,
//     service: SERVICE,
//     port: 465, // 587
//     secure: true,
//     auth: {
//       user: APP_EMAIL,
//       pass: APP_PASSWORD,
//     },
//   });
// };
const createTransporter = () => {
  return nodemailer.createTransport({
    service,
    auth: {
      type: 'OAuth2',
      user: mailUser,
      pass: password,
      clientId,
      clientSecret,
      refreshToken,
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

const emailService = async (options = {}) => {
  // Calculate subtotal and total price
  // const subtotal = options.totalPrice - deliveryPrice;
  // const totalPrice = options.totalPrice;
  // const customer_address =
  //   options.address.split(',')[1] + ' ' + options.address.split(',')[2];

  // Construct the email data
  // const emailData = {
  //   order_number: orderNumber,
  //   customer_name: options.username,
  //   customer_phone: options.phone,
  //   customer_email: options.customer_email,
  //   customer_city: options.address.split(',')[0],
  //   customer_address: customer_address,
  //   order_date: options.date,
  //   products: productList,
  //   subtotal: `${subtotal}`,
  //   total_price: `${totalPrice}`,
  //   payment_method: options.paymentMethod,
  //   isSentToCustomer: !!options.email,
  // };

  // Prepare the email options
  const emailOptions = {
    file: 'email_template.ejs',
    emailTo: 'daydy.dev@gmail.com',
    subject: 'Valsoria email service',
    data: '',
  };

  return sendEmail(emailOptions);
};

module.exports = emailService;
