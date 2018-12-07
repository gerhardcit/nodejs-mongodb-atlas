const express = require('express');
const mongodb = require('mongodb');

var app = express();

app.get('/', function (req, res) {

    var MongoClient = mongodb.MongoClient;
    var uri = process.env.MONGO_DB_CONNECTION;
    MongoClient.connect(uri, function (err, db) {
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
