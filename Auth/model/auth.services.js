// const userRepository = require('../repositories/UserRepository');
const userRepository =require("./auth.repository");

class UserService {
  async registerUser(username, email, password) {
    // Additional validation or business logic can be added here
    return await userRepository.createUser(username, email, password);
  }

  async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }
}

module.exports = new UserService();

