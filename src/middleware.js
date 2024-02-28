exports.checkAuthenticated = (req, res, next) => {
  if (req.session.passport !== undefined) {
    return next();
  }

  res.redirect("/login");
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};
