const moment = require('moment-timezone');
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

exports.sessionExpire = (req, res, next) => {
  // get the date multiple unix value from 1000 
  // console.log(new Date(1709906417 * 1000));
  const date = new Date()

 if(req.session.expire){
  const now = moment(date);

  if(req.session.expire < now.unix()){
   req.session.destroy();
   return res.json({satus:'expire',message:'your session is expired',})
  }
  next();
 }
 else if(!req.session.expire){
  date.setMonth(date.getMonth() + 1)
  const now = moment(date);
  req.session.expire = now.unix();
  next();
 }
};
