class MainParser {
  constructor() {
    // Object JSON_code have in himself a simple structure of loaded code
    //    it will be more easer to convert JSON file into PlantUML
    this.JSON_code = { Name: "TestCode" };
    this.JSON_code["Type"] = "";

    // In my opinion all program splitted in a few subSystem
    this.subSystems = {};
    this.subSystemIndex = -1;

    // This Object will contain basic operation for each language it will be different
    //    Each children class load in it his basic language operation (More shorter, this parameter contain language grammar)
    this.basicOperation = {};
    this.basicOperation["DataType"] = [];
    this.basicOperation["InputOutput"] = [];
    this.basicOperation["ConditionalOperation"] = [];
    this.basicOperation["DefineSubSystem"] = { start: "", end: "" };
    this.basicOperation["Loop"] = [];

    this.setINTO_Operation = {};
    this.setINTO_OperationIndex = -1;
    this.defineJSON_Structure();
  }

  /**
   *  This is method create basic attributes for Object.
   *    SubSystem in this case it's main function that start up.
   * @memberof MainParser
   */
  defineJSON_Structure() {
    this.JSON_code["Code"] = {};
    this.JSON_code["Code"]["Assign"] = {};
    this.JSON_code["Code"]["SubSystem"] = {};
  }

  /**
   *  This method fill any subSystem with key that may present in it or not.
   *    It's make basic structure for each subSystem.
   *
   * @memberof MainParser
   */
  defineSubSystemStructure() {
    this.subSystems[this.subSystemIndex] = {};
    this.subSystems[this.subSystemIndex]["Assign"] = {};
    this.subSystems[this.subSystemIndex]["InputOutput"] = {};
    this.subSystems[this.subSystemIndex]["ConditionalOperation"] = {};
    this.subSystems[this.subSystemIndex]["Set"] = {};
    this.subSystems[this.subSystemIndex]["Loop"] = {};
  }

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

    for (let line in strArray) {
      this.defineSubSystem(line - undefinedLine, strArray[line]);

      if (this.inputOutputData(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (this.conditionalOperation(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (this.defineLoops(line - undefinedLine, strArray[line])) {
        continue;
      }
      if (strArray[line].includes("=")) {
        this.assignData(line - undefinedLine, strArray[line]);
        continue;
      }

      undefinedLine++;
    }

    this.printJSON(this.JSON_code);
  }

  printJSON(structure) {
    let complexStructure = ["SubSystem", "ConditionalOperation", "Loop"];

    for (let i in structure) {
      console.log(i);
      console.log(structure[i]);

      for (let j = 0; j < complexStructure.length; j++) {
        if (
          typeof structure[i] == "object" &&
          structure[i].length !== 0 &&
          (complexStructure[j] in structure[i] || i == complexStructure[j])
        ) {
          console.log(
            "\n" +
              "___________________________________\n\t" +
              complexStructure[j] +
              "\n===================================\n"
          );

          this.printJSON(structure[i]);
          break;
        }
      }
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

        if (this.subSystemIndex != -1) {
          this.subSystems[this.subSystemIndex]["Assign"][index] = line;
        } else {
          this.JSON_code["Code"]["Assign"][index] = line;
        }
        return;
      }
    }

    if (this.setData(index, line)) return;

    return;
  }

  /**
   *  This method finds in line any sign that is set some value to parameter,
   *      if it finds something it will "push" it in Object
   *
   * @param {*} index
   * @param {*} line
   * @returns
   * @memberof MainParser
   */
  setData(index, line) {
    line = line.replace(/[; ]/g, "").split("=");

    this.subSystems[this.subSystemIndex]["Set"][index] = line;
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

        this.subSystems[this.subSystemIndex]["InputOutput"][index] = line;

        return true;
      }
    }
    return false;
  }

  /**
   *  Like previous methods above this method finds specific operation or something else.
   *    In this case it's find any sign that line contain conditional Operations.
   *    If method finds conditional Operation it will put condition like this {Value: a==5}
   *    Also this method set into parameter setINTO_Operation -- this is important parameter
   *    author use it for define any possibility that this operation have subSystem in itself
   *
   * @param {*} index   --  Description the same as above, it's use for set individual parameter
   * @param {*} line    --  This is just string of source code
   * @returns
   * @memberof MainParser
   */
  conditionalOperation(index, line) {
    for (let i in this.basicOperation["ConditionalOperation"]) {
      if (line.includes(this.basicOperation["ConditionalOperation"][i])) {
        line = line
          .split(this.basicOperation["ConditionalOperation"][i])
          .join("")
          .replace(/[() ]/g, "");

        this.subSystems[this.subSystemIndex]["ConditionalOperation"][index] = {
          Value: line
        };
        this.setINTO_Operation[++this.setINTO_OperationIndex] = {
          Index: index,
          Operation: "ConditionalOperation"
        };

        return true;
      }
    }
    return false;
  }

  /**
   * This function find all signs that we are dealing with loops
   *  and store it in like {Operation : "for"(or else), "Value" : "int i = 0; i < len; i++", SubSystem: {}}
   *
   * @param {*} index   --  Description the same as above, it's use for set individual parameter
   * @param {*} line    --  This is just string of source code
   * @returns
   * @memberof MainParser
   */
  defineLoops(index, line) {
    for (let key in this.basicOperation["Loop"]) {
      if (line.includes(this.basicOperation["Loop"][key])) {
        line = line
          .split(this.basicOperation["Loop"][key])
          .join("")
          .replace(/[()]/g, "")
          .split("  ")
          .join("");

        this.subSystems[this.subSystemIndex]["Loop"][index] = {
          Operation: this.basicOperation["Loop"][key],
          Value: line
        };

        this.setINTO_Operation[++this.setINTO_OperationIndex] = {
          Index: index,
          Operation: "Loop"
        };

        console.log(line);

        return true;
      }
    }
    return false;
  }

  /**
   *    This method "defineSubSystem" find line that contain chars "{}" and
   *  after that will thought that after this chart will be come the subSystem
   *  of previous operation like conditionalOperation, loops etc.
   *
   * @param {*} index   --    Don't use it, in future delete it...
   * @param {*} line    --    Need for find chars "{}"
   * @memberof MainParser
   */
  defineSubSystem(index, line) {
    if (line.includes(this.basicOperation["DefineSubSystem"]["start"])) {
      this.subSystemIndex++;
      this.defineSubSystemStructure();
    }
    if (line.includes(this.basicOperation["DefineSubSystem"]["end"])) {
      this.subSystemIndex--;

      if (this.setINTO_OperationIndex != -1) {
        this.subSystems[this.subSystemIndex][
          this.setINTO_Operation[this.setINTO_OperationIndex]["Operation"]
        ][this.setINTO_Operation[this.setINTO_OperationIndex--]["Index"]][
          "SubSystem"
        ] = this.clone(this.subSystems[this.subSystemIndex + 1]);
      }

      if (this.subSystemIndex == -1) {
        this.JSON_code["Code"]["SubSystem"] = this.clone(this.subSystems["0"]);
      }
    }
  }

  /**
   *    This method just clone me the object that I send to him, it have
   *  simple structure so it just clone first layout, what's flow under water, not in Deep
   *
   * @param {*} object
   * @returns
   * @memberof MainParser
   */
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
