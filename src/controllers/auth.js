const User = require('../models/user.model.js');

const renderSigninPage = (req, res) => {
  const { messages } = req.session;

  res.render('signin.hbs', { errors: messages });

  /* delete messages errors */
  delete req.session.messages;
};

const renderSignupPage = (req, res) => {
  const { messages } = req.session;

  res.render('signup.hbs', { errors: messages });

  /* delete messages errors */
  delete req.session.messages;
};

const createAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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
