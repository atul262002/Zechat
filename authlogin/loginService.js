
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginRepository = require("../authlogin/loginRepository")

class LoginService {
  constructor() {
    this.LoginRepository = new LoginRepository();
  }

  async login(email, password) {
    // Fetch user from database using repository
    const user = await this.LoginRepository.getUserByEmail(email);

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
}

module.exports = LoginService;
