"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserDefn_1 = require("./UserDefn");
var Defn_1 = require("./Defn");
var DefnKind_1 = require("../kind/DefnKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var ClassDefn = (function (_super) {
    __extends(ClassDefn, _super);
    function ClassDefn(file, line, name, baseName, props, methods, origin) {
        _super.call(this, file, line, name, DefnKind_1.DefnKind.Class, props, methods, origin);
        this.baseName = baseName;
        this.baseTypeRef = null;
        this.className = ""; // Base1>Base2>name
        this.classId = 0;
        this.subclasses = []; // direct proper subclasses
        this.vtable = null;
    }
    Object.defineProperty(ClassDefn.prototype, "elementSize", {
        get: function () {
            return Defn_1.Defn.pointerSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefn.prototype, "elementAlign", {
        get: function () {
            return Defn_1.Defn.pointerAlign;
        },
        enumerable: true,
        configurable: true
    });
    ClassDefn.prototype.hasMethod = function (name) {
        for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name == name)
                return true;
        }
        return false;
    };
    ClassDefn.prototype.getMethod = function (name) {
        for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name == name)
                return m;
        }
        return null;
    };
    return ClassDefn;
}(UserDefn_1.UserDefn));
exports.ClassDefn = ClassDefn;
//# sourceMappingURL=ClassDefn.js.map