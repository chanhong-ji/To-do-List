const API_KEY = "2b89b3a51447d57d60c4526743ed54f3";

function Weather(name, icon) {
  this.name = name;
  this.icon = icon;
}
const weatherList = [];
weatherList.push(new Weather("Clear", '<i class="far fa-sun"></i>'));
weatherList.push(new Weather("Wind", '<i class="fas fa-wind"></i>'));
weatherList.push(new Weather("Clouds", '<i class="fas fa-cloud"></i>'));
weatherList.push(new Weather("Rain", '<i class="fas fa-cloud-rain"></i>'));
weatherList.push(new Weather("Snow", '<i class="far fa-snowflake"></i>'));

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => {
      // 세부정보
      console.dir(data);
      const weatherCity = document.querySelector(
        ".weather__place span:last-child"
      );
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
      // 코드
      weatherCity.innerText = `${data.name}, ${data.sys.country}`;
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

function onGeoError() {
  alert(
    "Can't find you. If you allow your posotion, you can see the beautiful weather icon"
  );
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function toCelsius(temp) {
  return temp - 273.15;
}

// weather.desciption, wind.speed, main.pressure(hPa) ,visivility (m -> km)

const weatherBtn = document.querySelector(".weather-btn");
const weatherFull = document.querySelector(".weather-full");
weatherBtn.addEventListener("click", () =>
  weatherFull.classList.toggle("hidden")
);
