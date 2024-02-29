// modules/user/repository/userRepository.js
const User = require('../authregister/usermodel');

class UserRepository {
  async createUser(user) {
    return await User.create(user);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async updateUserStatus(email) {
    return await User.updateOne({ email }, { $set: { status: 'registered' } });
  }

  async findUserByVerificationToken(verificationToken) {
    try {
      const user = await User.findOne({ verificationToken });

      return user;
    } catch (error) {
      // Handle error, such as logging or throwing a custom error
      console.error('Error finding user by verification token:', error);
      throw new Error('Unable to find user by verification token');
    }
  }
  
}

module.exports = new UserRepository();
