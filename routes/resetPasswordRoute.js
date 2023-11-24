const express = require('express');
const { resetPassword } = require('../controllers/resetPasswordController');

const router = express.Router();

router.get('/reset-password', resetPassword);

module.exports = router;
