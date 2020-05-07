var net = require("net");

var server = net.createServer(function(socket) {
  socket.write("Echo server\r\n");
  //   socket.pipe(socket);

  //   console.log(require("fs").readFileSync("SourceCode/Test.cpp", "ASCII"));
  socket.on("data", function(data) {
    console.log(data.toString());
    console.log("\n");
    console.log("File recieved");
    socket.write("Hello world!\n");
  });
});

server.listen(1337, "127.0.0.1");
