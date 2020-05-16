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
    if (["c", "cpp", "py", "java"].indexOf(text) >= 0) {
      fileType = text;
      console.log(text);
      client.send("GetFile");
    } else {
      client.send(JSON.stringify(Main.setSourceCode("cpp", text)));
    }
    // else console.log("Nop");
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
