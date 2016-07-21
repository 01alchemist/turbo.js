"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
(function (MethodKind) {
    MethodKind[MethodKind["Virtual"] = 0] = "Virtual";
    MethodKind[MethodKind["NonVirtual"] = 1] = "NonVirtual";
    MethodKind[MethodKind["Get"] = 2] = "Get";
    MethodKind[MethodKind["Set"] = 3] = "Set";
})(exports.MethodKind || (exports.MethodKind = {}));
var MethodKind = exports.MethodKind;
//# sourceMappingURL=MethodKind.js.map