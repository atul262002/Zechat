// modules/user/service/userService.js
const bcrypt = require('bcrypt');
const userRepository = require('../authregister/userRepository');
const cloudinary = require('../config/cloudinary');
const nodemailer = require('../config/nodemailer');

// const verificationToken=1234;
class UserService {
    async registerUser(userData) {
       
        const { password, ...rest } = userData;
     
       
        const verificationToken = this.generateVerificationToken();
        const hashedPassword = await bcrypt.hash(password, 10);  // Ensure password is defined
    
        const user = { password: hashedPassword, verificationToken, ...rest };
    
        // Save the user to the database
        const newUser = await userRepository.createUser(user);
    
        // Send verification email
        await this.sendVerificationEmail(newUser.email, newUser.verificationToken);
    
        return newUser;
      }
    
      generateVerificationToken() {
        // You can use any logic to generate a verification token (e.g., random string)
        return Math.random().toString(36).substring(7);
      }
    

  async sendVerificationEmail(email, verificationToken) {
//    const verificationToken= 1234;
    const mailOptions = {
      from: 'writeatul2002@gmail.com',
      to: email,
      subject: 'Verify Your Account',
      text: `Click the link to verify your account: http://localhost:3000/user/verify/${verificationToken}`,
    };

    await nodemailer.sendMail(mailOptions);
  }

  async verifyEmail(verificationToken) {
    const user = await userRepository.findUserByVerificationToken(verificationToken);

    if (user) {
      await userRepository.updateUserStatus(user.email);
      return true;
    }

    return false;
  }
}

module.exports = new UserService();
