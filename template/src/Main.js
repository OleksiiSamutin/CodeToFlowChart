const ParserC = module.require("./Parsers/ParserC.js");
function setSourceCode(text) {
  text = text.replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").split("\n");

  let parser = new ParserC();

  parser.print();

  parser.parseToJSON(text);

  return parser.getJSON();
}

module.exports.setSourceCode = setSourceCode;
