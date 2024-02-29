
const LoginService = require("../authlogin/loginService");

class LoginController {
    constructor() {
      this.LoginService = new LoginService();  
    }
  
    async login(req, res) {
      try {
        const { email, password } = req.body;
        const token = await this.LoginService.login(email, password);
        res.json({ token });
      } catch (error) {
        res.status(401).json({ error: error.message });
        
      }
    }
}

module.exports =  LoginController;
