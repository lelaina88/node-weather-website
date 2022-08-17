const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiY2xlbGlhZGV2aWV0cm8iLCJhIjoiY2w2cDg2NzZ4MGh5ZTNvcGs3aDI5M21xZSJ9.gzH_V6kS_4ITIKGgCTB-Yg'
    request({
        url,
        json: true
    },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to geocoding service', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to retrive geocoding info', undefined)
            } else {
                const latitude = body.features[0].center[0]
                const longitude = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, {latitude, longitude, location})
             }
        })
}

module.exports = geocode