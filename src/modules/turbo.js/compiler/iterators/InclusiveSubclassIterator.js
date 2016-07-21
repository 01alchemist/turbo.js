"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var InclusiveSubclassIterator = (function () {
    function InclusiveSubclassIterator(cls) {
        this.stack = [];
        this.stack.push(cls);
    }
    InclusiveSubclassIterator.prototype.next = function () {
        if (this.stack.length == 0)
            return null;
        var top = this.stack.pop();
        if (typeof top == "number") {
            var x = top;
            var xs = this.stack.pop();
            var cls = xs[x++];
            if (x < xs.length) {
                this.stack.push(xs);
                this.stack.push(x);
            }
            if (cls.subclasses.length > 0) {
                this.stack.push(cls.subclasses);
                this.stack.push(0);
            }
            return cls;
        }
        else {
            var x = top;
            if (x.subclasses.length > 0) {
                this.stack.push(x.subclasses);
                this.stack.push(0);
            }
            return x;
        }
    };
    return InclusiveSubclassIterator;
}());
exports.InclusiveSubclassIterator = InclusiveSubclassIterator;
//# sourceMappingURL=InclusiveSubclassIterator.js.map