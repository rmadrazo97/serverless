var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var documentClient = new AWS.DynamoDB.DocumentClient();

var fs = require("fs");
// sleep to not overload dynamo
var sleep = require("sleep");

// getting data from  json file
var musicData = fs.readFileSync("musicData.json");
var jsonContent = JSON.parse(musicData);

// iterating json file
for (entry in jsonContent) {
    console.log("THIS IS THE ENTRY")
    console.log(jsonContent[entry])

    var params = {
        TableName : "PrometheonMusic",
        Item: jsonContent[entry]
    };
	// client with 'put' method
    documentClient.put(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
// sleep by 300ms to not exceed 5writes per second.
    sleep.msleep(300)
