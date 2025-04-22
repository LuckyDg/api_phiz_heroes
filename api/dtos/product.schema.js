const Joi = require('joi');

const productSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  level: Joi.number(),
});

const createProductSchema = productSchema.keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(10).required(),
});

const updateProductSchema = productSchema.keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(10).required(),
  level: Joi.number().optional(),
});

const getProductSchema = productSchema.keys({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
