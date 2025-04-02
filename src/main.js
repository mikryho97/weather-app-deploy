import './style.css'
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is loaded!");

  const cityInput = document.getElementById("cityInput");
  const searchButton = document.getElementById("searchButton");
  const weatherContainer = document.getElementById("weatherContainer");
  const weatherImg = document.getElementById("weatherIcon");
  
  searchButton.addEventListener("click", function (event) {
      event.preventDefault(); 

      const city = cityInput.value.trim();
  
      if (!city) {
          alert("Type your city!");
          return;
      }

      getWeather(city);
  });

  async function getWeather(city) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      console.log("API KEY from env:", API_KEY);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.cod !== 200) {
              weatherContainer.innerHTML = `<p>Error: ${data.message}</p>`;
              return;
          }

          weatherContainer.innerHTML = `
              <h2>City: <span>${city}</span></h2>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Humidity: ${data.main.humidity}%</p>
              <p>Wind Speed: ${data.wind.speed} m/s</p>
              <p>Cloudiness: ${data.clouds.all}%</p>
          `;
          const dataIcon = data.weather[0].icon;  
          weatherImg.src = `https://openweathermap.org/img/wn/${dataIcon}@2x.png`;
          weatherImg.style.display = 'block';
          localStorage.setItem('lastcity', city);
      } catch (error) {
          console.error("Error request:", error);
          weatherContainer.innerHTML = `<p>Error loading data</p>`;
      }
  }
});

