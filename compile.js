/**
 * Created by r3f on 4/7/2016.
 */
var Compiler = require("./src/modules/parallel.js/compiler/Compiler").Compiler;

var compiler = new Compiler();
compiler.compile(process.argv.slice(2));