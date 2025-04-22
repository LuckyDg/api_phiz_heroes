const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
let products = [
  {
    id: uuidv4(),
    name: 'Sword',
    description: 'A longsword with a sharp blade.',
    price: 100,
    level: 1,
  },
  {
    id: uuidv4(),
    name: 'Shield',
    description: 'A shield with a strong metal.',
    price: 50,
    level: 1,
  },
  {
    id: uuidv4(),
    name: 'Staff',
    description: 'A staff with a long wooden handle.',
    price: 150,
    level: 1,
  },
  {
    id: uuidv4(),
    name: 'Bow',
    description: 'A bow with a strong wooden shaft.',
    price: 200,
    level: 1,
  },
];

class ProductService {
  async findAll() {
    if (products.length === 0) {
      throw boom.notFound('No hay productos disponibles');
    }
    return products;
  }

  async findOne(id) {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    if (product.level < 1) {
      throw boom.unauthorized(
        'No tienes permisos para acceder a este producto',
      );
    }
    return product;
  }

  async create(product) {
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    products.push(newProduct);
    return newProduct;
  }

  async update(id, updates) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    products[index] = { ...products[index], ...updates };
    return products[index];
  }

  async delete(id) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    const deletedProduct = products.splice(index, 1);
    return deletedProduct[0];
  }
}

module.exports = ProductService;
