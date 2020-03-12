let input = document.getElementById("inputFile");
input.addEventListener('change', sendFileToBackend);

function sendFileToBackend(){
    var currFiles = input.value;
    console.log(currFiles);
}