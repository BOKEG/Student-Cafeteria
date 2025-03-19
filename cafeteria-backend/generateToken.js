require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: "67d02a5ea817cc2bb63bf151" },
  process.env.JWT_SECRET || "your_secret_key",
  { expiresIn: "1h" }
);

console.log("Generated Admin Token:", token);
