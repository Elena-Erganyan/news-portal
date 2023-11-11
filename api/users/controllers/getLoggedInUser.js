const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const { UnauthorizedError } = require("../../utils/catchErrors");
const { setUserCookies } = require("../utils");


const getLoggedInUser = async (req, res)=> {
  const userToken = req.cookies.userToken;
  const loggedInCookie = req.cookies.loggedIn;

  if (!loggedInCookie){
    throw new UnauthorizedError("Not logged In");
  }

  if (!userToken){
    throw new UnauthorizedError("Not logged in or session expired");
  }

  const {_id} = jwt.verify(userToken, process.env.SECRET);

  const user = await User.findById(_id);
  
  user.password = undefined;

  setUserCookies(res, user) // refreshing user cookies to a longer period on what the user chose when he logged in
   
  res.status(200).json(user);
}

module.exports = getLoggedInUser;
