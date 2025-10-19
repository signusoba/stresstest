document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    // 1. Get coordinates from Open-Meteo's geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found. Please try again.");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Get weather data
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`
    );
    const weatherData = await weatherResponse.json();

    const current = weatherData.current;

    // Weather code translation
    const weatherCodes = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      61: "Light rain",
      71: "Light snow fall",
      80: "Rain showers",
    };

    // 3. Update UI
    document.getElementById("weatherInfo").classList.remove("hidden");
    document.getElementById("location").textContent = `${name}, ${country}`;
    document.getElementById("temperature").textContent = `${current.temperature_2m}°C`;
    document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
    document.getElementById("windSpeed").textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById("condition").textContent = weatherCodes[current.weather_code] || "Unknown";

  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
});
