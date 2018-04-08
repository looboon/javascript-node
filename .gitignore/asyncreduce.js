var async = require('async');
var http = require('http');

async.reduce(['one', 'two', 'three'], 0, function(total, item, callback) {
    var url = process.argv[2] + "?number=" + item; 
    var body = '';
    http.get(url, (res) => {
        res.on("data", (chunk) => {
            body += chunk.toString();
        })
        res.on("end", () => {
            callback(null, total + parseInt(body));
        })
    }); 
}, function(err, result) {
    console.log(result);
})