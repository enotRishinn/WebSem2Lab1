const fetch = require('node-fetch');

export function onSubmit(e) {
    e.preventDefault();
    fetchWeather(e.currentTarget.elements.city_input.value)
      .then(json => {
        if (json.cod == 200) {
          displayWeather(getWeather(json));
          displayError(null);
        } else {
          displayWeather(null);
          displayError(getError(json));
        }
      })
}

export function fetchWeather(city){
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=665c8e98e586f364800fd238b845d042&units=metric&lang=en`)
    .then(response => response.json());
}

export function getError(resp) {
  return {
    message: resp.message,
  }
}

export function getWeather(resp) {
  return {
  city: resp.name,
  param: [
    {
      type: 'Weather',
      value: resp.weather[0].description
    },
    {
      type: 'Temperature, °C',
      value: resp.main.temp
    },
    {
      type: 'Pressure, hPA',
      value: resp.main.pressure,
    },
    {
      type: 'Humidity, %',
      value: resp.main.humidity
    },
    {
      type: 'Wind speed, m/s',
      value: resp.wind.speed
    },
    {
      type: 'Clouds, %',
      value: resp.clouds.all
    },
  ]
  }
}

export function displayWeather(weather) {
  var source = document.getElementById("weather-entry-template").innerHTML;
    let template = Handlebars.compile(source);
    document.getElementById("weather-block").innerHTML = template(weather);
}

export function displayError(message) {
  var error_source = document.getElementById("error-entry-template").innerHTML;
    let template = Handlebars.compile(error_source);
    document.getElementById("error-block").innerHTML = template(message);
}
