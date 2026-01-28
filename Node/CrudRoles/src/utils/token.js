import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateAuthToken = function (payload) {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return token;
};

export const comparePassword = async function(password, hashpassword){
    return await bcrypt.compare(password, hashpassword);
}

export const hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

export const getTokenFromHeaderOrCookie = function(req){
  let token;
  const authHeader = req.headers.authorization;
    if(authHeader){
        token = authHeader.substring(7);
    }
    else if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }
    return token;
}