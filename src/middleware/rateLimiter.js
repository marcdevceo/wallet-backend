import { ratelimit } from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    // const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const result = await ratelimit.limit("my-rate-limit");

    if (!result.success) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};
