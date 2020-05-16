const MainParser = require("./MainParser.js");

/**
 *  This is Parser for C/C++ program
 *
 * @class ParserC
 * @extends {MainParser}
 */
class ParserC extends MainParser {
  // Convert Source Code into JSON

  /**
   *  Set into Father class (MainParser) C/C++ grammar
   *
   * @memberof ParserC
   */
  constructor() {
    super();
    console.log(this.basicOperation["DataType"]);

    this.JSON_code["Type"] = "C/C++";

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
    this.basicOperation["ConditionalOperation"].push("if", "else");
    this.basicOperation["DefineSubSystem"] = { start: "{", end: "}" };
    this.basicOperation["Loop"].push("for", "while");
  }

  /**
   * Convert Code file into JSON structure
   *
   * @param {*} str  --  Contain Program Code
   * @memberof ParserC
   */
  parseToJSON(str) {
    super.parseToJSON(str);
  }
  print(param) {
    super.print();
  }

  /**
   * @returns  Return converted JSON
   * @memberof ParserC
   */
  getJSON() {
    return super.getJSON();
  }
}

// Declaration for exporting this class in old faction way
module.exports = ParserC;
