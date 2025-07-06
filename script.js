async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '224c23f5f7a54fc69b5142141250607';
  const errorMsg = document.getElementById('errorMsg');
  const iconEl = document.getElementById('icon');
  const descEl = document.getElementById('description');
  const tempEl = document.getElementById('temp');
  const humidityEl = document.getElementById('humidity');
  const windEl = document.getElementById('wind');

  if (!city) {
    errorMsg.textContent = '⚠️ Please enter a city name.';
    return;
  }

  errorMsg.textContent = '';
  descEl.textContent = 'Loading...';
  tempEl.textContent = '--°C';
  humidityEl.textContent = 'Humidity: --%';
  windEl.textContent = 'Wind: -- km/h';
  iconEl.src = 'https://cdn.weatherapi.com/weather/64x64/day/113.png';

  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if (!res.ok) throw new Error('Invalid city');

    const data = await res.json();

    document.getElementById('cityInput').value = '';
    descEl.textContent = data.current.condition.text;
    tempEl.textContent = `${data.current.temp_c}°C`;
    humidityEl.textContent = `Humidity: ${data.current.humidity}%`;
    windEl.textContent = `Wind: ${data.current.wind_kph} km/h`;
    iconEl.src = `https:${data.current.condition.icon}`;
  } catch (err) {
    errorMsg.textContent = '❌ Could not find city. Try again.';
    descEl.textContent = 'Error';
  }
}
