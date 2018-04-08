var async = require('async');
var http = require('http');

var condition = '';
var times = 0;
async.whilst(
    function() {
        return condition !== 'meerkat';
    },
    function(callback) {
        var body = '';
        times++;
        http.get(process.argv[2], (res) => {
            res.on("data", (chunk) => {
                body += chunk.toString()
            })
            res.on("end", () => {
                condition = body;
                callback(null, condition);
            })
        })
    }, function(err, n) {
        console.log(times);
    }
)