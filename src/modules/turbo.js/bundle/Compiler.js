var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("errors/CapturedError", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CapturedError;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            CapturedError = (function () {
                function CapturedError(name, message) {
                    this.name = name;
                    this.message = message;
                }
                return CapturedError;
            }());
            exports_1("CapturedError", CapturedError);
        }
    }
});
System.register("errors/UsageError", ["errors/CapturedError"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var CapturedError_1;
    var UsageError;
    return {
        setters:[
            function (CapturedError_1_1) {
                CapturedError_1 = CapturedError_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            UsageError = (function (_super) {
                __extends(UsageError, _super);
                function UsageError(msg) {
                    _super.call(this, "UsageError", "Usage error: " + msg);
                }
                return UsageError;
            }(CapturedError_1.CapturedError));
            exports_2("UsageError", UsageError);
        }
    }
});
System.register("source/SourceLine", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var SourceLine;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            SourceLine = (function () {
                function SourceLine(file, line, text) {
                    this.file = file;
                    this.line = line;
                    this.text = text;
                }
                return SourceLine;
            }());
            exports_3("SourceLine", SourceLine);
        }
    }
});
System.register("kind/DefnKind", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var DefnKind;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            (function (DefnKind) {
                DefnKind[DefnKind["Class"] = 0] = "Class";
                DefnKind[DefnKind["Struct"] = 1] = "Struct";
                DefnKind[DefnKind["Primitive"] = 2] = "Primitive";
            })(DefnKind || (DefnKind = {}));
            exports_4("DefnKind", DefnKind);
        }
    }
});
System.register("define/Defn", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Defn;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            Defn = (function () {
                function Defn(name, kind) {
                    this.name = name;
                    this.kind = kind;
                    this.size = 0;
                    this.align = 0;
                }
                Object.defineProperty(Defn.prototype, "elementSize", {
                    get: function () {
                        return this.size;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defn.prototype, "elementAlign", {
                    get: function () {
                        return this.align;
                    },
                    enumerable: true,
                    configurable: true
                });
                Defn.pointerSize = 4;
                Defn.pointerAlign = 4;
                Defn.pointerTypeName = "int32";
                Defn.pointerMemName = "_mem_int32";
                return Defn;
            }());
            exports_5("Defn", Defn);
        }
    }
});
System.register("kind/PrimKind", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var PrimKind;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            (function (PrimKind) {
                PrimKind[PrimKind["Vanilla"] = 0] = "Vanilla";
                PrimKind[PrimKind["Atomic"] = 1] = "Atomic";
                PrimKind[PrimKind["Synchronic"] = 2] = "Synchronic";
                PrimKind[PrimKind["SIMD"] = 3] = "SIMD";
            })(PrimKind || (PrimKind = {}));
            exports_6("PrimKind", PrimKind);
        }
    }
});
System.register("define/PrimitiveDefn", ["kind/PrimKind", "define/Defn", "kind/DefnKind"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var PrimKind_1, Defn_1, DefnKind_1;
    var PrimitiveDefn;
    return {
        setters:[
            function (PrimKind_1_1) {
                PrimKind_1 = PrimKind_1_1;
            },
            function (Defn_1_1) {
                Defn_1 = Defn_1_1;
            },
            function (DefnKind_1_1) {
                DefnKind_1 = DefnKind_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            PrimitiveDefn = (function (_super) {
                __extends(PrimitiveDefn, _super);
                function PrimitiveDefn(name, size, align, primKind) {
                    if (primKind === void 0) { primKind = PrimKind_1.PrimKind.Vanilla; }
                    _super.call(this, name, DefnKind_1.DefnKind.Primitive);
                    this.primKind = primKind;
                    this.size = size;
                    this.align = align;
                    if (primKind == PrimKind_1.PrimKind.SIMD)
                        this._memory = "_mem_" + name.split("x")[0];
                    else
                        this._memory = "_mem_" + name.split("/").pop();
                }
                Object.defineProperty(PrimitiveDefn.prototype, "memory", {
                    get: function () {
                        return this._memory;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PrimitiveDefn;
            }(Defn_1.Defn));
            exports_7("PrimitiveDefn", PrimitiveDefn);
        }
    }
});
System.register("errors/InternalError", ["errors/CapturedError"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var CapturedError_2;
    var InternalError;
    return {
        setters:[
            function (CapturedError_2_1) {
                CapturedError_2 = CapturedError_2_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            InternalError = (function (_super) {
                __extends(InternalError, _super);
                function InternalError(msg) {
                    _super.call(this, "InternalError", "Internal error: " + msg);
                }
                return InternalError;
            }(CapturedError_2.CapturedError));
            exports_8("InternalError", InternalError);
        }
    }
});
System.register("utils/index", ["kind/DefnKind", "errors/InternalError"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var DefnKind_2, InternalError_1;
    var MapEntry, SMap, SSet;
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
    exports_9("endstrip", endstrip);
    return {
        setters:[
            function (DefnKind_2_1) {
                DefnKind_2 = DefnKind_2_1;
            },
            function (InternalError_1_1) {
                InternalError_1 = InternalError_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            MapEntry = (function () {
                function MapEntry(name, expand, offset, type) {
                    this.name = name;
                    this.expand = expand;
                    this.offset = offset;
                    this.type = type;
                }
                Object.defineProperty(MapEntry.prototype, "memory", {
                    get: function () {
                        if (this.type.kind != DefnKind_2.DefnKind.Primitive)
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
            exports_9("MapEntry", MapEntry);
            SMap = (function () {
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
            exports_9("SMap", SMap);
            SSet = (function () {
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
            exports_9("SSet", SSet);
        }
    }
});
System.register("kind/MethodKind", [], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var MethodKind;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            (function (MethodKind) {
                MethodKind[MethodKind["Virtual"] = 0] = "Virtual";
                MethodKind[MethodKind["NonVirtual"] = 1] = "NonVirtual";
                MethodKind[MethodKind["Get"] = 2] = "Get";
                MethodKind[MethodKind["Set"] = 3] = "Set";
            })(MethodKind || (MethodKind = {}));
            exports_10("MethodKind", MethodKind);
        }
    }
});
System.register("entities/Method", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var Method;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            Method = (function () {
                function Method(line, kind, name, signature, body) {
                    this.line = line;
                    this.kind = kind;
                    this.name = name;
                    this.signature = signature;
                    this.body = body;
                }
                return Method;
            }());
            exports_11("Method", Method);
        }
    }
});
System.register("entities/PropQual", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var PropQual;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            (function (PropQual) {
                PropQual[PropQual["None"] = 0] = "None";
                PropQual[PropQual["Atomic"] = 1] = "Atomic";
                PropQual[PropQual["Synchronic"] = 2] = "Synchronic";
            })(PropQual || (PropQual = {}));
            exports_12("PropQual", PropQual);
        }
    }
});
System.register("entities/Prop", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var Prop;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            Prop = (function () {
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
            exports_13("Prop", Prop);
        }
    }
});
System.register("define/StructDefn", ["define/UserDefn", "kind/DefnKind", "kind/MethodKind"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var UserDefn_1, DefnKind_3, MethodKind_1;
    var StructDefn;
    return {
        setters:[
            function (UserDefn_1_1) {
                UserDefn_1 = UserDefn_1_1;
            },
            function (DefnKind_3_1) {
                DefnKind_3 = DefnKind_3_1;
            },
            function (MethodKind_1_1) {
                MethodKind_1 = MethodKind_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            StructDefn = (function (_super) {
                __extends(StructDefn, _super);
                function StructDefn(file, line, name, props, methods, origin) {
                    _super.call(this, file, line, name, DefnKind_3.DefnKind.Struct, props, methods, origin);
                    this.hasGetMethod = false;
                    this.hasSetMethod = false;
                    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
                        var m = methods_1[_i];
                        if (m.kind == MethodKind_1.MethodKind.Get)
                            this.hasGetMethod = true;
                        else if (m.kind == MethodKind_1.MethodKind.Set)
                            this.hasSetMethod = true;
                    }
                }
                return StructDefn;
            }(UserDefn_1.UserDefn));
            exports_14("StructDefn", StructDefn);
        }
    }
});
System.register("define/UserDefn", ["kind/DefnKind", "define/Defn", "kind/PrimKind"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var DefnKind_4, Defn_2, PrimKind_2;
    var UserDefn;
    return {
        setters:[
            function (DefnKind_4_1) {
                DefnKind_4 = DefnKind_4_1;
            },
            function (Defn_2_1) {
                Defn_2 = Defn_2_1;
            },
            function (PrimKind_2_1) {
                PrimKind_2 = PrimKind_2_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            UserDefn = (function (_super) {
                __extends(UserDefn, _super);
                function UserDefn(file, line, name, kind, props, methods, origin) {
                    _super.call(this, name, kind);
                    this.file = file;
                    this.line = line;
                    this.props = props;
                    this.methods = methods;
                    this.origin = origin;
                    this.typeRef = null;
                    this.map = null;
                    this.live = false;
                    this.checked = false;
                }
                UserDefn.prototype.findAccessibleFieldFor = function (operation, prop) {
                    var d = this.map.get(prop);
                    if (!d)
                        return null;
                    switch (operation) {
                        case "get":
                        case "set":
                        case "ref":
                            return d;
                        case "add":
                        case "sub":
                        case "and":
                        case "or":
                        case "xor":
                        case "compareExchange":
                            {
                                if (d.type.kind != DefnKind_4.DefnKind.Primitive)
                                    return null;
                                var prim = d.type;
                                // add, sub, and, or, and xor are defined on plain primitives too, for
                                // internal reasons, but that is not documented.
                                //if (prim.primKind != PrimKind.Atomic && prim.primKind != PrimKind.Synchronic)
                                //    return null;
                                return d;
                            }
                        case "loadWhenEqual":
                        case "loadWhenNotEqual":
                        case "expectUpdate":
                        case "notify":
                            {
                                if (d.type.kind != DefnKind_4.DefnKind.Primitive)
                                    return null;
                                var prim = d.type;
                                if (prim.primKind != PrimKind_2.PrimKind.Synchronic)
                                    return null;
                                return d;
                            }
                        default:
                            return null;
                    }
                };
                return UserDefn;
            }(Defn_2.Defn));
            exports_15("UserDefn", UserDefn);
        }
    }
});
System.register("source/Source", [], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Source;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            Source = (function () {
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
            exports_16("Source", Source);
        }
    }
});
System.register("errors/ProgramError", ["errors/CapturedError"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var CapturedError_3;
    var ProgramError;
    return {
        setters:[
            function (CapturedError_3_1) {
                CapturedError_3 = CapturedError_3_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            ProgramError = (function (_super) {
                __extends(ProgramError, _super);
                function ProgramError(file, line, msg) {
                    _super.call(this, "ProgramError", file + ":" + line + ": " + msg);
                }
                return ProgramError;
            }(CapturedError_3.CapturedError));
            exports_17("ProgramError", ProgramError);
        }
    }
});
System.register("entities/Virtual", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var Virtual;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            Virtual = (function () {
                function Virtual(name, sign, reverseCases, default_) {
                    this.name = name;
                    this.sign = sign;
                    this.reverseCases = reverseCases;
                    this.default_ = default_;
                }
                Virtual.prototype.signature = function () {
                    if (this.sign == null)
                        return ", ...args";
                    if (this.sign.length == 0)
                        return "";
                    return ", " + this.sign.join(",");
                };
                return Virtual;
            }());
            exports_18("Virtual", Virtual);
        }
    }
});
System.register("define/ClassDefn", ["define/UserDefn", "define/Defn", "kind/DefnKind"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var UserDefn_2, Defn_3, DefnKind_5;
    var ClassDefn;
    return {
        setters:[
            function (UserDefn_2_1) {
                UserDefn_2 = UserDefn_2_1;
            },
            function (Defn_3_1) {
                Defn_3 = Defn_3_1;
            },
            function (DefnKind_5_1) {
                DefnKind_5 = DefnKind_5_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            ClassDefn = (function (_super) {
                __extends(ClassDefn, _super);
                function ClassDefn(file, line, name, baseName, props, methods, origin) {
                    _super.call(this, file, line, name, DefnKind_5.DefnKind.Class, props, methods, origin);
                    this.baseName = baseName;
                    this.baseTypeRef = null;
                    this.className = ""; // Base1>Base2>name
                    this.classId = 0;
                    this.subclasses = []; // direct proper subclasses
                    this.vtable = null;
                }
                Object.defineProperty(ClassDefn.prototype, "elementSize", {
                    get: function () {
                        return Defn_3.Defn.pointerSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassDefn.prototype, "elementAlign", {
                    get: function () {
                        return Defn_3.Defn.pointerAlign;
                    },
                    enumerable: true,
                    configurable: true
                });
                ClassDefn.prototype.hasMethod = function (name) {
                    for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m.name == name)
                            return true;
                    }
                    return false;
                };
                ClassDefn.prototype.getMethod = function (name) {
                    for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
                        var m = _a[_i];
                        if (m.name == name)
                            return m;
                    }
                    return null;
                };
                return ClassDefn;
            }(UserDefn_2.UserDefn));
            exports_19("ClassDefn", ClassDefn);
        }
    }
});
System.register("CONST", [], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var Ws, Os, Id, Lbrace, Rbrace, LParen, CommentOpt, QualifierOpt, OpNames, Operation, OperationOpt, OperationLParen, NullaryOperation, Path, PathLazy, PathOpt, PathOptLazy, AssignOp, start_re, end_re, struct_re, class_re, special_re, method_re, blank_re, space_re, prop_re, new_re, acc_re, arr_re, self_getter1_re, self_getter2_re, self_accessor_re, self_setter_re, self_invoke_re, AssignmentOps, OpAttr;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             *
             */
            exports_20("Ws", Ws = "\\s+");
            exports_20("Os", Os = "\\s*");
            exports_20("Id", Id = "[A-Za-z][A-Za-z0-9]*"); // Note, no underscores are allowed yet
            exports_20("Lbrace", Lbrace = Os + "\\{");
            exports_20("Rbrace", Rbrace = Os + "\\}");
            exports_20("LParen", LParen = Os + "\\(");
            exports_20("CommentOpt", CommentOpt = Os + "(?:\\/\\/.*)?");
            exports_20("QualifierOpt", QualifierOpt = "(?:\\.(atomic|synchronic))?");
            exports_20("OpNames", OpNames = "at|get|setAt|set|ref|add|sub|and|or|xor|compareExchange|loadWhenEqual|loadWhenNotEqual|expectUpdate|notify");
            exports_20("Operation", Operation = "(?:\\.(" + OpNames + "))");
            exports_20("OperationOpt", OperationOpt = Operation + "?");
            exports_20("OperationLParen", OperationLParen = "(?:\\.(" + OpNames + ")" + LParen + ")");
            exports_20("NullaryOperation", NullaryOperation = "(?:\\.(ref|notify))");
            exports_20("Path", Path = "((?:\\." + Id + ")+)");
            exports_20("PathLazy", PathLazy = "((?:\\." + Id + ")+?)");
            exports_20("PathOpt", PathOpt = "((?:\\." + Id + ")*)");
            exports_20("PathOptLazy", PathOptLazy = "((?:\\." + Id + ")*?)");
            exports_20("AssignOp", AssignOp = "(=|\\+=|-=|&=|\\|=|\\^=)(?!=)");
            exports_20("start_re", start_re = new RegExp("^" + Os + "@turbo::" + Ws + "(?:struct|class)" + Ws + "(?:" + Id + ")"));
            exports_20("end_re", end_re = new RegExp("^" + Rbrace + Os + "@end" + CommentOpt + "$"));
            exports_20("struct_re", struct_re = new RegExp("^" + Os + "@turbo::" + Ws + "struct" + Ws + "(" + Id + ")" + Lbrace + CommentOpt + "$"));
            exports_20("class_re", class_re = new RegExp("^" + Os + "@turbo::" + Ws + "class" + Ws + "(" + Id + ")" + Os + "(?:extends" + Ws + "(" + Id + "))?" + Lbrace + CommentOpt + "$"));
            exports_20("special_re", special_re = new RegExp("^" + Os + "@(get|set)" + "(" + LParen + Os + "SELF.*)$"));
            exports_20("method_re", method_re = new RegExp("^" + Os + "@(method|virtual)" + Ws + "(" + Id + ")" + "(" + LParen + Os + "SELF.*)$"));
            exports_20("blank_re", blank_re = new RegExp("^" + Os + CommentOpt + "$"));
            exports_20("space_re", space_re = new RegExp("^" + Os + "$"));
            exports_20("prop_re", prop_re = new RegExp("^" + Os + "(" + Id + ")" + Os + ":" + Os + "(" + Id + ")" + QualifierOpt + "(?:\.(Array))?" + Os + ";?" + CommentOpt + "$"));
            exports_20("new_re", new_re = new RegExp("@new\\s+(" + Id + ")" + QualifierOpt + "(?:\\.(Array)" + LParen + ")?", "g"));
            exports_20("acc_re", acc_re = new RegExp("(" + Id + ")" + PathOptLazy + "(?:" + Operation + "|)" + LParen, "g"));
            // It would sure be nice to avoid the explicit ".Array" here, but I don't yet know how.
            exports_20("arr_re", arr_re = new RegExp("(" + Id + ")" + QualifierOpt + "\\.Array" + PathOpt + Operation + LParen, "g"));
            // Macro expansion and pasteup
            exports_20("self_getter1_re", self_getter1_re = new RegExp("SELF" + Path + NullaryOperation, "g"));
            exports_20("self_getter2_re", self_getter2_re = new RegExp("SELF" + Path, "g"));
            exports_20("self_accessor_re", self_accessor_re = new RegExp("SELF" + Path + OperationLParen, "g"));
            exports_20("self_setter_re", self_setter_re = new RegExp("SELF" + Path + Os + AssignOp + Os, "g"));
            exports_20("self_invoke_re", self_invoke_re = new RegExp("SELF\\.(" + Id + ")" + LParen, "g"));
            // We've eaten "SELF.id op " and need to grab a plausible RHS.
            //
            // Various complications here:
            //
            //   nested fields: SELF.x_y_z += 10
            //   stacked:  SELF.x = SELF.y = SELF.z = 0
            //   used for value:  v = (SELF.x = 10)
            //
            // Easiest fix is to change the spec so that a setter returns a value,
            // which is the rhs.  The regular assignment and Atomics.store
            // already does that.  I just changed _synchronicsStore so that it
            // does that too.  BUT SIMD STORE INSTRUCTIONS DO NOT.  Good grief.
            //
            // For now, disallow stacking of simd values (but don't detect it).
            exports_20("AssignmentOps", AssignmentOps = {
                "=": "set",
                "+=": "add",
                "-=": "sub",
                "&=": "and",
                "|=": "or",
                "^=": "xor"
            });
            exports_20("OpAttr", OpAttr = {
                "get": { arity: 1, atomic: "load", synchronic: "" },
                "ref": { arity: 1, atomic: "", synchronic: "" },
                "notify": { arity: 1, atomic: "", synchronic: "_synchronicNotify" },
                "set": { arity: 2, atomic: "store", synchronic: "_synchronicStore", vanilla: "=" },
                "add": { arity: 2, atomic: "add", synchronic: "_synchronicAdd", vanilla: "+=" },
                "sub": { arity: 2, atomic: "sub", synchronic: "_synchronicSub", vanilla: "-=" },
                "and": { arity: 2, atomic: "and", synchronic: "_synchronicAnd", vanilla: "&=" },
                "or": { arity: 2, atomic: "or", synchronic: "_synchronicOr", vanilla: "|=" },
                "xor": { arity: 2, atomic: "xor", synchronic: "_synchronicXor", vanilla: "^=" },
                "loadWhenEqual": { arity: 2, atomic: "", synchronic: "_synchronicLoadWhenEqual" },
                "loadWhenNotEqual": { arity: 2, atomic: "", synchronic: "_synchronicLoadWhenNotEqual" },
                "expectUpdate": { arity: 3, atomic: "", synchronic: "_synchronicExpectUpdate" },
                "compareExchange": { arity: 3, atomic: "compareExchange", synchronic: "_synchronicCompareExchange" },
            });
        }
    }
});
System.register("parser/ParamParser", ["errors/ProgramError"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var ProgramError_1;
    var ParamParser;
    return {
        setters:[
            function (ProgramError_1_1) {
                ProgramError_1 = ProgramError_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            ParamParser = (function () {
                function ParamParser(file, line, input, pos, requireRightParen, stopAtSemi) {
                    if (requireRightParen === void 0) { requireRightParen = true; }
                    if (stopAtSemi === void 0) { stopAtSemi = false; }
                    this.file = file;
                    this.line = line;
                    this.input = input;
                    this.pos = pos;
                    this.requireRightParen = requireRightParen;
                    this.stopAtSemi = stopAtSemi;
                    this.lim = 0;
                    this.done = false;
                    this.sawSemi = false;
                    this.lim = input.length;
                }
                // Returns null on failure to find a next argument
                ParamParser.prototype.nextArg = function () {
                    if (this.done)
                        return null;
                    var depth = 0;
                    var start = this.pos;
                    var sawRightParen = false;
                    var sawComma = false;
                    var fellOff = false;
                    // Issue #8: Really should handle regular expressions, but much harder, and somewhat marginal
                    loop: for (;;) {
                        if (this.pos == this.lim) {
                            this.done = true;
                            fellOff = true;
                            break loop;
                        }
                        switch (this.input.charAt(this.pos++)) {
                            case '/':
                                if (this.pos < this.lim && this.input.charAt(this.pos) == '/') {
                                    this.done = true;
                                    break loop;
                                }
                                if (this.pos < this.lim && this.input.charAt(this.pos) == '*') {
                                    this.pos++;
                                    for (;;) {
                                        if (this.pos == this.lim)
                                            throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within comment.");
                                        if (this.input.charAt(this.pos++) == '*' && this.pos < this.lim && this.input.charAt(this.pos) == '/')
                                            break;
                                    }
                                }
                                break;
                            case ';':
                                if (depth == 0 && this.stopAtSemi) {
                                    this.done = true;
                                    this.sawSemi = true;
                                    break loop;
                                }
                                break;
                            case ',':
                                if (depth == 0) {
                                    sawComma = true;
                                    break loop;
                                }
                                break;
                            case '(':
                            case '{':
                            case '[':
                                depth++;
                                break;
                            case '}':
                            case ']':
                                depth--;
                                break;
                            case ')':
                                if (depth == 0) {
                                    this.done = true;
                                    sawRightParen = true;
                                    break loop;
                                }
                                depth--;
                                break;
                            case '\'':
                            case '"':
                                {
                                    var c = this.input.charAt(this.pos - 1);
                                    for (;;) {
                                        if (this.pos == this.lim)
                                            throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - within a string.");
                                        var d = this.input.charAt(this.pos++);
                                        if (d == c)
                                            break;
                                        if (d == '\\') {
                                            if (this.pos < this.lim)
                                                this.pos++;
                                        }
                                    }
                                    break;
                                }
                            case '`':
                                // Issue #25: Allow template strings
                                throw new ProgramError_1.ProgramError(this.file, this.line, "Avoid template strings in arguments for now");
                        }
                    }
                    var result = this.cleanupArg(this.input.substring(start, fellOff ? this.pos : this.pos - 1));
                    // Don't consume it if we don't know if we're going to find it.
                    if (sawRightParen && !this.requireRightParen)
                        this.pos--;
                    if (this.done && depth > 0)
                        throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within parentheses.");
                    if (this.done && this.requireRightParen && !sawRightParen)
                        throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - expected ')'.  " + this.input);
                    return result;
                };
                ParamParser.prototype.allArgs = function () {
                    var as = [];
                    var a;
                    while (a = this.nextArg())
                        as.push(a);
                    return as;
                };
                Object.defineProperty(ParamParser.prototype, "where", {
                    get: function () {
                        return this.pos;
                    },
                    enumerable: true,
                    configurable: true
                });
                ParamParser.prototype.cleanupArg = function (s) {
                    s = s.replace(/^\s*|\s*$/g, "");
                    if (s == "")
                        return null;
                    return s;
                };
                return ParamParser;
            }());
            exports_21("ParamParser", ParamParser);
        }
    }
});
System.register("services/DefinitionService", ["source/SourceLine", "entities/Prop", "entities/Method", "kind/MethodKind", "errors/ProgramError", "define/ClassDefn", "define/StructDefn", "CONST", "entities/PropQual", "parser/ParamParser"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var SourceLine_1, Prop_1, Method_1, MethodKind_2, ProgramError_2, ClassDefn_1, StructDefn_1, CONST_1, PropQual_1, ParamParser_1;
    var DefinitionService;
    return {
        setters:[
            function (SourceLine_1_1) {
                SourceLine_1 = SourceLine_1_1;
            },
            function (Prop_1_1) {
                Prop_1 = Prop_1_1;
            },
            function (Method_1_1) {
                Method_1 = Method_1_1;
            },
            function (MethodKind_2_1) {
                MethodKind_2 = MethodKind_2_1;
            },
            function (ProgramError_2_1) {
                ProgramError_2 = ProgramError_2_1;
            },
            function (ClassDefn_1_1) {
                ClassDefn_1 = ClassDefn_1_1;
            },
            function (StructDefn_1_1) {
                StructDefn_1 = StructDefn_1_1;
            },
            function (CONST_1_1) {
                CONST_1 = CONST_1_1;
            },
            function (PropQual_1_1) {
                PropQual_1 = PropQual_1_1;
            },
            function (ParamParser_1_1) {
                ParamParser_1 = ParamParser_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            DefinitionService = (function () {
                function DefinitionService() {
                }
                DefinitionService.prototype.collectDefinitions = function (filename, lines) {
                    var _this = this;
                    var defs = [];
                    var nlines = [];
                    var i = 0, lim = lines.length;
                    while (i < lim) {
                        var l = lines[i++];
                        if (!CONST_1.start_re.test(l)) {
                            nlines.push(new SourceLine_1.SourceLine(filename, i, l));
                            continue;
                        }
                        var kind = "";
                        var name_1 = "";
                        var inherit = "";
                        var lineno = i;
                        var m = null;
                        if (m = CONST_1.struct_re.exec(l)) {
                            kind = "struct";
                            name_1 = m[1];
                        }
                        else if (m = CONST_1.class_re.exec(l)) {
                            kind = "class";
                            name_1 = m[1];
                            inherit = m[2] ? m[2] : "";
                        }
                        else
                            throw new ProgramError_2.ProgramError(filename, i, "Syntax error: Malformed definition line");
                        var properties = [];
                        var methods = [];
                        var in_method = false;
                        var mbody = null;
                        var method_type = MethodKind_2.MethodKind.Virtual;
                        var method_name = "";
                        var method_line = 0;
                        var method_signature = null;
                        // Do not check for duplicate names here since that needs to
                        // take into account inheritance.
                        while (i < lim) {
                            l = lines[i++];
                            if (CONST_1.end_re.test(l))
                                break;
                            if (m = CONST_1.method_re.exec(l.trim())) {
                                if (kind != "class")
                                    throw new ProgramError_2.ProgramError(filename, i, "@method is only allowed in classes");
                                if (in_method)
                                    methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
                                in_method = true;
                                method_line = i;
                                method_type = (m[1] == "method" ? MethodKind_2.MethodKind.NonVirtual : MethodKind_2.MethodKind.Virtual);
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
                            else if (m = CONST_1.special_re.exec(l.trim())) {
                                if (kind != "struct")
                                    throw new ProgramError_2.ProgramError(filename, i, "@" + m[1] + " is only allowed in structs");
                                if (in_method)
                                    methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
                                method_line = i;
                                in_method = true;
                                switch (m[1]) {
                                    case "get":
                                        method_type = MethodKind_2.MethodKind.Get;
                                        break;
                                    case "set":
                                        method_type = MethodKind_2.MethodKind.Set;
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
                                mbody.push(l);
                            }
                            else if (m = CONST_1.prop_re.exec(l)) {
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
                            else if (CONST_1.blank_re.test(l)) {
                            }
                            else
                                throw new ProgramError_2.ProgramError(filename, i, "Syntax error: Not a property or method: " + l);
                        }
                        if (in_method)
                            methods.push(new Method_1.Method(method_line, method_type, method_name, method_signature, mbody));
                        if (kind == "class")
                            defs.push(new ClassDefn_1.ClassDefn(filename, lineno, name_1, inherit, properties, methods, nlines.length));
                        else
                            defs.push(new StructDefn_1.StructDefn(filename, lineno, name_1, properties, methods, nlines.length));
                    }
                    return [defs, nlines];
                };
                // The input is Id, Id:Blah, or ...Id.  Strip any :Blah annotations.
                DefinitionService.prototype.parameterToArgument = function (file, line, s) {
                    if (/^\s*(?:\.\.\.)[A-Za-z_$][A-Za-z0-9_$]*\s*$/.test(s))
                        return s;
                    var m = /^\s*([A-Za-z_\$][A-Za-z0-9_\$]*)\s*:?/.exec(s);
                    if (!m)
                        throw new ProgramError_2.ProgramError(file, line, "Unable to understand argument to virtual function: " + s);
                    return m[1];
                };
                return DefinitionService;
            }());
            exports_22("DefinitionService", DefinitionService);
        }
    }
});
System.register("source/SourceProvider", ["errors/UsageError", "fs", "source/Source", "errors/CapturedError", "services/DefinitionService"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var UsageError_1, fs, Source_1, CapturedError_4, DefinitionService_1;
    var SourceProvider;
    return {
        setters:[
            function (UsageError_1_1) {
                UsageError_1 = UsageError_1_1;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (Source_1_1) {
                Source_1 = Source_1_1;
            },
            function (CapturedError_4_1) {
                CapturedError_4 = CapturedError_4_1;
            },
            function (DefinitionService_1_1) {
                DefinitionService_1 = DefinitionService_1_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            SourceProvider = (function () {
                function SourceProvider(args) {
                    this.allSources = [];
                    this.definitionService = new DefinitionService_1.DefinitionService;
                    try {
                        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                            var input_file = args_1[_i];
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
                        if (e instanceof CapturedError_4.CapturedError)
                            console.log(e.message);
                        else
                            console.log(e);
                        process.exit(1);
                    }
                }
                return SourceProvider;
            }());
            exports_23("SourceProvider", SourceProvider);
        }
    }
});
System.register("define/AtomicDefn", ["define/PrimitiveDefn", "kind/PrimKind"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var PrimitiveDefn_1, PrimKind_3;
    var AtomicDefn;
    return {
        setters:[
            function (PrimitiveDefn_1_1) {
                PrimitiveDefn_1 = PrimitiveDefn_1_1;
            },
            function (PrimKind_3_1) {
                PrimKind_3 = PrimKind_3_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            AtomicDefn = (function (_super) {
                __extends(AtomicDefn, _super);
                function AtomicDefn(name, size, align) {
                    _super.call(this, name, size, align, PrimKind_3.PrimKind.Atomic);
                }
                return AtomicDefn;
            }(PrimitiveDefn_1.PrimitiveDefn));
            exports_24("AtomicDefn", AtomicDefn);
        }
    }
});
System.register("define/SynchronicDefn", ["define/PrimitiveDefn", "kind/PrimKind"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var PrimitiveDefn_2, PrimKind_4;
    var SynchronicDefn;
    return {
        setters:[
            function (PrimitiveDefn_2_1) {
                PrimitiveDefn_2 = PrimitiveDefn_2_1;
            },
            function (PrimKind_4_1) {
                PrimKind_4 = PrimKind_4_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            SynchronicDefn = (function (_super) {
                __extends(SynchronicDefn, _super);
                function SynchronicDefn(name, size, align, baseSize) {
                    _super.call(this, name, size, align, PrimKind_4.PrimKind.Synchronic);
                    this.baseSize = baseSize;
                }
                // The byte offset within the structure for the payload
                SynchronicDefn.bias = 8;
                return SynchronicDefn;
            }(PrimitiveDefn_2.PrimitiveDefn));
            exports_25("SynchronicDefn", SynchronicDefn);
        }
    }
});
System.register("define/SIMDDefn", ["define/PrimitiveDefn", "kind/PrimKind"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var PrimitiveDefn_3, PrimKind_5;
    var SIMDDefn;
    return {
        setters:[
            function (PrimitiveDefn_3_1) {
                PrimitiveDefn_3 = PrimitiveDefn_3_1;
            },
            function (PrimKind_5_1) {
                PrimKind_5 = PrimKind_5_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            SIMDDefn = (function (_super) {
                __extends(SIMDDefn, _super);
                function SIMDDefn(name, size, align, baseSize) {
                    _super.call(this, name, size, align, PrimKind_5.PrimKind.SIMD);
                    this.baseSize = baseSize;
                }
                return SIMDDefn;
            }(PrimitiveDefn_3.PrimitiveDefn));
            exports_26("SIMDDefn", SIMDDefn);
        }
    }
});
System.register("iterators/VirtualMethodIterator", ["utils/index", "kind/MethodKind"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var index_1, MethodKind_3;
    var VirtualMethodIterator;
    return {
        setters:[
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (MethodKind_3_1) {
                MethodKind_3 = MethodKind_3_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            VirtualMethodIterator = (function () {
                function VirtualMethodIterator(cls) {
                    this.cls = cls;
                    this.i = 0;
                    this.inherited = false;
                    this.filter = new index_1.SSet();
                }
                VirtualMethodIterator.prototype.next = function () {
                    for (;;) {
                        if (this.i == this.cls.methods.length) {
                            if (!this.cls.baseTypeRef)
                                return ["", null, false];
                            this.i = 0;
                            this.cls = this.cls.baseTypeRef;
                            this.inherited = true;
                            continue;
                        }
                        var m = this.cls.methods[this.i++];
                        if (m.kind != MethodKind_3.MethodKind.Virtual)
                            continue;
                        if (this.filter.test(m.name))
                            continue;
                        this.filter.put(m.name);
                        return [m.name, m.signature, this.inherited];
                    }
                };
                return VirtualMethodIterator;
            }());
            exports_27("VirtualMethodIterator", VirtualMethodIterator);
        }
    }
});
System.register("iterators/InclusiveSubclassIterator", [], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var InclusiveSubclassIterator;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 4/7/2016.
             */
            InclusiveSubclassIterator = (function () {
                function InclusiveSubclassIterator(cls) {
                    this.stack = [];
                    this.stack.push(cls);
                }
                InclusiveSubclassIterator.prototype.next = function () {
                    if (this.stack.length == 0)
                        return null;
                    var top = this.stack.pop();
                    if (typeof top == "number") {
                        var x = top;
                        var xs = this.stack.pop();
                        var cls = xs[x++];
                        if (x < xs.length) {
                            this.stack.push(xs);
                            this.stack.push(x);
                        }
                        if (cls.subclasses.length > 0) {
                            this.stack.push(cls.subclasses);
                            this.stack.push(0);
                        }
                        return cls;
                    }
                    else {
                        var x = top;
                        if (x.subclasses.length > 0) {
                            this.stack.push(x.subclasses);
                            this.stack.push(0);
                        }
                        return x;
                    }
                };
                return InclusiveSubclassIterator;
            }());
            exports_28("InclusiveSubclassIterator", InclusiveSubclassIterator);
        }
    }
});
System.register("Compiler", ["source/SourceProvider", "define/PrimitiveDefn", "utils/index", "define/Defn", "define/AtomicDefn", "define/SynchronicDefn", "define/SIMDDefn", "errors/ProgramError", "kind/DefnKind", "entities/PropQual", "kind/MethodKind", "errors/InternalError", "entities/Virtual", "iterators/VirtualMethodIterator", "fs", "iterators/InclusiveSubclassIterator", "source/SourceLine", "CONST", "parser/ParamParser", "kind/PrimKind"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var SourceProvider_1, PrimitiveDefn_4, index_2, Defn_4, AtomicDefn_1, SynchronicDefn_1, SIMDDefn_1, ProgramError_3, DefnKind_6, PropQual_2, MethodKind_4, InternalError_2, Virtual_1, VirtualMethodIterator_1, fs, InclusiveSubclassIterator_1, SourceLine_2, CONST_2, ParamParser_2, PrimKind_6;
    var Compiler;
    return {
        setters:[
            function (SourceProvider_1_1) {
                SourceProvider_1 = SourceProvider_1_1;
            },
            function (PrimitiveDefn_4_1) {
                PrimitiveDefn_4 = PrimitiveDefn_4_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (Defn_4_1) {
                Defn_4 = Defn_4_1;
            },
            function (AtomicDefn_1_1) {
                AtomicDefn_1 = AtomicDefn_1_1;
            },
            function (SynchronicDefn_1_1) {
                SynchronicDefn_1 = SynchronicDefn_1_1;
            },
            function (SIMDDefn_1_1) {
                SIMDDefn_1 = SIMDDefn_1_1;
            },
            function (ProgramError_3_1) {
                ProgramError_3 = ProgramError_3_1;
            },
            function (DefnKind_6_1) {
                DefnKind_6 = DefnKind_6_1;
            },
            function (PropQual_2_1) {
                PropQual_2 = PropQual_2_1;
            },
            function (MethodKind_4_1) {
                MethodKind_4 = MethodKind_4_1;
            },
            function (InternalError_2_1) {
                InternalError_2 = InternalError_2_1;
            },
            function (Virtual_1_1) {
                Virtual_1 = Virtual_1_1;
            },
            function (VirtualMethodIterator_1_1) {
                VirtualMethodIterator_1 = VirtualMethodIterator_1_1;
            },
            function (fs_2) {
                fs = fs_2;
            },
            function (InclusiveSubclassIterator_1_1) {
                InclusiveSubclassIterator_1 = InclusiveSubclassIterator_1_1;
            },
            function (SourceLine_2_1) {
                SourceLine_2 = SourceLine_2_1;
            },
            function (CONST_2_1) {
                CONST_2 = CONST_2_1;
            },
            function (ParamParser_2_1) {
                ParamParser_2 = ParamParser_2_1;
            },
            function (PrimKind_6_1) {
                PrimKind_6 = PrimKind_6_1;
            }],
        execute: function() {
            /**
             * Created by Nidin Vinayakan on 6/18/2016.
             */
            Compiler = (function () {
                function Compiler(args) {
                    this.knownTypes = new index_2.SMap();
                    this.knownIds = new index_2.SMap();
                    this.userTypes = [];
                    if (args) {
                        this.compile(args);
                    }
                }
                Compiler.prototype.compile = function (args) {
                    var sourceProvider = new SourceProvider_1.SourceProvider(args);
                    this.buildTypeMap(sourceProvider);
                    this.resolveTypeRefs();
                    this.checkRecursion();
                    this.checkMethods();
                    this.layoutTypes();
                    this.createVirtuals();
                    this.expandSelfAccessors();
                    this.pasteupTypes(sourceProvider);
                    this.expandGlobalAccessorsAndMacros(sourceProvider);
                    for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
                        var s = _a[_i];
                        fs.writeFileSync(s.output_file, "// Generated from " + s.input_file + " by Parallel.js " + Compiler.VERSION + "; github.com/01alchemist/parallel-js\n" + s.allText(), "utf8");
                    }
                };
                Compiler.prototype.buildTypeMap = function (sourceProvider) {
                    this.knownTypes.put("int8", new PrimitiveDefn_4.PrimitiveDefn("int8", 1, 1));
                    this.knownTypes.put("uint8", new PrimitiveDefn_4.PrimitiveDefn("uint8", 1, 1));
                    this.knownTypes.put("int16", new PrimitiveDefn_4.PrimitiveDefn("int16", 2, 2));
                    this.knownTypes.put("uint16", new PrimitiveDefn_4.PrimitiveDefn("uint16", 2, 2));
                    this.knownTypes.put("int32", new PrimitiveDefn_4.PrimitiveDefn("int32", 4, 4));
                    this.knownTypes.put("uint32", new PrimitiveDefn_4.PrimitiveDefn("uint32", 4, 4));
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
                    this.knownTypes.put("float32", new PrimitiveDefn_4.PrimitiveDefn("float32", 4, 4));
                    this.knownTypes.put("float64", new PrimitiveDefn_4.PrimitiveDefn("float64", 8, 8));
                    this.knownTypes.put("int32x4", new SIMDDefn_1.SIMDDefn("int32x4", 16, 16, 4));
                    this.knownTypes.put("float32x4", new SIMDDefn_1.SIMDDefn("float32x4", 16, 16, 4));
                    this.knownTypes.put("float64x2", new SIMDDefn_1.SIMDDefn("float64x2", 16, 16, 8));
                    for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
                        var source = _a[_i];
                        for (var _b = 0, _c = source.defs; _b < _c.length; _b++) {
                            var def = _c[_b];
                            if (this.knownTypes.test(def.name)) {
                                throw new ProgramError_3.ProgramError(def.file, def.line, "Duplicate type name: " + def.name);
                            }
                            this.knownTypes.put(def.name, def);
                            this.userTypes.push(def);
                        }
                    }
                };
                Compiler.prototype.resolveTypeRefs = function () {
                    for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
                        var def = _a[_i];
                        if (def.kind == DefnKind_6.DefnKind.Class) {
                            var cls = def;
                            if (cls.baseName != "") {
                                var probe = this.knownTypes.get(cls.baseName);
                                if (!probe) {
                                    throw new ProgramError_3.ProgramError(cls.file, cls.line, "Missing base type: " + cls.baseName);
                                }
                                if (probe.kind != DefnKind_6.DefnKind.Class) {
                                    throw new ProgramError_3.ProgramError(cls.file, cls.line, "Base type is not class: " + cls.baseName);
                                }
                                cls.baseTypeRef = probe;
                                cls.baseTypeRef.subclasses.push(cls);
                            }
                        }
                        for (var _b = 0, _c = def.props; _b < _c.length; _b++) {
                            var prop = _c[_b];
                            if (!this.knownTypes.test(prop.typeName)) {
                                throw new ProgramError_3.ProgramError(def.file, prop.line, "Undefined type: " + prop.typeName);
                            }
                            var type = null;
                            if (prop.qual != PropQual_2.PropQual.None) {
                                if (prop.qual == PropQual_2.PropQual.Atomic) {
                                    type = this.knownTypes.get("atomic/" + prop.typeName);
                                }
                                else {
                                    type = this.knownTypes.get("synchronic/" + prop.typeName);
                                }
                                if (!type) {
                                    throw new ProgramError_3.ProgramError(def.file, prop.line, ": Not " + (prop.qual == PropQual_2.PropQual.Atomic ? "an atomic" : "a synchronic") + " type: " + prop.typeName);
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
                            if (!probe || probe.kind != DefnKind_6.DefnKind.Struct) {
                                continue;
                            }
                            var structDef = probe;
                            if (structDef.live) {
                                throw new ProgramError_3.ProgramError(def.file, prop.line, "Recursive type reference to struct " + prop.typeName + " from " + def.name);
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
                                throw new ProgramError_3.ProgramError(def.file, def.line, "Recursive type reference to base class from " + def.name);
                            }
                            checkRecursionForClass(def.baseTypeRef);
                        }
                        def.live = false;
                        def.checked = true;
                    };
                    for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
                        var def = _a[_i];
                        if (def.kind == DefnKind_6.DefnKind.Struct) {
                            checkRecursionForStruct(def);
                        }
                        else if (def.kind == DefnKind_6.DefnKind.Class) {
                            checkRecursionForClass(def);
                        }
                    }
                };
                Compiler.prototype.checkMethods = function () {
                    for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
                        var def = _a[_i];
                        if (def.kind != DefnKind_6.DefnKind.Class) {
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
                                if (method.kind == MethodKind_4.MethodKind.NonVirtual && bm.kind == MethodKind_4.MethodKind.Virtual) {
                                    throw new ProgramError_3.ProgramError(cls.file, method.line, "Non-virtual method " + method.name + " is defined virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                                }
                                if (method.kind == MethodKind_4.MethodKind.Virtual && bm.kind != MethodKind_4.MethodKind.Virtual) {
                                    throw new ProgramError_3.ProgramError(cls.file, method.line, "Virtual method " + method.name + " is defined non-virtual in a base class " + b.name + " (" + b.file + ":" + b.line + ")");
                                }
                                if (method.kind == MethodKind_4.MethodKind.Virtual) {
                                }
                            }
                        }
                    }
                };
                Compiler.prototype.layoutTypes = function () {
                    for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
                        var d = _a[_i];
                        if (d.kind == DefnKind_6.DefnKind.Class) {
                            this.layoutClass(d);
                        }
                        else {
                            this.layoutStruct(d);
                        }
                    }
                };
                Compiler.prototype.layoutClass = function (d) {
                    var map = new index_2.SMap();
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
                        throw new ProgramError_3.ProgramError(d.file, d.line, "Duplicate class ID for " + d.className + ": previous=" + this.knownIds.get(idAsString).className);
                    this.knownIds.put(idAsString, d);
                };
                Compiler.prototype.layoutStruct = function (d) {
                    this.layoutDefn(d, new index_2.SMap(), 0, 0);
                };
                Compiler.prototype.layoutDefn = function (d, map, size, align) {
                    for (var _i = 0, _a = d.props; _i < _a.length; _i++) {
                        var p = _a[_i];
                        var k = p.typeRef.kind;
                        if (p.isArray)
                            k = DefnKind_6.DefnKind.Class;
                        switch (k) {
                            case DefnKind_6.DefnKind.Primitive:
                                {
                                    var pt = p.typeRef;
                                    size = (size + pt.size - 1) & ~(pt.size - 1);
                                    align = Math.max(align, pt.align);
                                    map.put(p.name, new index_2.MapEntry(p.name, true, size, pt));
                                    size += pt.size;
                                    break;
                                }
                            case DefnKind_6.DefnKind.Class:
                                {
                                    // Could also be array, don't look at the contents
                                    size = (size + (Defn_4.Defn.pointerAlign - 1)) & ~(Defn_4.Defn.pointerAlign - 1);
                                    align = Math.max(align, Defn_4.Defn.pointerAlign);
                                    map.put(p.name, new index_2.MapEntry(p.name, true, size, this.knownTypes.get(Defn_4.Defn.pointerTypeName)));
                                    size += Defn_4.Defn.pointerSize;
                                    break;
                                }
                            case DefnKind_6.DefnKind.Struct:
                                {
                                    var st = p.typeRef;
                                    if (st.map == null)
                                        this.layoutStruct(st);
                                    size = (size + st.align - 1) & ~(st.align - 1);
                                    align = Math.max(align, st.align);
                                    map.put(p.name, new index_2.MapEntry(p.name, false, size, st));
                                    var root = p.name;
                                    var mIter = st.map.values();
                                    for (var fld = mIter.next(); fld; fld = mIter.next()) {
                                        var fldname = root + "." + fld.name;
                                        map.put(fldname, new index_2.MapEntry(fldname, fld.expand, size + fld.offset, fld.type));
                                    }
                                    size += st.size;
                                    break;
                                }
                        }
                    }
                    // Struct size must be rounded up to alignment so that n*SIZE makes a valid array:
                    // each array element must be suitably aligned.
                    if (d.kind == DefnKind_6.DefnKind.Struct)
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
                            throw new InternalError_2.InternalError("Bad character in class name: " + c);
                        n = (((n & 0x1FFFFFF) << 3) | (n >>> 25)) ^ v;
                    }
                    return n;
                };
                Compiler.prototype.createVirtuals = function () {
                    for (var _i = 0, _a = this.userTypes; _i < _a.length; _i++) {
                        var t = _a[_i];
                        if (t.kind == DefnKind_6.DefnKind.Class)
                            this.createVirtualsFor(t);
                    }
                };
                Compiler.prototype.createVirtualsFor = function (cls) {
                    var vtable = [];
                    var virts = new VirtualMethodIterator_1.VirtualMethodIterator(cls);
                    for (var _a = virts.next(), mname = _a[0], sign = _a[1], isInherited = _a[2]; mname != ""; (_b = virts.next(), mname = _b[0], sign = _b[1], isInherited = _b[2], _b)) {
                        var reverseCases = new index_2.SMap();
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
                    throw new InternalError_2.InternalError("Method not found: " + name);
                };
                Compiler.prototype.findType = function (name) {
                    if (!this.knownTypes.test(name))
                        throw new InternalError_2.InternalError("Unknown type in sizeofType: " + name);
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
                                body[k] = this.myExec(t.file, t.line, CONST_2.self_setter_re, function (file, line, s, p, m) {
                                    if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                                        return [s, p + m.length];
                                    return _this.replaceSetterShorthand(file, line, s, p, m, t);
                                }, body[k]);
                                body[k] = body[k].replace(CONST_2.self_accessor_re, function (m, path, operation, p, s) {
                                    if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                                        return m;
                                    return t.name + path + "." + operation + "(SELF, ";
                                });
                                body[k] = body[k].replace(CONST_2.self_invoke_re, function (m, id, p, s) {
                                    if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                                        return m;
                                    var pp = new ParamParser_2.ParamParser(t.file, t.line, s, p + m.length);
                                    var args = pp.allArgs();
                                    return t.name + "." + id + "(SELF" + (args.length > 0 ? ", " : " ");
                                });
                                body[k] = body[k].replace(CONST_2.self_getter1_re, function (m, path, operation, p, s) {
                                    if (p > 0 && _this.isSubsequent(s.charAt(p - 1)))
                                        return m;
                                    return t.name + path + "." + operation + "(SELF)";
                                });
                                body[k] = body[k].replace(CONST_2.self_getter2_re, function (m, path, p, s) {
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
                        nlines.push(new SourceLine_2.SourceLine(file, line, text));
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
                            if (d.kind == DefnKind_6.DefnKind.Class)
                                push("function " + d.name + "(p) { this._pointer = (p|0); }");
                            else
                                push("function " + d.name + "() {}");
                            if (d.kind == DefnKind_6.DefnKind.Class) {
                                var cls = d;
                                if (cls.baseName)
                                    push(d.name + ".prototype = new " + cls.baseName + ";");
                                else
                                    push("Object.defineProperty(" + d.name + ".prototype, 'pointer', { get: function () { return this._pointer } });");
                            }
                            push(d.name + ".NAME = \"" + d.name + "\";");
                            push(d.name + ".SIZE = " + d.size + ";");
                            push(d.name + ".ALIGN = " + d.align + ";");
                            if (d.kind == DefnKind_6.DefnKind.Class) {
                                var cls = d;
                                push(d.name + ".CLSID = " + cls.classId + ";");
                                push("Object.defineProperty(" + d.name + ", 'BASE', {get: function () { return " + (cls.baseName ? cls.baseName : "null") + "; }});");
                            }
                            // Now do methods.
                            //
                            // Implementation methods are emitted directly in the defining type, with a name suffix _impl.
                            // For struct methods, the name is "_get_impl", "_set_impl", or "_copy_impl".
                            var haveSetter = false;
                            var haveGetter = false;
                            for (var _c = 0, _d = d.methods; _c < _d.length; _c++) {
                                var m = _d[_c];
                                var name_2 = m.name;
                                if (name_2 == "") {
                                    switch (m.kind) {
                                        case MethodKind_4.MethodKind.Get:
                                            if (haveGetter)
                                                throw new ProgramError_3.ProgramError(d.file, m.line, "Duplicate struct getter");
                                            name_2 = "_get_impl";
                                            haveGetter = true;
                                            break;
                                        case MethodKind_4.MethodKind.Set:
                                            if (haveSetter)
                                                throw new ProgramError_3.ProgramError(d.file, m.line, "Duplicate struct setter");
                                            name_2 = "_set_impl";
                                            haveSetter = true;
                                            break;
                                    }
                                }
                                else if (m.kind == MethodKind_4.MethodKind.NonVirtual) {
                                }
                                else
                                    name_2 += "_impl";
                                emitFn = d.file + "[method " + name_2 + "]";
                                emitLine = m.line;
                                var body = m.body;
                                // Formatting: useful to strip all trailing blank lines from
                                // the body first.
                                var last = body.length - 1;
                                while (last > 0 && /^\s*$/.test(body[last]))
                                    last--;
                                if (last == 0)
                                    push(d.name + "." + name_2 + " = function " + body[0]);
                                else {
                                    push(d.name + "." + name_2 + " = function " + body[0]);
                                    for (var x = 1; x < last; x++)
                                        push(body[x]);
                                    push(body[last]);
                                }
                            }
                            // Now default methods, if appropriate.
                            if (d.kind == DefnKind_6.DefnKind.Struct) {
                                var struct = d;
                                if (!haveGetter) {
                                    push(d.name + "._get_impl = function (SELF) {");
                                    push("  var v = new " + d.name + ";");
                                    // Use longhand for access, since self accessors are expanded before pasteup.
                                    // TODO: Would be useful to fix that.
                                    for (var _e = 0, _f = d.props; _e < _f.length; _e++) {
                                        var p = _f[_e];
                                        push("  v." + p.name + " = " + d.name + "." + p.name + "(SELF);");
                                    }
                                    push("  return v;");
                                    push("}");
                                    struct.hasGetMethod = true;
                                }
                                if (!haveSetter) {
                                    push(d.name + "._set_impl = function (SELF, v) {");
                                    // TODO: as above.
                                    for (var _g = 0, _h = d.props; _g < _h.length; _g++) {
                                        var p = _h[_g];
                                        push("  " + d.name + "." + p.name + ".set(SELF, v." + p.name + ");");
                                    }
                                    push("}");
                                    struct.hasSetMethod = true;
                                }
                            }
                            // Now do vtable, if appropriate.
                            if (d.kind == DefnKind_6.DefnKind.Class) {
                                var cls = d;
                                for (var _j = 0, _k = cls.vtable; _j < _k.length; _j++) {
                                    var virtual = _k[_j];
                                    // Shouldn't matter much
                                    emitFn = d.file + "[vtable " + virtual.name + "]";
                                    emitLine = d.line;
                                    var signature = virtual.signature();
                                    push(d.name + "." + virtual.name + " = function (SELF " + signature + ") {");
                                    push("  switch (turbo.Runtime._mem_int32[SELF>>2]) {");
                                    var kv = virtual.reverseCases.keysValues();
                                    for (var _l = kv.next(), name_3 = _l[0], cases = _l[1]; name_3; (_m = kv.next(), name_3 = _m[0], cases = _m[1], _m)) {
                                        for (var _o = 0, cases_1 = cases; _o < cases_1.length; _o++) {
                                            var c = cases_1[_o];
                                            push("    case " + c + ":");
                                        }
                                        push("      return " + name_3 + "(SELF " + signature + ");");
                                    }
                                    push("    default:");
                                    push("      " + (virtual.default_ ?
                                        "return " + virtual.default_ + "(SELF " + signature + ")" :
                                        "throw turbo.Runtime._badType(SELF)") + ";");
                                    push("  }");
                                    push("}");
                                }
                            }
                            // Now do other methods: initInstance.
                            if (d.kind == DefnKind_6.DefnKind.Class) {
                                var cls = d;
                                push(d.name + ".initInstance = function(SELF) { turbo.Runtime._mem_int32[SELF>>2]=" + cls.classId + "; return SELF; }");
                            }
                            if (d.kind == DefnKind_6.DefnKind.Class)
                                push("turbo.Runtime._idToType[" + d.classId + "] = " + d.name + ";");
                        }
                        while (k < lines.length)
                            nlines.push(lines[k++]);
                        source.lines = nlines;
                    }
                    var _m;
                };
                Compiler.prototype.expandGlobalAccessorsAndMacros = function (sourceProvider) {
                    for (var _i = 0, _a = sourceProvider.allSources; _i < _a.length; _i++) {
                        var source = _a[_i];
                        var lines = source.lines;
                        var nlines = [];
                        for (var _b = 0, lines_1 = lines; _b < lines_1.length; _b++) {
                            var l = lines_1[_b];
                            nlines.push(new SourceLine_2.SourceLine(l.file, l.line, this.expandMacrosIn(l.file, l.line, l.text)));
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
                        if (!(ty.kind == DefnKind_6.DefnKind.Primitive || ty.kind == DefnKind_6.DefnKind.Struct))
                            throw new ProgramError_3.ProgramError(file, line, "Operation '" + operation + "' without a path requires a value type: " + s);
                        offset = 0;
                        targetType = ty;
                    }
                    else {
                        if (!(ty.kind == DefnKind_6.DefnKind.Class || ty.kind == DefnKind_6.DefnKind.Struct)) {
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
                    var pp = new ParamParser_2.ParamParser(file, line, s, p + m.length);
                    var as = (pp).allArgs();
                    if (CONST_2.OpAttr[operation].arity != as.length) {
                        this.warning(file, line, ("Bad accessor arity " + propName + " / " + as.length + ": ") + s);
                        return nomatch;
                    }
                    ;
                    // Issue #16: Watch it: Parens interact with semicolon insertion.
                    var ref = "(" + this.expandMacrosIn(file, line, index_2.endstrip(as[0])) + " + " + offset + ")";
                    if (operation == "ref") {
                        return [left + ref + s.substring(pp.where),
                            left.length + ref.length];
                    }
                    return this.loadFromRef(file, line, ref, targetType, s, left, operation, pp, as[1], as[2], nomatch);
                };
                Compiler.prototype.loadFromRef = function (file, line, ref, type, s, left, operation, pp, rhs, rhs2, nomatch) {
                    var mem = "", size = 0, synchronic = false, atomic = false, simd = false, shift = -1, simdType = "";
                    if (type.kind == DefnKind_6.DefnKind.Primitive) {
                        var prim = type;
                        mem = prim.memory;
                        synchronic = prim.primKind == PrimKind_6.PrimKind.Synchronic;
                        atomic = prim.primKind == PrimKind_6.PrimKind.Atomic;
                        simd = prim.primKind == PrimKind_6.PrimKind.SIMD;
                        if (synchronic)
                            shift = this.log2(prim.baseSize);
                        else if (simd)
                            shift = this.log2(prim.baseSize);
                        else
                            shift = this.log2(prim.size);
                        if (simd)
                            simdType = prim.name;
                    }
                    else if (type.kind == DefnKind_6.DefnKind.Class) {
                        mem = Defn_4.Defn.pointerMemName;
                        shift = this.log2(Defn_4.Defn.pointerSize);
                    }
                    if (shift >= 0) {
                        var expr = "";
                        var op = "";
                        switch (CONST_2.OpAttr[operation].arity) {
                            case 1:
                                break;
                            case 2:
                                rhs = this.expandMacrosIn(file, line, index_2.endstrip(rhs));
                                break;
                            case 3:
                                rhs = this.expandMacrosIn(file, line, index_2.endstrip(rhs));
                                rhs2 = this.expandMacrosIn(file, line, index_2.endstrip(rhs2));
                                break;
                            default:
                                throw new InternalError_2.InternalError("No operator: " + operation + " " + s);
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
                                expr = "turbo.Runtime." + CONST_2.OpAttr[operation].synchronic + "(" + ref + ")";
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
                                    expr = "Atomics." + CONST_2.OpAttr[operation].atomic + "(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                                else if (synchronic)
                                    expr = "turbo.Runtime." + CONST_2.OpAttr[operation].synchronic + "(" + ref + ", turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                                else if (simd)
                                    expr = "SIMD." + simdType + ".store(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ")";
                                else
                                    expr = "turbo.Runtime." + mem + "[" + ref + " >> " + shift + "] " + CONST_2.OpAttr[operation].vanilla + " " + rhs;
                                break;
                            case "compareExchange":
                            case "expectUpdate":
                                if (atomic)
                                    expr = "Atomics." + CONST_2.OpAttr[operation].atomic + "(turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ", " + rhs2 + ")";
                                else
                                    expr = "turbo.Runtime." + CONST_2.OpAttr[operation].synchronic + "(" + ref + ", turbo.Runtime." + mem + ", " + fieldIndex + ", " + rhs + ", " + rhs2 + ")";
                                break;
                            default:
                                throw new InternalError_2.InternalError("No operator: " + operation + " line: " + s);
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
                                    expr = t.name + "._set_impl(" + ref + ", " + this.expandMacrosIn(file, line, index_2.endstrip(rhs)) + ")";
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
                        throw new ProgramError_3.ProgramError(file, line, "Use 'at' and 'setAt' on Arrays");
                    if (operation == "at")
                        operation = "get";
                    if (operation == "setAt")
                        operation = "set";
                    var type = this.findType(typeName);
                    if (!type)
                        return nomatch;
                    var pp = new ParamParser_2.ParamParser(file, line, s, p + m.length);
                    var as = (pp).allArgs();
                    if (as.length != CONST_2.OpAttr[operation].arity + 1) {
                        this.warning(file, line, "Wrong arity for accessor " + operation + " / " + as.length);
                        return nomatch;
                    }
                    var multiplier = type.elementSize;
                    if (type.kind == DefnKind_6.DefnKind.Primitive) {
                        if (field)
                            return nomatch;
                    }
                    else if (type.kind == DefnKind_6.DefnKind.Class) {
                        if (field)
                            return nomatch;
                    }
                    var ref = "(" + this.expandMacrosIn(file, line, index_2.endstrip(as[0])) + "+" + multiplier + "*" + this.expandMacrosIn(file, line, index_2.endstrip(as[1])) + ")";
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
                        throw new InternalError_2.InternalError("Qualifiers on array @new not yet implemented");
                    var t = this.knownTypes.get(baseType);
                    if (!t)
                        throw new ProgramError_3.ProgramError(file, line, "Unknown type argument to @new: " + baseType);
                    if (!isArray) {
                        var expr_1 = "turbo.Runtime.allocOrThrow(" + t.size + "," + t.align + ")";
                        if (t.kind == DefnKind_6.DefnKind.Class) {
                            // NOTE, parens removed here
                            // Issue #16: Watch it: Parens interact with semicolon insertion.
                            expr_1 = baseType + ".initInstance(" + expr_1 + ")";
                        }
                        return [left + expr_1 + s.substring(p + m.length),
                            left.length + expr_1.length];
                    }
                    var pp = new ParamParser_2.ParamParser(file, line, s, p + m.length);
                    var as = pp.allArgs();
                    if (as.length != 1)
                        throw new ProgramError_3.ProgramError(file, line, "Wrong number of arguments to @new " + baseType + ".Array");
                    // NOTE, parens removed here
                    // Issue #16: Watch it: Parens interact with semicolon insertion.
                    var expr = "turbo.Runtime.allocOrThrow(" + t.elementSize + " * " + this.expandMacrosIn(file, line, index_2.endstrip(as[0])) + ", " + t.elementAlign + ")";
                    return [left + expr + s.substring(pp.where),
                        left.length + expr.length];
                };
                Compiler.prototype.expandMacrosIn = function (file, line, text) {
                    return this.myExec(file, line, CONST_2.new_re, this.newMacro.bind(this), this.myExec(file, line, CONST_2.arr_re, this.arrMacro.bind(this), this.myExec(file, line, CONST_2.acc_re, this.accMacro.bind(this), text)));
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
                    var pp = new ParamParser_2.ParamParser(file, line, s, p + m.length, false, true);
                    var rhs = pp.nextArg();
                    if (!rhs)
                        throw new ProgramError_3.ProgramError(file, line, "Missing right-hand-side expression in assignment");
                    // Be sure to re-expand the RHS.
                    var substitution_left = left + " " + t.name + path + "." + CONST_2.AssignmentOps[operation] + "(SELF, ";
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
                        throw new InternalError_2.InternalError("log2: " + x);
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
            exports_29("Compiler", Compiler);
        }
    }
});
