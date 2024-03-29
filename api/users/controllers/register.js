const User = require("../../../models/User");
const { hashPassword, sendActivationEmail } = require("../utils");

const register = async (req, res)=> {
  const {email, password} = req.body;

  const user = await User.create(req.body);

  // hash password
  user.password = await hashPassword(password);
  await user.save();

  //send email to confirm and activate user
  sendActivationEmail({req, email, user});

  res.status(201).json({ message: "Пользователь успешно зарегистрирован! Пожалуйста, проверьте свою электронную почту"});
};

module.exports = register;
