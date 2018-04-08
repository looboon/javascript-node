var express = require('express');
var app = express();

app.get('/search', (req, res) => {
    var output = {
    }
    for (var property in req.query) {
        console.log(property);
        if (req.query.hasOwnProperty(property)) {
            output[property] = req.query[property];
            console.log(req.query[property]);
        }
    }
    res.send(output);
}).listen(process.argv[2]);