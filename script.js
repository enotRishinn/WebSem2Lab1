var source = document.getElementById("weather-entry-template").innerHTML;
var error_source = document.getElementById("error-entry-template").innerHTML;

window.onload = () => {
    document.getElementById("form_city").addEventListener("submit", fetchWeather);
};

function fetchWeather(e) {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`
        + e.currentTarget.elements.city_input.value +
        `&appid=665c8e98e586f364800fd238b845d042&units=metric&lang=en`;
    fetch(url)
      .then(response => {
        response.json()
          .then(json => {
            if (response.ok) {
              displayWeather(getWeather(json));
              displayError(null);
            } else {
              displayWeather(null);
              displayError({
                message: json.message,
              });
            }
          });
        },
        error => displayError(error));
}

function getWeather(resp) {
  let weather = {
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
  return weather;
}

function displayWeather(weather) {
    let template = Handlebars.compile(source);
    document.getElementById("weather-block").innerHTML = template(weather);
}

function displayError(message) {
    let template = Handlebars.compile(error_source);
    document.getElementById("error-block").innerHTML = template(message);
}
