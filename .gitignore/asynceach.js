var http = require('http');
var async =  require('async');

async.each([process.argv[2], process.argv[3]], function(item, callback){
    var body = ''
    http.get(item, (res) => {
        res.on('data', (chunk) => {
        }).on('end', () => {
            return callback(null);
        }).on('error', (e) => {
            return callback(e);
        })
    });
}, function(err, data) {
    if (err) console.log(err);
})