var async = require('async')
var http = require('http')
var bl = require('bl')

var operations = [];

var httpRequest = function(url) {
    http.get(url, function(res) {
        res.setEncoding('utf8');
        res.pipe(bl(function(err, data){
            if (err) console.error;
            console.log(data.toString());
        }));
    }).on("error", console.error);
}

var httpRequest2 = function(url) {
    http.get(url, function(res) {
        res.setEncoding('utf8');
        res.pipe(bl(function(err, data){
            if (err) console.error;
            console.log(data.toString());
        }));
    }).on("error", console.error);
}

var httpRequest3 = function(url) {
    http.get(url, function(res) {
        res.setEncoding('utf8');
        res.pipe(bl(function(err, data){
            if (err) console.error;
            console.log(data.toString());
        }));
    }).on("error", console.error);
}

operations.push(function(callback){
    httpRequest(process.argv[2]);
    return callback(null);
})

operations.push(function(callback) {
    httpRequest2(process.argv[3]);
    return callback(null);
})

operations.push(function(callback) {
    httpRequest3(process.argv[4]);
    return callback(null);
})

async.waterfall(operations);

