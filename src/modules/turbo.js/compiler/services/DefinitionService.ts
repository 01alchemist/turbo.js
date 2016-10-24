import {UserDefn} from "../define/UserDefn";
import {SourceLine} from "../source/SourceLine";
import {Prop} from "../entities/Prop";
import {Method} from "../entities/Method";
import {MethodKind} from "../kind/MethodKind";
import {ProgramError} from "../errors/ProgramError";
import {ClassDefn} from "../define/ClassDefn";
import {StructDefn} from "../define/StructDefn";
import {start_re, struct_re, class_re, end_re, method_re, special_re, prop_re, blank_re, Matcher} from "../CONST";
import {PropQual} from "../entities/PropQual";
import {ParamParser} from "../parser/ParamParser";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class DefinitionService {

    /**
     * Collect all definitions from the source code
     * */
    collectDefinitions(filename:string, lines:string[]):[UserDefn[], SourceLine[]] {

        let defs:UserDefn[] = [];
        let turboLines:SourceLine[] = [];
        let i:number = 0;
        let numLines:number = lines.length;
        let line:string;

        while (i < numLines) {
            line = lines[i++];
            if (!Matcher.START.test(line)) {
                turboLines.push(new SourceLine(filename, i, line));
                continue;
            }

            let kind = "";
            let name = "";
            let inherit = "";
            let lineNumber = i;
            let m:string[] = null;
            if (m = Matcher.STRUCT.exec(line)) {
                kind = "struct";
                name = m[1];
            }
            else if (m = Matcher.CLASS.exec(line)) {
                kind = "class";
                name = m[1];
                inherit = m[2] ? m[2] : "";
            }
            else {
                throw new ProgramError(filename, i, "Syntax error: Malformed definition line");
            }

            let properties:Prop[] = [];
            let methods:Method[] = [];
            let in_method = false;
            let mbody:string[] = null;
            let method_type = MethodKind.Virtual;
            let method_name = "";
            let method_line = 0;
            let method_signature:string[] = null;

            // Do not check for duplicate names here since that needs to
            // take into account inheritance.

            while (i < numLines) {

                line = lines[i++];

                if (Matcher.END.test(line)) {
                    break;
                }

                if (m = Matcher.METHOD.exec(line.trim())) {

                    if (kind != "class") {
                        throw new ProgramError(filename, i, "@method is only allowed in classes");
                    }

                    if (in_method) {
                        methods.push(new Method(method_line, method_type, method_name, method_signature, mbody));
                    }

                    in_method = true;
                    method_line = i;
                    method_type = (m[1] == "method" ? MethodKind.NonVirtual : MethodKind.Virtual);
                    method_name = m[2];
                    // Parse the signature.  Just use the param parser for now,
                    // but note that what we get back will need postprocessing.
                    let pp = new ParamParser(filename, i, m[3], /* skip left paren */ 1);
                    let args = pp.allArgs();
                    args.shift();	               // Discard SELF
                    // Issue #15: In principle there are two signatures here: there is the
                    // parameter signature, which we should keep intact in the
                    // virtual, and there is the set of arguments extracted from that,
                    // including any splat.
                    method_signature = args.map((x) => {
                        return this.parameterToArgument(filename, i, x)
                    });
                    mbody = [m[3]];
                }
                else if (m = Matcher.SPECIAL.exec(line.trim())) {
                    if (kind != "struct")
                        throw new ProgramError(filename, i, `@${m[1]} is only allowed in structs`);
                    if (in_method)
                        methods.push(new Method(method_line, method_type, method_name, method_signature, mbody));
                    method_line = i;
                    in_method = true;
                    switch (m[1]) {
                        case "get":
                            method_type = MethodKind.Get;
                            break;
                        case "set":
                            method_type = MethodKind.Set;
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
                else if (m = Matcher.PROP.exec(line)) {
                    let qual = PropQual.None;
                    switch (m[3]) {
                        case "synchronic":
                            qual = PropQual.Synchronic;
                            break;
                        case "atomic":
                            qual = PropQual.Atomic;
                            break;
                    }
                    properties.push(new Prop(i, m[1], qual, m[4] == "Array", m[2]));
                }
                else if (blank_re.test(line)) {
                }
                else
                    throw new ProgramError(filename, i, "Syntax error: Not a property or method: " + line);
            }
            if (in_method)
                methods.push(new Method(method_line, method_type, method_name, method_signature, mbody));

            if (kind == "class")
                defs.push(new ClassDefn(filename, lineNumber, name, inherit, properties, methods, turboLines.length));
            else
                defs.push(new StructDefn(filename, lineNumber, name, properties, methods, turboLines.length));
        }
        return [defs, turboLines];
    }

    // The input is Id, Id:Blah, or ...Id.  Strip any :Blah annotations.
    private parameterToArgument(file:string, line:number, s:string):string {
        if (/^\s*(?:\.\.\.)[A-Za-z_$][A-Za-z0-9_$]*\s*$/.test(s))
            return s;
        let m = /^\s*([A-Za-z_\$][A-Za-z0-9_\$]*)\s*:?/.exec(s);
        if (!m)
            throw new ProgramError(file, line, "Unable to understand argument to virtual function: " + s);
        return m[1];
    }
}