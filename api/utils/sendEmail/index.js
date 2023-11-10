const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_EMAIL_PASSWORD
  },
});

transporter.use("compile", hbs({
  viewEngine: {
    defaultLayout: false // necessary so handlebar engine don't look for main.handlebars at the root dir
  },
  viewPath: path.join(__dirname, "./tpls")
}));

const sendEmail = async ({ email, configs = {} }) => {
  await transporter.sendMail({ 
    from: process.env.APP_EMAIL,
    to: email,
    ...configs
  })
};

module.exports = sendEmail;
