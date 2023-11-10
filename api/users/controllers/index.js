
const register = require("./register");

const login = require("./login");

const getLoggedInUser = require("./getLoggedInUser")

const { activateUser, resendActivation } = require("./activation");

const logout = require("./logout");


module.exports = {
  register,
  login,
  activateUser,
  resendActivation,
  logout,
  getLoggedInUser,
};
