var arr = { "0": ["a", "10\r"] };

function enterAssign() {
  let text1 = "";
  for (let i in arr) {
    text1 += '"' + arr[i][0].toString() + " = " + arr[i][1].toString() + '"';
  }
  return text1 + "\n" + text1;
}

console.log("@startuml\n (*) -->" + enterAssign() + " --> (*)\n@enduml");
