const { Router } = require('express');
const passport = require('passport');
const {
  renderSigninPage,
  renderSignupPage,
  createAccount,
  logoutAccount,
} = require('../controllers/auth.js');
const { userAlreadyExist } = require('../middleware/userAlreadyExist.js');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.model.js');
const router = Router();

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const valid = await user.isValidPassword(password);
        if (!valid) {
          return done(null, false, { message: 'Password is not valid' });
        }
        return done(null, user, { message: 'Login successful' });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const { _id } = user;
  const userLogin = await User.findById({ _id });
  done(null, userLogin);
});

router.get('/signin', renderSigninPage);

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
  })
);

router.get('/signup', renderSignupPage);

router.post('/signup', userAlreadyExist, createAccount);

router.post('/logout', logoutAccount);

module.exports = router;
