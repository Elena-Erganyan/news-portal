const logout = async (_req, res)=> {
  res.clearCookie("userToken");
  res.cookie("loggedIn", false);
  res.status(200).json({message: "Logged out successfully"});
}

module.exports = logout;
