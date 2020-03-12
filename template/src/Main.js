const ParserC = module.require("./Parsers/ParserC.js");
function setSourceCode(path) {
  // This operation below read code from Testing File and split it line by line, it's needed
  //  only for making a start point and will not be used in a future
  // @param fs  -- It's shortcut of FileSystem
  text = require("fs")
    .readFileSync(path, "ASCII")
    .split("\n");

  // This variable below need for temporal save cut pass
  switch (path.split(".")[1]) {
    case "cpp":
    case "c": {
      console.log(text);
      //  Declaration of import module for Parsing C code
      let parser = new ParserC();

      parser.print();

      parser.parseToJSON(text);
      break;
    }
    case "py": {
      break;
    }
    case "java": {
      break;
    }
  }
}

setSourceCode("SourceCode/Test.cpp");
