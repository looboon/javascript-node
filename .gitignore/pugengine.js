var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.get("/home", (req, res) => {
    res.render(process.argv[3], {
        date: new Date().toDateString()
    });
}).listen(process.argv[2]);