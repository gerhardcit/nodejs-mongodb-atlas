const express = require('express');
const mongodb = require('mongodb');
const dns = require('dns');

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

app.get('/dns', (req, res) => {
    const hostname = req.query.hostname;
    dns.resolveSrv(hostname, function (e, address) {
        if (e) {
            res.json(e);
        } else {
            res.json(address);
        }
    });
})

function connect(req, res, uri) {
    mongodb.connect(uri, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            res.json(err);
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
