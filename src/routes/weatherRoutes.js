import express from "express";
import { getWeather } from "../controllers/weatherController.js";

const router = express.Router();

// Example: /api/weather?lat=14.6&lon=120.98
router.get("/", getWeather);

export default router;
