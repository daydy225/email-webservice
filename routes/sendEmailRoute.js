const express = require('express');
const sendEmail = require('../controllers/sendEmailController');

const router = express.Router();

router.get('/send-email', sendEmail);

module.exports = router;
