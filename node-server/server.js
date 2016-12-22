var express = require('express');
var app = express();
var fs = require('fs');
var datasource = require('./modules/datasource')

app.get('/queue', function (req, res) {
   fs.readFile( __dirname + "/data/" + "queue.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/pop', function(req, res) {
  res.end(datasource.pop())
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})