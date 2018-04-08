var http = require('http');
var url = require('url');

var server = http.createServer((req, res) => {
    req.on('error', (err) => {
        console.log(err);
        res.statusCode = 400;
        res.end();
    });

    res.on('err', (err) => {
        console.log(err);
    });

    if(req.method === "GET" && 
        url.parse(req.url).pathname === "/api/unixtime") {
            var parsed_url = url.parse(req.url);
            var date = new Date(parsed_url.query.slice(4));
            res.write(JSON.stringify({
                "unixtime": date.getTime()
            }));
            res.end();
    } else if (req.method === "GET" && 
        url.parse(req.url).pathname === "/api/parsetime") {
        var parsed_url = url.parse(req.url);
        var date = new Date(parsed_url.query.slice(4));
        res.write(JSON.stringify({
            "hour": date.getHours(),
            "minute": date.getMinutes(),
            "second": date.getUTCSeconds()
        }));
        res.end();
    } else {
        res.send(404);
    }
});

server.listen(process.argv[2]);