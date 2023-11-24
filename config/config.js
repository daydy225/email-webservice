const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

const mailUser = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const host = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
module.exports = {
  port,
  mailUser,
  password,
  host,
  mailPort,
};
