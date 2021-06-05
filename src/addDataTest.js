var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("moviedb");
    var myobj = {
        company_name: "Test GmbH",
        domains: ["@test_gmbh.de", "@test_gmbh.com"],
        adress: {
            street: "Teststraße",
            housing_number: 44,
            city: "Munich",
            zip: 80797
        },
    };
    dbo.collection("organizations").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});