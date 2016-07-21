"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CapturedError_1 = require("./CapturedError");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var InternalError = (function (_super) {
    __extends(InternalError, _super);
    function InternalError(msg) {
        _super.call(this, "InternalError", "Internal error: " + msg);
    }
    return InternalError;
}(CapturedError_1.CapturedError));
exports.InternalError = InternalError;
//# sourceMappingURL=InternalError.js.map