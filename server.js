var express = require("express");
var http = require("http");
var useragent=require("useragent");
var app = express();

app.all("*", function(req, response, next) {
    var agent = useragent.parse(req.headers['user-agent']);
  response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify({
        "IP address":req.headers['x-forwarded-for'] || 
                        req.connection.remoteAddress || 
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress,
        "language":req.headers["accept-language"],
        "Operating System":agent.os.toString().replace(agent.os.toVersion(),"")}));
    next();
});
http.createServer(app);
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});