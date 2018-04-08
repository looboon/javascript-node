var express = require('express');

var fs = require('fs');
var app = express();

app.get('/books', (req, res, next) => {
    fs.readFile(process.argv[3], (err, data) => {
        var object = JSON.parse(data);
        res.send(object);
    });
}).listen(process.argv[2]);