import {SourceProvider} from "./source/SourceProvider";
import {PrimitiveDefn} from "./define/PrimitiveDefn";
import {ClassDefn} from "./define/ClassDefn";
import {SMap, MapEntry, endstrip} from "./utils/index";
import {Defn} from "./define/Defn";
import {UserDefn} from "./define/UserDefn";
import {AtomicDefn} from "./define/AtomicDefn";
import {SynchronicDefn} from "./define/SynchronicDefn";
import {SIMDDefn} from "./define/SIMDDefn";
import {ProgramError} from "./errors/ProgramError";
import {DefnKind} from "./kind/DefnKind";
import {PropQual} from "./entities/PropQual";
import {StructDefn} from "./define/StructDefn";
import {MethodKind} from "./kind/MethodKind";
import {InternalError} from "./errors/InternalError";
import {Virtual} from "./entities/Virtual";
import {VirtualMethodIterator} from "./iterators/VirtualMethodIterator";

import fs = require("fs");
import path = require("path");
import {InclusiveSubclassIterator} from "./iterators/InclusiveSubclassIterator";
import {SourceLine} from "./source/SourceLine";
import {
    self_setter_re, self_accessor_re, self_invoke_re, self_getter1_re, self_getter2_re, new_re,
    arr_re, acc_re, AssignmentOps, OpAttr
} from "./CONST";
import {ParamParser} from "./parser/ParamParser";
import {PrimKind} from "./kind/PrimKind";

/**
 * Created by Nidin Vinayakan on 6/18/2016.
 */
export enum CompilerTarget{
    JavaScript,
    TypeScript,
    WebAssembly
}
export interface CompilerOptions {
    target?:CompilerTarget;
    bundle?:boolean;
    moduleName?:string;
    outFile?:string;
    outDir?:string;
}
export interface CompilerArguments {
    sources:string[];
    options?:CompilerOptions;
}

export class Compiler {

    static VERSION = "1.0.0";

    private knownTypes = new SMap<Defn>();
    private knownIds = new SMap<ClassDefn>();
    private userTypes:UserDefn[] = [];

    constructor(args?:CompilerArguments) {
        if (args) {
            this.compile(args);
        }
    }

    compile(args:CompilerArguments) {

        if (args.options.bundle && !args.options.outDir) {
            console.info("CompilerInfo: outDir not defined, using ./bin !");
            args.options.outDir = "./bin";
        }

        var sourceProvider = new SourceProvider(args.sources);

        this.buildTypeMap(sourceProvider);
        this.resolveTypeRefs();
        this.checkRecursion();
        this.checkMethods();
        this.layoutTypes();
        this.createVirtuals();

        this.expandSelfAccessors();
        this.pasteupTypes(sourceProvider);
        this.expandGlobalAccessorsAndMacros(sourceProvider);

        let bundle:string = "//turbo.js bundle\n";
        
        var dependencies = fs.readFileSync(path.resolve(__dirname, "../", "Runtime.js")).toString();
        dependencies = dependencies.replace("//# sourceMappingURL=Runtime.js.map", "");
        // bundle += dependencies + "\n\n";
        bundle += fs.readFileSync(path.resolve(__dirname, "../includes", "turbo.ts")).toString() + "\n\n";

        if(args.options.moduleName){
            bundle += `namespace ${args.options.moduleName} {\n`;
        }

        for (let s of sourceProvider.allSources) {

            let header:string = "// Generated from " + s.input_file + " by turbo.js " +
                Compiler.VERSION + "; github.com/01alchemist/turbo.js\n";
            if (args.options.bundle) {

                bundle += header + "\n" + s.allText() + "\n";

            } else {
                let header:string = "// Generated from " + s.input_file + " by turbo.js " +
                    Compiler.VERSION + "; github.com/01alchemist/turbo.js\n";
                fs.writeFileSync(s.output_file, header + "\n" + s.allText(), "utf8");
            }
        }

        if(args.options.moduleName){
            bundle += "}\n";
        }

        if (args.options.bundle) {
            let outDir:string = args.options.outDir;
            let outFile:string = args.options.outFile || "turbo-bundle.ts";
            outDir = outDir.substr(outDir.length - 2, 1) === "/" ? outDir : outDir + "/";
            fs.writeFileSync(outDir + outFile, bundle, "utf8");
            fs.writeFileSync(outDir + "turbo-runtime.js", dependencies, "utf8");
        }
    }

    buildTypeMap(sourceProvider:SourceProvider):void {
        this.knownTypes.put("int8", new PrimitiveDefn("int8", 1, 1));
        this.knownTypes.put("uint8", new PrimitiveDefn("uint8", 1, 1));
        this.knownTypes.put("int16", new PrimitiveDefn("int16", 2, 2));
        this.knownTypes.put("uint16", new PrimitiveDefn("uint16", 2, 2));
        this.knownTypes.put("int32", new PrimitiveDefn("int32", 4, 4));
        this.knownTypes.put("uint32", new PrimitiveDefn("uint32", 4, 4));

        this.knownTypes.put("atomic/int8", new AtomicDefn("atomic/int8", 1, 1));
        this.knownTypes.put("atomic/uint8", new AtomicDefn("atomic/uint8", 1, 1));
        this.knownTypes.put("atomic/int16", new AtomicDefn("atomic/int16", 2, 2));
        this.knownTypes.put("atomic/uint16", new AtomicDefn("atomic/uint16", 2, 2));
        this.knownTypes.put("atomic/int32", new AtomicDefn("atomic/int32", 4, 4));
        this.knownTypes.put("atomic/uint32", new AtomicDefn("atomic/uint32", 4, 4));

        this.knownTypes.put("synchronic/int8", new SynchronicDefn("synchronic/int8", 12, 4, 1));
        this.knownTypes.put("synchronic/uint8", new SynchronicDefn("synchronic/uint8", 12, 4, 1));
        this.knownTypes.put("synchronic/int16", new SynchronicDefn("synchronic/int16", 12, 4, 2));
        this.knownTypes.put("synchronic/uint16", new SynchronicDefn("synchronic/uint16", 12, 4, 2));
        this.knownTypes.put("synchronic/int32", new SynchronicDefn("synchronic/int32", 12, 4, 4));
        this.knownTypes.put("synchronic/uint32", new SynchronicDefn("synchronic/uint32", 12, 4, 4));

        this.knownTypes.put("float32", new PrimitiveDefn("float32", 4, 4));
        this.knownTypes.put("float64", new PrimitiveDefn("float64", 8, 8));

        this.knownTypes.put("int32x4", new SIMDDefn("int32x4", 16, 16, 4));
        this.knownTypes.put("float32x4", new SIMDDefn("float32x4", 16, 16, 4));
        this.knownTypes.put("float64x2", new SIMDDefn("float64x2", 16, 16, 8));

        for (let source of sourceProvider.allSources) {
            for (let def of source.defs) {
                if (this.knownTypes.test(def.name)) {
                    throw new ProgramError(def.file, def.line, "Duplicate type name: " + def.name);
                }
                this.knownTypes.put(def.name, def);
                this.userTypes.push(def);
            }
        }
    }

    resolveTypeRefs():void {
        for (let def of this.userTypes) {
            if (def.kind == DefnKind.Class) {
                let cls = <ClassDefn> def;
                if (cls.baseName != "") {
                    let probe = this.knownTypes.get(cls.baseName);
                    if (!probe) {
                        throw new ProgramError(cls.file, cls.line, "Missing base type: " + cls.baseName);
                    }
                    if (probe.kind != DefnKind.Class) {
                        throw new ProgramError(cls.file, cls.line, "Base type is not class: " + cls.baseName);
                    }
                    cls.baseTypeRef = <ClassDefn> probe;
                    cls.baseTypeRef.subclasses.push(cls);
                }
            }
            for (let prop of def.props) {
                if (!this.knownTypes.test(prop.typeName)) {
                    throw new ProgramError(def.file, prop.line, "Undefined type: " + prop.typeName);
                }
                let type:Defn = null;
                if (prop.qual != PropQual.None) {
                    if (prop.qual == PropQual.Atomic) {
                        type = this.knownTypes.get("atomic/" + prop.typeName);
                    }
                    else {
                        type = this.knownTypes.get("synchronic/" + prop.typeName);
                    }
                    if (!type) {
                        throw new ProgramError(def.file, prop.line, ": Not " + (prop.qual == PropQual.Atomic ? "an atomic" : "a synchronic") + " type: " + prop.typeName);
                    }
                }
                else {
                    type = this.knownTypes.get(prop.typeName);
                }
                prop.typeRef = type;
            }
        }
    }

    checkRecursion():void {

        // For a struct type, check that it does not include itself.
        let checkRecursionForStruct = (def:StructDefn):void => {
            if (def.checked) {
                return;
            }
            def.live = true;
            for (let prop of def.props) {
                if (prop.isArray) {
                    continue;
                }
                let probe = this.knownTypes.get(prop.typeName);
                if (!probe || probe.kind != DefnKind.Struct) {
                    continue;
                }
                let structDef = <StructDefn> probe;
                if (structDef.live) {
                    throw new ProgramError(def.file, prop.line, "Recursive type reference to struct " + prop.typeName + " from " + def.name);
                }
                prop.typeRef = structDef;
                checkRecursionForStruct(structDef);
            }
            def.live = false;
            def.checked = true;
        };

        // For a class type, check that it does not inherit from itself.
        let checkRecursionForClass = (def:ClassDefn):void => {
            if (def.checked) {
                return;
            }
            def.live = true;
            if (def.baseTypeRef) {
                if (def.baseTypeRef.live) {
                    throw new ProgramError(def.file, def.line, "Recursive type reference to base class from " + def.name);
                }
                checkRecursionForClass(def.baseTypeRef);
            }
            def.live = false;
            def.checked = true;
        };

        for (let def of this.userTypes) {
            if (def.kind == DefnKind.Struct) {
                checkRecursionForStruct(<StructDefn> def);
            }
            else if (def.kind == DefnKind.Class) {
                checkRecursionForClass(<ClassDefn> def);
            }
        }
    }

    checkMethods():void {
        for (let def of this.userTypes) {
            if (def.kind != DefnKind.Class) {
                continue;
            }
            let cls = <ClassDefn> def;
            for (let method of def.methods) {
                for (let b = cls.baseTypeRef; b; b = b.baseTypeRef) {
                    let bm = b.getMethod(method.name);
                    if (!bm) {
                        continue;
                    }
                    if (method.kind == MethodKind.NonVirtual && bm.kind == MethodKind.Virtual) {
                        throw new ProgramError(cls.file, method.line,
                            "Non-virtual method " + method.name + " is defined virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                    }
                    if (method.kind == MethodKind.Virtual && bm.kind != MethodKind.Virtual) {
                        throw new ProgramError(cls.file, method.line,
                            "Virtual method " + method.name + " is defined non-virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                    }
                    if (method.kind == MethodKind.Virtual) {
                        // Issue #34: check arity of methods, requires parsing parameter lists etc.
                    }
                }
            }
        }
    }

    layoutTypes():void {
        for (let d of this.userTypes) {
            if (d.kind == DefnKind.Class) {
                this.layoutClass(<ClassDefn> d);
            }
            else {
                this.layoutStruct(<StructDefn> d);
            }
        }
    }

    layoutClass(d:ClassDefn):void {
        let map = new SMap<MapEntry>();
        let size = 4;
        let align = 4;
        if (d.baseName != "") {
            if (d.baseTypeRef.map == null)
                this.layoutClass(d.baseTypeRef);
            map = d.baseTypeRef.map.copy();
            size = d.baseTypeRef.size;
            align = d.baseTypeRef.align;
        }
        this.layoutDefn(d, map, size, align);
        // layoutDefn updates d.map, d.size, d.align
        d.className = (d.baseTypeRef ? (d.baseTypeRef.className + ">") : "") + d.name;
        d.classId = this.computeClassId(d.className);
        let idAsString = String(d.classId);
        if (this.knownIds.test(idAsString))
            throw new ProgramError(d.file, d.line, "Duplicate class ID for " + d.className + ": previous=" + this.knownIds.get(idAsString).className);
        this.knownIds.put(idAsString, d);
    }

    layoutStruct(d:UserDefn):void {
        this.layoutDefn(d, new SMap<MapEntry>(), 0, 0);
    }

    layoutDefn(d:UserDefn, map:SMap<MapEntry>, size:number, align:number):void {
        for (let p of d.props) {
            let k = p.typeRef.kind;
            if (p.isArray)
                k = DefnKind.Class;
            switch (k) {
                case DefnKind.Primitive:
                {
                    let pt = <PrimitiveDefn> p.typeRef;
                    size = (size + pt.size - 1) & ~(pt.size - 1);
                    align = Math.max(align, pt.align);
                    map.put(p.name, new MapEntry(p.name, true, size, pt));
                    size += pt.size;
                    break;
                }
                case DefnKind.Class:
                {
                    // Could also be array, don't look at the contents
                    size = (size + (Defn.pointerAlign - 1)) & ~(Defn.pointerAlign - 1);
                    align = Math.max(align, Defn.pointerAlign);
                    map.put(p.name, new MapEntry(p.name, true, size, this.knownTypes.get(Defn.pointerTypeName)));
                    size += Defn.pointerSize;
                    break;
                }
                case DefnKind.Struct:
                {
                    let st = <StructDefn> p.typeRef;
                    if (st.map == null)
                        this.layoutStruct(st);
                    size = (size + st.align - 1) & ~(st.align - 1);
                    align = Math.max(align, st.align);
                    map.put(p.name, new MapEntry(p.name, false, size, st));
                    let root = p.name;
                    let mIter = st.map.values();
                    for (let fld = mIter.next(); fld; fld = mIter.next()) {
                        let fldname = root + "." + fld.name;
                        map.put(fldname, new MapEntry(fldname, fld.expand, size + fld.offset, fld.type));
                    }
                    size += st.size;
                    break;
                }
            }
        }
        // Struct size must be rounded up to alignment so that n*SIZE makes a valid array:
        // each array element must be suitably aligned.
        if (d.kind == DefnKind.Struct)
            size = (size + align - 1) & ~(align - 1);
        d.map = map;
        d.size = size;
        d.align = align;
    }

    computeClassId(name:string):number {
        let n = name.length;
        for (let i = 0; i < name.length; i++) {
            let c = name.charAt(i);
            let v = 0;
            if (c >= 'A' && c <= 'Z')
                v = c.charCodeAt(0) - 'A'.charCodeAt(0);
            else if (c >= 'a' && c <= 'z')
                v = c.charCodeAt(0) - 'a'.charCodeAt(0) + 26;
            else if (c >= '0' && c <= '9')
                v = c.charCodeAt(0) - '0'.charCodeAt(0) + 52;
            else if (c == '_')
                v = 62;
            else if (c == '>')
                v = 63;
            else
                throw new InternalError("Bad character in class name: " + c);
            n = (((n & 0x1FFFFFF) << 3) | (n >>> 25)) ^ v;
        }
        return n;
    }

    createVirtuals():void {
        for (let t of this.userTypes)
            if (t.kind == DefnKind.Class)
                this.createVirtualsFor(<ClassDefn> t);
    }

    createVirtualsFor(cls:ClassDefn):void {
        let vtable:Virtual[] = [];
        let virts = new VirtualMethodIterator(cls);
        for (let [mname, sign, isInherited] = virts.next(); mname != ""; [mname, sign, isInherited] = virts.next()) {
            let reverseCases = new SMap<number[]>();
            let subs = new InclusiveSubclassIterator(cls);
            for (let subcls = subs.next(); subcls; subcls = subs.next()) {
                let impl = this.findMethodImplFor(subcls, cls.baseTypeRef, mname);
                if (!impl)
                    continue;
                if (!reverseCases.test(impl))
                    reverseCases.put(impl, []);
                reverseCases.get(impl).push(subcls.classId);
            }
            let def:string = null;
            if (isInherited && cls.baseTypeRef)
                def = this.findMethodImplFor(cls.baseTypeRef, null, mname);
            vtable.push(new Virtual(mname, sign, reverseCases, def));
        }
        cls.vtable = vtable;
    }

    findMethodImplFor(cls:ClassDefn, stopAt:ClassDefn, name:string):string {
        if (cls == stopAt)
            return null;
        if (cls.hasMethod(name))
            return cls.name + "." + name + "_impl";
        if (cls.baseTypeRef)
            return this.findMethodImplFor(cls.baseTypeRef, stopAt, name);
        throw new InternalError("Method not found: " + name);
    }

    findType(name:string):Defn {
        if (!this.knownTypes.test(name))
            throw new InternalError("Unknown type in sizeofType: " + name);
        return this.knownTypes.get(name);
    }

    expandSelfAccessors():void {
        for (var t of this.userTypes) { // ES6 required for 'let' here
            for (let m of t.methods) {
                let body = m.body;
                for (let k = 0; k < body.length; k++) {
                    body[k] = this.myExec(t.file, t.line, self_setter_re,
                        (file:string, line:number, s:string, p:number, m:RegExpExecArray):[string,number] => {
                            if (p > 0 && this.isSubsequent(s.charAt(p - 1))) return [s, p + m.length];
                            return this.replaceSetterShorthand(file, line, s, p, m, t);
                        },
                        body[k]);
                    body[k] = body[k].replace(self_accessor_re, (m, path, operation, p, s) => {
                        if (p > 0 && this.isSubsequent(s.charAt(p - 1))) return m;
                        return t.name + path + "." + operation + "(SELF, ";
                    });
                    body[k] = body[k].replace(self_invoke_re, (m, id, p, s) => {
                        if (p > 0 && this.isSubsequent(s.charAt(p - 1))) return m;
                        var pp = new ParamParser(t.file, t.line, s, p + m.length);
                        var args = pp.allArgs();
                        return t.name + "." + id + "(SELF" + (args.length > 0 ? ", " : " ");
                    });
                    body[k] = body[k].replace(self_getter1_re, (m, path, operation, p, s) => {
                        if (p > 0 && this.isSubsequent(s.charAt(p - 1))) return m;
                        return t.name + path + "." + operation + "(SELF)";
                    });
                    body[k] = body[k].replace(self_getter2_re, (m, path, p, s) => {
                        if (p > 0 && this.isSubsequent(s.charAt(p - 1))) return m;
                        return t.name + path + "(SELF)";
                    });
                }
            }
        }
    }

    linePusher(info:() => [string,number], nlines:SourceLine[]):(text:string) => void {
        return (text:string):void => {
            let [file,line] = info();
            nlines.push(new SourceLine(file, line, text));
        }
    }

    pasteupTypes(sourceProvider:SourceProvider):void {
        var emitFn = "";		// ES5 workaround - would otherwise be local to inner "for" loop
        var emitLine = 0;		// ditto


        for (let source of sourceProvider.allSources) {
            let defs = source.defs;
            let lines = source.lines;
            let nlines:SourceLine[] = [];
            let k = 0;
            for (let d of defs) {
                while (k < d.origin && k < lines.length)
                    nlines.push(lines[k++]);

                let push = this.linePusher(():[string,number] => {
                    return [emitFn, emitLine++]
                }, nlines);

                emitFn = d.file + "[class definition]";
                emitLine = d.line;

                if (d.kind == DefnKind.Class) {
                    let cls = <ClassDefn> d;
                    let baseName = cls.baseName || "MemoryObject";
                    push([
                        `export class ${d.name} extends ${baseName}{`,
                        `   static NAME:string = "${d.name}";`,
                        `   static SIZE:number = ${d.size};`,
                        `   static ALIGN:number = ${d.align};`,
                        `   static CLSID:number = ${cls.classId};`,
                        ``,
                        `   static get BASE():string{`,
                        `       return ${cls.baseName || null}`,
                        `   }`,
                        ``,
                        `   constructor(p:number){`,
                        `       super(p);`,
                        `   }`,
                        ``,
                        ].join('\n')
                    );
                }else {
                    // push("function " + d.name + "() {}");
                    // push(d.name + ".NAME = \"" + d.name + "\";");
                    // push(d.name + ".SIZE = " + d.size + ";");
                    // push(d.name + ".ALIGN = " + d.align + ";");

                    push([
                            `export class ${d.name} {`,
                            `   static NAME:string = "${d.name}";`,
                            `   static SIZE:number = ${d.size};`,
                            `   static ALIGN:number = ${d.align};`,
                            ``,
                        ].join('\n')
                    );
                    for (var p of d.props)
                        push(`   ${p.name};`);

                    push(``);
                }


                // Now do methods.
                //
                // Implementation methods are emitted directly in the defining type, with a name suffix _impl.
                // For struct methods, the name is "_get_impl", "_set_impl", or "_copy_impl".

                let haveSetter = false;
                let haveGetter = false;
                for (let m of d.methods) {
                    let name = m.name;
                    if (name == "") {
                        switch (m.kind) {
                            case MethodKind.Get:
                                if (haveGetter)
                                    throw new ProgramError(d.file, m.line, "Duplicate struct getter");
                                name = "_get_impl";
                                haveGetter = true;
                                break;
                            case MethodKind.Set:
                                if (haveSetter)
                                    throw new ProgramError(d.file, m.line, "Duplicate struct setter");
                                name = "_set_impl";
                                haveSetter = true;
                                break;
                        }
                    }
                    else if (m.kind == MethodKind.NonVirtual) {
                    }
                    else
                        name += "_impl";
                    emitFn = d.file + "[method " + name + "]";
                    emitLine = m.line;
                    let body = m.body;
                    // Formatting: useful to strip all trailing blank lines from
                    // the body first.
                    let last = body.length - 1;
                    while (last > 0 && /^\s*$/.test(body[last]))
                        last--;
                    if (last == 0)
                        // push(d.name + "." + name + " = function " + body[0]);
                        push("    static " + name + body[0]);
                    else {
                        push("    static " + name + body[0]);
                        for (let x = 1; x < last; x++)
                            push(body[x]);
                        push(body[last]);
                    }
                }

                // Now default methods, if appropriate.

                if (d.kind == DefnKind.Struct) {
                    var struct = <StructDefn> d;
                    if (!haveGetter) {
                        push("    static _get_impl(SELF) {");
                        push("        var v = new " + d.name + ";");
                        // Use longhand for access, since self accessors are expanded before pasteup.
                        // TODO: Would be useful to fix that.
                        for (var p of d.props)
                            push("        v." + p.name + " = " + d.name + "." + p.name + "(SELF);");
                        push("        return v;");
                        push("    }");
                        struct.hasGetMethod = true;
                    }

                    if (!haveSetter) {
                        push("    static _set_impl(SELF, v) {");
                        // TODO: as above.
                        for (var p of d.props)
                            push("        " + d.name + "." + p.name + ".set(SELF, v." + p.name + ");");
                        push("    }");
                        struct.hasSetMethod = true;
                    }
                }

                // Now do vtable, if appropriate.

                if (d.kind == DefnKind.Class) {
                    let cls = <ClassDefn> d;
                    for (let virtual of cls.vtable) {
                        // Shouldn't matter much
                        emitFn = d.file + "[vtable " + virtual.name + "]";
                        emitLine = d.line;
                        let signature = virtual.signature();
                        push("    static " + virtual.name + "(SELF " + signature + ") {");
                        push("        switch (turbo.Runtime._mem_int32[SELF>>2]) {");
                        let kv = virtual.reverseCases.keysValues();
                        for (let [name,cases]=kv.next(); name; [name, cases] = kv.next()) {
                            for (let c of cases)
                                push(`            case ${c}:`);
                            push(`                return ${name}(SELF ${signature});`);
                        }
                        push("            default:");
                        push("              " + (virtual.default_ ?
                                `return ${virtual.default_}(SELF ${signature})` :
                                "throw turbo.Runtime._badType(SELF)") + ";");
                        push("        }");
                        push("    }");
                    }
                }

                // Now do other methods: initInstance.

                if (d.kind == DefnKind.Class) {
                    let cls = <ClassDefn> d;
                    //push(d.name + ".initInstance = function(SELF) { turbo.Runtime._mem_int32[SELF>>2]=" + cls.classId + "; return SELF; }");
                    push("    static initInstance(SELF) { turbo.Runtime._mem_int32[SELF>>2]=" + cls.classId + "; return SELF; }");
                }

                push("}");

                if (d.kind == DefnKind.Class)
                    push("turbo.Runtime._idToType[" + (<ClassDefn> d).classId + "] = " + d.name + ";");
            }
            while (k < lines.length)
                nlines.push(lines[k++]);
            source.lines = nlines;
        }
    }

    expandGlobalAccessorsAndMacros(sourceProvider:SourceProvider):void {
        for (let source of sourceProvider.allSources) {
            let lines = source.lines;
            let nlines:SourceLine[] = [];
            for (let l of lines)
                nlines.push(new SourceLine(l.file, l.line, this.expandMacrosIn(l.file, l.line, l.text)));
            source.lines = nlines;
        }
    }

    accMacro(file:string, line:number, s:string, p:number, ms:RegExpExecArray):[string,number] {
        let m = ms[0];
        let className = ms[1];
        let propName = "";
        let operation = "";

        let nomatch:[string,number] = [s, p + m.length];
        let left = s.substring(0, p);

        if (!ms[2] && !ms[3])
            return nomatch;		// We're looking at something else

        propName = ms[2] ? ms[2].substring(1) : ""; // Strip the leading "."
        operation = ms[3] ? ms[3] : "get";

        let ty = this.knownTypes.get(className);
        if (!ty)
            return nomatch;

        let offset = 0;
        let targetType:Defn = null;

        if (propName == "") {
            if (!(ty.kind == DefnKind.Primitive || ty.kind == DefnKind.Struct))
                throw new ProgramError(file, line, "Operation '" + operation + "' without a path requires a value type: " + s);
            offset = 0;
            targetType = ty;
        }
        else {
            if (!(ty.kind == DefnKind.Class || ty.kind == DefnKind.Struct)) {
                //throw new ProgramError(file, line, "Operation with a path requires a structured type: " + s);
                return nomatch;
            }

            let cls = <UserDefn> ty;
            // findAccessibleFieldFor will vet the operation against the field type,
            // so atomic/synchronic ops will only be allowed on appropriate types

            let fld = cls.findAccessibleFieldFor(operation, propName);
            if (!fld) {
                let fld2 = cls.findAccessibleFieldFor("get", propName);
                if (fld2)
                    this.warning(file, line, "No match for " + className + "  " + operation + "  " + propName);
                return nomatch;
            }
            offset = fld.offset;
            targetType = fld.type;
        }

        let pp = new ParamParser(file, line, s, p + m.length);
        let as = (pp).allArgs();
        if (OpAttr[operation].arity != as.length) {
            this.warning(file, line, `Bad accessor arity ${propName} / ${as.length}: ` + s);
            return nomatch;
        }
        ;

        // Issue #16: Watch it: Parens interact with semicolon insertion.
        let ref = `(${this.expandMacrosIn(file, line, endstrip(as[0]))} + ${offset})`;
        if (operation == "ref") {
            return [left + ref + s.substring(pp.where),
                left.length + ref.length];
        }

        return this.loadFromRef(file, line, ref, targetType, s, left, operation, pp, as[1], as[2], nomatch);
    }

    loadFromRef(file:string, line:number,
                ref:string, type:Defn, s:string, left:string, operation:string, pp:ParamParser,
                rhs:string, rhs2:string, nomatch:[string,number]):[string,number] {
        let mem = "", size = 0, synchronic = false, atomic = false, simd = false, shift = -1, simdType = "";
        if (type.kind == DefnKind.Primitive) {
            let prim = <PrimitiveDefn> type;
            mem = prim.memory;
            synchronic = prim.primKind == PrimKind.Synchronic;
            atomic = prim.primKind == PrimKind.Atomic;
            simd = prim.primKind == PrimKind.SIMD;
            if (synchronic)
                shift = this.log2((<SynchronicDefn> prim).baseSize);
            else if (simd)
                shift = this.log2((<SIMDDefn> prim).baseSize);
            else
                shift = this.log2(prim.size);
            if (simd)
                simdType = prim.name;
        }
        else if (type.kind == DefnKind.Class) {
            mem = Defn.pointerMemName;
            shift = this.log2(Defn.pointerSize);
        }
        if (shift >= 0) {
            let expr = "";
            let op = "";
            switch (OpAttr[operation].arity) {
                case 1:
                    break;
                case 2:
                    rhs = this.expandMacrosIn(file, line, endstrip(rhs));
                    break;
                case 3:
                    rhs = this.expandMacrosIn(file, line, endstrip(rhs));
                    rhs2 = this.expandMacrosIn(file, line, endstrip(rhs2));
                    break;
                default:
                    throw new InternalError("No operator: " + operation + " " + s);
            }
            let fieldIndex = "";
            if (synchronic)
                fieldIndex = `(${ref} + ${SynchronicDefn.bias}) >> ${shift}`;
            else
                fieldIndex = `${ref} >> ${shift}`;
            switch (operation) {
                case "get":
                    if (atomic || synchronic)
                        expr = `Atomics.load(turbo.Runtime.${mem}, ${fieldIndex})`;
                    else if (simd)
                        expr = `SIMD.${simdType}.load(turbo.Runtime.${mem}, ${fieldIndex})`;
                    else
                        expr = `turbo.Runtime.${mem}[${fieldIndex}]`;
                    break;
                case "notify":
                    expr = `turbo.Runtime.${OpAttr[operation].synchronic}(${ref})`;
                    break;
                case "set":
                case "add":
                case "sub":
                case "and":
                case "or":
                case "xor":
                case "loadWhenEqual":
                case "loadWhenNotEqual":
                    if (atomic)
                        expr = `Atomics.${OpAttr[operation].atomic}(turbo.Runtime.${mem}, ${fieldIndex}, ${rhs})`;
                    else if (synchronic)
                        expr = `turbo.Runtime.${OpAttr[operation].synchronic}(${ref}, turbo.Runtime.${mem}, ${fieldIndex}, ${rhs})`;
                    else if (simd)
                        expr = `SIMD.${simdType}.store(turbo.Runtime.${mem}, ${fieldIndex}, ${rhs})`;
                    else
                        expr = `turbo.Runtime.${mem}[${ref} >> ${shift}] ${OpAttr[operation].vanilla} ${rhs}`;
                    break;
                case "compareExchange":
                case "expectUpdate":
                    if (atomic)
                        expr = `Atomics.${OpAttr[operation].atomic}(turbo.Runtime.${mem}, ${fieldIndex}, ${rhs}, ${rhs2})`;
                    else
                        expr = `turbo.Runtime.${OpAttr[operation].synchronic}(${ref}, turbo.Runtime.${mem}, ${fieldIndex}, ${rhs}, ${rhs2})`;
                    break;
                default:
                    throw new InternalError("No operator: " + operation + " line: " + s);
            }
            // Issue #16: Parens interact with semicolon insertion.
            //expr = `(${expr})`;
            return [left + expr + s.substring(pp.where), left.length + expr.length];
        }
        else {
            let t = <StructDefn> type;
            let expr = "";
            // Field type is a structure.  If the structure type has a getter then getting is allowed
            // and should be rewritten as a call to the getter, passing the field reference.
            // Ditto setter, which will also pass secondArg.
            switch (operation) {
                case "get":
                    if (t.hasGetMethod)
                        expr = `${t.name}._get_impl(${ref})`;
                    break;
                case "set":
                    if (t.hasSetMethod)
                        expr = `${t.name}._set_impl(${ref}, ${this.expandMacrosIn(file, line, endstrip(rhs))})`;
                    break;
                case "ref":
                    expr = ref;
                    break;
            }
            if (expr == "") {
                this.warning(file, line, "No operation " + operation + " allowed");
                return nomatch;
            }
            // Issue #16: Parens interact with semicolon insertion.
            //expr = `(${expr})`;
            return [left + expr + s.substring(pp.where), left.length + expr.length];
        }
    }

    arrMacro(file:string, line:number, s:string, p:number, ms:RegExpExecArray):[string,number] {
        let m = ms[0];
        let typeName = ms[1];
        let qualifier = ms[2];
        let field = ms[3] ? ms[3].substring(1) : "";
        let operation = ms[4];
        let nomatch:[string,number] = [s, p + m.length];

        if (operation == "get" || operation == "set")
            throw new ProgramError(file, line, "Use 'at' and 'setAt' on Arrays");
        if (operation == "at")
            operation = "get";
        if (operation == "setAt")
            operation = "set";

        let type = this.findType(typeName);
        if (!type)
            return nomatch;

        let pp = new ParamParser(file, line, s, p + m.length);
        let as = (pp).allArgs();

        if (as.length != OpAttr[operation].arity + 1) {
            this.warning(file, line, `Wrong arity for accessor ${operation} / ${as.length}`);
            return nomatch;
        }

        let multiplier = type.elementSize;
        if (type.kind == DefnKind.Primitive) {
            if (field)
                return nomatch;
        }
        else if (type.kind == DefnKind.Class) {
            if (field)
                return nomatch;
        }
        let ref = "(  " + this.expandMacrosIn(file, line, endstrip(as[0])) + "+" + multiplier + "*" + this.expandMacrosIn(file, line, endstrip(as[1])) + ")";
        if (field) {
            let fld = (<StructDefn> type).findAccessibleFieldFor(operation, field);
            if (!fld)
                return nomatch;
            // Issue #16: Watch it: Parens interact with semicolon insertion.
            ref = "(" + ref + "+" + fld.offset + ")";
            type = fld.type;
        }
        if (operation == "ref") {
            let left = s.substring(0, p);
            return [left + ref + s.substring(pp.where),
                left.length + ref.length];
        }

        return this.loadFromRef(file, line, ref, type, s, s.substring(0, p), operation, pp, as[2], as[3], nomatch);
    }

// Since @new is new syntax, we throw errors for all misuse.

    newMacro(file:string, line:number, s:string, p:number, ms:RegExpExecArray):[string,number] {
        let m = ms[0];
        let baseType = ms[1];
        let qualifier = ms[2];
        let isArray = ms[3] == "Array";
        let left = s.substring(0, p);

        // Issue #27 - implement this.
        if (qualifier)
            throw new InternalError("Qualifiers on array @new not yet implemented");

        let t = this.knownTypes.get(baseType);
        if (!t)
            throw new ProgramError(file, line, "Unknown type argument to @new: " + baseType);

        if (!isArray) {
            let expr = "turbo.Runtime.allocOrThrow(" + t.size + "," + t.align + ")";
            if (t.kind == DefnKind.Class) {
                // NOTE, parens removed here
                // Issue #16: Watch it: Parens interact with semicolon insertion.
                expr = baseType + ".initInstance(" + expr + ")";
            }
            return [left + expr + s.substring(p + m.length),
                left.length + expr.length];
        }

        let pp = new ParamParser(file, line, s, p + m.length);
        let as = pp.allArgs();
        if (as.length != 1)
            throw new ProgramError(file, line, "Wrong number of arguments to @new " + baseType + ".Array");

        // NOTE, parens removed here
        // Issue #16: Watch it: Parens interact with semicolon insertion.
        let expr = "turbo.Runtime.allocOrThrow( (" + t.elementSize + " * " + this.expandMacrosIn(file, line, endstrip(as[0])) + "), " + t.elementAlign + ") /*Array*/";
        return [left + expr + s.substring(pp.where),
            left.length + expr.length];
    }

    expandMacrosIn(file:string, line:number, text:string):string {
        return this.myExec(
            file, line, new_re, this.newMacro.bind(this),
            this.myExec(
                file, line, arr_re, this.arrMacro.bind(this),
                this.myExec(file, line, acc_re, this.accMacro.bind(this), text)
            )
        );
    }

    myExec(file:string, line:number, re:RegExp, macro:(fn:string, l:number, s:string, p:number, m:RegExpExecArray)=>[string,number], text:string):string {
        let old = re.lastIndex;
        re.lastIndex = 0;

        for (; ;) {
            let m = re.exec(text);
            if (!m)
                break;
            // The trick here is that we may replace more than the match:
            // the macro may eat additional input.  So the macro should
            // be returning a new string, as well as the index at which
            // to continue the search.
            let [newText, newStart] = macro(file, line, text, re.lastIndex - m[0].length, m);
            text = newText;
            re.lastIndex = newStart;
        }

        re.lastIndex = old;
        return text;
    }

    replaceSetterShorthand(file:string, line:number, s:string, p:number, ms:RegExpExecArray, t:UserDefn):[string,number] {
        //return [s, p+m.length];
        let m = ms[0];
        let path = ms[1];
        let operation = ms[2];
        let left = s.substring(0, p);
        let pp = new ParamParser(file, line, s, p + m.length, false, true);
        let rhs = pp.nextArg();
        if (!rhs)
            throw new ProgramError(file, line, "Missing right-hand-side expression in assignment");
        // Be sure to re-expand the RHS.
        let substitution_left = `${left} ${t.name}${path}.${AssignmentOps[operation]}(SELF, `;
        return [`${substitution_left} ${rhs})${pp.sawSemi ? ';' : ''} ${s.substring(pp.where)}`,
            substitution_left.length];
    }

    isInitial(c:string):boolean {
        return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c == '_';
    }

    isSubsequent(c:string):boolean {
        return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c >= '0' && c <= '9' || c == '_';
    }

    log2(x:number):number {
        if (x <= 0)
            throw new InternalError("log2: " + x);
        let i = 0;
        while (x > 1) {
            i++;
            x >>= 1;
        }
        return i;
    }

    warning(file:string, line:number, msg:string):void {
        console.log(file + ":" + line + ": Warning: " + msg);
    }
}