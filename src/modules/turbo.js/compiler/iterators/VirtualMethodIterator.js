"use strict";
var index_1 = require("../utils/index");
var MethodKind_1 = require("../kind/MethodKind");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var VirtualMethodIterator = (function () {
    function VirtualMethodIterator(cls) {
        this.cls = cls;
        this.i = 0;
        this.inherited = false;
        this.filter = new index_1.SSet();
    }
    VirtualMethodIterator.prototype.next = function () {
        for (;;) {
            if (this.i == this.cls.methods.length) {
                if (!this.cls.baseTypeRef)
                    return ["", null, false];
                this.i = 0;
                this.cls = this.cls.baseTypeRef;
                this.inherited = true;
                continue;
            }
            var m = this.cls.methods[this.i++];
            if (m.kind != MethodKind_1.MethodKind.Virtual)
                continue;
            if (this.filter.test(m.name))
                continue;
            this.filter.put(m.name);
            return [m.name, m.signature, this.inherited];
        }
    };
    return VirtualMethodIterator;
}());
exports.VirtualMethodIterator = VirtualMethodIterator;
//# sourceMappingURL=VirtualMethodIterator.js.map