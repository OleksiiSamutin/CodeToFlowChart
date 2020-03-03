const MainParser = require("./MainParser.js");
class ParserC extends MainParser {
  // Convert Source Code into JSON

  constructor() {
    super();
    console.log(this.basicOperation["DataType"]);

    this.basicOperation["DataType"].push(
      "int",
      "float",
      "double",
      "boolean",
      "byte",
      "char",
      "long"
    );

    this.basicOperation["InputOutput"].push("printf", "scanf", "cin", "cout");
    this.basicOperation["ConditionalOperation"].push("if", "while");
  }
  parseToJSON(str) {
    super.parseToJSON(str);
  }
  print(param) {
    super.print();
  }
}

// Declaration for exporting this class in old faction way
module.exports = ParserC;
