const API_KEY = "604cdb5234582ce65e1555fd5df35291";

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const icon = document.createElement("img");
  console.log(url);
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
      const weatherBox = document.querySelector("#weather");
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText =  `${data.weather[0].main} / ${Math.round(data.main.temp - 273.15)}`;
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherBox.appendChild(icon);
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

