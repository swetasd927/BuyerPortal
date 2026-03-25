import express from "express";
import Property from "../models/property.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/properties
router.get("/", protect, async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/properties/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/properties/seed
router.post("/seed", protect, async (req, res) => {
  try {
    await Property.deleteMany({});

    const samples = [
      {
        title: "Modern Apartment in Thamel",
        description: "2BHK with great city views",
        location: "Thamel, Kathmandu",
        price: 15000000,
        type: "apartment",
      },
      {
        title: "Villa in Bhaktapur",
        description: "Spacious 4BHK villa with garden",
        location: "Bhaktapur",
        price: 45000000,
        type: "villa",
      },
      {
        title: "Commercial Space in New Baneshwor",
        description: "Prime commercial space, ground floor",
        location: "New Baneshwor, Kathmandu",
        price: 30000000,
        type: "commercial",
      },
      {
        title: "Land Plot in Lalitpur",
        description: "5 aana land, road access",
        location: "Lalitpur",
        price: 20000000,
        type: "land",
      },
    ];

    const properties = await Property.insertMany(samples);
    res.status(201).json({ message: "Seeded successfully", properties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;