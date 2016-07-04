"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserDefn_1 = require("./UserDefn");
var DefnKind_1 = require("../kind/DefnKind");
var MethodKind_1 = require("../kind/MethodKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var StructDefn = (function (_super) {
    __extends(StructDefn, _super);
    function StructDefn(file, line, name, props, methods, origin) {
        _super.call(this, file, line, name, DefnKind_1.DefnKind.Struct, props, methods, origin);
        this.hasGetMethod = false;
        this.hasSetMethod = false;
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var m = methods_1[_i];
            if (m.kind == MethodKind_1.MethodKind.Get)
                this.hasGetMethod = true;
            else if (m.kind == MethodKind_1.MethodKind.Set)
                this.hasSetMethod = true;
        }
    }
    return StructDefn;
}(UserDefn_1.UserDefn));
exports.StructDefn = StructDefn;
//# sourceMappingURL=StructDefn.js.map