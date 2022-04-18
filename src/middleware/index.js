const isLogin = require('./isLogin');
const userAlreadyExist = require('./userAlreadyExist');

module.exports = {
  ...isLogin,
  ...userAlreadyExist,
};
