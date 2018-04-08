var fs = require('fs');
var http = require('http');

function callback(req, res) {
    var stream = fs.createReadStream(process.argv[3]);
    stream.on("error", (err) => {
        console.err;
    });
    stream.on("close", () => {
        res.end()
    });
    stream.pipe(res);
}

var server = http.createServer(callback);

server.listen(process.argv[2])
