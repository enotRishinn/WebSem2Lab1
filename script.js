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
    "city": resp.name;
    "text_weather": resp.weather[0].description;
    "temperature": resp.main.temp + " &deg;C";
    "pressure": resp.main.pressure + " hPA";
    "humidity": resp.main. 
    "wind speed":
  }
}
