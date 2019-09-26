function clickOnSearchButton() {
  let city = document.getElementById("city_input").value;
  let xhr = new XMLHttpRequest();
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
  "&appid=e972dcd233bab1ebce419c370711921f&units=metric&lang=en";

  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function () {
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
  "City": resp.name,
  "param": [
    {
      "type": "Weather",
      "value": resp.weather[0].description
    },
    {
      "type": "Temperature, °C",
      "value": resp.main.temp
    },
    {
      "type": "Pressure, hPA",
      "value": resp.main.pressure},
    {
      "type": "Humidity, %",
      "value": resp.main.humidity
    },
    {
      "type": "Wind speed, m/s",
      "value": resp.wind.speed
    },
    {
      "type": "Clouds, %",
      "value": resp.clouds.all
    },
  ]
  }
  return weather;
}

function displayWeather(weather) {
    let source = document.getElementById("weather-entry-template").innerHTML;
    let template = Handlebars.compile(source);
    let html = template(weather);
    document.getElementById("weather-block").innerHTML = html;

}
