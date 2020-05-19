const Main = require("./Main");
const plantURL = require("./Plant/umlConverter.js");
var http = require("http");
var Static = require("node-static");
var WebSocketServer = new require("ws");
var client;

const fileExtensions = ["c", "cpp", "py", "java"];

/**
 * server.js
 * Create Back-End Server and produce communication with
 * Front-End Client.
 *
 * A simple illustration of Client/Server communication
 *
 * Client sends to Server: File Type
 * Server sends to Clint: "GetFile"
 *
 * Client sends to Server: Text from Code file
 * Server sends to Client: PlantUML URL
 */

// WebSocket-server port 8081

var webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on("connection", function (ws) {
  client = ws;
  console.log("New connection ");

  var fileType;

  ws.on("message", function (text) {
    if (fileExtensions.indexOf(text) >= 0) {
      fileType = text;
      console.log(text);
      client.send("GetFile");
    } else {
      client.send(plantURL.setJSON(Main.setSourceCode(fileType, text)));
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
