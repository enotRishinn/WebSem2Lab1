const Handlebars = require('handlebars');

export function onSubmit(e) {
    e.preventDefault();
    fetchWeather(e.currentTarget.elements.city_input.value);
}

export function fetchWeather(city){
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=665c8e98e586f364800fd238b845d042&units=metric&lang=en`)
    .then(response => { response.json()
      .then(json => {
        var source = document.getElementById("weather-entry-template").innerHTML;
        var error_source = document.getElementById("error-entry-template").innerHTML;
        if (response.ok) {
          document.getElementById("weather-block").innerHTML = renderBody(getWeather(json), source);
          document.getElementById("error-block").innerHTML = renderBody(null, error_source);
        } else {
          document.getElementById("weather-block").innerHTML = renderBody(null, source);
          document.getElementById("error-block").innerHTML = renderBody(getError(json), error_source);
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
