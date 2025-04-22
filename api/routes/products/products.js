const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');
const validatorHandler = require('../../dtos/validators.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../../dtos/product.schema');

const service = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const product = await service.findOne(req.params.id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const newProduct = await service.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(updateProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const updatedProduct = await service.update(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await service.delete(req.params.id);
    res.json({ message: 'Producto eliminado', product: deletedProduct });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
