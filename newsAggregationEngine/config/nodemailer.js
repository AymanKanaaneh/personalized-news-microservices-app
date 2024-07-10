const nodemailer = require("nodemailer");
const { ZIONET_MAILER_EMAIL, ZIONET_MAILER_APP_PASS } = require('./environment');

/*
 * Nodemailer transporter configured to use Gmail service.
*/
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: ZIONET_MAILER_EMAIL,
      pass: ZIONET_MAILER_APP_PASS,
    }
});

module.exports = ({
    transporter
});
  