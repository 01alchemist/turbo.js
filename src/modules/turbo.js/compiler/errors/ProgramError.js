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
var ProgramError = (function (_super) {
    __extends(ProgramError, _super);
    function ProgramError(file, line, msg) {
        _super.call(this, "ProgramError", file + ":" + line + ": " + msg);
    }
    return ProgramError;
}(CapturedError_1.CapturedError));
exports.ProgramError = ProgramError;
//# sourceMappingURL=ProgramError.js.map