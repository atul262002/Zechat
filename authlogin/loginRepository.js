
const User = require('../authregister/usermodel');
class LoginRepository {
   
   async getUserByEmail(email){
     return await User.findOne({email});
   }
  }

  module.exports = LoginRepository;
  