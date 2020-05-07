const ParserC = module.require("./Parsers/ParserC.js");
function setSourceCode(text) {
  text = text.replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").split("\n");

  let parser = new ParserC();

  parser.print();

  parser.parseToJSON(text);

  return parser.getJSON();
}

var http = require("http");
var Static = require("node-static");
var WebSocketServer = new require("ws");

// подключенные клиенты
var client;
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on("connection", function (ws) {
  var id = Math.random();
  client = ws;
  console.log("New connection " + id);

  ws.on("message", function (text) {
    console.log(text);

    client.send(JSON.stringify(setSourceCode(text)));
  });

  ws.on("close", function () {
    console.log("Connection Close " + id);
    delete client;
  });
});

// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server(".");
http
  .createServer(function (req, res) {
    fileServer.serve(req, res);
  })
  .listen(8080);

console.log("Сервер запущен на портах 8080, 8081");
