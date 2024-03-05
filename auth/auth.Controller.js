
const userService = require("./auth.Service")

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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await userService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });

    }
  }

  async forgetpass(req , res){
    try {
      const mail = req.body.email;
      const forgetpass = await userService.forgetpassService(mail);
      res.json({ message:"check your registered mail to change your password" });
      
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async newpass(req,res){
    const verificationToken= req.params.token;
    const isVerified = await userService.tokenVerifictionforResetpass(verificationToken);

    if(isVerified){
      try {
        const password = req.body.password;
        const newpass=await userService.passwordupdate(verificationToken,password);
        res.json({ message:"Password changed succesfully" });
      } catch (error) {
          res.status(401).json({ error: error.message });
      }
    }


    
  }

}

module.exports = new UserController();
