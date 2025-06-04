import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV==="production") job.start();

app.use(rateLimiter); // Apply rate limiting middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api/transactions", transactionsRoute); // Use transactions route`

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
})

app.get("/heath", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit with a failure status code
  });
