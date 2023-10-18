const emailService = require('../utils/email_config');

const sendEmail = async (req, res) => {
  try {
    const result = await emailService();
    if (result)
      return res
        .status(result?.status)
        .json({ success: true, message: result?.message });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

module.exports = sendEmail;
