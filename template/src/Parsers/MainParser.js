class MainParser {
  constructor() {
    // Object JSON_code have in himself a simple structure of loaded code
    //    it will be more easer to convert JSON file into PlantUML
    this.JSON_code = { name: "TestCode" };

    // This Object will contain basic operation for each language it will be different
    //    Each children class load in it his basic language operation (More shorter, this parameter contain language grammar)
    this.basicOperation = {};
    this.basicOperation["DataType"] = [];
    this.basicOperation["InputOutput"] = [];
    this.basicOperation["ConditionalOperation"] = [];
  }

  // TODO: Make compare block -- it's (if, while <--(but I don't know))

  /**
   *  This method make magic!! It convert hard structuring Source Code into simple JSON Object
   *    it make more easer to convert after that into PlantUML
   *
   * @param {*} strArray    --    This value contain a list of string of Source Code
   * @memberof MainParser
   */
  parseToJSON(strArray) {
    console.log("Parse to JSON");

    this.JSON_code["Code"] = {};
    this.JSON_code["Code"]["assign"] = {};
    this.JSON_code["Code"]["InputOutput"] = {};
    this.JSON_code["Code"]["ConditionalOperation"] = {};

    let undefinedLine = 0;

    console.log(this.JSON_code);
    for (let line in strArray) {
      if (this.inputOutputData(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (strArray[line].includes("=")) {
        this.assignData(line - undefinedLine, strArray[line]);
        continue;
      }
      if (this.conditionalOperation(line - undefinedLine, strArray[line]))
        undefinedLine++;
      console.log(strArray[line]);
    }
  }

  /**
   *  This method it's just help use already code twice or more
   *    it just remove unnecessary trash for machine
   *
   * From author -- I swear that I fill it up with more operation, in a future....
   * @param {*} line
   */
  clearLine(line) {
    return line
      .join("")
      .split(";")
      .join("");
  }

  /**
   *  This method make a simple job, it check if line contain any sign that it is
   *    may be assigning value or not, if yes we save it in JSON Object
   *
   * @param {*} index     --    This param is necessary for make each key in assign individual and
   *                              it also help to put Scrip in PlantUML at right line
   * @param {*} line      --    I know you're already guess, what for I need this param
   * @returns
   * @memberof MainParser
   */
  assignData(index, line) {
    console.log(line.includes("="));

    for (let i in this.basicOperation["DataType"]) {
      if (line.includes(this.basicOperation["DataType"][i])) {
        line = this.clearLine(line.split(this.basicOperation["DataType"][i]))
          .split(" ")
          .join("")
          .split("=");

        this.JSON_code["Code"]["assign"][index] = line;
        console.log(line);
        console.log(this.JSON_code["Code"]);
      }
    }

    return;
  }

  /**
   *  This method find in line any sign that it can print or input any value from
   *    console
   *
   * @param {*} index     --    I describe definition of this param above, short word it make
   *                              every key in "InputOutput" individual
   * @param {*} line      --    Contain a line of Source code
   * @returns
   * @memberof MainParser
   */
  inputOutputData(index, line) {
    for (let i in this.basicOperation["InputOutput"]) {
      if (line.includes(this.basicOperation["InputOutput"][i])) {
        // Here should be some code
        line = this.clearLine(
          line
            .split(this.basicOperation["InputOutput"][i])
            .join("")
            .replace(/[("'`]/g, ")")
            .split(")")
        )
          .split("  ")
          .join("");
        this.JSON_code["Code"]["InputOutput"][index] = line;
        console.log(this.JSON_code["Code"]);

        return true;
      }
    }
    return false;
  }

  conditionalOperation(index, line) {
    for (let i in this.basicOperation["ConditionalOperation"]) {
      if (line.includes(this.basicOperation["ConditionalOperation"][i])) {
        console.log(line);
      }
    }
    return false;
  }

  print(param) {
    console.log("Testing\nDone!");
  }
}

// Declaration for exporting this class in old faction way
module.exports = MainParser;
