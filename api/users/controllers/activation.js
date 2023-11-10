const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const { BadReqError } = require("../../utils/catchErrors");
const { sendActivationEmail } = require("../utils");
const validator = require("validator");
const { isEmail } = validator;


const activateUser = async (req, res) => {
  const { _id } = jwt.verify(req.params.token, process.env.SECRET);
  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({message: "No such user exists in our datatbase"});
  } else if (user.activated) {
    return res.status(400).json({message: `Your Account is already acitivated, ${user.name}`});
  }

  user.activated = true;
  await user.save();

  res.status(200).json({message: "Congrats! Your account has been activated sucessfully"});
}

const resendActivation = async (req, res) => {
  let { email } = req.body;
  
  if (!isEmail(email)) {
    throw new BadReqError("Input is not a valid email. Please use a correct email address");
  }
  email = email.toLowerCase();

  await sendActivationEmail({req, email}); // await here because this is the main functionality

  res.status(200).json({ message: "Please check your email"});
}

module.exports = {activateUser, resendActivation};
