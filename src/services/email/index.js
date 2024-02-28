const nodemailer = require("nodemailer");

module.exports = class MailSender {
  constructor({ host, name, port, user, pass }) {
    this.user = user;
    this.transporter = nodemailer.createTransport({
      host: host,
      name: name,
      port: port,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });
  }
  async sendMail({ to, subject, html }) {
    const mailOptions = {
      from: this.user,
      to,
      subject,
      html,
    };
    await new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
          return error;
        } else {
          resolve(info);
        }
      });
    });
  }
};