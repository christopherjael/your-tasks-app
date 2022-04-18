const User = require('../models/user.model.js');
const userAlreadyExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.redirect('/signup');
    }
    next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  userAlreadyExist,
};
