const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cron = require('node-cron');
const { updateOrderStatus } = require('./controllers/orderController');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

// CRON Job: Update Order Status
// cron.schedule('*/10 * * * * *', () => {
//     updateOrderStatus();
//     console.log('Order statuses updated.');
// });
// CRON Job: Process Order Queue and Update Status
cron.schedule('*/10 * * * * *', () => {
    console.log('Processing order queue...');
    updateOrderStatus();
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const menuRoutes = require('./routes/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const cron = require('node-cron');
// const { updateOrderStatus } = require('./controllers/orderController');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());  // Built-in middleware for parsing JSON

// // Routes
// app.use('/menu', menuRoutes);
// app.use('/orders', orderRoutes);

// // CRON Job: Process Order Queue and Update Status every 10 seconds
// cron.schedule('*/10 * * * * *', () => {
//     console.log('Processing order queue...');
//     updateOrderStatus();
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
