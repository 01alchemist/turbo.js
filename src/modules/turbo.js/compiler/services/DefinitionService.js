"use strict";
var SourceLine_1 = require("../source/SourceLine");
var Prop_1 = require("../entities/Prop");
var Method_1 = require("../entities/Method");
var MethodKind_1 = require("../kind/MethodKind");
var ProgramError_1 = require("../errors/ProgramError");
var ClassDefn_1 = require("../define/ClassDefn");
var StructDefn_1 = require("../define/StructDefn");
var CONST_1 = require("../CONST");
var PropQual_1 = require("../entities/PropQual");
var ParamParser_1 = require("../parser/ParamParser");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var DefinitionService = (function () {
    function DefinitionService() {
    }
    /**
     * Collect all definitions from the source code
     * */
    DefinitionService.prototype.collectDefinitions = function (filename, lines) {
        var _this = this;
        var defs = [];
        var turboLines = [];
        var i = 0;
        var numLines = lines.length;
        var line;
        while (i < numLines) {
            line = lines[i++];
            if (!CONST_1.Matcher.START.test(line)) {
                turboLines.push(new SourceLine_1.SourceLine(filename, i, line));
                continue;
            }
            var kind = "";
            var name_1 = "";
            var inherit = "";
            var lineNumber = i;
            var m = null;
            if (m = CONST_1.Matcher.STRUCT.exec(line)) {
                kind = "struct";
                name_1 = m[1];
            }
            else if (m = CONST_1.Matcher.CLASS.exec(line)) {
                kind = "class";
                name_1 = m[1];
                inherit = m[2] ? m[2] : "";
            }
            else {
                throw new ProgramError_1.ProgramError(filename, i, "Syntax error: Malformed definition line");
            }
            var properties = [];
            var methods = [];
            var in_method = false;
            var mbody = null;
            var method_type = MethodKind_1.MethodKind.Virtual;
            var method_name = "";
            var method_line = 0;
            var method_signature = null;
            // Do not check for duplicate names here since that needs to
            // take into account inheritance.
            while (i < numLines) {
                line = lines[i++];
                if (CONST_1.Matcher.END.test(line)) {
                    break;
                }
                if (m = CONST_1.Matcher.METHOD.exec(line.trim())) {
                    if (kind != "class") {
                        throw new ProgramError_1.ProgramError(filename, i, "@method is only allowed in classes");
                    }
                    if (in_method) {
                        methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
                    }
                    in_method = true;
                    method_line = i;
                    method_type = (m[1] == "method" ? MethodKind_1.MethodKind.NonVirtual : MethodKind_1.MethodKind.Virtual);
                    method_name = m[2];
                    // Parse the signature.  Just use the param parser for now,
                    // but note that what we get back will need postprocessing.
                    var pp = new ParamParser_1.ParamParser(filename, i, m[3], /* skip left paren */ 1);
                    var args = pp.allArgs();
                    args.shift(); // Discard SELF
                    // Issue #15: In principle there are two signatures here: there is the
                    // parameter signature, which we should keep intact in the
                    // virtual, and there is the set of arguments extracted from that,
                    // including any splat.
                    method_signature = args.map(function (x) {
                        return _this.parameterToArgument(filename, i, x);
                    });
                    mbody = [m[3]];
                }
                else if (m = CONST_1.Matcher.SPECIAL.exec(line.trim())) {
                    if (kind != "struct")
                        throw new ProgramError_1.ProgramError(filename, i, "@" + m[1] + " is only allowed in structs");
                    if (in_method)
                        methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
                    method_line = i;
                    in_method = true;
                    switch (m[1]) {
                        case "get":
                            method_type = MethodKind_1.MethodKind.Get;
                            break;
                        case "set":
                            method_type = MethodKind_1.MethodKind.Set;
                            break;
                    }
                    method_name = "";
                    method_signature = null;
                    mbody = [m[2]];
                }
                else if (in_method) {
                    // TODO: if we're going to be collecting random cruft
                    // then blank and comment lines at the end of a method
                    // really should be placed at the beginning of the
                    // next method.  Also see hack in pasteupTypes() that
                    // removes blank lines from the end of a method body.
                    mbody.push(line);
                }
                else if (m = CONST_1.Matcher.PROP.exec(line)) {
                    var qual = PropQual_1.PropQual.None;
                    switch (m[3]) {
                        case "synchronic":
                            qual = PropQual_1.PropQual.Synchronic;
                            break;
                        case "atomic":
                            qual = PropQual_1.PropQual.Atomic;
                            break;
                    }
                    properties.push(new Prop_1.Prop(i, m[1], qual, m[4] == "Array", m[2]));
                }
                else if (CONST_1.blank_re.test(line)) {
                }
                else
                    throw new ProgramError_1.ProgramError(filename, i, "Syntax error: Not a property or method: " + line);
            }
            if (in_method)
                methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
            if (kind == "class")
                defs.push(new ClassDefn_1.ClassDefn(filename, lineNumber, name_1, inherit, properties, methods, turboLines.length));
            else
                defs.push(new StructDefn_1.StructDefn(filename, lineNumber, name_1, properties, methods, turboLines.length));
        }
        return [defs, turboLines];
    };
    // The input is Id, Id:Blah, or ...Id.  Strip any :Blah annotations.
    DefinitionService.prototype.parameterToArgument = function (file, line, s) {
        if (/^\s*(?:\.\.\.)[A-Za-z_$][A-Za-z0-9_$]*\s*$/.test(s))
            return s;
        var m = /^\s*([A-Za-z_\$][A-Za-z0-9_\$]*)\s*:?/.exec(s);
        if (!m)
            throw new ProgramError_1.ProgramError(file, line, "Unable to understand argument to virtual function: " + s);
        return m[1];
    };
    return DefinitionService;
}());
exports.DefinitionService = DefinitionService;
//# sourceMappingURL=DefinitionService.js.map