const User = require('../models/user.model.js');

const renderSigninPage = (req, res) => {
  res.render('signin.hbs');
};

const renderSignupPage = (req, res) => {
  res.render('signup.hbs');
};

const createAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(email, password);
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/signin');
  } catch (error) {
    throw new Error(error.message);
  }
};

const logoutAccount = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = {
  renderSigninPage,
  renderSignupPage,
  createAccount,
  logoutAccount,
};
