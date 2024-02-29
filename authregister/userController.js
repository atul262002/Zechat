// modules/user/controller/userController.js
// const userService = require('../authregister/userService');
const userService =require("./userService")

class UserController {
  async register(req, res) {
    try {
      // Extract form data from req.body
      const { username, email, password } = req.body;
      if (!req.file) {
        throw new Error('Image is required!');
      }

      const profilePhoto = req.imageUrl;
      // Create user object
      const user = { username, email, password, profilePhoto };
     
      // Register user and send verification email
      const newUser = await userService.registerUser(user);
    
      res.json({ message: 'User successfully registered. Check email to verify the account.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  async verifyEmail(req, res) {
    try {
    
      const verificationToken = req.params.token;
      
      const isVerified = await userService.verifyEmail(verificationToken);

      if (isVerified) {
        res.json({ message: 'Email verification successful. User is now registered.' });
      } else {
        res.status(400).json({ message: 'Invalid verification token.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();
