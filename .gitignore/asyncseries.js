var http = require('http');
var async = require('async');

async.series({
    requestOne: function(done) {
        var body = '';

        http.get(process.argv[2], function (res) {
            res.on('data', function (chunk) {
                body += chunk.toString();
            })
            .on('end', function () {
                done(null, body);
            });
        }).on('error', (e) => done(e));
    },
    requestTwo: function(done) {
        var body = '';

        http.get(process.argv[3], function (res) {
            res.on('data', function (chunk) {
                body += chunk.toString();
            })
            .on('end', function () {
                done(null, body);
            });
        }).on('error', (e) => done(e));
    }
}, function(err, result){
    console.log(result);
});