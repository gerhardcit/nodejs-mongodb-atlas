const express = require('express');
const mongodb = require('mongodb');

var app = express();

app.get('/', function (req, res) {
    res.send("Hello " + (req.query.name || 'Anyone'));
});

app.get('/connect-short', function (req, res) {
    var uri = process.env.MONGO_DB_CONNECTION_SHORT;
    connect(req, res, uri);
});

app.get('/connect-long', function (req, res) {
    var uri = process.env.MONGO_DB_CONNECTION_LONG;
    connect(req, res, uri);
});

function connect(req, res, uri) {
    var MongoClient = mongodb.MongoClient;
    var uri = uri;
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            res.send(err);
        } else {
            db.close();
            res.send("Connected success");
        }
    });
}

var port = process.env.PORT || 1337;
var server = app.listen(port, function () {

});

console.log("Server running at http://localhost:%d", port);
