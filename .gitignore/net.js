var net = require('net');
var strftime = require('strftime');

var listener = function(socket) {
    var time = strftime("%F %k:%M\n");
    socket.end(time);
}

var server = net.createServer(listener);
server.listen(process.argv[2]);