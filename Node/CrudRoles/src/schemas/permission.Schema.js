import Joi from "joi";

export const permissionSchema = Joi.object({
    feature: Joi.string().min(3).max(20).required(),
    name: Joi.string().min(3).max(20).required()
})