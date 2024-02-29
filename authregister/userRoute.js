// modules/user/route/userRoute.js
const express = require('express');
const userController = require('../authregister/userController');
const multerMiddleware=require("../middleware/multerMiddleware")
const router = express.Router();

router.post('/register',multerMiddleware, userController.register);
router.get('/verify/:token', userController.verifyEmail);

module.exports = router;
