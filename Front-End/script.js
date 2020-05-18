let backend = require("../template/src/Main.js");
let input = document.getElementById("inputFile");
input.addEventListener("change", sendFileToBackend);
let file;
/**
 * takes inputed text from user, and sends to backend
 *
 */
function sendFileToBackend() {
  var reader = new FileReader();
  var currFiles = input.files[0];
  if (currFiles.length !== 0) {
    let path = input.value;
    reader.readAsText(currFiles);
    reader.onload = function () {
      file = reader.result;
      backend.setSourceCode(currFiles.name, file);
    };
  }
}
// select all inputs on page
var inputs = document.querySelectorAll(".inputFile");
// add listeners to inputs
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;
  input.addEventListener("change", function (e) {
    var fileName = "";
    if (this.files && this.files.length > 1)
      fileName = (this.getAttribute("data-multiple-caption") || "").replace(
        "{count}",
        this.files.length
      );
    else fileName = e.target.value.split("\\").pop();
    if (fileName) label.querySelector("span").innerHTML = fileName;
    else label.innerHTML = labelVal;
  });
});
// Fallback if websocket doesn't maintains
if (!window.WebSocket) {
  document.body.innerHTML = "WebSocket в этом браузере не поддерживается.";
}

// establish connection
var socket = new WebSocket("ws://localhost:8081");

// send a message from the form
document.forms.publish.onsubmit = function () {
  socket.send("cpp");
  console.log("Send!!");

  return false;
};

// incoming message handler
socket.onmessage = function (event) {
  console.log(event.data);

  if (event.data == "GetFile") {
    var outgoingMessage = file;
    socket.send(outgoingMessage);
    console.log(event.data);
  } else {
    var incomingMessage = event.data;
    showMessage(incomingMessage);
  }
};

//show message in div#subscribe
function showMessage(message) {
  var messageElem = document.createElement("div");
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById("subscribe").appendChild(messageElem);
}

