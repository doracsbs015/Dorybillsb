const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Food = require("../models/Food");

// Place an order
router.post("/", async (req, res) => {
  try {
    const { userId, items } = req.body;
    let totalPrice = 0;

    for (const item of items) {
      const food = await Food.findById(item.foodId);

      if (!food) {
        return res.status(404).json({ message: "Food item not found" });
      }

      if (food.stock < item.quantity) {
        return res.status(400).json({ message: `Only ${food.stock} left in stock for ${food.name}` });
      }

      totalPrice += food.price * item.quantity;
    }

    // Deduct stock if order is successful
    for (const item of items) {
      await Food.findByIdAndUpdate(item.foodId, { $inc: { stock: -item.quantity } });
    }

    const newOrder = new Order({ userId, items, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
