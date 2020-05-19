const Main = require("./Main");
const plantURL = require("./Plant/umlConverter.js");
var http = require("http");
var Static = require("node-static");
var WebSocketServer = new require("ws");

var client;
// WebSocket-server port 8081
var webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on("connection", function (ws) {
  var id = Math.random();
  client = ws;
  console.log("New connection " + id);

  ws.on("message", function (text) {
    console.log(text);

    client.send(plantURL.setJSON(Main.setSourceCode(text)));
  });

  ws.on("close", function () {
    console.log("Connection Close " + id);
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