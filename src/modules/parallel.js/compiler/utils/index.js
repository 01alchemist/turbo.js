"use strict";
var DefnKind_1 = require("../kind/DefnKind");
var InternalError_1 = require("../errors/InternalError");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var MapEntry = (function () {
    function MapEntry(name, expand, offset, type) {
        this.name = name;
        this.expand = expand;
        this.offset = offset;
        this.type = type;
    }
    Object.defineProperty(MapEntry.prototype, "memory", {
        get: function () {
            if (this.type.kind != DefnKind_1.DefnKind.Primitive)
                throw new InternalError_1.InternalError("No memory type available for non-primitive type " + this.type.name);
            return this.type.memory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapEntry.prototype, "size", {
        get: function () {
            return this.type.size;
        },
        enumerable: true,
        configurable: true
    });
    MapEntry.prototype.toString = function () {
        return "(" + this.name + " " + this.expand + " " + this.offset + " " + this.type.name + ")";
    };
    return MapEntry;
}());
exports.MapEntry = MapEntry;
var SMap = (function () {
    function SMap() {
        this.props = [];
        this.mapping = {}; // Map from name to index
        this.generation = 0; // Incremented on update (but not on add)
    }
    SMap.prototype.test = function (n) {
        return typeof this.mapping[n] == "number";
    };
    SMap.prototype.get = function (n) {
        var probe = this.mapping[n];
        if (typeof probe == "number")
            return this.props[probe].value;
        return null;
    };
    SMap.prototype.put = function (n, v) {
        var probe = this.mapping[n];
        if (typeof probe == "number") {
            this.props[probe].value = v;
            this.generation++;
        }
        else {
            this.mapping[n] = this.props.length;
            this.props.push({ name: n, value: v });
        }
    };
    SMap.prototype.copy = function () {
        var newMap = new SMap();
        newMap.props = this.props.slice(0);
        for (var n in this.mapping)
            if (this.mapping.hasOwnProperty(n))
                newMap.mapping[n] = this.mapping[n];
        return newMap;
    };
    SMap.prototype.values = function () {
        var theMap = this;
        var generation = this.generation;
        var props = this.props;
        var i = 0;
        return {
            next: function () {
                if (theMap.generation != generation)
                    throw new InternalError_1.InternalError("Generator invalidated by assignment");
                if (i == props.length)
                    return null;
                return props[i++].value;
            }
        };
    };
    SMap.prototype.keysValues = function () {
        var theMap = this;
        var generation = this.generation;
        var props = this.props;
        var i = 0;
        return {
            next: function () {
                if (theMap.generation != generation)
                    throw new InternalError_1.InternalError("Generator invalidated by assignment");
                if (i == props.length)
                    return [null, null];
                var x = props[i++];
                return [x.name, x.value];
            }
        };
    };
    return SMap;
}());
exports.SMap = SMap;
var SSet = (function () {
    function SSet() {
        this.mapping = {}; // Map from name to true
    }
    SSet.prototype.test = function (n) {
        return typeof this.mapping[n] == "boolean";
    };
    SSet.prototype.put = function (n) {
        this.mapping[n] = true;
    };
    return SSet;
}());
exports.SSet = SSet;
// This can also check if x is already properly parenthesized, though that
// involves counting parens, at least trivially (and then does it matter?).
// Consider (a).(b), which should be parenthesized as ((a).(b)).
//
// Issue #16: Parentheses are not actually reliable.
function endstrip(x) {
    if (/^[a-zA-Z0-9]+$/.test(x))
        return x;
    return "(" + x + ")";
}
exports.endstrip = endstrip;
//# sourceMappingURL=index.js.map