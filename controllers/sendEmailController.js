const emailService = require('../service/emailService');

const sendEmail = async (req, res) => {
  try {
    const result = await emailService(req.body);

    if (result)
      return res
        .status(result?.status)
        .json({ success: true, message: result?.message });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

module.exports = sendEmail;
