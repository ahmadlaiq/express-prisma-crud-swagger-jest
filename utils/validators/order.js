const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi untuk create order
const validateOrder = [
    // Validasi product, price, dan qty
    body('product').isString().notEmpty(),
    body('price').isNumeric().notEmpty(),
    body('qty').isNumeric().notEmpty(),
];

module.exports = { validateOrder }