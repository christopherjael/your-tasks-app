const isLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/signin');
  }
  next();
};

module.exports = { isLogin };
