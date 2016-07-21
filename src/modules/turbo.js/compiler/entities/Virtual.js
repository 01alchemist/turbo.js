"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Virtual = (function () {
    function Virtual(name, sign, reverseCases, default_) {
        this.name = name;
        this.sign = sign;
        this.reverseCases = reverseCases;
        this.default_ = default_;
    }
    Virtual.prototype.signature = function () {
        if (this.sign == null)
            return ", ...args";
        if (this.sign.length == 0)
            return "";
        return ", " + this.sign.join(",");
    };
    return Virtual;
}());
exports.Virtual = Virtual;
//# sourceMappingURL=Virtual.js.map