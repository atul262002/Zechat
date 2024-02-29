// const User = require('../models/User');
const User=require("./auth.model")

class UserRepository {
  async createUser(username, email, password) {
    const user = new User({
      username,
      email,
      password,
    });
    return await user.save();
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = new UserRepository();
