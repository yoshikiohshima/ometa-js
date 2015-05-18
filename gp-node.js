var fs = require('fs')

function constructPath(file, path) {
  if (file[0] == '/') {
    return file
  } else {
    if (path) {
      return path + '/' + file;
    } else {
      return process.cwd() + '/' + file;
    }
  }
}

function load(file, path) {
    this.eval(fs.readFileSync(constructPath(file, path), 'utf8'))
}
var path
var pathArray = process.argv[1].split('/')
if (pathArray.length > 1) {
    pathArray.pop()
    path = pathArray.join('/')
}

load("lib.js", path)
load("ometa-base.js", path)
load("parser.js", path)
load("bs-js-compiler.js", path)
load("bs-ometa-compiler.js", path)
load("bs-ometa-optimizer.js", path)
load("bs-ometa-js-compiler.js", path)

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

translateGPCode = function(s) {
    var translationError = function(m, i) {
	console.log("Translation error - please tell Yoshiki about this!");
	throw fail
    },
    tree = GPParser.matchAll(s, "file", undefined,
				    function(m, i) {
					throw objectThatDelegatesTo(fail, {errorPos: i})
				    });
    //console.log(JSON.stringify(tree));
    return tree;
    //return GPMassager.match(tree, "start", undefined, translationError)
}

function ometa(s) {
    return this.eval(translateCode(s))
}

function loadOMeta(s, path) {
    return this.eval(translateCode(fs.readFileSync(constructPath(s, path), 'utf8')))
}

function loadGP(s, path) {
    var result = translateGPCode(fs.readFileSync(constructPath(s, path), 'utf8'));
    console.log(JSON.stringify(result));
}

if (!(process.argv.length > 2)) {
    console.log("usage: node ometa-node.js <ometa grammar / js files> [-]")
} else {
    var len = process.argv.length;
    for (var i = 2; i < len; i++) {
	var file = process.argv[i];
	if (file === '-') {
	    var repl = require('repl')
	    repl.start('> ')
	} else if (file.match('.ometa$')) {
	    loadOMeta(file)
        } else if (file.match('.gp$')) {
            console.log(file);
	    loadGP(file)
        } else {
	    load(file)
	}
    }
}
