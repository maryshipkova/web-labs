const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.use(bodyParser.json());       // support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // support URL-encoded bodies
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/mdEditor"); //, {useNewUrlParser: true}
const db = mongoose.connection;

// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Данная функция будет вызвано когда подключение будет установлено
mongoose.connection.on('connected', () => {
    // Подключение установлено
    console.info("Succesfully connected to MongoDB Database");
    // В дальнейшем здесь мы будем запускать сервер.
});

const filesScheme = new mongoose.Schema({
    // _id: String,
    name: String,
    text: String
});
const filesModel = db.model('files', filesScheme);

app.post('/api/save', (request, response) => {
    const filesModelInstance = new filesModel({name: new Date(), text: request.body.text});
    filesModelInstance.save((err) => {
        if (err) console.log(err);
        response.sendStatus(200);
    });

});

app.get('/api/load', function (request, response) {

    filesModel.find({}, function (err, res) {
        if (err) console.log(err);
        response.json(res);
    });
    
});


//not found
app.get('*', function (request, response) {
    response.status(404).sendStatus('<h1>Page not found</h1>');
});

app.listen(port);