const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.generateAuthToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

exports.generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
}

exports.hashToken = (token) => {
    return crypto
       .createHash("sha256")
       .update(token)
       .digest("hex") 
}