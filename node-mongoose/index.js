const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require("./models/dishes");

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected directly to server");

    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'        
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {
                description: "Updated Test"
            }
        }, {
                new: true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.collection.drop();
    })
    .then(() => {
        return db.disconnect();
    })
    .catch((err) => {
        console.log(err);
    });
});