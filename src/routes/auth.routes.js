const { Router } = require('express');
const passport = require('passport');
const {
  renderSigninPage,
  renderSignupPage,
  createAccount,
  logoutAccount,
} = require('../controllers/auth.js');
const { userAlreadyExist } = require('../middleware/userAlreadyExist.js');
/* local Strategy */
const LocalStrategy = require('passport-local').Strategy;
/* facebook strategy */
const FacebookStrategy = require('passport-facebook').Strategy;
/* google strategy */
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user.model.js');
const router = Router();

/* local  */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { error: true });
        }
        const valid = await user.isValidPassword(password);
        if (!valid) {
          return done(null, false, { error: true });
        }
        return done(null, user, { message: 'Login successful' });
      } catch (error) {
        done(error);
      }
    }
  )
);

/* facebook */
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/oauth/redirect/facebook/login',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            facebookId: profile.id,
          });

          const user = await newUser.save();
          return done(null, user);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

/* google */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/google/login',
      scope: 'profile',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });

          const user = await newUser.save();
          return done(null, user);
        }
        return done(null, user);
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
  /* const { _id } = user;
  const userLogin = await User.findById({ _id }); */
  done(null, user);
});

router.get('/signin', renderSigninPage);

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureMessage: 'Error to try to sign in',
    failWithError: true,
  })
);

router.get('/signup', renderSignupPage);

router.post('/signup', userAlreadyExist, createAccount);

/* facebook auth routes */

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/oauth/redirect/facebook/login',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

/* google auth routes */
router.get('/auth/google', passport.authenticate('google'));

router.get(
  '/oauth2/redirect/google/login',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

router.get('/logout', logoutAccount);

module.exports = router;
