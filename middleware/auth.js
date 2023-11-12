const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next)=> {
  // verify authentication
  const tokenPassed = req.cookies.userToken;
  
  if (!tokenPassed) {
    return res.status(401).json({message: "Требуется авторизация, вы вошли в систему?"});
  }
  
  try {
    const { _id } = jwt.verify(tokenPassed, process.env.SECRET);
    
    // this will be called with every authirzation-demanding request made, can we optimize this with sessions?
    req.user = await User.findById(_id);
    
    next();

  } catch (err){
    console.error(err);
    let message = err.message;
    if (err.name == "TokenExpiredError"){
      res.clearCookie("userToken");
      message = "Вам необходимо снова войти в свою учётную запись";
    }
    res.status(401).json({ message });
  }
}

module.exports = auth;
