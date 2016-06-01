var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(req, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("D"+JSON.stringify(req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress));
    next();
});
http.createServer(app);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});