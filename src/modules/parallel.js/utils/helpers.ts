/**
 * Created by Nidin Vinayakan on 6/14/2016.
 */
export var ABORT:boolean;
export var EXITSTATUS:number;
export var abortDecorators:any = [];

export function assert(condition, text="") {
    if (!condition) {
        abort('Assertion failed: ' + text);
    }
}
export function abort(what) {
    if (what !== undefined) {
        console.error(what);
        what = JSON.stringify(what)
    } else {
        what = '';
    }

    ABORT = true;
    EXITSTATUS = 1;

    var extra = '';

    var output = 'abort(' + what + ') at ' + extra;
    if (abortDecorators) {
        abortDecorators.forEach(function (decorator) {
            output = decorator(output, what);
        });
    }
    throw output;
}