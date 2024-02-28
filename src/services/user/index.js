const user = require("../../models/user");
const otpTemp = require('../../utils/mailTemplates/mailOtpTemp');

module.exports = class User {
  constructor({otp, mailSender}) {
    this.otp = otp;
    this.mailSender = mailSender;
  }

  async getUser(email) {
    const getResult = await user.findOne({ email });
    if (!getResult) return { message: "user is not found" };
    return getResult;
  }

  async sendOtp(email) {
    // const getResult = await user.findOne({ email });
    // if (!getResult) return { message: "user is not found" };
    const htmlTemp = await otpTemp(await this.otp.generateOtp())
    return await this.mailSender.sendMail({
      to:email,
      subject: "This is OTP",
      html: htmlTemp
    })
  }
};
