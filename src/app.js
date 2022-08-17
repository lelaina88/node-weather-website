const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialPathView = path.join(__dirname, '../templates/partials')


const app = express()
app.use(express.static(publicDirectoryPath))

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialPathView)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew'

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({error: 'You must provide address param'})
    }
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({ 
                forecast: forecastData,
                location,
                address
             }) 
        })
    })
})

app.get('/product', (req, res) => { 
    if(!req.query.search) {
        res.send({error: 'You must provide search param'})
    }
    res.send({products: []})
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})