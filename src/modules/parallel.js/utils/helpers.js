System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ABORT, EXITSTATUS, abortDecorators;
    function assert(condition, text) {
        if (text === void 0) { text = ""; }
        if (!condition) {
            abort('Assertion failed: ' + text);
        }
    }
    exports_1("assert", assert);
    function abort(what) {
        if (what !== undefined) {
            console.error(what);
            what = JSON.stringify(what);
        }
        else {
            what = '';
        }
        exports_1("ABORT", ABORT = true);
        exports_1("EXITSTATUS", EXITSTATUS = 1);
        var extra = '';
        var output = 'abort(' + what + ') at ' + extra;
        if (abortDecorators) {
            abortDecorators.forEach(function (decorator) {
                output = decorator(output, what);
            });
        }
        throw output;
    }
    exports_1("abort", abort);
    return {
        setters:[],
        execute: function() {
            exports_1("abortDecorators", abortDecorators = []);
        }
    }
});
//# sourceMappingURL=helpers.js.map