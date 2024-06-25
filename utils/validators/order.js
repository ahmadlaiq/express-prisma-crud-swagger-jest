const { body } = require('express-validator')

// Definisikan validasi untuk create order
const validateOrder = [
  // Validasi product, price, dan qty
  body('product').isString().notEmpty(),
  body('price').isNumeric().notEmpty(),
  body('qty').isNumeric().notEmpty(),
]

module.exports = { validateOrder }
