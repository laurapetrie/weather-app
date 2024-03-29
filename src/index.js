//Search for a city

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-text-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

// Search for that city from the API url

function searchCity(cityInput) {
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

// Then display the weather conditions for that city

function displayWeather(response) {
  let city = document.querySelector("#city");

  let currentTemp = document.querySelector("#daily-temp");

  let currentConditions = document.querySelector("#conditions-overview");

  let currentHumidity = document.querySelector("#humidity");

  let currentWind = document.querySelector("#wind");

  let iconElement = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  celsiusTemperature = response.data.temperature.current;
  currentConditions.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = Math.round(response.data.temperature.humidity);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

// Get the daily forecast for the searched city

function getForecast(city) {
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Change the time to a readable day

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Then display the 5 day forecast for each day

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row justify-content-between weekly-weather-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `<div class="col-2 daily-forecast-card">
              <h5 class="forecast-day">${formatDay(forecastDay.time)}</h5>
              <img src="${
                forecastDay.condition.icon_url
              }" alt="weather-icon" id="icon" />
              <div class="forecast-temp">
                <span><strong>${Math.round(
                  forecastDay.temperature.maximum
                )}</strong>° | ${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
              </div>
            </div>
  `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Pin displays weather in current location

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPreciseLocation);
}

function currentPreciseLocation(position) {
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

// Switching between celsius and fahrenheit

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemp = document.querySelector("#daily-temp");
  currentTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemp = document.querySelector("#daily-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

//Current date and time

let now = new Date();
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

// Global variables

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let locationIcon = document.querySelector("#current-location-icon");
locationIcon.addEventListener("click", currentLocation);

let month = months[now.getMonth()];

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day} ${date} ${month}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

// searchCity function will run on page load

searchCity("London");
