var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/moviedb";
const JwtSecret = process.env.JWT_SECRET  || 'very secret secret';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("moviedb");
    dbo.createCollection("matches", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});