// config/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

module.exports = transporter;
