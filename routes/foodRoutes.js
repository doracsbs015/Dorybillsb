const express = require("express");
const Food = require("../models/Food");
const router = express.Router();

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new food item
router.post("/", async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newFood = new Food({ name, price, stock });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update food item
router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete food item
router.delete("/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
