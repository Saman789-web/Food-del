import fs from "fs/promises";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js"; 

// ADD FOOD
const addFood = async (req, res) => {
  try {
    const image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log("ADD FOOD ERROR:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};


// LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });

  } catch (error) {
    console.log("LIST FOOD ERROR:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};




// Remove a food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid food ID" });
    }

    // Find the food item
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete the image file if it exists
    if (food.image) {
      try {
        await fs.unlink(`uploads/${food.image}`);
        console.log(`Image ${food.image} deleted`);
      } catch (err) {
        console.warn("Could not delete image:", err.message);
      }
    }

    // Delete the food from the database
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export { addFood, listFood, removeFood };
