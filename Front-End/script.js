let backend = require("../template/src/Main.js");
let input = document.getElementById("inputFile");
input.addEventListener("change", sendFileToBackend);
let file;
function sendFileToBackend() {
  var reader = new FileReader();
  var currFiles = input.files[0];
  if (currFiles.length !== 0) {
    let path = input.value;
    //
    reader.readAsText(currFiles);

    reader.onload = function () {
      file = reader.result;
      backend.setSourceCode(currFiles.name, file);
    };
  }
}

var inputs = document.querySelectorAll(".inputFile");
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

if (!window.WebSocket) {
  document.body.innerHTML = "WebSocket в этом браузере не поддерживается.";
}

// создать подключение
var socket = new WebSocket("ws://localhost:8081");

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function () {
  socket.send("cpp");
  return false;
};

socket.onmessage = function (event) {
  var outgoingMessage = file;

  socket.send(outgoingMessage);
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function (event) {
  var incomingMessage = event.data;
  showMessage(incomingMessage);
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement("div");
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById("subscribe").appendChild(messageElem);
}
