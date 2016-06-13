"use strict";
exports.abortDecorators = [];
function assert(condition, text) {
    if (text === void 0) { text = ""; }
    if (!condition) {
        abort('Assertion failed: ' + text);
    }
}
exports.assert = assert;
function abort(what) {
    if (what !== undefined) {
        console.error(what);
        what = JSON.stringify(what);
    }
    else {
        what = '';
    }
    exports.ABORT = true;
    exports.EXITSTATUS = 1;
    var extra = '';
    var output = 'abort(' + what + ') at ' + extra;
    if (exports.abortDecorators) {
        exports.abortDecorators.forEach(function (decorator) {
            output = decorator(output, what);
        });
    }
    throw output;
}
exports.abort = abort;
//# sourceMappingURL=helpers.js.map