import express from "express";
import Property from "../models/property.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//properties
router.post("/seed", protect, async (req, res) => {
  try {
    await Property.deleteMany({});

    const samples = [
      {
        title: "Modern Apartment in Thamel",
        description:
          "2BHK fully furnished apartment with city views and 24/7 security. Close to restaurants and tourist hubs.",
        location: "Thamel, Kathmandu",
        price: 15000000,
        type: "apartment",
      },
      {
        title: "Luxury Villa in Bhaktapur",
        description:
          "Spacious 4BHK villa with private garden, covered parking, and traditional Newari-inspired interior design.",
        location: "Suryabinayak, Bhaktapur",
        price: 45000000,
        type: "villa",
      },
      {
        title: "Commercial Space in New Baneshwor",
        description:
          "Prime ground-floor commercial unit ideal for retail or office. High foot traffic area with easy road access.",
        location: "New Baneshwor, Kathmandu",
        price: 30000000,
        type: "commercial",
      },
      {
        title: "Residential Land in Lalitpur",
        description:
          "5 aana flat land with 16 feet road access. Suitable for housing or apartment construction. All utilities available.",
        location: "Imadol, Lalitpur",
        price: 20000000,
        type: "land",
      },
      {
        title: "3BHK Apartment in Sanepa",
        description:
          "Newly built 3BHK apartment on the 4th floor with parking, rooftop access, and unobstructed mountain views.",
        location: "Sanepa, Lalitpur",
        price: 22500000,
        type: "apartment",
      },
      {
        title: "Independent House in Budhanilkantha",
        description:
          "Charming 3BHK independent house with a kitchen garden, 2 car parking, and peaceful surroundings near the temple.",
        location: "Budhanilkantha, Kathmandu",
        price: 28000000,
        type: "house",
      },
      {
        title: "Office Space in Durbar Marg",
        description:
          "Premium 1200 sqft office space on the 3rd floor in the heart of Kathmandu's business district. Lift access.",
        location: "Durbar Marg, Kathmandu",
        price: 55000000,
        type: "commercial",
      },
      {
        title: "Villa in Godawari",
        description:
          "5BHK luxury villa surrounded by greenery. Features a private pool, solar power system, and a large terrace.",
        location: "Godawari, Lalitpur",
        price: 75000000,
        type: "villa",
      },
      {
        title: "Land in Tokha",
        description:
          "8 aana land in a fast-developing area. Corner plot with 20 feet road access on two sides. Ideal for investment.",
        location: "Tokha, Kathmandu",
        price: 18000000,
        type: "land",
      },
      {
        title: "Studio Apartment in Maharajgunj",
        description:
          "Compact and modern studio apartment perfect for students or young professionals. Near embassies and hospitals.",
        location: "Maharajgunj, Kathmandu",
        price: 8500000,
        type: "apartment",
      },
      {
        title: "Commercial Building in Putalisadak",
        description:
          "4-storey commercial building with 8 rental units currently occupied. Strong rental yield of 5% annually.",
        location: "Putalisadak, Kathmandu",
        price: 120000000,
        type: "commercial",
      },
      {
        title: "Family House in Sitapaila",
        description:
          "Well-maintained 4BHK house with large living area, terrace, and garden. Quiet neighborhood, near schools.",
        location: "Sitapaila, Kathmandu",
        price: 32000000,
        type: "house",
      },
      {
        title: "Flat Land in Banepa",
        description:
          "12 aana agricultural land convertible to residential. Along the Araniko Highway with excellent connectivity.",
        location: "Banepa, Kavrepalanchok",
        price: 9500000,
        type: "land",
      },
      {
        title: "Penthouse in Jhamsikhel",
        description:
          "Stunning 3BHK penthouse with 360-degree views, private rooftop deck, modular kitchen, and premium finishes.",
        location: "Jhamsikhel, Lalitpur",
        price: 48000000,
        type: "apartment",
      },
      {
        title: "Boutique Hotel Space in Thamel",
        description:
          "6-storey building currently operating as a boutique hotel with 18 rooms. Fully furnished with steady bookings.",
        location: "Thamel, Kathmandu",
        price: 200000000,
        type: "commercial",
      },
    ];

    const properties = await Property.insertMany(samples);
    res.status(201).json({ message: "Seeded successfully", properties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

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

export default router;
