var async = require('async');
var http = require('http');

async.map([process.argv[2], process.argv[3]], function(item, callback) {
    var body = '';
    http.get(item, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            body += chunk.toString();
        })
        res.on('end', () => {
            return callback(null, body);
        })
        res.on('error', (e) => {
            return callback(e);
        })
    });
}, (err, result) => {
    if (err) console.log(err);
    console.log(result);
})