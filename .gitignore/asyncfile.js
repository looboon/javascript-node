var async = require('async');
var http = require('http');
var fs = require('fs');

var ops = []
ops.push(function(callback) {
    fs.readFile(process.argv[2], "utf-8", function(err, data)  {
        if (err) return callback(err);
        callback(null, data);
    });
});
ops.push(function(url, callback) {
    var body = '';

    http.get(url, function (res) {
      res.on('data', function (chunk) {
        body += chunk.toString();
      })
      .on('end', function () {
        callback(null, body);
      });
    })
    .on('error', function (err) {
      callback(err);
    });
})

async.waterfall(ops, (err, result) => {
    console.log(result);
});