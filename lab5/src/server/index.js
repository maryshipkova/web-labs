const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

mongoose.connect("mongodb://localhost:27017/mdEditor", {useNewUrlParser: true});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected', () => {
    console.info("Succesfully connected to MongoDB Database");
});

const filesScheme = new mongoose.Schema({
    name: String,
    text: String
});
const filesModel = mongoose.connection.model('files', filesScheme);

app.post('/api/save', (request, response) => {

    filesModel.findOneAndUpdate({name: request.body.name}, {text: request.body.text}, {upsert: true}, function (err) {
        if (err) return response.sendStatus(500);
        console.log('saved');
        return response.sendStatus(200);
    });
});

app.get('/api/load', function (request, response) {

    filesModel.find({}, function (err, res) {
        if (err) console.log(err);
        console.log('loaded');
        response.json(res);
    });

});


//not found
app.get('*', function (request, response) {
    response.status(404).sendStatus('<h1>Page not found</h1>');
});

app.listen(port);