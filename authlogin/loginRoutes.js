
const express = require('express');
const LoginController = require('../authlogin/loginController');

const loginrouter = express.Router();
const loginController = new LoginController(); 

loginrouter.post('/login', loginController.login.bind(loginController));

module.exports = loginrouter;
