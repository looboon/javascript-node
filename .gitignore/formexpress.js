var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.post('/form', (req, res) => {
    res.send(req.body.str.split('').reverse().join(''));
}).listen(process.argv[2]);