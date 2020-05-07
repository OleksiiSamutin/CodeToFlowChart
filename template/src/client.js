var net = require("net");

var client = new net.Socket();
client.connect(1337, "127.0.0.1", function() {
  console.log("Connected");
});

let text = require("fs").readFileSync("SourceCode/Test.cpp", "ASCII");

console.log(text[0]);

client.write(text);

client.on("data", function() {
  console.log("Send file -- Success");
  client.destroy(); // kill client after server's response
});

client.on("close", function() {
  console.log("Connection closed");
});
