var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose').set('debug', true);

const Dishes = require('../models/dishes');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

var ObjectID = mongoose.Types.ObjectId;

dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log("Dish created: ", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

dishRouter.route('/:dishid')
.get((req, res, next) => {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/"+ req.params.dishid);
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dish, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishid)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// all comments route
dishRouter['get']('/:dishid/comments', getCommentsFromDish);
dishRouter['put']('/:dishid/comments', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'
        + req.params.dishId + '/comments');
})
dishRouter['post']('/:dishid/comments', postCommentsInDish);
dishRouter['delete']('/:dishid/comments', deleteCommentsInDish);

// single comment route
dishRouter['get']('/:dishid/comments/:commentid', getCommentInDish);
dishRouter['put']('/:dishid/comments/:commentid', putCommentInDish);
dishRouter['post']('/:dishid/comments/:commentid', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
        + req.params.dishId + '/comments/' 
        + req.params.commentid);    
})
dishRouter['delete']('/:dishid/comments/:commentid', deleteCommentInDish);


function getCommentsFromDish(req, res, next) {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(dish.comments);
        } else {
            err = new Error("Dish " + req.params.dishid + " is not found.");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

function postCommentsInDish(req, res, next) {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        if (dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Context-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            error = new Error("Dish " + req.params.dishid + " is not found.");
            error.statusCode = 404;
            return next(error);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

function deleteCommentsInDish(req, res, next) {
    Dishes.findByIdAndUpdate(req.params.dishid, {
        $set: { comments: [] }
    }, { new: true })
    .then((dish) => {
        if (dish != null) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(dish);
        } else {
            error = new Error("Dish " + req.params.dishid + " is not found.");
            error.statusCode = 404;
            return next(error);
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
}

function getCommentInDish(req, res, next) {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentid)) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentid));
        } else if (dish == null) {
            error = new Error("Dish " + req.params.dishid + " is not found.");
            error.statusCode = 404;
            return next(error);            
        } else {
            error = new Error("Comment " + req.params.commentid + " is not found.");
            error.statusCode = 404;
            return next(error);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

function putCommentInDish(req, res, next) {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentid) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentid).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentid).comment = req.body.comment;
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Context-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        } else if (dish == null) {
            error = new Error("Dish " + req.params.dishid + " is not found.");
            error.statusCode = 404;
            return next(error);             
        } else {
            error = new Error("Comment " + req.params.commentid + " is not found.");
            error.statusCode = 404;
            return next(error);           
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}

function deleteCommentInDish(req, res, next) {
    Dishes.findById(req.params.dishid)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentid) != null) {
            dish.comments.id(req.params.commentid).remove()
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Context-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else if (dish == null) {
            error = new Error("Dish " + req.params.dishid + " is not found.");
            error.statusCode = 404;
            return next(error);             
        } else {
            error = new Error("Comment " + req.params.commentid + " is not found.");
            error.statusCode = 404;
            return next(error);           
        }        
    }, (err) => next(err))
    .catch((err) => next(err));
}

module.exports = dishRouter;