var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("moviedb");
    var myobj = { usera: "stelzlb", userb: "osterber", timestamp: 200, duration: 60 };
    dbo.collection("matches").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});