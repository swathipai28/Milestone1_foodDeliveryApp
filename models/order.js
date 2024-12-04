const orders = [];
const STATUS_SEQUENCE = ['Preparing', 'Out for Delivery', 'Delivered'];
const orderQueue = []; // Queue to manage orders for status updates

module.exports = { orders, STATUS_SEQUENCE, orderQueue };
