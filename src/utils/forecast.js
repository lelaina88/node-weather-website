const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d81067693700919e8c40c6be8498aa8b&query='+ latitude + ',' + longitude + '&units=f'

    request({
        url,
        json: true
    },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if(body.error)  {
                console.log(url)
                console.log(body.error)
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
             }
        })
}
 
module.exports = forecast