const bcrypt = require("bcrypt");
const User = require("../../../models/User");
const { BadReqError, DB404Error, UnauthorizedError } = require("../../utils/catchErrors");

const { setUserCookies } = require("../utils");
const validator = require("validator");
const { isEmail } = validator;

const login = async (req, res) => {
  let {identifier, password} = req.body; // identifier could be the email or username

  if (!identifier || !password) {
    throw new BadReqError("Не заполнено обязательное поле");
  }

  const identifierUsed = isEmail(identifier) ?  "email" : "username";
  
  if (identifierUsed === "email"){
    identifier = identifier.toLowerCase();
  }
  
  const user = await User.findOne({[identifierUsed]: identifier});

  if (user === null) {
    throw new DB404Error(`Данный ${identifierUsed} не найден или некорректен`);
  }

  const isMatching = await bcrypt.compare(password, user.password);

  if (!isMatching){
    throw new UnauthorizedError("Неправильный пароль");
  }

  if (!user.activated) {
    throw new UnauthorizedError("Пожалуйста, активируйте свою учётную запись, чтобы войти") 
  }

  setUserCookies(res, user);
  
  user.password = undefined; // not to return this field to the frontend
  
  res.status(200).json(user);
}

module.exports = login;
