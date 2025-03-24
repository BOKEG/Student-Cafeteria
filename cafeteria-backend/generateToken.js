require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: "67d029e2a817cc2bb63bf14e" },
  process.env.JWT_SECRET || "your_secret_key",
  { expiresIn: "1h" }
);

console.log("Generated Admin Token:", token);
