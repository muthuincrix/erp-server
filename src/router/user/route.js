const router = require("express").Router();

const validator = require("email-validator");

var counter = 0;
module.exports = ({ passport, services, log }) => {

  router.post("/login", async (req, res) => {
    try {
      await services.user
        .login(req)
        .then((response) => {
          console.log(response);
        return res.json(response)
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      throw error;
    }
  });

  router.post(
    "/login-verify",
    passport.authenticate("local", {
      successRedirect: "/user/login",
      failureRedirect: "/user/failed",
      failureFlash: true,
    }),function(req, res) {
      res.send('success');
    }
  );

  router.get("/login", (req, res) => {
    console.log('calling');
res.send('login');
  });
  router.get("/failed", (req, res) => { 
    res.send('failed');
  });

  router.post("/createUser", async (req, res) => {
 
    const { name, value } = req.body;
    if (validator.validate(value)) {
      await services.user
        .createUserEmail({ name, email: value, req })
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          console.log(error);
          return res.json({ status: "error", message: "Error creating user" });
        });
    } else {
      return res.json({ message: "Invalid email" });
    }
  });

  router.post("/send-otp", async (req, res) => {
    try {
      const { otp } = req.body;
      if (otp) {
        await services.user
          .checkOTP({ otp, req })
          .then((result) => {
            return res.json(result);
          })
          .catch((error) => {
            console.log(error);
            return res.json({
              status: "error",
              message: "Error creating user",
            });
          });
      } else res.json({ status: "error", message: "something went wrong" });
    } catch (err) {
      return res.send(err);
    }
  });

  router.post("/resend-otp", async (req, res) => {
    try {
      await services.user
        .resendOTP({ req })
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          console.log(error);
          return res.json({ status: "error", message: "Error creating user" });
        });
    } catch (err) {
      return res.send(err);
    }
  });

  router.post("/get-start", async (req, res) => {
    try {
      await services.user
        .getStart({ req })
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          console.log(error);
          return res.json({ status: "error", message: "something went error" });
        });
    } catch (err) {
      return res.send(err);
    }
  });

  router.post("/send-business", (req, res) => {
    try {
      const { orgName, industryName, orgNum, email, orgGST } = req.body;
      req.session.organizationName = orgName == "" ? "" : orgName;
      req.session.industryName = industryName == "" ? "" : industryName;
      req.session.orgNum = orgNum == "" ? "" : orgNum;
      req.session.orgEmail = email == "" ? "" : email;
      req.session.orgGST = orgGST == "" ? "" : orgGST;
      res.json({
        status: "success",
        message: "get user business successfully",
      });
    } catch (err) {
      return res.send(err);
    }
  });

  router.post("/send-address", async (req, res) => {
    try {
      const { address1, address2, city, state, zip } = req.body;
      req.session.address1 = address1 == "" ? "" : address1;
      req.session.address2 = address2 == "" ? "" : address2;
      req.session.city = city == "" ? "" : city;
      req.session.state = state == "" ? "" : state;
      req.session.zipCode = zip == "" ? "" : zip;
      res.json({ status: "success", message: "get user address successfully" });
    } catch (err) {
      return res.send(err);
    }
  });
  router.post("/send-info", async (req, res) => {
    try {
      const { orgLogo, avatar, gender } = req.body;      
      await services.user
        .getBusinessSave({ req, orgLogo, avatar, gender })
        .then((result) => {
          return res.json(result);
        })
        .catch((error) => {
          console.log(error);
          return res.json({ status: "error", message: "something went error" });
        });
    } catch (err) {
      return res.send(err);
    }
  });

  

  return router;
};
