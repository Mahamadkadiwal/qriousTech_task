const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
    status: Joi.string().valid('active', 'inactive', 'delete').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {userSchema, loginSchema};