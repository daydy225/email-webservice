const sendEmail = require('../utils/email_config');
const getEmailOption = require('../utils/getEmailOption');

const emailService = async (options = {}) => {
  // Prepare the email options

  const emailOptions = {
    ...getEmailOption(
      options.serviceID,
      options.otp,
      options.username,
      options.link,
      options.merchantName,
      options.merchantEmail,
      options.merchantPassword
    ),
    emailTo: options.emailTo,
  };

  return sendEmail(emailOptions);
};

module.exports = emailService;
