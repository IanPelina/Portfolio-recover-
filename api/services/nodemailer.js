const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASSWORD
  }
});


async function sendMail(options) {
  await new Promise((resolve, reject) => {
    transport.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    });
  });
}

module.exports = sendMail;