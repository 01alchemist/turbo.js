"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Defn = (function () {
    function Defn(name, kind) {
        this.name = name;
        this.kind = kind;
        this.size = 0;
        this.align = 0;
    }
    Object.defineProperty(Defn.prototype, "elementSize", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Defn.prototype, "elementAlign", {
        get: function () {
            return this.align;
        },
        enumerable: true,
        configurable: true
    });
    Defn.pointerSize = 4;
    Defn.pointerAlign = 4;
    Defn.pointerTypeName = "int32";
    Defn.pointerMemName = "_mem_i32";
    return Defn;
}());
exports.Defn = Defn;
//# sourceMappingURL=Defn.js.map