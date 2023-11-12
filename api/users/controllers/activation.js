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
    return res.status(404).json({message: "Такого пользователя не существует"});
  } else if (user.activated) {
    return res.status(400).json({message: `Ваша учётная запись уже активирована, ${user.name}`});
  }

  user.activated = true;
  await user.save();

  res.status(200).json({message: "Поздравляем! Ваша учётная запись успешно активирована"});
}

const resendActivation = async (req, res) => {
  let { email } = req.body;
  
  if (!isEmail(email)) {
    throw new BadReqError("Введёный адрес не является корректным адресом элетронной почты");
  }
  email = email.toLowerCase();

  await sendActivationEmail({req, email}); // await here because this is the main functionality

  res.status(200).json({ message: "Пожалуйста, проверьте свою электонную почту"});
}

module.exports = {activateUser, resendActivation};
