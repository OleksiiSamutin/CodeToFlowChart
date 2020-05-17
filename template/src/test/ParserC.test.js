const ParserC = require("../Parsers/ParserC");

function setNewTest(path) {
  text = require("fs")
    .readFileSync(path, "ASCII")
    .replace(/{/g, "\n{\n")
    .replace(/}/g, "\n}\n")
    .split("\n");

  let parser = new ParserC();
  parser.parseToJSON(text);

  Code_JSON = parser.getJSON();
}

setNewTest("Test1.cpp");

test("Testing: assignment variable", () => {
  expect(Code_JSON["Code"]["Assign"]).toEqual({ "0": ["a", "10"] });

  expect(Code_JSON["Code"]["SubSystem"]["Assign"]).toEqual({
    "1": ["c", "1.256"],
    "2": ["b", "c+a"],
  });
});

test("Testing: setting variable", () => {
  expect(Code_JSON["Code"]["SubSystem"]["Set"]).toEqual({ "3": ["a", "0"] });
});

test("Testing: input/output function", () => {
  expect(Code_JSON["Code"]["SubSystem"]["InputOutput"]).toEqual({
    "4": "b = %f\\n, b",
    "5": "%d, a",
  });
});

console.log(Code_JSON["Code"]["SubSystem"]);

test("Testing: Conditional Operation", () => {
  // First of all test Value
  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["6"]["Value"]
  ).toEqual("a==0");
  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["6"]["SubSystem"][
      "InputOutput"
    ]
  ).toEqual({ "7": "It is Work!" });

  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["6"]["SubSystem"][
      "ConditionalOperation"
    ]["8"]["Value"]
  ).toEqual("b==0");
  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["6"]["SubSystem"][
      "ConditionalOperation"
    ]["8"]["SubSystem"]["InputOutput"]
  ).toEqual({ "9": "This is not good!!" });
  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["10"]["Value"]
  ).toEqual("");
  expect(
    Code_JSON["Code"]["SubSystem"]["ConditionalOperation"]["10"]["SubSystem"][
      "InputOutput"
    ]
  ).toEqual({ "11": "It is not Working!!!" });
});

test("Testing: Loops", () => {
  expect(Code_JSON["Code"]["SubSystem"]["Loop"]["12"]["Operation"]).toEqual(
    "for"
  );
  expect(Code_JSON["Code"]["SubSystem"]["Loop"]["12"]["Value"]).toEqual(
    " int i = 0; i < 10; i++"
  );
  expect(
    Code_JSON["Code"]["SubSystem"]["Loop"]["12"]["SubSystem"]["InputOutput"]
  ).toEqual({ "13": "Hello world!" });
  expect(Code_JSON["Code"]["SubSystem"]["Loop"]["14"]["Operation"]).toEqual(
    "while"
  );
  expect(Code_JSON["Code"]["SubSystem"]["Loop"]["14"]["Value"]).toEqual(
    " a < 1510"
  );
  expect(
    Code_JSON["Code"]["SubSystem"]["Loop"]["14"]["SubSystem"]["InputOutput"]
  ).toEqual({ "15": "%d, a" });
});
