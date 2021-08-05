const API_KEY = "2b89b3a51447d57d60c4526743ed54f3";
// const weatherList = ["clear", "wind", "clouds", "rain", "snow"];
// const weatherIconList = [

// ]

function onGeoOk(position) {
  //   console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => {
      const weatherCity = document.querySelector(
        ".title-bar__weather span:first-child"
      );
      const weatherWeather = document.querySelector(
        ".title-bar__weather span:nth-child(2)"
      );
      weatherCity.innerText = data.name;
      weatherWeather.innerText = data.weather[0].main;
      // for (let i = 0; i < weatherList.length; i++) {
      //   const nowWeather = weatherList[i];
      //   if (data.weather[0].main === nowWeather) {

      //   }
      // }
    });
}

function onGeoError() {
  alert(
    "Can't find you. If you allow your posotion, you can see the beautiful weather icon"
  );
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
