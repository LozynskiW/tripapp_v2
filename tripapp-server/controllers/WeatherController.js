import { Weather } from '../models/Weather'
const weatherApiKey = 'c34d83e991031fb4ba7d6f089478ee07'

exports.downloadWeatherByCity = async (req, res) => {

    let city = req.city 

    let weather = new Weather(weatherApiKey);

    return weather.downloadWeather(city);
}