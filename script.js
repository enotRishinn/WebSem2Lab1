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
      alert("The request failed. Check the spelling of the city");
    }
  }
  xhr.send();
}

function getWeather(resp) {
  let weather = {
  "param": [
    {"type": "City", "value": resp.name},
    {"type": "Weather", "value": resp.weather[0].description},
    {"type": "Temperature, &deg;C", "value": resp.main.temp},
    {"type": "Pressure, hPA", "value": resp.main.pressure},
    {"type": "Humidity, %", "value": resp.main.humidity},
    {"type": "Wind speed, m/s", "value": resp.wind.speed},
    {"type": "Clouds, %", "value": resp.clouds.all},
  ]
  }
  return weather;
}

function displayWeather(weather) {

}
