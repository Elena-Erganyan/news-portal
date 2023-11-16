const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { DB404Error } = require("../utils/catchErrors");
const sendEmail = require("../utils/sendEmail");
const createToken = require("../utils/createToken");
const getHost = require("../utils/getHost");

const hashPassword = async (password) => {
  const saltStr = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, saltStr);
  return hashedPassword;
};

const setUserCookies = (res, user, maxDaysAge = "1d") => {
  const token = createToken({ _id: user._id }, maxDaysAge);
  const oneDayMiliseconds = 24 * 60 * 60 * 1000;

  res.cookie("userToken", token, {
    httpOnly: true,
    secure: true,
    maxAge: parseFloat(maxDaysAge) * oneDayMiliseconds
  });

  res.cookie("loggedIn", true, {
    maxAge: parseFloat(maxDaysAge) * oneDayMiliseconds
  });
  
  return token;
}

const sendActivationEmail = async ({ req, email, user })=> {
  const host = getHost(req);

  let targetUser = user;

  if (!user){
    targetUser = await User.findOne({ email });
  }

  if (!targetUser) {
    throw new DB404Error("This user cannot be found or might have been deleted");
  }
  const emailToken = createToken({ _id:targetUser._id }, "1d");

  await sendEmail({email, configs: {
    subject: "Активируйте свою учётную запись на News Portal",
    template: "activation",
    context: {
      name: targetUser.name,
      host,
      emailToken
    },
  }});
};

module.exports = {
  hashPassword,
  sendActivationEmail,
  setUserCookies,
};
