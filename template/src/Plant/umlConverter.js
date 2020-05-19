function setJSON(dict) {
<<<<<<< HEAD
=======
  console.log("JSON is set", dict.Code);
  console.log(dict.Name);
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea

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
    for (let i in json.Assign) {
      arr[i] =
        ":" +
        json.Assign[i][0].toString() +
        " = " +
        json.Assign[i][1].toString() +
        "]";
    }
  }

  function enterSet(json) {
    for (let i in json.Set) {
      arr[i] =
        ":" +
        json.Set[i][0].toString() +
        " = " +
        json.Set[i][1].toString() +
        "]";
    }
  }

  function inputOutput(json) {
    for (let i in json.InputOutput) {
      arr[i] = ":" + json.InputOutput[i] + "/";
    }
  }

  let ifFlag = 0;

  function conditionalOperation(json) {
    for (let i in json.ConditionalOperation) {
      if (json.ConditionalOperation[i].Value != "") {
        if (ifFlag == 1) {
          // Check "if cycle" is closed, No then Close cycle
          arr[arr.length - 1] += "\nendif";
          ifFlag = 0;
        }

<<<<<<< HEAD
        arr[i] = "if (" + json.ConditionalOperation[i].Value + "?) then (yes)\n";
=======
        arr[i] =
          "if (" + json.ConditionalOperation[i].Value + "?) then (yes)\n";
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea

        ifFlag = 1; // set Flag to 1 after each if cycle
      } else {
        ifFlag = 0;
        arr[i] = "else (no)\n";
      }

      enterAssign(json.ConditionalOperation[i].SubSystem);
      enterSet(json.ConditionalOperation[i].SubSystem);
      inputOutput(json.ConditionalOperation[i].SubSystem);

      let temp = ifFlag;
      ifFlag = 0; // Set to 0 for another subSystem
      conditionalOperation(json.ConditionalOperation[i].SubSystem);
<<<<<<< HEAD
      enterLoop(json.ConditionalOperation[i].SubSystem);
=======
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
      ifFlag = temp;

      if (ifFlag == 0)
        // Check "if cycle" is closed, No then Close cycle
        arr[arr.length - 1] += "\nendif";
    }

    if (ifFlag == 1) {
      // Check "if cycle" is closed, No then Close cycle
      arr[arr.length - 1] += "\nendif";
      ifFlag = 0;
    }
  }

<<<<<<< HEAD


  function enterLoop(json){
    console.log("0." + arr.length.toString())
    for (let i in json.Loop) {

       arr[i] = "while(" + json.Loop[i].Value + ") is (loop)";


       console.log("1." + arr.length.toString())
       enterAssign(json.Loop[i].SubSystem);
       enterSet(json.Loop[i].SubSystem);
       inputOutput(json.Loop[i].SubSystem);
       console.log("2." +arr.length.toString())

       conditionalOperation(json.Loop[i].SubSystem);


       enterLoop(json.Loop[i].SubSystem);


       arr[arr.length - 1] += "\nendwhile (end loop1)";

     }

    }

  enterLoop(dict.Code.SubSystem);
  conditionalOperation(dict.Code.SubSystem);
=======
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
  enterAssign(dict.Code);
  enterAssign(dict.Code.SubSystem);
  enterSet(dict.Code.SubSystem);
  inputOutput(dict.Code.SubSystem);
<<<<<<< HEAD
  console.log(arr.join("\n"));
=======
  conditionalOperation(dict.Code.SubSystem);
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea

  var text = unescape(
    encodeURIComponent("@startuml\n (*)\n" + arr.join("\n") + "\n(*)\n@enduml")
  );
  module.exports = (text) => {
    // text =  unescape(encodeURIComponent(text))
<<<<<<< HEAD
    let input = new Buffer(unescape(encodeURIComponent("@startuml\n (*) --> " + enterAssign(dict) + " --> (*)\n@enduml")),"utf8");
=======
    let input = new Buffer(
      unescape(
        encodeURIComponent(
          "@startuml\n (*) --> " + enterAssign(dict) + " --> (*)\n@enduml"
        )
      ),
      "utf8"
    );
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
    let res = zopfli.deflateSync(input, { blocksplitting: false });
    return encode64_(res);
  };

  var input = new Buffer(text);
  //   console.log(input.toString());
<<<<<<< HEAD
=======
  let defl;
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea

  var deflated = zopfli.deflateSync(input, { blocksplitting: false });
  console.log("http://www.plantuml.com/plantuml/png/" + encode64_(deflated));
  return "http://www.plantuml.com/plantuml/png/" + encode64_(deflated);
}

<<<<<<< HEAD

module.exports.setJSON = setJSON;
=======
module.exports.setJSON = setJSON;
>>>>>>> 704753c40bf0129d31d237f0fc5ae8ee1cdc1eea
