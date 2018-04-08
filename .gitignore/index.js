var fs = require('fs')
var path = require('path')

module.exports = function(dir_name, ext, callback) {
    var filteredArr = []
    var dirList = fs.readdir(dir_name, function(err, data) {
        if (err) return callback(err);
        data.forEach(dir => {
            if (path.extname(dir) === ("." + ext)) filteredArr.push(dir)
        });
        return callback(null, filteredArr)
    });
    return dirList;
}

