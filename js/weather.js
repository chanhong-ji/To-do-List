const API_KEY = "2b89b3a51447d57d60c4526743ed54f3";
const resetBtn = document.querySelector(".weather__top-bar i:last-child");

function Weather(name, icon, color) {
  this.name = name;
  this.icon = icon;
  this.color = color;
}

const weatherList = [];
weatherList.push(new Weather("Clear", '<i class="far fa-sun"></i>', "#ffd900"));
weatherList.push(new Weather("Wind", '<i class="fas fa-wind"></i>', "#165db5"));
weatherList.push(
  new Weather("Clouds", '<i class="fas fa-cloud"></i>', "#269af2")
);
weatherList.push(
  new Weather("Rain", '<i class="fas fa-cloud-rain"></i>', "#269af2")
);
weatherList.push(
  new Weather("Snow", '<i class="far fa-snowflake"></i>', "#79cfdc")
);

let savedGeolocation = localStorage.getItem("savedGeolocation");

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  savedGeolocation = {
    lat: lat,
    lon: lon,
  };
  localStorage.setItem("savedGeolocation", JSON.stringify(savedGeolocation));
  paintWeather(lat, lon);
}

function onGeoError() {
  alert(
    "Can't find you. If you allow your position, you can see the beautiful weather icon"
  );
}

function paintWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => {
      const weatherCity = document.querySelector(
        ".weather__place span:last-child"
      );
      const weatherIcon = document.querySelector(".weather-box__icon ");
      const weatherWeather = document.querySelector(
        ".weather-box span:first-child"
      );
      const weatherTemp = document.querySelector(".weather-box__temp");
      const weatherFeel = document.querySelector(
        ".weather-box__info span:first-child"
      );
      const weatherHumidity = document.querySelector(
        ".weather-box__info div span"
      );
      const weatherFull1 = document.querySelector(
        ".weather-full__column:first-child span:first-child"
      );
      const weatherFull2 = document.querySelector(
        ".weather-full__column:first-child span:nth-child(2)"
      );
      const weatherFull3 = document.querySelector(
        ".weather-full__column:last-child span:first-child"
      );
      const weatherFull4 = document.querySelector(
        ".weather-full__column:last-child span:last-child"
      );
      weatherCity.innerText = `${data.name}, ${data.sys.country}`;
      weatherIcon.style.color = weatherList.find(
        (weather) => weather.name == data.weather[0].main
      ).color;
      weatherWeather.innerHTML = weatherList.find(
        (weather) => weather.name == data.weather[0].main
      ).icon;
      weatherTemp.innerText = `${Math.floor(toCelsius(data.main.temp))}°`;
      weatherFeel.innerText = `Feels like ${toCelsius(
        data.main.feels_like
      ).toFixed(1)}`;
      weatherHumidity.innerText = `${data.main.humidity}%`;

      weatherFull1.innerText = `${data.weather[0].description}`;
      weatherFull2.innerText = `${data.main.pressure}hPa`;
      weatherFull3.innerText = `${data.wind.speed}m/s`;
      weatherFull4.innerText = `${(data.visibility / 1000).toFixed(3)}km`;
    });
}

function toCelsius(temp) {
  return temp - 273.15;
}

if (savedGeolocation) {
  const parsedGeolocation = JSON.parse(savedGeolocation);
  paintWeather(parsedGeolocation.lat, parsedGeolocation.lon);
} else {
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

resetBtn.addEventListener("click", () => {
  savedGeolocation = null;
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
});

const weatherBtn = document.querySelector(".weather-btn");
const weatherFull = document.querySelector(".weather-full");
weatherBtn.addEventListener("click", () =>
  weatherFull.classList.toggle("hidden")
);
