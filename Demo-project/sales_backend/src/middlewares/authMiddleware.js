const jwt = require('jsonwebtoken');
require('dotenv').config();

const authUser = (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if(authHeader){
        token = authHeader.substring(7);
    }
    else if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }

    if(!token){
        return res.status(401).json({
            error: 'Access denied',
            message: 'No authentication token provided'
        });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded.userId){
            return res.status(401).json({
                error: 'Invalid Token',
                message: 'Token missing required user information'
            });
        }

        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (err) {
        console.error('Authentication error: ', err);

        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({
                error: 'Token expired',
                message: 'Please login again'
            });
        }

        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({
                error: 'Invalid token',
                message: 'Token is malformed or invalid'
            });
        }

        if(err.name === 'NotBeforeError'){
            return res.status(401).json({
                error: 'Token not active',
                message: 'Token is not yet valid'
            });
        }

        return res.status(401).json({
            error: 'Authentication failed',
            message: 'Unable to authenticate user'
        });
    }
}

module.exports = {authUser};