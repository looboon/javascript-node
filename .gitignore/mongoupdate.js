var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/' + process.argv[2];

mongo.connect(url, (err, connection) => {
    const db = connection.db();
    db.collection('users', (err, collection) => {
        collection.update({
            username: "tinatime"
        }, {
            $set: {
                age: 40
            }
        }, (err, result) => {
            connection.close()
        })
    })
})