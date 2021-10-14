var WeatherSchema = require('../models/Weather');

const weatherApiKey = 'c34d83e991031fb4ba7d6f089478ee07'

test('weather download test', async () => {

    let weather = new WeatherSchema(weatherApiKey);

    let currentWeather = await weather.downloadWeatherByCity('Warsaw');
    
    expect(currentWeather)
        .not.toBe(null)
});