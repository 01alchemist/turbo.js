"use strict";
var Runtime_1 = require("../Runtime");
var DataType_1 = require("../types/DataType");
/**
 * Created by Nidin Vinayakan on 6/18/2016.
 */
var Compiler = (function () {
    function Compiler() {
    }
    Compiler.compileClass = function (parameters) {
        return function (constructor) {
            console.log(DataType_1.DataType[parameters.type]);
            console.log(constructor.toString());
            var prototype = constructor.prototype;
            for (var prop in prototype) {
                if (prototype.hasOwnProperty(prop)) {
                    var value = prototype[prop];
                    if (value instanceof Function) {
                        eval("prototype." + prop + " = function(a) {\n                            return new MyVectorClass(this.x - a.x, this.y - a.y, this.z - a.z);\n                        }");
                    }
                    console.log(prop, prototype[prop]);
                }
            }
        };
    };
    Compiler.compileStructure = function (_a) {
        var type = _a.type, source = _a.source, members = _a.members;
        return function (constructor) {
            console.log(DataType_1.DataType[type]);
            console.log(constructor.toString());
            var prototype = constructor.prototype;
            source.getImplementation = function (SELF) {
            };
            source.setImplementation = function (SELF, value) {
                Runtime_1.Runtime._mem_float64[(SELF + 0) >> 3] = (value.x);
                Runtime_1.Runtime._mem_float64[(SELF + 8) >> 3] = (value.y);
                Runtime_1.Runtime._mem_float64[(SELF + 16) >> 3] = (value.z);
            };
            var setImplementation = "function (SELF, value) {";
            for (var member in members) {
                if (members.hasOwnProperty(member)) {
                    var value = members[member];
                    setImplementation += "Runtime._mem_" + DataType_1.DataType[value] + "[(SELF + 0) >> 3] = (value." + member + ");";
                    console.log(member, members[member]);
                }
            }
            setImplementation += "}";
        };
    };
    return Compiler;
}());
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map