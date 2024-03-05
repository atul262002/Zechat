
const User = require('./Model/userModel');

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

  async updateUserToken(email,verificationToken){
    return await User.updateOne({ email }, { $set: { verificationToken: verificationToken } });
  }
  
  async updateUserPass(verificationToken,password) {
    return await User.updateOne({ verificationToken }, { $set: { password: password } });
  }

}

module.exports = new UserRepository();
