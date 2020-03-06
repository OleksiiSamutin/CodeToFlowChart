class MainParser {
  constructor() {
    // Object JSON_code have in himself a simple structure of loaded code
    //    it will be more easer to convert JSON file into PlantUML
    this.JSON_code = { name: "TestCode" };
    this.JSON_code["Type"] = "";

    // In my opinion all program splitted in a few subSystem
    this.subSystem = null;
    this.subSystemIndex = 0;

    // This Object will contain basic operation for each language it will be different
    //    Each children class load in it his basic language operation (More shorter, this parameter contain language grammar)
    this.basicOperation = {};
    this.basicOperation["DataType"] = [];
    this.basicOperation["InputOutput"] = [];
    this.basicOperation["ConditionalOperation"] = [];
    this.basicOperation["DefineSubSystem"] = { start: "", end: "" };

    this.defineJSON_Structure();
  }

  defineJSON_Structure() {
    this.JSON_code["Code"] = {};
    this.JSON_code["Code"]["Assign"] = {};
    this.JSON_code["Code"]["SubSystem"] = {};
  }

  defineSubSystemStructure() {
    this.subSystem = {};
    this.subSystem["Assign"] = {};
    this.subSystem["InputOutput"] = {};
    this.subSystem["ConditionalOperation"] = {};
    this.subSystem["Set"] = {};
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

    let undefinedLine = 0;

    console.log(this.JSON_code);
    for (let line in strArray) {
      if (this.defineSubSystem(line - undefinedLine, strArray[line])) {
      }

      if (this.inputOutputData(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (this.conditionalOperation(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (strArray[line].includes("=")) {
        this.assignData(line - undefinedLine, strArray[line]);
        continue;
      }

      undefinedLine++;
      console.log(strArray[line]);
    }

    console.log(this.JSON_code["Code"]);

    for (let key in this.JSON_code["Code"]["SubSystem"]) {
      console.log(key);
      console.log(this.JSON_code["Code"]["SubSystem"][key]);
    }
  }

  /**
   *  This method make a simple job, it check if line contain any sign that it is
   *    may be Assigning value or not, if yes we save it in JSON Object
   *
   * @param {*} index     --    This param is necessary for make each key in Assign individual and
   *                              it also help to put Scrip in PlantUML at right line
   * @param {*} line      --    I know you're already guess, what for I need this param
   * @returns
   * @memberof MainParser
   */
  assignData(index, line) {
    for (let i in this.basicOperation["DataType"]) {
      if (line.includes(this.basicOperation["DataType"][i])) {
        line = line
          .split(this.basicOperation["DataType"][i])
          .join("")
          .replace(/[; ]/g, "")
          .split("=");

        if (this.subSystem !== null) {
          this.subSystem["Assign"][index] = line;
        } else {
          this.JSON_code["Code"]["Assign"][index] = line;
        }
        return;
      }
    }

    if (this.setData(index, line)) return;

    return;
  }

  setData(index, line) {
    line = line.replace(/[; ]/g, "").split("=");

    this.subSystem["Set"][index] = line;
    return false;
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
        line = line
          .split(this.basicOperation["InputOutput"][i])
          .join("")
          .replace(/[)("'`;]/g, "")
          .split("  ")
          .join("");

        this.subSystem["InputOutput"][index] = line;

        return true;
      }
    }
    return false;
  }

  conditionalOperation(index, line) {
    for (let i in this.basicOperation["ConditionalOperation"]) {
      if (line.includes(this.basicOperation["ConditionalOperation"][i])) {
        line = line
          .split(this.basicOperation["ConditionalOperation"][i])
          .join("")
          .replace(/[() ]/g, "");

        this.subSystem["ConditionalOperation"][index] = line;

        console.log(line);
        return true;
      }
    }
    return false;
  }

  defineSubSystem(index, line) {
    if (line.includes(this.basicOperation["DefineSubSystem"]["start"])) {
      if (this.subSystem !== null) {
        this.JSON_code["Code"]["SubSystem"][this.subSystemIndex++] = this.clone(
          this.subSystem
        );
      }
      this.defineSubSystemStructure();

      return true;
    } else if (line.includes(this.basicOperation["DefineSubSystem"]["end"])) {
      if (this.subSystem !== null) {
        this.JSON_code["Code"]["SubSystem"][this.subSystemIndex--] = this.clone(
          this.subSystem
        );
      }
      if (this.subSystemIndex >= 0) {
        this.subSystem = this.clone(
          this.JSON_code["Code"]["SubSystem"][this.subSystemIndex]
        );
      } else {
        this.subSystem = null;
      }
      return true;
    }
    return false;
  }

  clone(object) {
    let copy = {};
    for (let key in object) {
      copy[key] = Object.assign({}, object[key]);
    }
    return copy;
  }

  print(param) {
    console.log("Testing\nDone!");
  }
}

// Declaration for exporting this class in old faction way
module.exports = MainParser;
