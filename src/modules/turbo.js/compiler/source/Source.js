"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var Source = (function () {
    function Source(input_file, output_file, defs, lines) {
        this.input_file = input_file;
        this.output_file = output_file;
        this.defs = defs;
        this.lines = lines;
    }
    Source.prototype.allText = function () {
        return this.lines.map(function (x) {
            return x.text;
        }).join("\n");
    };
    return Source;
}());
exports.Source = Source;
//# sourceMappingURL=Source.js.map