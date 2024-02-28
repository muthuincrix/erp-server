const router = require("express").Router();
const { checkNotAuthenticated } = require("../../middleware");

module.exports = ({ passport, services }) => {
  router.get("/", (req, res) => {
    req.session.user = "admin";
    res.send("admin");
  });

  router.get("/otp", async (req, res) => {
    try{
      await services.user.sendOtp("avinash97official@gmail.com");
    }catch(err){
      return res.send(err);
    }
    res.send("send OTP"); 
  });
  router.post("/otp", async (req, res) => {
    try{
      await services.user.sendOtp("avinash97official@gmail.com");
    }catch(err){
      return res.send(err);
    }
    res.send("send OTP"); 
  });

  router.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  return router;
};
