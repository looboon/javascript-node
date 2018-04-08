module.exports = function arrayMap(arr, fn) {
    var result = []
    console.log(arr);
    arr.reduce(function(prev, cur){
        var temp = fn(cur);
        prev.push(temp);
        return prev;
    }, result);
    return result;
}