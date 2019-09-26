function clickOnSearchButton() {

  let city = document.getElementsByClassName('city_input').value;
  let xhr = new XMLHttpRequest();
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city;

  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload() {
    if (xhr.status == 200) {
      let weather = getWeather(xhr.response);
      displayWeather(weather);
    } else {
      alert("Ошибка запроса. Проверьте правильность написания города");
    }
  }
  xhr.send();
}

function getWeather(resp) {
  let weather = {
  "city": resp.name,
  "text_weather": resp.weather[0].description,
  "Param": [
    {"type": "temperature", "value": resp.main.temp, "unit": " &deg;C"},
    {"type": "pressure", "value": resp.main.pressure, "unit": " hPA"},
    {"type": "humidity", "value": resp.main.humidity, "unit": "%"},
    {"type": "wind speed", "value": resp.wind.speed, "unit": " m/s"},
    {"type": "clouds", "value": resp.clouds.all, "unit": "%"},
  ]
  }
  return weather;
}

function displayWeather(weather) {

}
