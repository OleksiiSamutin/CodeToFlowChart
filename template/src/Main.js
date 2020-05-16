const ParserC = module.require("./Parsers/ParserC.js");

/**
 * A function that check fileType and choose right Parser for each language
 *
 * @param {*} fileType -- File type, String value (Ex. "cpp")
 * @param {*} text     -- Text file of Code that was got from Front-End
 */
function setSourceCode(fileType, text) {
  text = text.replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").split("\n");

  switch (fileType) {
    case "cpp":
    case "c": {
      let parser = new ParserC();
      parser.parseToJSON(text);
      return parser.getJSON();
    }
    case "py":
      break;
    case "java":
      break;
  }
  return "Parser for fileType " + fileType + "does not exist!";
}

module.exports.setSourceCode = setSourceCode;
