var fs = require('fs')

function load(file) {
    eval(fs.readFileSync(__dirname + "/" + file, 'utf8'))
}

load("lib.js")

load("ometa-base.js")
load("parser.js")
load("bs-js-compiler.js")
load("bs-ometa-compiler.js")
load("bs-ometa-optimizer.js")
load("bs-ometa-js-compiler.js")

translateCode = function(s) {
  var translationError = function(m, i) {
      console.log("Translation error - please tell Alex about this!");
      throw fail
  },
  tree = BSOMetaJSParser.matchAll(s, "topLevel", undefined,
	  function(m, i) {
             throw objectThatDelegatesTo(fail, {errorPos: i})
  })
  return BSOMetaJSTranslator.match(tree, "trans", undefined, translationError)
}

function ometa(s) {
   return eval(translateCode(s))
}

function loadOMeta(s) {
   return eval(translateCode(fs.readFileSync(__dirname + "/" + s, 'utf8')))
}

if (!(process.argv.length > 2)) {
   console.log("usage: node ometa-node.js <ometa grammar file> [<js file>]")
} else {
   loadOMeta(process.argv[2])
   if (process.argv.length > 3) {
     load(process.argv[3])
   }
}

