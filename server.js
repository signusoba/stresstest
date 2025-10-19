import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./src/routes/weatherRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public")); // 👈 serves index.html

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
