const { assert } = require('chai');
const { fetchWeather, getWeather, getError } = require('../script');

describe ('response code when doing fetch in function fetchWeather', function() {

  it('correct city name', function(done) {
    const city = 'London';
    assert.doesNotThrow(function () {
      fetchWeather(city).then(json => {
          console.log(json.cod, 'must be equal 200');
          assert.equal(json.cod, 200);
          done();
      }, done);
    });
  });

  it('incorrect city', function(done) {
    const city = 'gfmvro';
    assert.doesNotThrow(function () {
      fetchWeather(city).then(json => {
          console.log(json.cod, 'must be equal 404');
          assert.equal(json.cod, 404);
          done();
      }, done);
    });
  });
});

describe ('take the data from the response', function() {
  it('correct city name -> response.ok - check function getWeather', function () {
    const resp = {
      "coord": {
          "lon": -0.13,
          "lat": 51.51
      },
      "weather": [{
        "id": 300,
        "main": "Drizzle",
        "description": "light intensity drizzle",
        "icon": "09d"
      }],
      "base": "stations",
      "main": {
          "temp": 7.32,
          "pressure": 1012,
          "humidity": 81,
          "temp_min": 6.15,
          "temp_max": 8.15
      },
      "visibility": 10000,
      "wind": {
          "speed": 4.1,
          "deg": 80
      },
      "clouds": {
          "all": 90
      },
      "dt": 1485789600,
      "sys": {
          "type": 1,
          "id": 5091,
          "message": 0.0103,
          "country": "GB",
          "sunrise": 1485762037,
          "sunset": 1485794875
      },
      "id": 2643743,
      "name": "London",
      "cod": 200
    }

    const expectWeatherData = {
    city: 'London',
    param: [
      {
        type: 'Weather',
        value: 'light intensity drizzle'
      },
      {
        type: 'Temperature, °C',
        value: 7.32
      },
      {
        type: 'Pressure, hPA',
        value: 1012,
      },
      {
        type: 'Humidity, %',
        value: 81
      },
      {
        type: 'Wind speed, m/s',
        value: 4.1
      },
      {
        type: 'Clouds, %',
        value: 90
      },
    ]
    }
    console.log(getWeather(resp), 'must be equal', expectWeatherData);
    const weather = getWeather(resp);
    assert.deepEqual(weather, expectWeatherData);
  });

  it('correct city name -> response.ok - check function getWeather', function () {
    const resp = {
      "cod": "404",
      "message": "city not found"
    }

    const expectErrorData = {
      message: 'city not found',
    }

    console.log(getError(resp), 'must be equal', expectErrorData);
    const error = getError(resp);
    assert.deepEqual(error, expectErrorData);
  });
});
