var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
// allows to work easier with dynamo 
var documentClient = new AWS.DynamoDB.DocumentClient();

var fs = require("fs");

// do not overload dynamoDB with data (sleep while quering)
var sleep = require("sleep");

// counter to  know the loop status.
var counter = 0

while (counter < 15) {
        // log what we are doing
    console.log("Deleting item with SongTitle of test" + counter.toString())
        // params object to delete a particular item from a table, and key values 
    var params = {
        TableName : "PrometheonMusic",
        Key: {
            Artist: "Stephen James",
            SongTitle: "test"+counter.toString()
        }
    };
        // use dynamo client to delete. using a handle error function.
    documentClient.delete(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
        // using sleep module (sleep for 300ms)  - to not exceed dynamos capacity (not more than 4items per second)
    sleep.msleep(300)
    counter++
}
