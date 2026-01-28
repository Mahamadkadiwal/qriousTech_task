import Role from "../models/role.model.js";
import UserRole from "../models/user_role.model.js";
import Users from "../models/users.model.js";
import { comparePassword, generateAuthToken, hashPassword } from "../utils/token.js";

export const createUser = async(req, res) => {
    const { username, email, password, roleName} = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await Users.create({
            username, 
            email, 
            password: hashedPassword,
            roleName
        });

        const role = await Role.findOne({
            where: { name: roleName }
        });

        if(!role){
            return res.status(404).json({
                message: 'Role not found'
            })
        }

        await UserRole.create({
            user_id: newUser.user_id,
            role_id: role.role_id
        });

        const jwtPayload = {
            user_id: newUser.user_id,
            roles: [
                {
                role_id: role.role_id,
                name: role.name
                }
            ]
            };

        const token = generateAuthToken(jwtPayload);

        res.cookie('token', token, {
            httpOnly: true
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                role_id: role.role_id,
                role: role.name
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Users.findOne(
            { where: {email },
            include:[{
                model: Role,
                attributes: ['role_id','name'],
                through: { attributes: [] }
            }] 
        }
        );
        
        if(!user) return res.status(404).json({
            message: 'Invalid Username and Password'
        });

        const validPassword = await comparePassword(password, user.password);

        if(!validPassword) return  res.status(401).json({
            message: 'Invalid Username and Password'
        });

        const roles = user.roles.map(r => ({
            role_id: r.role_id, name: r.name
        }));

        const token = generateAuthToken({
            user_id: user.user_id, 
            roles: roles
        });

        res.cookie('token', token, {
            httpOnly: true
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: roles
            },
            token
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}
