import express from "express";
import Favourite from "../models/favourite.js";
import Property from "../models/property.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user._id }).populate("property");
    res.json({ count: favourites.length, favourites });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const favourite = await Favourite.create({
      user: req.user._id,
      property: propertyId,
    });

    res.status(201).json({ message: "Added to favourites", favourite });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Property already in favourites" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const favourite = await Favourite.findOneAndDelete({
      user: req.user._id,
      property: propertyId,
    });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    res.json({ message: "Removed from favourites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;