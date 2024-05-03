// const LocalStrategy = require("passport-local").Strategy;
// const User = require("../models/user");

// /**
//  * Initialize passport authentication strategy
//  * @param {object} passport - Passport object
//  */
// function initialize(passport) {
//   /**
//    * Authenticate user using email and password
//    * @param {string} email - User's email
//    * @param {string} password - User's password
//    * @param {function} done - Callback function
//    */
//   const authenticateUser = async (email, password, done) => {
//   console.log('calling passport');
//     const user = await User.findOne({ email:"muthu17don@gmail.com" });
//     if (user == null) {
      
//       return done(null, false, { message: "No user with that email" });
//     }
//     try {
//       console.log(user);
//       return done(null, user);
//     } catch (e) {
//       return done(e);
//     }
//   };

//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

//   /**
//    * Serialize user object to session
//    * @param {object} user - User object
//    * @param {function} done - Callback function
//    */
//   passport.serializeUser((user, done) => {
//     return done(null, user._id);
//   });

//   /**
//    * Deserialize user object from session
//    * @param {string} _id - User ID
//    * @param {function} done - Callback function
//    */
//   passport.deserializeUser(async (_id, done) => {
//     return done(null, await User.findOne({ _id }));
//   });
// }

// module.exports = initialize;

const LocalStrategy = require('passport-local').Strategy

 const User = require("../models/user");
function initialize(passport,) {
  
  const authenticateUser = async (email,password,done) => {

    console.log('calling passport')
    const user = await User.findOne({email:"muthu17don@gmail.com"})
    
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
         return done(null, user)
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField:'email',}, authenticateUser))
  passport.serializeUser((user, done) => {
    return done(null, user._id)})
  passport.deserializeUser( async (_id, done) => {
    return done(null,await User.findOne({_id}))
  })
}



module.exports = initialize
