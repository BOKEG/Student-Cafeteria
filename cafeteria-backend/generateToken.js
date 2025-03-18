require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: "67d82ac6c56bf9d56a0d14a8" },
  process.env.JWT_SECRET || "your_secret_key",
  { expiresIn: "1h" }
);

console.log("Generated Admin Token:", token);
