const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const { UnauthorizedError } = require("../../utils/catchErrors");
const { setUserCookies } = require("../utils");


const getLoggedInUser = async (req, res)=> {
  const userToken = req.cookies.userToken;
  const loggedInCookie = req.cookies.loggedIn;

  if (!loggedInCookie){
    throw new UnauthorizedError("Пользователь не авторизован");
  }

  if (!userToken){
    throw new UnauthorizedError("Пользователь не авторизован или сессия истекла");
  }

  const {_id} = jwt.verify(userToken, process.env.SECRET);

  const user = await User.findById(_id);
  
  user.password = undefined;

  setUserCookies(res, user) // refreshing user cookies to a longer period
   
  res.status(200).json(user);
}

module.exports = getLoggedInUser;
