"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PrimKind_1 = require("../kind/PrimKind");
var Defn_1 = require("./Defn");
var DefnKind_1 = require("../kind/DefnKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var PrimitiveDefn = (function (_super) {
    __extends(PrimitiveDefn, _super);
    function PrimitiveDefn(name, size, align, primKind) {
        if (primKind === void 0) { primKind = PrimKind_1.PrimKind.Vanilla; }
        _super.call(this, name, DefnKind_1.DefnKind.Primitive);
        this.primKind = primKind;
        this.size = size;
        this.align = align;
        if (primKind == PrimKind_1.PrimKind.SIMD)
            this._memory = "_mem_" + name.split("x")[0];
        else
            this._memory = "_mem_" + name.split("/").pop();
    }
    Object.defineProperty(PrimitiveDefn.prototype, "memory", {
        get: function () {
            return this._memory;
        },
        enumerable: true,
        configurable: true
    });
    return PrimitiveDefn;
}(Defn_1.Defn));
exports.PrimitiveDefn = PrimitiveDefn;
//# sourceMappingURL=PrimitiveDefn.js.map