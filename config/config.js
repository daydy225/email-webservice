const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

const mailUser = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const clientId = process.env.OAUTH_CLIENTID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;
const service = process.env.MAIL_SERVICE;
module.exports = {
  port,
  mailUser,
  password,
  clientId,
  clientSecret,
  refreshToken,
  service,
};
