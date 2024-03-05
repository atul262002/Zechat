
const express = require('express');
const userController = require('./auth.Controller');
const multerMiddleware=require("../middleware/multerMiddleware")
const router = express.Router();

router.post('/register',multerMiddleware , userController.register);
router.get('/verify/:token', userController.verifyEmail);
router.post('/login',userController.login );
router.post('/forgetpass' ,userController.forgetpass);
router.post('/forgetpass/newpass/:token' ,userController.newpass);
// router.get('/verify/:token', userController.verifyEmail);



module.exports = router;
