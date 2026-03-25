import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./models/property.js";

dotenv.config();

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Property.deleteMany({});
    await Property.insertMany(samples);
    console.log("Properties seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  });