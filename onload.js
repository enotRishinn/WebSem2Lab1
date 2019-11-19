import { displayWeather,getWeather,displayError,fetchWeather } from './script';

window.onload = () => {
    document.getElementById("form_city").addEventListener("submit", onSubmit);
};

function onSubmit(e) {
    e.preventDefault();
    fetchWeather(e.currentTarget.elements.city_input.value)
      .then(json => {
        console.log(json);
        if (json.cod == 200) {
          console.log("god");
          displayWeather(getWeather(json));
          displayError(null);
          console.log("jhgfd");
        } else {
          console.log("bad");
          displayWeather(null);
          displayError({
            message: json.message,
          });
        }
      })
}
