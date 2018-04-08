var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var first_name = process.argv[2];
var last_name = process.argv[3];

mongo.connect(url, (err, connection) => {
    const db = connection.db();
    db.collection('docs', (err, collection) => {
        var item = JSON.stringify({
            firstName: first_name,
            lastName: last_name
        });
        console.log(item);
        collection.insert(item, (err, result) => {
            connection.close();
        })
    })
})