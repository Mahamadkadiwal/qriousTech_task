import jwt from 'jsonwebtoken';
import { getTokenFromHeaderOrCookie } from '../utils/token.js';


export const authUser = (req, res, next) => {
    const token = getTokenFromHeaderOrCookie(req);

    if(!token){
        return res.status(401).json({
            error: 'Access denied',
            message: 'No authentication token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded.user_id){
            return res.status(401).json({
                error: 'Invalid Token',
                message: 'Token missing required user information'
            });
        }

        const roles = decoded.roles || [];

        req.user = {
            userId: decoded.user_id,
            roles: roles,
            roleIds: roles.map(r => r.role_id),
            roleNames: roles.map(r => r.name)
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

export const authUserAdmin = (req, res, next) => {
    const token = getTokenFromHeaderOrCookie(req);

    if(!token){
        return res.status(401).json({
            error: 'Access denied',
            message: 'No authentication token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded.id){
            return res.status(401).json({
                error: 'Invalid Token',
                message: 'Token missing required user information'
            });
        }

        req.user = {
            userId: decoded.id,
            roleId: decoded.role_id,
            role: decoded.role
        };

        if(decoded.role !== 'admin'){
            return res.status(401).json({
                message: 'You do not have permission to access this resource'
            })
        }
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