const Handlebars = require('handlebars');

export function onSubmit(e) {
    e.preventDefault();
    fetchWeather(e.currentTarget.elements.city_input.value);
}

export function fetchWeather(city){
  let source = document.getElementById("weather-entry-template").innerHTML;
  let error_source = document.getElementById("error-entry-template").innerHTML;
  let weather_block = document.getElementById("weather-block").innerHTML;
  let error_block = document.getElementById("error-block").innerHTML;
  
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=665c8e98e586f364800fd238b845d042&units=metric&lang=en`)
    .then(response => { response.json()
      .then(json => {
        if (response.ok) {
          weather_block = renderBody(getWeather(json), source);
          error_block = renderBody(null, error_source);
        } else {
          weather_block = renderBody(null, source);
          error_block = renderBody(getError(json), error_source);
        }
      });
    },
    error => displayError(error));
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

export function renderBody(htmlBody, source) {
    let temp = Handlebars.compile(source);
    return temp(htmlBody);
}
