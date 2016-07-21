"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Prop = (function () {
    function Prop(line, name, qual, isArray, typeName) {
        this.line = line;
        this.name = name;
        this.qual = qual;
        this.isArray = isArray;
        this.typeName = typeName;
        this.typeRef = null;
    }
    return Prop;
}());
exports.Prop = Prop;
//# sourceMappingURL=Prop.js.map