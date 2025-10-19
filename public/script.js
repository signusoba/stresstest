document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    const current = data.current;
    const info = data.info;

    document.getElementById("weatherInfo").classList.remove("hidden");
    document.getElementById("location").textContent = `${info.name}, ${info.country}`;
    document.getElementById("temperature").textContent = `${current.temperature_2m}°C`;
    document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
    document.getElementById("windSpeed").textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById("feelsLike").textContent = `${current.apparent_temperature}°C`;
    document.getElementById("condition").textContent = current.condition;
  } catch (err) {
    alert("Error fetching weather data");
    console.error(err);
  }
});
