let backend = require('../template/src/Main.js');
let input = document.getElementById("inputFile");
input.addEventListener('change', sendFileToBackend);

function sendFileToBackend(){
    var reader = new FileReader();
    var currFiles = input.files[0];
    if (currFiles.length !== 0){
        let path = input.value;
        //
        reader.readAsText(currFiles);

        reader.onload = function () {
            let file = reader.result;
            backend.setSourceCode(currFiles.name, file);
          }
    }

}