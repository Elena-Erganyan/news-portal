const jwt = require("jsonwebtoken");

const createToken = (tokenData, duration = "1hr", extraSecret = "") => {
  return jwt.sign(
    tokenData,
    process.env.SECRET + extraSecret,
    { expiresIn: duration }
  );
}

module.exports = createToken;
