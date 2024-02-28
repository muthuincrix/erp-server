require("dotenv").config();
const User = require("../services/user/index");
const bunyan = require("bunyan");

const loggers = {
  development: () =>
    bunyan.createLogger({ name: "development", level: "debug" }),
  production: () => bunyan.createLogger({ name: "production", level: "info" }),
  test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
};

module.exports = {
  development: {
    log: loggers.development,
    databaseURL: process.env.MONGODB_DEV_URL,
    secret: process.env.SECRET,
    User,
    host: process.env.HOST,
    name: process.env.NAME,
    port: process.env.EMAIL_PORT,
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
  production: {
    log: loggers.production,
    databaseURL: process.env.MONGO_URL_PRODUCTION,
    secret: process.env.SECRET,
    User,
    host: process.env.HOST,
    name: process.env.NAME,
    port: process.env.EMAIL_PORT,
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
};
