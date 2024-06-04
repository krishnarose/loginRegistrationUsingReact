// insertLocations.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDb } from "./ConnectDb.js";
import { Country } from "./Location.js";

dotenv.config(); // Load environment variables

const countries = [
  {
    name: "India",
    code: "IN",
    states: [
      {
        name: "Maharashtra",
        code: "MH",
        cities: [{ name: "Mumbai" }, { name: "Pune" }, { name: "Nagpur" }],
      },
      {
        name: "Karnataka",
        code: "KA",
        cities: [{ name: "Bengaluru" }, { name: "Mysuru" }],
      },
      {
        name: "Jharkhand",
        code: "JH",
        cities: [
          { name: "Dhanbad" },
          { name: "Ranchi" },
          { name: "Jamshedpur" },
          { name: "Bokaro Steel City" },
          { name: "Deoghar" },
          { name: "Phusro" },
          { name: "Adityapur" },
          { name: "Hazaribag" },
          { name: "Giridih" },
          { name: "Ramgarh" },
          { name: "Jhumri Tilaiya" },
          { name: "Saunda" },
          { name: "Sahibganj" },
          { name: "Medininagar (Daltonganj)" },
          { name: "Chaibasa" },
          { name: "Chatra" },
          { name: "Gumia" },
          { name: "Dumka" },
          { name: "Madhupur" },
          { name: "Chirkunda" },
          { name: "Pakaur" },
          { name: "Simdega" },
          { name: "Musabani" },
          { name: "Mihijam" },
          { name: "Patratu" },
          { name: "Lohardaga" },
          { name: "Tenu dam-cum-Kathhara" },
        ],
      },
    ],
  },
  {
    name: "United States",
    code: "US",
    states: [
      {
        name: "California",
        code: "CA",
        cities: [{ name: "Los Angeles" }, { name: "San Francisco" }],
      },
      {
        name: "New York",
        code: "NY",
        cities: [{ name: "New York City" }, { name: "Buffalo" }],
      },
    ],
  },
];

const insertLocations = async () => {
  await connectToDb();

  try {
    const inserted = await Country.insertMany(countries);
    console.log(
      "Countries, states, and cities inserted successfully!",
      inserted
    );
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close(() => {
      console.log("Mongoose connection closed");
    });
  }
};

insertLocations();
