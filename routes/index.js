//import express
const express = require('express')
//init express router
const router = express.Router();
//import verifyToken/ middleware
const verifyToken = require('../middlewares/auth');
//import controller
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const orderController = require('../controllers/OrderController');

//import validate
const {
    validateRegister,
    validateLogin
} = require('../utils/validators/auth');
const {
    validateUser
} = require('../utils/validators/user');
const {
    validateOrder
} = require('../utils/validators/order');

//define route for auth
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

//define route for user
router.get('/users', verifyToken, userController.getUsers);
router.post('/users', verifyToken, validateUser, userController.storeUser);
router.get('/users/:id', verifyToken, userController.getUserById);
router.put('/users/:id', verifyToken, validateUser, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

//define route for order
router.get('/orders', verifyToken, orderController.getOrders);
router.post('/orders', verifyToken, validateOrder, orderController.storeOrder);
router.get('/orders/:id', verifyToken, orderController.getOrderById);
router.put('/orders/:id', verifyToken, validateOrder, orderController.updateOrder);
router.delete('/orders/:id', verifyToken, orderController.deleteOrder);

//export router
module.exports = router