var map = require('through2-map');
var http = require('http');

function callback(req, res) {
    if (req.method !== "POST") console.err;
    req.pipe(map(function(chunk){
        return chunk.toString().toUpperCase();
    })).pipe(res);
}

var server = http.createServer(callback);

server.listen(process.argv[2]);
