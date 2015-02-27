//var fs = require('fs');
//function loadGP(file, path) {
//    return fs.readFileSync((path ? path : process.cwd()) + "/" + file, 'utf8')
//}

var code = [
"method contains Array element {",
"  comment '",
"	Return true if any element equals the input.'",
"  for el this {",
"    if (el == element) { return true }",
"  }",
"  return false",
"}"]

var str = code.join("\n");

var tree = GPParser.matchAll(str, "topLevelCmd");
console.log(JSON.stringify(tree));

var massaged = GPMassager.match(tree, "trans");
console.log(JSON.stringify(massaged));




