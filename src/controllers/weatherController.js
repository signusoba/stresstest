import axios from "axios";

export const getWeather = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Please provide latitude (lat) and longitude (lon)." });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      location: { latitude: lat, longitude: lon },
      current: {
        temperature: `${data.current.temperature_2m} °C`,
        wind_speed: `${data.current.wind_speed_10m} m/s`,
        time: data.current.time,
      },
      hourly: {
        time: data.hourly.time.slice(0, 5), // first 5 data points
        temperature_2m: data.hourly.temperature_2m.slice(0, 5),
        relative_humidity_2m: data.hourly.relative_humidity_2m.slice(0, 5),
        wind_speed_10m: data.hourly.wind_speed_10m.slice(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
};
