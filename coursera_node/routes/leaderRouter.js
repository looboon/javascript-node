var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.send("Will send all the leaders to you!")
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
})
.post((req, res, next) => {
    res.send("Will add the leader: " + req.body.name + " with details: " 
        + req.body.description);
})
.delete((req, res, next) => {
    res.end("Deleting all leaders");
})

leaderRouter.route('/:leaderid')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.send("Will send details of the leader: " + req.params.leaderid + " to you!")
})
.put((req, res, next) => {
    res.write("Updating the leader: " + req.params.leaderid + "\n");
    res.end('Will update the leader: ' + req.body.name + 
        ' with details: ' + req.body.description);    
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderid);
})
.delete((req, res, next) => {
    res.end("Deleting leader: " + req.params.leaderid);
})

module.exports = leaderRouter;