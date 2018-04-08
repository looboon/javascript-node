function countWords(inputWords) {
    var result = {}
    inputWords.reduce(function(result, word) {
        if (word in result) {
            result[word]++;
        } else {
            result[word] = 1;
        }
        return result;
    }, result);
    return result;
}

module.exports = countWords;