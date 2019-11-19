const { assert } = require('chai');
const { fetchWeather } = require('../script');

describe ('response code when doing fetch', function() {
  it("correct city", function(done) {
    const city = 'London';
    assert.doesNotThrow(function () {
      fetchWeather(city).then(json => {
          console.log(json.cod);
          assert.equal(json.cod, 200);
          done();
      }, done);
    });
  });

  it("correct city", function(done) {
    const city = 'gfmvro';
    assert.doesNotThrow(function () {
      fetchWeather(city).then(json => {
          console.log(json.cod);
          assert.equal(json.cod, 404);
          done();
      }, done);
    });
  });
});
