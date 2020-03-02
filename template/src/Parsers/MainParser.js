class MainParser {
  constructor() {
    this.JSON_code = { name: "TestCode" };
    this.basicOperation = {};
    this.basicOperation["DataType"] = [];
    this.basicOperation["Input/Output"] = [];
  }

  parseToJSON(strArray) {
    console.log("Parse to JSON");

    this.JSON_code["Code"] = {};
    this.JSON_code["Code"]["assign"] = {};

    let undefinedLine = 0;

    console.log(this.JSON_code);
    for (let line in strArray) {
      if (this.inputOutputData(strArray[line])) {
        continue;
      }
      if (strArray[line].includes("=")) {
        this.assignData(line - undefinedLine, strArray[line]);
        continue;
      }
      undefinedLine++;
      console.log(strArray[line]);
    }
  }

  assignData(index, line) {
    console.log(line.includes("="));

    for (let i in this.basicOperation["DataType"]) {
      if (line.includes(this.basicOperation["DataType"][i])) {
        line = line
          .split(this.basicOperation["DataType"][i])
          .join("")
          .split(";")
          .join("")
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

  // TODO: To finish method below and create compare method

  inputOutputData(line) {
    for (let i in this.basicOperation["Input/Output"]) {
      if (line.includes(this.basicOperation["Input/Output"][i])) {
        // Here should be some code

        return true;
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
