let backend = require('../template/src/Main.js');
let input = document.getElementById("inputFile");
input.addEventListener('change', sendFileToBackend);

function sendFileToBackend(){
    var currFiles = input.value;
    console.log(currFiles);
    backend.setSourceCode(currFiles);
}