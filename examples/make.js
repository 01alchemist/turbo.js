// combine kernel modules and compile
"use strict";
let fs = require("fs");
let path = require("path");
let turbo = require("../lib/compiler.js");
let compiler = new turbo.Compiler();
let modules = [
    "./array.tts",
];
var source = "//Turbo module\n";
modules.forEach((file) => {
    var content = fs.readFileSync(path.resolve(__dirname, file));
    source += content + "\n\n";
});
source += "\n";

fs.writeFileSync(path.resolve(__dirname, "array.compiled.tts"), source);

compiler.compile({
    sources: [path.resolve(__dirname, "array.compiled.tts")],
    options: {
        bundle: true,
        outDir: __dirname,
        outFile: "array.compiled.ts",
        target: turbo.CompilerTarget.TypeScript
    }
});

fs.unlinkSync(path.resolve(__dirname, "array.compiled.tts"));

//Compile TypeScript
const spawn = require('child_process').spawn;
const ls = spawn('tsc', [
    __dirname + '/array.compiled.ts',
    '--target', 'es5',
    '--module', 'commonjs',
    '--sourceMap'
]);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
