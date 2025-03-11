const MenuItem = require("../models/menu");

// @desc Add a new menu item (Admin only)
const addMenuItem = async (req, res) => {
  const { name, description, price, category, image, available } = req.body;

  try {
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      image,
      available: available !== undefined ? available : true,
    });

    await menuItem.save();
    res.status(201).json({ message: "Menu item added successfully", menuItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item", error: error.message });
  }
};

// @desc Get all menu items (Public)
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error: error.message });
  }
};

// @desc Update a menu item (Admin only)
const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image, available },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error: error.message });
  }
};

// @desc Delete a menu item (Admin only)
const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error: error.message });
  }
};

module.exports = { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem };
