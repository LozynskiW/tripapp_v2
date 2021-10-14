const superagent = require('superagent');

// key: c34d83e991031fb4ba7d6f089478ee07
class WeatherSchema {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async sendRequest(getQuery) {
        let response = await superagent.get('https://' + 'api.openweathermap.org/data/2.5/weather')
            .query(getQuery)
        
        return response.body;
    }

    downloadWeatherByCity(city) {
        let query = {
            q: city,
            lang: 'pl',
            appid: this.apiKey
        }

        return this.sendRequest(query);
    }

}

module.exports = WeatherSchema;