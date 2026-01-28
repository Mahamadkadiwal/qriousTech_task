import Joi from "joi";

export const createSchema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(40).required(),
    roleName: Joi.string().required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(40).required(),
});

