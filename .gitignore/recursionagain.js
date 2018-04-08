function getDependencies(tree, arr) {
    if (tree.constructor !== {}.constructor) {
        return arr;
    } else {
        var versionString = tree.name + "@" + tree.version;
        arr.push(versionString)
        if (tree.hasOwnProperty('dependencies')) {
            getDependencies(tree.dependencies, arr);
        }
    }
}

module.exports = getDependencies