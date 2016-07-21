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
var AtomicDefn = (function (_super) {
    __extends(AtomicDefn, _super);
    function AtomicDefn(name, size, align) {
        _super.call(this, name, size, align, PrimKind_1.PrimKind.Atomic);
    }
    return AtomicDefn;
}(PrimitiveDefn_1.PrimitiveDefn));
exports.AtomicDefn = AtomicDefn;
//# sourceMappingURL=AtomicDefn.js.map