function doubleAll(numbers) {
    var result = [];
    numbers.map((number) => {
        result.push(number * 2);
    });
    return result;
}

module.exports = doubleAll;