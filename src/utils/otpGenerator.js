module.exports = class GenerateOtp {
  constructor(length, isAlphaNum = false) {
    this.isAlphaNum = isAlphaNum;
    this.length = length;
  }
  generateOtp() {
    if (!this.isAlphaNum) {
      const digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < this.length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    } else {
      const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let OTP = "";
      for (let i = 0; i < this.length; i++) {
        OTP += digits[Math.floor(Math.random() * 36)];
      }
      return OTP;
    }
  }
}
