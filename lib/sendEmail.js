'use strict';

const nodemailer = require('nodemailer');
const models = require('./models');

// mailOptions = {
//     from: 'ASDF <asdf@gmail.com>',
//     to: 'qwer@gmail.com',
//     subject: 'EXAMPLE',
//     text: 'EXMAMPLE '
// };

const mailers = {
  smtp({
    from, to, subject, text, emailConfig,
  }) {
    const transporter = nodemailer.createTransport({
      // service: 'gmail',
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true,
      // auth: {
      //   user: '{gmail id}',
      //   pass: '{gmail pw}',
      // },
      service: emailConfig.service,
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    });

    return transporter.sendMail({
      from, to, subject, text,
    }, (error, info) => {
      if (error) {
        console.log(error);
      }
      if (info) {
        console.log(info.response);
      }
    });
  },
};

module.exports = async ({
  from, to, subject, text,
}) => {
  const emailConfig = models.Setting.get('email');
  if (!emailConfig) {
    throw Error('No mail config');
  }
  return mailers.smtp({
    from, to, subject, text, emailConfig,
  });
};
