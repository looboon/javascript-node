const assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
    const col = db.collection(collection);
    return col.insert(document);
}

exports.findDocuments = (db, collection, callback) => {
    const col = db.collection(collection);
    return col.find({}).toArray();
}

exports.removeDocuments = (db, document, collection, callback) => {
    const col = db.collection(collection);
    return col.deleteOne(document);
}

exports.updateDocument = (db, document, update, collection, callback) => {
    const col = db.collection(collection);
    return col.updateOne(document, {$set: update}, null);
}