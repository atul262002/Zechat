
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../User/user.Repository');
const nodemailer = require('../config/nodemailer');


class UserService {
    async registerUser(userData) {
       
        const { password, ...rest } = userData;
     
        const verificationToken = this.generateVerificationToken();
        const hashedPassword = await bcrypt.hash(password, 10);  
    
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

  async login(email, password) {
    // Fetch user from database using repository
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email ');
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, 'asdfghjkl', { expiresIn: '1.5h' });

    // Save token in the database if needed
    // await this.LoginRepository.saveToken(user.id, token);

    return token;
  }

  async forgetpassEmailverification(email, verificationToken) {
    const mailOptions = {
      from: 'writeatul2002@gmail.com',
      to: email,
      subject: 'Verify Your Account for reset password ',
      text: `Click the link to Reset your account password:
    http://localhost:3000/user/forgetpass/newpass/${verificationToken}`,
    };

    await nodemailer.sendMail(mailOptions);
  }

  async tokenVerifictionforResetpass(verificationToken){
    const user = await userRepository.findUserByVerificationToken(verificationToken);
    if (!user) {
      throw new Error('Invalid Token');
    }else{
      return true;
    }

  }
  async forgetpassService(email){
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email ');
    }
    try {
      const verificationToken = this.generateVerificationToken();
      const upfatetoken= await userRepository.updateUserToken(email,verificationToken);
      const verification = await this.forgetpassEmailverification(email,verificationToken);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
   
  }

  

  async passwordupdate(verificationToken , password){
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      await userRepository.updateUserPass( verificationToken ,hashedPassword);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new UserService();
