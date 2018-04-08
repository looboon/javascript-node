var express = require('express');
var app = express();
var crypto = require('crypto');

app.put('/message/:id', (req, res, next) => {
    var id = req.params.id;
    res.send(crypto
            .createHash('sha1')
            .update(new Date().toDateString() + id)
            .digest('hex'));
});
app.listen(process.argv[2]);