const express = require('express');
const mongodb = require('mongodb');

var app = express();

app.get('/', function (req, res) {
    res.send("Hello " + (req.query.name || 'Anyone'));
});

app.get('/db', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var uri = process.env.MONGO_DB_CONNECTION;
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        db.close();
        if (err) {
            res.send(err);
        } else {
            res.send("Connected success");
        }
    });

});

var port = process.env.PORT || 1337;
var server = app.listen(port, function () {

});

console.log("Server running at http://localhost:%d", port);
