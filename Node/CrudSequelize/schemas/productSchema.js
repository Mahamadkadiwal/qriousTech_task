const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    description: Joi.string().min(10).max(200).required(),
    price: Joi.number().positive().precision(2).required()
});    

const updateSchema = Joi.object({
    name: Joi.string().min(3).max(40).optional(),
    description: Joi.string().min(10).max(200).optional(),
    price: Joi.number().positive().precision(2).optional()
}).min(1);  

module.exports = {productSchema, updateSchema};
