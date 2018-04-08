var http = require('http');
var async = require('async');

const url = "http://" + process.argv[2] + ":" + process.argv[3];

async.series({
    post: function(done) {
        var options = {
            hostname: process.argv[2],
            port: process.argv[3],
            method: 'POST',
            path: '/users/create'
        }
        async.times(5, function(n, next){
            var req = http.request(options, (res) => {
                res.on("end", () => {
                    next(null);
                });
            })
            req.write(JSON.stringify({
                "user_id": n + 1
            }));
            req.end();
        }, function(err) {
            if (err) console.log(err);
        })
        return done(null);
    },
    get: function(callback) {
        var body = '';
        http.get('http://' + process.argv.slice(2).join(':') + '/users', (res) => {
            res.on("data", (chunk) => {
                body += chunk.toString();
            })
            res.on("end", () => {
                return callback(null, body);
            })
        })
    }
}, (err, result) => {
    console.log(result.get);
})