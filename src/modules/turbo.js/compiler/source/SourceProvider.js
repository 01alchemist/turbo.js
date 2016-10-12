"use strict";
/// <reference path='../../../../../typings/globals/node/index.d.ts' />
var UsageError_1 = require("../errors/UsageError");
var fs = require("fs");
var Source_1 = require("./Source");
var CapturedError_1 = require("../errors/CapturedError");
var DefinitionService_1 = require("../services/DefinitionService");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var SourceProvider = (function () {
    function SourceProvider(sources) {
        this.allSources = [];
        this.definitionService = new DefinitionService_1.DefinitionService;
        try {
            for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
                var input_file = sources_1[_i];
                if (!(/.\.t[js|ts]+$/.test(input_file))) {
                    throw new UsageError_1.UsageError("Bad file name (must be *.tjs or tts): " + input_file);
                }
                var text = fs.readFileSync(input_file, "utf8");
                var lines = text.split("\n");
                var _a = this.definitionService.collectDefinitions(input_file, lines), defs = _a[0], residual = _a[1];
                var output_file = input_file.replace(/\.t([js|ts]+)$/, ".$1");
                this.allSources.push(new Source_1.Source(input_file, output_file, defs, residual));
            }
        }
        catch (e) {
            if (e instanceof CapturedError_1.CapturedError)
                console.log(e.message);
            else
                console.log(e);
            process.exit(1);
        }
    }
    return SourceProvider;
}());
exports.SourceProvider = SourceProvider;
//# sourceMappingURL=SourceProvider.js.map