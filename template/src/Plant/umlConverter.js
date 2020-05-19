function setJSON(dict) {
  let encode6bit = (e) => {
    return e < 10
      ? String.fromCharCode(48 + e)
      : (e -= 10) < 26
      ? String.fromCharCode(65 + e)
      : (e -= 26) < 26
      ? String.fromCharCode(97 + e)
      : 0 == (e -= 26)
      ? "-"
      : 1 == e
      ? "_"
      : "?";
  };

  let append3bytes = (e, n, t) => {
    return (
      (c1 = e >> 2),
      (c2 = ((3 & e) << 4) | (n >> 4)),
      (c3 = ((15 & n) << 2) | (t >> 6)),
      (c4 = 63 & t),
      (r = ""),
      (r += encode6bit(63 & c1)),
      (r += encode6bit(63 & c2)),
      (r += encode6bit(63 & c3)),
      (r += encode6bit(63 & c4)),
      r
    );
  };

  let encode64_ = (e) => {
    for (r = "", i = 0; i < e.length; i += 3)
      i + 2 == e.length
        ? (r += append3bytes(e[i], e[i + 1], 0))
        : i + 1 == e.length
        ? (r += append3bytes(e[i], 0, 0))
        : (r += append3bytes(e[i], e[i + 1], e[i + 2]));
    return r;
  };

  let zopfli = require("node-zopfli");

  let arr = [];

  function enterAssign(json) {
    let lastIndex = -1;
    for (let i in json.Assign) {
      arr[i] =
        ":" +
        json.Assign[i][0].toString() +
        " = " +
        json.Assign[i][1].toString() +
        "]";
      lastIndex = i;
    }
    return lastIndex;
  }

  function enterSet(json) {
    let lastIndex = -1;
    for (let i in json.Set) {
      arr[i] =
        ":" +
        json.Set[i][0].toString() +
        " = " +
        json.Set[i][1].toString() +
        "]";
      lastIndex = i;
    }
    return lastIndex;
  }

  function inputOutput(json) {
    let lastIndex = -1;
    for (let i in json.InputOutput) {
      arr[i] = ":" + json.InputOutput[i] + "/";
      lastIndex = i;
    }
    return lastIndex;
  }

  let ifFlag = 0;

  function saveLastPosition(lastIndex, json) {
    let store;
    store = enterAssign(json.SubSystem);
    lastIndex = lastIndex > store ? lastIndex : store;

    store = enterSet(json.SubSystem);
    lastIndex = lastIndex > store ? lastIndex : store;

    store = inputOutput(json.SubSystem);
    lastIndex = lastIndex > store ? lastIndex : store;

    let temp = ifFlag;
    ifFlag = 0;
    store = conditionalOperation(json.SubSystem);
    lastIndex = lastIndex > store ? lastIndex : store;
    ifFlag = temp;

    store = enterLoop(json.SubSystem);
    lastIndex = lastIndex > store ? lastIndex : store;
    return lastIndex;
  }

  function conditionalOperation(json) {
    let lastIndex = -1;
    for (let i in json.ConditionalOperation) {
      if (json.ConditionalOperation[i].Value != "") {
        if (ifFlag == 1) {
          // Check "if cycle" is closed, No then Close cycle
          arr[lastIndex] += "\nendif";
          ifFlag = 0;
        }

        arr[i] =
          "if (" + json.ConditionalOperation[i].Value + "?) then (yes)\n";

        ifFlag = 1; // set Flag to 1 after each if cycle
        lastIndex = -1;
      } else {
        ifFlag = 0;
        arr[i] = "else (no)\n";
        lastIndex = -1;
      }

      lastIndex = saveLastPosition(lastIndex, json.ConditionalOperation[i]);

      if (ifFlag == 0) {
        // Check "if cycle" is closed, No then Close cycle
        arr[lastIndex] += "\nendif";
      }
    }

    console.log(ifFlag);

    if (ifFlag == 1) {
      // Check "if cycle" is closed, No then Close cycle
      arr[lastIndex] += "\nendif";
      ifFlag = 0;
    }
    return lastIndex;
  }

  function enterLoop(json) {
    let lastIndex = -1;
    console.log("0." + arr.length.toString());
    for (let i in json.Loop) {
      lastIndex = -1;
      arr[i] = "while(" + json.Loop[i].Value + ") is (loop)";

      lastIndex = saveLastPosition(lastIndex, json.Loop[i]);

      arr[lastIndex] += "\nendwhile (end loop)";
    }
    return lastIndex;
  }

  enterAssign(dict.Code);
  enterAssign(dict.Code.SubSystem);
  enterSet(dict.Code.SubSystem);
  inputOutput(dict.Code.SubSystem);
  conditionalOperation(dict.Code.SubSystem);
  enterLoop(dict.Code.SubSystem);
  console.log(arr.join("\n"));

  var text = unescape(
    encodeURIComponent("@startuml\n (*)\n" + arr.join("\n") + "\n(*)\n@enduml")
  );
  module.exports = (text) => {
    // text =  unescape(encodeURIComponent(text))
    let input = new Buffer(
      unescape(
        encodeURIComponent(
          "@startuml\n (*) --> " + enterAssign(dict) + " --> (*)\n@enduml"
        )
      ),
      "utf8"
    );
    let res = zopfli.deflateSync(input, { blocksplitting: false });
    return encode64_(res);
  };

  var input = new Buffer(text);
  //   console.log(input.toString());

  var deflated = zopfli.deflateSync(input, { blocksplitting: false });
  console.log("http://www.plantuml.com/plantuml/png/" + encode64_(deflated));
  return "http://www.plantuml.com/plantuml/png/" + encode64_(deflated);
}

module.exports.setJSON = setJSON;
