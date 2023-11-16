const logout = async (_req, res)=> {
  res.clearCookie("userToken");
  res.clearCookie("cookiesAge");
  res.cookie("loggedIn", false);
  res.status(200).json({message: "Выход из учётной записи успешно произведён"});
}

module.exports = logout;
