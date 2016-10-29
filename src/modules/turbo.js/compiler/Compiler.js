"use strict";
var SourceProvider_1 = require("./source/SourceProvider");
var PrimitiveDefn_1 = require("./define/PrimitiveDefn");
var index_1 = require("./utils/index");
var Defn_1 = require("./define/Defn");
var AtomicDefn_1 = require("./define/AtomicDefn");
var SynchronicDefn_1 = require("./define/SynchronicDefn");
var SIMDDefn_1 = require("./define/SIMDDefn");
var ProgramError_1 = require("./errors/ProgramError");
var DefnKind_1 = require("./kind/DefnKind");
var PropQual_1 = require("./entities/PropQual");
var MethodKind_1 = require("./kind/MethodKind");
var InternalError_1 = require("./errors/InternalError");
var Virtual_1 = require("./entities/Virtual");
var VirtualMethodIterator_1 = require("./iterators/VirtualMethodIterator");
var fs = require("fs");
var path = require("path");
var InclusiveSubclassIterator_1 = require("./iterators/InclusiveSubclassIterator");
var SourceLine_1 = require("./source/SourceLine");
var CONST_1 = require("./CONST");
var ParamParser_1 = require("./parser/ParamParser");
var PrimKind_1 = require("./kind/PrimKind");
/**
 * Created by Nidin Vinayakan on 6/18/2016.
 */
(function (CompilerTarget) {
    CompilerTarget[CompilerTarget["JavaScript"] = 0] = "JavaScript";
    CompilerTarget[CompilerTarget["TypeScript"] = 1] = "TypeScript";
    CompilerTarget[CompilerTarget["WebAssembly"] = 2] = "WebAssembly";
})(exports.CompilerTarget || (exports.CompilerTarget = {}));
var CompilerTarget = exports.CompilerTarget;
var Compiler = (function () {
    function Compiler(args) {
        this.knownTypes = new index_1.SMap();
        this.knownIds = new index_1.SMap();
        this.userTypes = [];
        if (args) {
            this.compile(args);
        }
    }
    Compiler.prototype.compile = function (args) {
        if (args.options.bundle && !args.options.outDir) {
            console.info("CompilerInfo: outDir not defined, using ./bin !");
            args.options.outDir = "./bin";
        }
        var sourceProvider = new SourceProvider_1.SourceProvider(args.sources);
        this.buildTypeMap(sourceProvider);
        this.resolveTypeRefs();
        this.checkRecursion();
        this.checkMethods();
        this.layoutTypes();
        this.createVirtuals();
        this.expandSelfAccessors();
        this.pasteupTypes(sourceProvider);
        this.expandGlobalAccessorsAndMacros(sourceProvider);
        var bundle = "//turbo.js bundle\n";
        var dependencies = fs.readFileSync(path.resolve(__dirname, "../", "Runtime.js")).toString();
        dependencies = dependencies.replace("//# sourceMappingURL=Runtime.js.map", "");
        // bundle += dependencies + "\n\n";
        bundle += fs.readFileSync(path.resolve(__dirname, "../includes", "turbo.ts")).toString() + "\n\n";
        if (args.options.moduleName) {
            bundle += "namespace " + args.options.moduleName + " {\n";
        }
        for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
            var s = _a[_i];
            var header = "// Generated from " + s.input_file + " by turbo.js " +
                Compiler.VERSION + "; github.com/01alchemist/turbo.js\n";
            if (args.options.bundle) {
                bundle += header + "\n" + s.allText() + "\n";
            }
            else {
                var header_1 = "// Generated from " + s.input_file + " by turbo.js " +
                    Compiler.VERSION + "; github.com/01alchemist/turbo.js\n";
                fs.writeFileSync(s.output_file, header_1 + "\n" + s.allText(), "utf8");
            }
        }
        if (args.options.moduleName) {
            bundle += "}\n";
        }
        if (args.options.bundle) {
            var outDir = args.options.outDir;
            var outFile = args.options.outFile || "turbo-bundle.ts";
            outDir = outDir.substr(outDir.length - 2, 1) === "/" ? outDir : outDir + "/";
            fs.writeFileSync(outDir + outFile, bundle, "utf8");
            fs.writeFileSync(outDir + "turbo-runtime.js", dependencies, "utf8");
        }
    };
    Compiler.prototype.buildTypeMap = function (sourceProvider) {
        this.knownTypes.put("int8", new PrimitiveDefn_1.PrimitiveDefn("int8", 1, 1));
        this.knownTypes.put("uint8", new PrimitiveDefn_1.PrimitiveDefn("uint8", 1, 1));
        this.knownTypes.put("int16", new PrimitiveDefn_1.PrimitiveDefn("int16", 2, 2));
        this.knownTypes.put("uint16", new PrimitiveDefn_1.PrimitiveDefn("uint16", 2, 2));
        this.knownTypes.put("int32", new PrimitiveDefn_1.PrimitiveDefn("int32", 4, 4));
        this.knownTypes.put("uint32", new PrimitiveDefn_1.PrimitiveDefn("uint32", 4, 4));
        this.knownTypes.put("atomic/int8", new AtomicDefn_1.AtomicDefn("atomic/int8", 1, 1));
        this.knownTypes.put("atomic/uint8", new AtomicDefn_1.AtomicDefn("atomic/uint8", 1, 1));
        this.knownTypes.put("atomic/int16", new AtomicDefn_1.AtomicDefn("atomic/int16", 2, 2));
        this.knownTypes.put("atomic/uint16", new AtomicDefn_1.AtomicDefn("atomic/uint16", 2, 2));
        this.knownTypes.put("atomic/int32", new AtomicDefn_1.AtomicDefn("atomic/int32", 4, 4));
        this.knownTypes.put("atomic/uint32", new AtomicDefn_1.AtomicDefn("atomic/uint32", 4, 4));
        this.knownTypes.put("synchronic/int8", new SynchronicDefn_1.SynchronicDefn("synchronic/int8", 12, 4, 1));
        this.knownTypes.put("synchronic/uint8", new SynchronicDefn_1.SynchronicDefn("synchronic/uint8", 12, 4, 1));
        this.knownTypes.put("synchronic/int16", new SynchronicDefn_1.SynchronicDefn("synchronic/int16", 12, 4, 2));
        this.knownTypes.put("synchronic/uint16", new SynchronicDefn_1.SynchronicDefn("synchronic/uint16", 12, 4, 2));
        this.knownTypes.put("synchronic/int32", new SynchronicDefn_1.SynchronicDefn("synchronic/int32", 12, 4, 4));
        this.knownTypes.put("synchronic/uint32", new SynchronicDefn_1.SynchronicDefn("synchronic/uint32", 12, 4, 4));
        this.knownTypes.put("float32", new PrimitiveDefn_1.PrimitiveDefn("float32", 4, 4));
        this.knownTypes.put("float64", new PrimitiveDefn_1.PrimitiveDefn("float64", 8, 8));
        this.knownTypes.put("int32x4", new SIMDDefn_1.SIMDDefn("int32x4", 16, 16, 4));
        this.knownTypes.put("float32x4", new SIMDDefn_1.SIMDDefn("float32x4", 16, 16, 4));
        this.knownTypes.put("float64x2", new SIMDDefn_1.SIMDDefn("float64x2", 16, 16, 8));
        for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
            var source = _a[_i];
            for (var _b = 0, _c = source.defs; _b < _c.length; _b++) {
                var def = _c[_b];
                if (this.knownTypes.test(def.name)) {
                    throw new ProgramError_1.ProgramError(def.file, def.line, "Duplicate type name: " + def.name);
                }
                this.knownTypes.put(def.name, def);
                this.userTypes.push(def);
            }
        }
    };
    Compiler.prototype.resolveTypeRefs = function () {
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.kind == DefnKind_1.DefnKind.Class) {
                var cls = def;
                if (cls.baseName != "") {
                    var probe = this.knownTypes.get(cls.baseName);
                    if (!probe) {
                        throw new ProgramError_1.ProgramError(cls.file, cls.line, "Missing base type: " + cls.baseName);
                    }
                    if (probe.kind != DefnKind_1.DefnKind.Class) {
                        throw new ProgramError_1.ProgramError(cls.file, cls.line, "Base type is not class: " + cls.baseName);
                    }
                    cls.baseTypeRef = probe;
                    cls.baseTypeRef.subclasses.push(cls);
                }
            }
            for (var _b = 0, _c = def.props; _b < _c.length; _b++) {
                var prop = _c[_b];
                if (!this.knownTypes.test(prop.typeName)) {
                    throw new ProgramError_1.ProgramError(def.file, prop.line, "Undefined type: " + prop.typeName);
                }
                var type = null;
                if (prop.qual != PropQual_1.PropQual.None) {
                    if (prop.qual == PropQual_1.PropQual.Atomic) {
                        type = this.knownTypes.get("atomic/" + prop.typeName);
                    }
                    else {
                        type = this.knownTypes.get("synchronic/" + prop.typeName);
                    }
                    if (!type) {
                        throw new ProgramError_1.ProgramError(def.file, prop.line, ": Not " + (prop.qual == PropQual_1.PropQual.Atomic ? "an atomic" : "a synchronic") + " type: " + prop.typeName);
                    }
                }
                else {
                    type = this.knownTypes.get(prop.typeName);
                }
                prop.typeRef = type;
            }
        }
    };
    Compiler.prototype.checkRecursion = function () {
        var _this = this;
        // For a struct type, check that it does not include itself.
        var checkRecursionForStruct = function (def) {
            if (def.checked) {
                return;
            }
            def.live = true;
            for (var _i = 0, _a = def.props; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (prop.isArray) {
                    continue;
                }
                var probe = _this.knownTypes.get(prop.typeName);
                if (!probe || probe.kind != DefnKind_1.DefnKind.Struct) {
                    continue;
                }
                var structDef = probe;
                if (structDef.live) {
                    throw new ProgramError_1.ProgramError(def.file, prop.line, "Recursive type reference to struct " + prop.typeName + " from " + def.name);
                }
                prop.typeRef = structDef;
                checkRecursionForStruct(structDef);
            }
            def.live = false;
            def.checked = true;
        };
        // For a class type, check that it does not inherit from itself.
        var checkRecursionForClass = function (def) {
            if (def.checked) {
                return;
            }
            def.live = true;
            if (def.baseTypeRef) {
                if (def.baseTypeRef.live) {
                    throw new ProgramError_1.ProgramError(def.file, def.line, "Recursive type reference to base class from " + def.name);
                }
                checkRecursionForClass(def.baseTypeRef);
            }
            def.live = false;
            def.checked = true;
        };
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.kind == DefnKind_1.DefnKind.Struct) {
                checkRecursionForStruct(def);
            }
            else if (def.kind == DefnKind_1.DefnKind.Class) {
                checkRecursionForClass(def);
            }
        }
    };
    Compiler.prototype.checkMethods = function () {
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var def = _a[_i];
            if (def.kind != DefnKind_1.DefnKind.Class) {
                continue;
            }
            var cls = def;
            for (var _b = 0, _c = def.methods; _b < _c.length; _b++) {
                var method = _c[_b];
                for (var b = cls.baseTypeRef; b; b = b.baseTypeRef) {
                    var bm = b.getMethod(method.name);
                    if (!bm) {
                        continue;
                    }
                    if (method.kind == MethodKind_1.MethodKind.NonVirtual && bm.kind == MethodKind_1.MethodKind.Virtual) {
                        throw new ProgramError_1.ProgramError(cls.file, method.line, "Non-virtual method " + method.name + " is defined virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                    }
                    if (method.kind == MethodKind_1.MethodKind.Virtual && bm.kind != MethodKind_1.MethodKind.Virtual) {
                        throw new ProgramError_1.ProgramError(cls.file, method.line, "Virtual method " + method.name + " is defined non-virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                    }
                    if (method.kind == MethodKind_1.MethodKind.Virtual) {
                    }
                }
            }
        }
    };
    Compiler.prototype.layoutTypes = function () {
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.kind == DefnKind_1.DefnKind.Class) {
                this.layoutClass(d);
            }
            else {
                this.layoutStruct(d);
            }
        }
    };
    Compiler.prototype.layoutClass = function (d) {
        var map = new index_1.SMap();
        var size = 4;
        var align = 4;
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
        var idAsString = String(d.classId);
        if (this.knownIds.test(idAsString))
            throw new ProgramError_1.ProgramError(d.file, d.line, "Duplicate class ID for " + d.className + ": previous=" + this.knownIds.get(idAsString).className);
        this.knownIds.put(idAsString, d);
    };
    Compiler.prototype.layoutStruct = function (d) {
        this.layoutDefn(d, new index_1.SMap(), 0, 0);
    };
    Compiler.prototype.layoutDefn = function (d, map, size, align) {
        for (var _i = 0, _a = d.props; _i < _a.length; _i++) {
            var p = _a[_i];
            var k = p.typeRef.kind;
            if (p.isArray)
                k = DefnKind_1.DefnKind.Class;
            switch (k) {
                case DefnKind_1.DefnKind.Primitive:
                    {
                        var pt = p.typeRef;
                        size = (size + pt.size - 1) & ~(pt.size - 1);
                        align = Math.max(align, pt.align);
                        map.put(p.name, new index_1.MapEntry(p.name, true, size, pt));
                        size += pt.size;
                        break;
                    }
                case DefnKind_1.DefnKind.Class:
                    {
                        // Could also be array, don't look at the contents
                        size = (size + (Defn_1.Defn.pointerAlign - 1)) & ~(Defn_1.Defn.pointerAlign - 1);
                        align = Math.max(align, Defn_1.Defn.pointerAlign);
                        map.put(p.name, new index_1.MapEntry(p.name, true, size, this.knownTypes.get(Defn_1.Defn.pointerTypeName)));
                        size += Defn_1.Defn.pointerSize;
                        break;
                    }
                case DefnKind_1.DefnKind.Struct:
                    {
                        var st = p.typeRef;
                        if (st.map == null)
                            this.layoutStruct(st);
                        size = (size + st.align - 1) & ~(st.align - 1);
                        align = Math.max(align, st.align);
                        map.put(p.name, new index_1.MapEntry(p.name, false, size, st));
                        var root = p.name;
                        var mIter = st.map.values();
                        for (var fld = mIter.next(); fld; fld = mIter.next()) {
                            var fldname = root + "." + fld.name;
                            map.put(fldname, new index_1.MapEntry(fldname, fld.expand, size + fld.offset, fld.type));
                        }
                        size += st.size;
                        break;
                    }
            }
        }
        // Struct size must be rounded up to alignment so that n*SIZE makes a valid array:
        // each array element must be suitably aligned.
        if (d.kind == DefnKind_1.DefnKind.Struct)
            size = (size + align - 1) & ~(align - 1);
        d.map = map;
        d.size = size;
        d.align = align;
    };
    Compiler.prototype.computeClassId = function (name) {
        var n = name.length;
        for (var i = 0; i < name.length; i++) {
            var c = name.charAt(i);
            var v = 0;
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
                throw new InternalError_1.InternalError("Bad character in class name: " + c);
            n = (((n & 0x1FFFFFF) << 3) | (n >>> 25)) ^ v;
        }
        return n;
    };
    Compiler.prototype.createVirtuals = function () {
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.kind == DefnKind_1.DefnKind.Class)
                this.createVirtualsFor(t);
        }
    };
    Compiler.prototype.createVirtualsFor = function (cls) {
        var vtable = [];
        var virts = new VirtualMethodIterator_1.VirtualMethodIterator(cls);
        for (var _a = virts.next(), mname = _a[0], sign = _a[1], isInherited = _a[2]; mname != ""; (_b = virts.next(), mname = _b[0], sign = _b[1], isInherited = _b[2], _b)) {
            var reverseCases = new index_1.SMap();
            var subs = new InclusiveSubclassIterator_1.InclusiveSubclassIterator(cls);
            for (var subcls = subs.next(); subcls; subcls = subs.next()) {
                var impl = this.findMethodImplFor(subcls, cls.baseTypeRef, mname);
                if (!impl)
                    continue;
                if (!reverseCases.test(impl))
                    reverseCases.put(impl, []);
                reverseCases.get(impl).push(subcls.classId);
            }
            var def = null;
            if (isInherited && cls.baseTypeRef)
                def = this.findMethodImplFor(cls.baseTypeRef, null, mname);
            vtable.push(new Virtual_1.Virtual(mname, sign, reverseCases, def));
        }
        cls.vtable = vtable;
        var _b;
    };
    Compiler.prototype.findMethodImplFor = function (cls, stopAt, name) {
        if (cls == stopAt)
            return null;
        if (cls.hasMethod(name))
            return cls.name + "." + name + "_impl";
        if (cls.baseTypeRef)
            return this.findMethodImplFor(cls.baseTypeRef, stopAt, name);
        throw new InternalError_1.InternalError("Method not found: " + name);
    };
    Compiler.prototype.findType = function (name) {
        if (!this.knownTypes.test(name))
            throw new InternalError_1.InternalError("Unknown type in sizeofType: " + name);
        return this.knownTypes.get(name);
    };
    Compiler.prototype.expandSelfAccessors = function () {
        var _this = this;
        for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
            var t = _a[_i];
            for (var _b = 0, _c = t.methods; _b < _c.length; _b++) {
                var m = _c[_b];
                var body = m.body;
                for (var k = 0; k < body.length; k++) {
                    body[k] = this.myExec(t.file, t.line, CONST_1.self_setter_re, function (file, line, s, p, m) {
                        if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                            return [s, p + m.length];
                        return _this.replaceSetterShorthand(file, line, s, p, m, t);
                    }, body[k]);
                    body[k] = body[k].replace(CONST_1.self_accessor_re, function (m, path, operation, p, s) {
                        if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                            return m;
                        return t.name + path + "." + operation + "(SELF, ";
                    });
                    body[k] = body[k].replace(CONST_1.self_invoke_re, function (m, id, p, s) {
                        if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                            return m;
                        var pp = new ParamParser_1.ParamParser(t.file, t.line, s, p + m.length);
                        var args = pp.allArgs();
                        return t.name + "." + id + "(SELF" + (args.length > 0 ? ", " : " ");
                    });
                    body[k] = body[k].replace(CONST_1.self_getter1_re, function (m, path, operation, p, s) {
                        if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                            return m;
                        return t.name + path + "." + operation + "(SELF)";
                    });
                    body[k] = body[k].replace(CONST_1.self_getter2_re, function (m, path, p, s) {
                        if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                            return m;
                        return t.name + path + "(SELF)";
                    });
                }
            }
        }
    };
    Compiler.prototype.linePusher = function (info, nlines) {
        return function (text) {
            var _a = info(), file = _a[0], line = _a[1];
            nlines.push(new SourceLine_1.SourceLine(file, line, text));
        };
    };
    Compiler.prototype.pasteupTypes = function (sourceProvider) {
        var emitFn = ""; // ES5 workaround - would otherwise be local to inner "for" loop
        var emitLine = 0; // ditto
        for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
            var source = _a[_i];
            var defs = source.defs;
            var lines = source.lines;
            var nlines = [];
            var k = 0;
            for (var _b = 0, defs_1 = defs; _b < defs_1.length; _b++) {
                var d = defs_1[_b];
                while (k < d.origin && k < lines.length)
                    nlines.push(lines[k++]);
                var push = this.linePusher(function () {
                    return [emitFn, emitLine++];
                }, nlines);
                emitFn = d.file + "[class definition]";
                emitLine = d.line;
                if (d.kind == DefnKind_1.DefnKind.Class) {
                    var cls = d;
                    var baseName = cls.baseName || "MemoryObject";
                    push([
                        ("export class " + d.name + " extends " + baseName + "{"),
                        ("   static NAME:string = \"" + d.name + "\";"),
                        ("   static SIZE:number = " + d.size + ";"),
                        ("   static ALIGN:number = " + d.align + ";"),
                        ("   static CLSID:number = " + cls.classId + ";"),
                        "",
                        "   static get BASE():string{",
                        ("       return " + (cls.baseName || null)),
                        "   }",
                        "",
                        "   constructor(p:number){",
                        "       super(p);",
                        "   }",
                        "",
                    ].join('\n'));
                }
                else {
                    // push("function " + d.name + "() {}");
                    // push(d.name + ".NAME = \"" + d.name + "\";");
                    // push(d.name + ".SIZE = " + d.size + ";");
                    // push(d.name + ".ALIGN = " + d.align + ";");
                    push([
                        ("export class " + d.name + " {"),
                        ("   static NAME:string = \"" + d.name + "\";"),
                        ("   static SIZE:number = " + d.size + ";"),
                        ("   static ALIGN:number = " + d.align + ";"),
                        "",
                    ].join('\n'));
                    for (var _c = 0, _d = d.props; _c < _d.length; _c++) {
                        var p = _d[_c];
                        push("   " + p.name + ";");
                    }
                    push("");
                }
                // Now do methods.
                //
                // Implementation methods are emitted directly in the defining type, with a name suffix _impl.
                // For struct methods, the name is "_get_impl", "_set_impl", or "_copy_impl".
                var haveSetter = false;
                var haveGetter = false;
                for (var _e = 0, _f = d.methods; _e < _f.length; _e++) {
                    var m = _f[_e];
                    var name_1 = m.name;
                    if (name_1 == "") {
                        switch (m.kind) {
                            case MethodKind_1.MethodKind.Get:
                                if (haveGetter)
                                    throw new ProgramError_1.ProgramError(d.file, m.line, "Duplicate struct getter");
                                name_1 = "_get_impl";
                                haveGetter = true;
                                break;
                            case MethodKind_1.MethodKind.Set:
                                if (haveSetter)
                                    throw new ProgramError_1.ProgramError(d.file, m.line, "Duplicate struct setter");
                                name_1 = "_set_impl";
                                haveSetter = true;
                                break;
                        }
                    }
                    else if (m.kind == MethodKind_1.MethodKind.NonVirtual) {
                    }
                    else
                        name_1 += "_impl";
                    emitFn = d.file + "[method " + name_1 + "]";
                    emitLine = m.line;
                    var body = m.body;
                    // Formatting: useful to strip all trailing blank lines from
                    // the body first.
                    var last = body.length - 1;
                    while (last > 0 && /^\s*$/.test(body[last]))
                        last--;
                    if (last == 0)
                        // push(d.name + "." + name + " = function " + body[0]);
                        push("    static " + name_1 + body[0]);
                    else {
                        push("    static " + name_1 + body[0]);
                        for (var x = 1; x < last; x++)
                            push(body[x]);
                        push(body[last]);
                    }
                }
                // Now default methods, if appropriate.
                if (d.kind == DefnKind_1.DefnKind.Struct) {
                    var struct = d;
                    if (!haveGetter) {
                        push("    static _get_impl(SELF) {");
                        push("        var v = new " + d.name + ";");
                        // Use longhand for access, since self accessors are expanded before pasteup.
                        // TODO: Would be useful to fix that.
                        for (var _g = 0, _h = d.props; _g < _h.length; _g++) {
                            var p = _h[_g];
                            push("        v." + p.name + " = " + d.name + "." + p.name + "(SELF);");
                        }
                        push("        return v;");
                        push("    }");
                        struct.hasGetMethod = true;
                    }
                    if (!haveSetter) {
                        push("    static _set_impl(SELF, v) {");
                        // TODO: as above.
                        for (var _j = 0, _k = d.props; _j < _k.length; _j++) {
                            var p = _k[_j];
                            push("        " + d.name + "." + p.name + ".set(SELF, v." + p.name + ");");
                        }
                        push("    }");
                        struct.hasSetMethod = true;
                    }
                }
                // Now do vtable, if appropriate.
                if (d.kind == DefnKind_1.DefnKind.Class) {
                    var cls = d;
                    for (var _l = 0, _m = cls.vtable; _l < _m.length; _l++) {
                        var virtual = _m[_l];
                        // Shouldn't matter much
                        emitFn = d.file + "[vtable " + virtual.name + "]";
                        emitLine = d.line;
                        var signature = virtual.signature();
                        push("    static " + virtual.name + "(SELF " + signature + ") {");
                        push("        switch (turbo.Runtime._mem_int32[SELF>>2]) {");
                        var kv = virtual.reverseCases.keysValues();
                        for (var _o = kv.next(), name_2 = _o[0], cases = _o[1]; name_2; (_p = kv.next(), name_2 = _p[0], cases = _p[1], _p)) {
                            for (var _q = 0, cases_1 = cases; _q < cases_1.length; _q++) {
                                var c = cases_1[_q];
                                push("            case " + c + ":");
                            }
                            push("                return " + name_2 + "(SELF " + signature + ");");
                        }
                        push("            default:");
                        push("              " + (virtual.default_ ?
                            "return " + virtual.default_ + "(SELF " + signature + ")" :
                            "throw turbo.Runtime._badType(SELF)") + ";");
                        push("        }");
                        push("    }");
                    }
                }
                // Now do other methods: initInstance.
                if (d.kind == DefnKind_1.DefnKind.Class) {
                    var cls = d;
                    //push(d.name + ".initInstance = function(SELF) { turbo.Runtime._mem_int32[SELF>>2]=" + cls.classId + "; return SELF; }");
                    push("    static initInstance(SELF) { turbo.Runtime._mem_int32[SELF>>2]=" + cls.classId + "; return SELF; }");
                }
                push("}");
                if (d.kind == DefnKind_1.DefnKind.Class)
                    push("turbo.Runtime._idToType[" + d.classId + "] = " + d.name + ";");
            }
            while (k < lines.length)
                nlines.push(lines[k++]);
            source.lines = nlines;
        }
        var _p;
    };
    Compiler.prototype.expandGlobalAccessorsAndMacros = function (sourceProvider) {
        for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
            var source = _a[_i];
            var lines = source.lines;
            var nlines = [];
            for (var _b = 0, lines_1 = lines; _b < lines_1.length; _b++) {
                var l = lines_1[_b];
                nlines.push(new SourceLine_1.SourceLine(l.file, l.line, this.expandMacrosIn(l.file, l.line, l.text)));
            }
            source.lines = nlines;
        }
    };
    Compiler.prototype.accMacro = function (file, line, s, p, ms) {
        var m = ms[0];
        var className = ms[1];
        var propName = "";
        var operation = "";
        var nomatch = [s, p + m.length];
        var left = s.substring(0, p);
        if (!ms[2] && !ms[3])
            return nomatch; // We're looking at something else
        propName = ms[2] ? ms[2].substring(1) : ""; // Strip the leading "."
        operation = ms[3] ? ms[3] : "get";
        var ty = this.knownTypes.get(className);
        if (!ty)
            return nomatch;
        var offset = 0;
        var targetType = null;
        if (propName == "") {
            if (!(ty.kind == DefnKind_1.DefnKind.Primitive || ty.kind == DefnKind_1.DefnKind.Struct))
                throw new ProgramError_1.ProgramError(file, line, "Operation '" + operation + "' without a path requires a value type: " + s);
            offset = 0;
            targetType = ty;
        }
        else {
            if (!(ty.kind == DefnKind_1.DefnKind.Class || ty.kind == DefnKind_1.DefnKind.Struct)) {
                //throw new ProgramError(file, line, "Operation with a path requires a structured type: " + s);
                return nomatch;
            }
            var cls = ty;
            // findAccessibleFieldFor will vet the operation against the field type,
            // so atomic/synchronic ops will only be allowed on appropriate types
            var fld = cls.findAccessibleFieldFor(operation, propName);
            if (!fld) {
                var fld2 = cls.findAccessibleFieldFor("get", propName);
                if (fld2)
                    this.warning(file, line, "No match for " + className + "  " + operation + "  " + propName);
                return nomatch;
            }
            offset = fld.offset;
            targetType = fld.type;
        }
        var pp = new ParamParser_1.ParamParser(file, line, s, p + m.length);
        var as = (pp).allArgs();
        if (CONST_1.OpAttr[operation].arity != as.length) {
            this.warning(file, line, ("Bad accessor arity " + propName + " / " + as.length + ": ") + s);
            return nomatch;
        }
        ;
        // Issue #16: Watch it: Parens interact with semicolon insertion.
        var ref = "(" + this.expandMacrosIn(file, line, index_1.endstrip(as[0])) + " + " + offset + ")";
        if (operation == "ref") {
            return [left + ref + s.substring(pp.where),
                left.length + ref.length];
        }
        return this.loadFromRef(file, line, ref, targetType, s, left, operation, pp, as[1], as[2], nomatch);
    };
    Compiler.prototype.loadFromRef = function (file, line, ref, type, s, left, operation, pp, rhs, rhs2, nomatch) {
        var mem = "", size = 0, synchronic = false, atomic = false, simd = false, shift = -1, simdType = "";
        if (type.kind == DefnKind_1.DefnKind.Primitive) {
            var prim = type;
            mem = prim.memory;
            synchronic = prim.primKind == PrimKind_1.PrimKind.Synchronic;
            atomic = prim.primKind == PrimKind_1.PrimKind.Atomic;
            simd = prim.primKind == PrimKind_1.PrimKind.SIMD;
            if (synchronic)
                shift = this.log2(prim.baseSize);
            else if (simd)
                shift = this.log2(prim.baseSize);
            else
                shift = this.log2(prim.size);
            if (simd)
                simdType = prim.name;
        }
        else if (type.kind == DefnKind_1.DefnKind.Class) {
            mem = Defn_1.Defn.pointerMemName;
            shift = this.log2(Defn_1.Defn.pointerSize);
        }
        if (shift >= 0) {
            var expr = "";
            var op = "";
            switch (CONST_1.OpAttr[operation].arity) {
                case 1:
                    break;
                case 2:
                    rhs = this.expandMacrosIn(file, line, index_1.endstrip(rhs));
                    break;
                case 3:
                    rhs = this.expandMacrosIn(file, line, index_1.endstrip(rhs));
                    rhs2 = this.expandMacrosIn(file, line, index_1.endstrip(rhs2));
                    break;
                default:
                    throw new InternalError_1.InternalError("No operator: " + operation + " " + s);
            }
            var fieldIndex = "";
            if (synchronic)
                fieldIndex = "(" + ref + " + " + SynchronicDefn_1.SynchronicDefn.bias + ") >> " + shift;
            else
                fieldIndex = ref + " >> " + shift;
            switch (operation) {
                case "get":
                    if (atomic || synchronic)
                        expr = "Atomics.load(turbo.Runtime." + mem + ", " + fieldIndex + ")";
                    else if (simd)
                        expr = "SIMD." + simdType + ".load(turbo.Runtime." + mem + ", " + fieldIndex + ")";
                    else
                        expr = "turbo.Runtime." + mem + "[" + fieldIndex + "]";
                    break;
                case "notify":
                    expr = "turbo.Runtime." + CONST_1.OpAttr[operation].synchronic + "(" + ref + ")";
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
                        expr = "Atomics." + CONST_1.OpAttr[operation].atomic + "(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                    else if (synchronic)
                        expr = "turbo.Runtime." + CONST_1.OpAttr[operation].synchronic + "(" + ref + ", turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                    else if (simd)
                        expr = "SIMD." + simdType + ".store(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                    else
                        expr = "turbo.Runtime." + mem + "[" + ref + " >> " + shift + "] " + CONST_1.OpAttr[operation].vanilla + " " + rhs;
                    break;
                case "compareExchange":
                case "expectUpdate":
                    if (atomic)
                        expr = "Atomics." + CONST_1.OpAttr[operation].atomic + "(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ", " + rhs2 + ")";
                    else
                        expr = "turbo.Runtime." + CONST_1.OpAttr[operation].synchronic + "(" + ref + ", turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ", " + rhs2 + ")";
                    break;
                default:
                    throw new InternalError_1.InternalError("No operator: " + operation + " line: " + s);
            }
            // Issue #16: Parens interact with semicolon insertion.
            //expr = `(${expr})`;
            return [left + expr + s.substring(pp.where), left.length + expr.length];
        }
        else {
            var t = type;
            var expr = "";
            // Field type is a structure.  If the structure type has a getter then getting is allowed
            // and should be rewritten as a call to the getter, passing the field reference.
            // Ditto setter, which will also pass secondArg.
            switch (operation) {
                case "get":
                    if (t.hasGetMethod)
                        expr = t.name + "._get_impl(" + ref + ")";
                    break;
                case "set":
                    if (t.hasSetMethod)
                        expr = t.name + "._set_impl(" + ref + ", " + this.expandMacrosIn(file, line, index_1.endstrip(rhs)) + ")";
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
    };
    Compiler.prototype.arrMacro = function (file, line, s, p, ms) {
        var m = ms[0];
        var typeName = ms[1];
        var qualifier = ms[2];
        var field = ms[3] ? ms[3].substring(1) : "";
        var operation = ms[4];
        var nomatch = [s, p + m.length];
        if (operation == "get" || operation == "set")
            throw new ProgramError_1.ProgramError(file, line, "Use 'at' and 'setAt' on Arrays");
        if (operation == "at")
            operation = "get";
        if (operation == "setAt")
            operation = "set";
        var type = this.findType(typeName);
        if (!type)
            return nomatch;
        var pp = new ParamParser_1.ParamParser(file, line, s, p + m.length);
        var as = (pp).allArgs();
        if (as.length != CONST_1.OpAttr[operation].arity + 1) {
            this.warning(file, line, "Wrong arity for accessor " + operation + " / " + as.length);
            return nomatch;
        }
        var multiplier = type.elementSize;
        if (type.kind == DefnKind_1.DefnKind.Primitive) {
            if (field)
                return nomatch;
        }
        else if (type.kind == DefnKind_1.DefnKind.Class) {
            if (field)
                return nomatch;
        }
        var ref = "(  " + this.expandMacrosIn(file, line, index_1.endstrip(as[0])) + "+" + multiplier + "*" + this.expandMacrosIn(file, line, index_1.endstrip(as[1])) + ")";
        if (field) {
            var fld = type.findAccessibleFieldFor(operation, field);
            if (!fld)
                return nomatch;
            // Issue #16: Watch it: Parens interact with semicolon insertion.
            ref = "(" + ref + "+" + fld.offset + ")";
            type = fld.type;
        }
        if (operation == "ref") {
            var left = s.substring(0, p);
            return [left + ref + s.substring(pp.where),
                left.length + ref.length];
        }
        return this.loadFromRef(file, line, ref, type, s, s.substring(0, p), operation, pp, as[2], as[3], nomatch);
    };
    // Since @new is new syntax, we throw errors for all misuse.
    Compiler.prototype.newMacro = function (file, line, s, p, ms) {
        var m = ms[0];
        var baseType = ms[1];
        var qualifier = ms[2];
        var isArray = ms[3] == "Array";
        var left = s.substring(0, p);
        // Issue #27 - implement this.
        if (qualifier)
            throw new InternalError_1.InternalError("Qualifiers on array @new not yet implemented");
        var t = this.knownTypes.get(baseType);
        if (!t)
            throw new ProgramError_1.ProgramError(file, line, "Unknown type argument to @new: " + baseType);
        if (!isArray) {
            var expr_1 = "turbo.Runtime.allocOrThrow(" + t.size + "," + t.align + ")";
            if (t.kind == DefnKind_1.DefnKind.Class) {
                // NOTE, parens removed here
                // Issue #16: Watch it: Parens interact with semicolon insertion.
                expr_1 = baseType + ".initInstance(" + expr_1 + ")";
            }
            return [left + expr_1 + s.substring(p + m.length),
                left.length + expr_1.length];
        }
        var pp = new ParamParser_1.ParamParser(file, line, s, p + m.length);
        var as = pp.allArgs();
        if (as.length != 1)
            throw new ProgramError_1.ProgramError(file, line, "Wrong number of arguments to @new " + baseType + ".Array");
        // NOTE, parens removed here
        // Issue #16: Watch it: Parens interact with semicolon insertion.
        var expr = "turbo.Runtime.allocOrThrow( (" + t.elementSize + " * " + this.expandMacrosIn(file, line, index_1.endstrip(as[0])) + "), " + t.elementAlign + ") /*Array*/";
        return [left + expr + s.substring(pp.where),
            left.length + expr.length];
    };
    Compiler.prototype.expandMacrosIn = function (file, line, text) {
        return this.myExec(file, line, CONST_1.new_re, this.newMacro.bind(this), this.myExec(file, line, CONST_1.arr_re, this.arrMacro.bind(this), this.myExec(file, line, CONST_1.acc_re, this.accMacro.bind(this), text)));
    };
    Compiler.prototype.myExec = function (file, line, re, macro, text) {
        var old = re.lastIndex;
        re.lastIndex = 0;
        for (;;) {
            var m = re.exec(text);
            if (!m)
                break;
            // The trick here is that we may replace more than the match:
            // the macro may eat additional input.  So the macro should
            // be returning a new string, as well as the index at which
            // to continue the search.
            var _a = macro(file, line, text, re.lastIndex - m[0].length, m), newText = _a[0], newStart = _a[1];
            text = newText;
            re.lastIndex = newStart;
        }
        re.lastIndex = old;
        return text;
    };
    Compiler.prototype.replaceSetterShorthand = function (file, line, s, p, ms, t) {
        //return [s, p+m.length];
        var m = ms[0];
        var path = ms[1];
        var operation = ms[2];
        var left = s.substring(0, p);
        var pp = new ParamParser_1.ParamParser(file, line, s, p + m.length, false, true);
        var rhs = pp.nextArg();
        if (!rhs)
            throw new ProgramError_1.ProgramError(file, line, "Missing right-hand-side expression in assignment");
        // Be sure to re-expand the RHS.
        var substitution_left = left + " " + t.name + path + "." + CONST_1.AssignmentOps[operation] + "(SELF, ";
        return [(substitution_left + " " + rhs + ")" + (pp.sawSemi ? ';' : '') + " " + s.substring(pp.where)),
            substitution_left.length];
    };
    Compiler.prototype.isInitial = function (c) {
        return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c == '_';
    };
    Compiler.prototype.isSubsequent = function (c) {
        return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z' || c >= '0' && c <= '9' || c == '_';
    };
    Compiler.prototype.log2 = function (x) {
        if (x <= 0)
            throw new InternalError_1.InternalError("log2: " + x);
        var i = 0;
        while (x > 1) {
            i++;
            x >>= 1;
        }
        return i;
    };
    Compiler.prototype.warning = function (file, line, msg) {
        console.log(file + ":" + line + ": Warning: " + msg);
    };
    Compiler.VERSION = "1.0.0";
    return Compiler;
}());
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map