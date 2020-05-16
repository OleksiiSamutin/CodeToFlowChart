const Main = require("./Main");
var http = require("http");
var Static = require("node-static");
var WebSocketServer = new require("ws");

var client;
// WebSocket-server port 8081
var webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on("connection", function (ws) {
  client = ws;
  console.log("New connection ");

  var fileType;

  ws.on("message", function (text) {
    fileType = text;
    client.send("Ok");
    console.log(text);
  });

  ws.on("message", function (text) {
    console.log(text);

    client.send(Main.setSourceCode(fileType, text));
  });

  ws.on("close", function () {
    console.log("Connection Close ");
    delete client;
  });
});

var fileServer = new Static.Server(".");
http
  .createServer(function (req, res) {
    fileServer.serve(req, res);
  })
  .listen(8080);

console.log("Server is running on port 8080, 8081");
