// const userService = require('../services/UserService');
const userService = require("./auth.services")

class UserController {
  async registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const user = await userService.registerUser(username, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new UserController();