//Search engine

//Search for a city
function citySearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-text-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", citySearch);

function searchCity(cityInput) {
  let apiKey = "4ceb52be1d2505a597cef32a455231ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#daily-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temperature;
  let currentConditions = document.querySelector("#conditions-overview");
  let conditions = response.data.weather[0].main;
  currentConditions.innerHTML = conditions;
  let currentHumidity = document.querySelector("#current-humidity");
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentWind = document.querySelector("#current-wind");
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Windspeed: ${wind} mph`;
}
// Adding the searchCity function outside of the other functions means that it will search for London on page load
searchCity("London");

// Current location button

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPreciseLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);

function currentPreciseLocation(position) {
  let apiKey = "4ceb52be1d2505a597cef32a455231ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

//Date and time

let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

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
let month = months[now.getMonth()];

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day} ${date} ${month}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

// function changeCelsius() {
//   let currentCelsius = document.querySelector("#daily-temp");
//   currentCelsius.innerHTML = 17;
// }
// let clickCelsius = document.querySelector("#current-temp-celsius");
// clickCelsius.addEventListener("click", changeCelsius);

// function changeFahrenheit() {
//   let currentFahrenheit = document.querySelector("#daily-temp");
//   currentFahrenheit.innerHTML = 63;
// }
// let clickFahrenheit = document.querySelector("#current-temp-fahrenheit");
// clickFahrenheit.addEventListener("click", changeFahrenheit);
