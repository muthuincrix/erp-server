"use strict";
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const createError = require("http-errors");
const connectDB = require("./utils/connectDB.js");
const { sessionManagement } = require("./utils/sessionConnection.js");
const flash = require("express-flash");
const passport = require("passport");
const passportInitialize = require("./auth/passport.js");
const helmet = require("helmet");
const GenerateOtp = require("./utils/otpGenerator.js");
const router = require("./router/index.js");
const User = require("./services/user");
const MailSender = require("./services/email/index.js");

module.exports = (config) => {
  connectDB(config.databaseURL);
  const app = express();
  sessionManagement(app, config);

  // middlewere connection
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  passportInitialize(passport);

  // create obj for service class
  const otp = new GenerateOtp(4, true);
  const mailSender = new MailSender({
    host: config.host,
    name: config.name,
    port: config.port,
    user: config.user,
    pass: config.pass,
  });
  const user = new User({ otp, mailSender });
  const services = {
    user,
    mailSender,
  };

  // router
  app.use("/", router({ services, passport }));

  return app;
};
