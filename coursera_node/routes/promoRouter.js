var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.send("Will send all the promotions to you!");
})
.put((req, res, next) => {
    res.status(403);
    res.end("PUT operation not supported on /promotions");
})
.post((req, res, next) => {
    res.end("Will add the promotion: " + req.body.name + " with details: " 
            + req.body.description);
})
.delete((req, res, next) => {
    res.end("Deleting all promotions");
})

promoRouter.route('/:promoid')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.send("Will send details of the promotion: " + req.params.promoid + " to you!");
})
.put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promoid + "\n");
    res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.send("POST operation not supported on /promotion/" + req.params.promoid);
})
.delete((req, res, next) => {
    res.end("Deleting promotion: " + req.params.promoid);
})

module.exports = promoRouter;