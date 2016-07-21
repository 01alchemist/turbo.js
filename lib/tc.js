/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Compiler = require("./../src/modules/turbo.js/compiler/Compiler").Compiler;

var compiler = new Compiler();
compiler.compile(process.argv.slice(2));