const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const app = express();
const port = 8000;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');

    next();
});
app.use(bodyParser.json());       // support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // support URL-encoded bodies
    extended: true
}));

// mongoose.connect("mongodb://localhost:27017/mdEditor", {useNewUrlParser: true});
//
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// mongoose.connection.on('connected', () => {
//     console.info("Succesfully connected to MongoDB Database");
// });
//
// const weatherScheme = new mongoose.Schema({
//     name: String,
//     text: String
// });
// const weatherModel = mongoose.connection.model('weather', weatherScheme);

function makeRequest(url, params) {
    return fetch(url, params).then(res => res.json());
}

function get(url) {
    return makeRequest(url);
}

function post(url, body) {
    return makeRequest(url, { method: 'POST', body });
}

function formOpenWeatherURL(params){
    const openWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast',
    appID = '62462c93c650ac75e405b900f2457d73';
    return `${openWeatherURL}?${params}&APPID=${appID}`;
}

// /weather?city=Moscow
app.get('/weather', (request, response) => {
    const city = request.query.city;
    if(!city) response.send(403); // TODO: bad request

    const url = formOpenWeatherURL(`q=${city}`);
    get(url).then(res => response.json(res));
});

// /weather/coordinates?lat=123&long=456
app.get('/weather/coordinates', (request, response) => {
    const coordinates = request.query.coordinates;
    if( !coordinates || !coordinates.lon || !coordinates.lat) response.send(403); // TODO: bad request

    const url = formOpenWeatherURL(`lat=${coordinates.lat}&lon=${coordinates.lon}`);
    get(url).then(res => response.json(res));
});


app.get('/favourites', (request, response) => {

    // weatherModel.find({}, function (err, res) {
    //     if (err) console.log(err);
    //     console.log('loaded');
    //     response.json(res);
    // });
});

// запрос на добавление города
app.post('/favourites', (request, response) => {
    const city = request.body.city;
    if(!city) response.send(403); // TODO: bad request

    // weatherModel.findOneAndUpdate({name: request.body.name}, {text: request.body.text}, {upsert: true}, function (err) {
    //     if (err) return response.sendStatus(500);
    //     console.log('saved');
    //     return response.sendStatus(200);
    // });
});

// запрос на удаление города
app.delete('/favourites', (request, response) => {
    const city = request.body.city;
    if(!city) response.send(403); // TODO: bad request
    // weatherModel.delete({name: request.body.name}, {text: request.body.text}, {upsert: true}, function (err) {
    //     if (err) return response.sendStatus(500);
    //     console.log('saved');
    //     return response.sendStatus(200);
    // });
});



//not found
app.get('*', function (request, response) {
    response.status(404).sendStatus('<h1>Page not found</h1>');
});

app.listen(port);
