var func = require("./index")

var path = process.argv[2]
var ext = process.argv[3]

func(path, ext, function(err, data) {
    data.forEach(dir =>
        console.log(dir)
    );
});