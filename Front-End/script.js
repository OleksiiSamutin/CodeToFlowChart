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

var inputs = document.querySelectorAll('.inputFile');
Array.prototype.forEach.call(inputs, function(input){
  var label	 = input.nextElementSibling,
      labelVal = label.innerHTML;
  input.addEventListener('change', function(e){
    var fileName = '';
    if( this.files && this.files.length > 1 )
      fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    else
      fileName = e.target.value.split( '\\' ).pop();
		if( fileName )
      label.querySelector( 'span' ).innerHTML = fileName;
    else
      label.innerHTML = labelVal;
	});
});