"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PrimitiveDefn_1 = require("./PrimitiveDefn");
var PrimKind_1 = require("../kind/PrimKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var SynchronicDefn = (function (_super) {
    __extends(SynchronicDefn, _super);
    function SynchronicDefn(name, size, align, baseSize) {
        _super.call(this, name, size, align, PrimKind_1.PrimKind.Synchronic);
        this.baseSize = baseSize;
    }
    // The byte offset within the structure for the payload
    SynchronicDefn.bias = 8;
    return SynchronicDefn;
}(PrimitiveDefn_1.PrimitiveDefn));
exports.SynchronicDefn = SynchronicDefn;
//# sourceMappingURL=SynchronicDefn.js.map