const express = require('express');
const { placeOrder, getOrder } = require('../controllers/orderController');

const router = express.Router();

// Place Order
router.post('/', placeOrder);

// Get Order by ID
router.get('/:id', getOrder);

module.exports = router;
