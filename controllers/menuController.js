const { menuItems } = require('../models/menu');

// Add Menu Item
exports.addMenuItem = (req, res) => {
    const { name, price, category } = req.body;
    if (!name || price <= 0 || !['Starter', 'main', 'dessert'].includes(category)) {
        return res.status(400).json({ error: 'Invalid menu item details.' });
    }

    const existingItem = menuItems.find(item => item.name === name);
    if (existingItem) {
        Object.assign(existingItem, { price, category });
        return res.json({ message: 'Menu item updated.', item: existingItem });
    }

    const newItem = { id: menuItems.length + 1, name, price, category };
    menuItems.push(newItem);
    res.status(201).json({ message: 'Menu item added.', item: newItem });
};

// Get Menu Items
exports.getMenu = (req, res) => {
    res.json({ menu: menuItems });
};
