
var express = require("express");
var http = require("http");
var moment = require('moment');
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});
app.get("/:time", function(request, response) {
    var momen=moment.unix(request.params.time);
    if(momen.isValid())
    response.end(JSON.stringify({unix:momen.utc().unix(),natural:momen.utc().format('MMMM DD YYYY')}));
    else{ 
        momen=moment(request.params.time);
        if(momen.isValid())
            response.end(JSON.stringify({unix:momen.utc().unix(),natural:momen.utc().format('MMMM DD YYYY')}));
        response.end(JSON.stringify({unix:null,natural:null}));
    }
});
app.get("*", function(request, response) {
  response.end("404!");
});
http.createServer(app);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});