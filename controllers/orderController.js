
const { orders, STATUS_SEQUENCE, orderQueue } = require('../models/order');
const { menuItems } = require('../models/menu');

// Place Order
exports.placeOrder = (req, res) => {
    const { itemIds } = req.body;

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
        return res.status(400).json({ error: 'Invalid order request.' });
    }

    const orderItems = itemIds.map(id => menuItems.find(item => item.id === id));
    if (orderItems.some(item => !item)) {
        return res.status(404).json({ error: 'Some menu items not found.' });
    }

    const newOrder = {
        id: orders.length + 1,
        items: orderItems,
        status: STATUS_SEQUENCE[0], // "Preparing"
        createdAt: new Date(),
    };

    orders.push(newOrder);
    orderQueue.push(newOrder.id); // Add order to the queue
    res.status(201).json({ message: 'Order placed.', order: newOrder });
};

// Get Order Details by ID
exports.getOrder = (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === parseInt(id));

    if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json({ order });
};
// Update Order Status Using Queue
exports.updateOrderStatus = () => {
    if (orderQueue.length === 0) {
        console.log('No orders in the queue for status updates.');
        return;
    }

    const orderId = orderQueue.shift(); // Get the first order in the queue
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        console.log(`Order with ID ${orderId} not found.`);
        return;
    }

    const currentIndex = STATUS_SEQUENCE.indexOf(order.status);
    if (currentIndex < STATUS_SEQUENCE.length - 1) {
        order.status = STATUS_SEQUENCE[currentIndex + 1];
        console.log(`Order ${order.id} status updated to ${order.status}`);

        // If not delivered, re-add the order to the queue
        if (order.status !== 'Delivered') {
            orderQueue.push(orderId);
            console.log(`Order ${order.id} re-added to the queue.`);
        }
    } else {
        console.log(`Order ${order.id} already has status ${order.status}`);
    }
};


// Update Order Status Using Queue
// exports.updateOrderStatus = () => {
//     if (orderQueue.length === 0) {
//         console.log('No orders in the queue for status updates.');
//         return;
//     }

//     const orderId = orderQueue.shift(); // Get the first order in the queue
//     const order = orders.find(o => o.id === orderId);

//     if (!order) return;

//     const currentIndex = STATUS_SEQUENCE.indexOf(order.status);
//     if (currentIndex < STATUS_SEQUENCE.length - 1) {
//         order.status = STATUS_SEQUENCE[currentIndex + 1];

//         // If not delivered, re-add the order to the queue
//         if (order.status !== 'Delivered') {
//             orderQueue.push(orderId);
//         }
//     }
// };
// const { orders, STATUS_SEQUENCE, orderQueue } = require('../models/order');
// const { menuItems } = require('../models/menu');

// // Place Order
// exports.placeOrder = (req, res) => {
//     const { itemIds } = req.body;

//     // Validate itemIds
//     if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
//         return res.status(400).json({ error: 'Invalid order request. Please provide itemIds.' });
//     }

//     // Check if items exist in the menu
//     const orderItems = itemIds.map(id => menuItems.find(item => item.id === id));
//     if (orderItems.some(item => !item)) {
//         return res.status(404).json({ error: 'Some menu items not found.' });
//     }

//     // Create new order
//     const newOrder = {
//         id: orders.length + 1,  // You may want to improve this method for generating unique IDs
//         items: orderItems,
//         status: STATUS_SEQUENCE[0], // Start with "Preparing"
//         createdAt: new Date(),
//     };

//     // Add order to orders and queue
//     orders.push(newOrder);
//     orderQueue.push(newOrder.id); // Add the new order to the status update queue

//     res.status(201).json({ message: 'Order placed.', order: newOrder });
// };

// // Get Order Details by ID
// exports.getOrder = (req, res) => {
//     const { id } = req.params;
//     const orderId = parseInt(id, 10); // Ensure base 10 for parsing

//     if (isNaN(orderId)) {
//         return res.status(400).json({ error: 'Invalid order ID.' });
//     }

//     const order = orders.find(o => o.id === orderId);

//     if (!order) {
//         return res.status(404).json({ error: 'Order not found.' });
//     }

//     res.status(200).json({ order });
// };

// // Update Order Status Using Queue
// exports.updateOrderStatus = () => {
//     if (orderQueue.length === 0) {
//         console.log('No orders in the queue for status updates.');
//         return;
//     }

//     // Get the first order in the queue
//     const orderId = orderQueue.shift(); 
//     const order = orders.find(o => o.id === orderId);

//     if (!order) {
//         console.log(`Order with ID ${orderId} not found.`);
//         return;
//     }

//     // Update order status
//     const currentIndex = STATUS_SEQUENCE.indexOf(order.status);
//     if (currentIndex < STATUS_SEQUENCE.length - 1) {
//         order.status = STATUS_SEQUENCE[currentIndex + 1];

//         // If not delivered, re-add the order to the queue for the next status update
//         if (order.status !== 'Delivered') {
//             orderQueue.push(orderId);
//         }
//     } else {
//         console.log(`Order ${orderId} has reached 'Delivered' status.`);
//     }
// };
