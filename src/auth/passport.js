const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });

    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser(async (_id, done) => {
    return done(null, await User.findOne({ _id }));
  });
}

module.exports = initialize;
