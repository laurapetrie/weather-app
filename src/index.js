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
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
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

// Current location button

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPreciseLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);

function currentPreciseLocation(position) {
  let apiKey = "e7cba0f4344b9ae720f19t5d48co46c3";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coordinates.latitude}&lon=${position.coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

//Date and time

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
let month = months[now.getMonth()];

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day} ${date} ${month}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

// searchCity function outside of the other functions will run on page load
searchCity("London");
