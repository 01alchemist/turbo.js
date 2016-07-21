"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Method = (function () {
    function Method(line, kind, name, signature, body) {
        this.line = line;
        this.kind = kind;
        this.name = name;
        this.signature = signature;
        this.body = body;
    }
    return Method;
}());
exports.Method = Method;
//# sourceMappingURL=Method.js.map