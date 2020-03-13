let backend = require('../template/src/Main.js');
let input = document.getElementById("inputFile");
input.addEventListener('change', sendFileToBackend);

function sendFileToBackend(){
    var currFiles = input.files;
    if (currFiles.length !== 0){
        let path = input.value;
        backend.setSourceCode(path);
    }

}