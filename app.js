const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const emailRouter = require('./routes/sendEmailRoute');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', emailRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to email service.' });
});

module.exports = app;
