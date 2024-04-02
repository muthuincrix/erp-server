const user = require("../../models/user");
const otpTemp = require("../../utils/mailTemplates/mailOtpTemp");
const Org = require("../../models/Org.js");
const validator = require("email-validator");
const Category = require("../../models/category.js");
const Notification = require("../../models/notification.js");
module.exports = class User {
  constructor({ otp, mailSender }) {
    this.otp = otp;
    this.mailSender = mailSender;
  }

  async testServer (){
    
   return await user.findOne({email:"test@example.com"}).then(result => result)
  }

  async login(req) {
    try {
      const { userVerify } = req.body;
      if (validator.validate(userVerify)) {
        const getUser = await user.findOne({ email: userVerify });
        if (!getUser) {
          return { status: "error", message: "User does not exist" };
        }
        const otp = this.otp.generateOtp();
        req.session.loginOtp = otp;
        return await this.sendOtp(userVerify, otp)
          .then(async (response) => {
            getUser.OTP.code = otp;
            await getUser.save();
            return {
              status: "success",
              message: "OTP sent successfully",
            };
          })
          .catch((err) => {
            console.log(err);
            return { status: "error", message: "couldn't send OTP message" };
          });
      } else {
        return {
          status: "error",
          message: "Please enter a valid email",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }

  async resendOTP({ req }) {
    const otp = await this.otp.generateOtp();
    req.session.otp = otp;
    req.session.numOfattempts = 1;
    const htmlTemp = await otpTemp(otp);
    return await this.mailSender
      .sendMail({
        to: req.session.email,
        subject: "This is OTP",
        html: htmlTemp,
      })
      .then((mailSender) => {
        return { status: "success", message: "Resend OTP successfully" };
      })
      .catch((err) => {
        return { status: "error", message: "Error sending OTP" };
      });
  }
  async getUser(email) {
    const getResult = await user.findOne({ email });
    if (!getResult) return { message: "user is not found" };
    return getResult;
  }

  async sendOtp(email, otp) {
    // const getResult = await user.findOne({ email });
    // if (!getResult) return { message: "user is not found" };
    const htmlTemp = await otpTemp(otp);
    return await this.mailSender.sendMail({
      to: email,
      subject: "This is OTP",
      html: htmlTemp,
    });
  }
  async checkOTP({ otp, req }) {
    if (!req.session.numOfattempts) req.session.numOfattempts = 1;
    if (req.session.otp === otp && req.session.numOfattempts > 2) {
      return { status: "success", message: "OTP verified successfully" };
    } else if (req.session.numOfattempts > process.env.OTP_ATTEMPT_LIMIT) {
      return { status: "info", message: "your OTP is Expired" };
    } else {
      {
        req.session.numOfattempts++;
        return { status: "info", message: "OTP not verified" };
      }
    }
  }

  async createUserEmail({ email, name, req }) {
    const getUser = await user.findOne({ email });
    if (getUser) return { status: "info", message: "user already exists" };
    const otp = await this.otp.generateOtp();
    req.session.otp = otp;
    req.session.name = name;
    req.session.email = email;
    await this.sendOtp(email, otp);
    if (!getUser) {
      return { status: "success", message: "sent otp successfully" };
    }
  }

  async getStart({ req }) {
    if (req.session.email && req.session.name && req.session.otp) {
      const newUser = await user({
        email: req.session.email,
        OTP: { code: req.session.otp },
        name: req.session.name,
      });
      if (newUser) {
        await newUser.save();
        return { status: "success", message: "User create successfully" };
      } else return { status: "error", message: "User creation failed" };
    } else return { status: "error", message: "something went wrong" };
  }
  async getBusinessSave({ req, orgLogo, avatar, gender }) {
    const business = await user.findOne({ email: req.session.email });
    if (business) {
      const organization = await Org.findOne({
        userId: business._id,
        name: req.session.organizationName,
      });
      if (organization)
        return {
          status: "error",
          message: "the organization name already exists",
        };
      return await Org.create({
        userId: business._id,
        name: req.session.organizationName,
        industry: req.session.industryName,
        phone: req.session.orgNum,
        email: req.session.orgEmail,
        GSTPin: req.session.orgGST,
        addGST: req.session.orgGST == "" ? false : true,
        billingAddress: {
          lineOne: req.session.address1,
          lineTwo: req.session.address2,
          city: req.session.city,
          state: req.session.state,
          zipCode: req.session.zipCode,
        },
        logoUrl: orgLogo,
      })
        .then(async (orgResult) => {
         // await orgResult.save();
          return await user
            .findOne({ email: req.session.email })
            .then(async (userResult) => {
              userResult.avatar = avatar;
              userResult.gender = gender;
              userResult.orgList.push({ orgID: orgResult._id });
              await userResult.save();
              const getCatogory = await Category({ userId: userResult._id })
              await getCatogory.save();
              const notification = await Notification({ userId: userResult._id,orgID: orgResult._id});
              await notification.save();
              return {
                status: "success",
                message: "Successfully saved your information",
              };
            })
            .catch((err) => {
              return { status: "error", message: "Can't find your details" };
            });
        })
        .catch((err) => {
          console.log(err);
          return { status: "error", message: "Can't save your information" };
        });
    } else return { status: "error", message: "User creation failed" };
  }
};
