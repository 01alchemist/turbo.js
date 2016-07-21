"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DefnKind_1 = require("../kind/DefnKind");
var Defn_1 = require("./Defn");
var PrimKind_1 = require("../kind/PrimKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var UserDefn = (function (_super) {
    __extends(UserDefn, _super);
    function UserDefn(file, line, name, kind, props, methods, origin) {
        _super.call(this, name, kind);
        this.file = file;
        this.line = line;
        this.props = props;
        this.methods = methods;
        this.origin = origin;
        this.typeRef = null;
        this.map = null;
        this.live = false;
        this.checked = false;
    }
    UserDefn.prototype.findAccessibleFieldFor = function (operation, prop) {
        var d = this.map.get(prop);
        if (!d)
            return null;
        switch (operation) {
            case "get":
            case "set":
            case "ref":
                return d;
            case "add":
            case "sub":
            case "and":
            case "or":
            case "xor":
            case "compareExchange":
                {
                    if (d.type.kind != DefnKind_1.DefnKind.Primitive)
                        return null;
                    var prim = d.type;
                    // add, sub, and, or, and xor are defined on plain primitives too, for
                    // internal reasons, but that is not documented.
                    //if (prim.primKind != PrimKind.Atomic && prim.primKind != PrimKind.Synchronic)
                    //    return null;
                    return d;
                }
            case "loadWhenEqual":
            case "loadWhenNotEqual":
            case "expectUpdate":
            case "notify":
                {
                    if (d.type.kind != DefnKind_1.DefnKind.Primitive)
                        return null;
                    var prim = d.type;
                    if (prim.primKind != PrimKind_1.PrimKind.Synchronic)
                        return null;
                    return d;
                }
            default:
                return null;
        }
    };
    return UserDefn;
}(Defn_1.Defn));
exports.UserDefn = UserDefn;
//# sourceMappingURL=UserDefn.js.map