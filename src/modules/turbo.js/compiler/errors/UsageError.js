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
var UsageError = (function (_super) {
    __extends(UsageError, _super);
    function UsageError(msg) {
        _super.call(this, "UsageError", "Usage error: " + msg);
    }
    return UsageError;
}(CapturedError_1.CapturedError));
exports.UsageError = UsageError;
//# sourceMappingURL=UsageError.js.map