const RefreshToken = require('../models/refreshToken.model');
const {hashToken, generateAuthToken, generateRefreshToken} = require('../utils/token');
require('dotenv').config();

module.exports.refreshToken = async(req, res) => {
    let oldToken;
    if(req.cookies && req.cookies.refreshToken){
        oldToken = req.cookies.refreshToken
    }
    
    if(!oldToken){
        return res.status(401).json({ message: "No refresh token"});
    }

    const tokenHash = hashToken(oldToken);

    const storedToken = await RefreshToken.findOne({
        tokenHash,
        expiresAt: { $gt: new Date() },
        isRevoked: false
    });

    if(!storedToken){
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    storedToken.isRevoked = true;
    await storedToken.save();

    const newRefreshToken = generateRefreshToken();

    await RefreshToken.create({
        userId: storedToken.userId,
        tokenHash: hashToken(newRefreshToken),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    const newAccessToken = generateAccessToken(storedToken.userId);

    res
       .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
        })
       .json({ accessToken: newAccessToken });
};