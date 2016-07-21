/// <reference path="../../../../typings/globals/node/index.d.ts" />
declare module "errors/CapturedError" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class CapturedError {
        name: string;
        message: string;
        constructor(name: string, message: string);
    }
}
declare module "errors/UsageError" {
    import { CapturedError } from "errors/CapturedError";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class UsageError extends CapturedError {
        constructor(msg: string);
    }
}
declare module "source/SourceLine" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class SourceLine {
        file: string;
        line: number;
        text: string;
        constructor(file: string, line: number, text: string);
    }
}
declare module "kind/DefnKind" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export enum DefnKind {
        Class = 0,
        Struct = 1,
        Primitive = 2,
    }
}
declare module "define/Defn" {
    import { DefnKind } from "kind/DefnKind";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class Defn {
        name: string;
        kind: DefnKind;
        size: number;
        align: number;
        constructor(name: string, kind: DefnKind);
        elementSize: number;
        elementAlign: number;
        static pointerSize: number;
        static pointerAlign: number;
        static pointerTypeName: string;
        static pointerMemName: string;
    }
}
declare module "kind/PrimKind" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export enum PrimKind {
        Vanilla = 0,
        Atomic = 1,
        Synchronic = 2,
        SIMD = 3,
    }
}
declare module "define/PrimitiveDefn" {
    import { PrimKind } from "kind/PrimKind";
    import { Defn } from "define/Defn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class PrimitiveDefn extends Defn {
        primKind: PrimKind;
        private _memory;
        constructor(name: string, size: number, align: number, primKind?: PrimKind);
        memory: string;
    }
}
declare module "errors/InternalError" {
    import { CapturedError } from "errors/CapturedError";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class InternalError extends CapturedError {
        constructor(msg: string);
    }
}
declare module "utils/index" {
    import { Defn } from "define/Defn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class MapEntry {
        name: string;
        expand: boolean;
        offset: number;
        type: Defn;
        constructor(name: string, expand: boolean, offset: number, type: Defn);
        memory: string;
        size: number;
        toString(): string;
    }
    export class SMap<T> {
        private props;
        private mapping;
        private generation;
        test(n: string): boolean;
        get(n: string): T;
        put(n: string, v: T): void;
        copy(): SMap<T>;
        values(): {
            next: () => T;
        };
        keysValues(): {
            next: () => [string, T];
        };
    }
    export class SSet {
        private mapping;
        test(n: string): boolean;
        put(n: string): void;
    }
    export function endstrip(x: string): string;
}
declare module "kind/MethodKind" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export enum MethodKind {
        Virtual = 0,
        NonVirtual = 1,
        Get = 2,
        Set = 3,
    }
}
declare module "entities/Method" {
    import { MethodKind } from "kind/MethodKind";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class Method {
        line: number;
        kind: MethodKind;
        name: string;
        signature: string[];
        body: string[];
        constructor(line: number, kind: MethodKind, name: string, signature: string[], body: string[]);
    }
}
declare module "entities/PropQual" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export enum PropQual {
        None = 0,
        Atomic = 1,
        Synchronic = 2,
    }
}
declare module "entities/Prop" {
    import { Defn } from "define/Defn";
    import { PropQual } from "entities/PropQual";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class Prop {
        line: number;
        name: string;
        qual: PropQual;
        isArray: boolean;
        typeName: string;
        typeRef: Defn;
        constructor(line: number, name: string, qual: PropQual, isArray: boolean, typeName: string);
    }
}
declare module "define/StructDefn" {
    import { UserDefn } from "define/UserDefn";
    import { Method } from "entities/Method";
    import { Prop } from "entities/Prop";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class StructDefn extends UserDefn {
        hasGetMethod: boolean;
        hasSetMethod: boolean;
        constructor(file: string, line: number, name: string, props: Prop[], methods: Method[], origin: number);
    }
}
declare module "define/UserDefn" {
    import { MapEntry, SMap } from "utils/index";
    import { Method } from "entities/Method";
    import { Prop } from "entities/Prop";
    import { DefnKind } from "kind/DefnKind";
    import { StructDefn } from "define/StructDefn";
    import { Defn } from "define/Defn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class UserDefn extends Defn {
        file: string;
        line: number;
        props: Prop[];
        methods: Method[];
        origin: number;
        typeRef: StructDefn;
        map: SMap<MapEntry>;
        live: boolean;
        checked: boolean;
        constructor(file: string, line: number, name: string, kind: DefnKind, props: Prop[], methods: Method[], origin: number);
        findAccessibleFieldFor(operation: string, prop: string): MapEntry;
    }
}
declare module "source/Source" {
    import { SourceLine } from "source/SourceLine";
    import { UserDefn } from "define/UserDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class Source {
        input_file: string;
        output_file: string;
        defs: UserDefn[];
        lines: SourceLine[];
        constructor(input_file: string, output_file: string, defs: UserDefn[], lines: SourceLine[]);
        allText(): string;
    }
}
declare module "errors/ProgramError" {
    import { CapturedError } from "errors/CapturedError";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class ProgramError extends CapturedError {
        constructor(file: string, line: number, msg: string);
    }
}
declare module "entities/Virtual" {
    import { SMap } from "utils/index";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class Virtual {
        name: string;
        private sign;
        reverseCases: SMap<number[]>;
        default_: string;
        constructor(name: string, sign: string[], reverseCases: SMap<number[]>, default_: string);
        signature(): string;
    }
}
declare module "define/ClassDefn" {
    import { UserDefn } from "define/UserDefn";
    import { Prop } from "entities/Prop";
    import { Method } from "entities/Method";
    import { Virtual } from "entities/Virtual";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class ClassDefn extends UserDefn {
        baseName: string;
        baseTypeRef: ClassDefn;
        className: string;
        classId: number;
        subclasses: ClassDefn[];
        vtable: Virtual[];
        constructor(file: string, line: number, name: string, baseName: string, props: Prop[], methods: Method[], origin: number);
        elementSize: number;
        elementAlign: number;
        hasMethod(name: string): boolean;
        getMethod(name: string): Method;
    }
}
declare module "CONST" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export const Ws: string;
    export const Os: string;
    export const Id: string;
    export const Lbrace: string;
    export const Rbrace: string;
    export const LParen: string;
    export const CommentOpt: string;
    export const QualifierOpt: string;
    export const OpNames: string;
    export const Operation: string;
    export const OperationOpt: string;
    export const OperationLParen: string;
    export const NullaryOperation: string;
    export const Path: string;
    export const PathLazy: string;
    export const PathOpt: string;
    export const PathOptLazy: string;
    export const AssignOp: string;
    export const start_re: RegExp;
    export const end_re: RegExp;
    export const struct_re: RegExp;
    export const class_re: RegExp;
    export const special_re: RegExp;
    export const method_re: RegExp;
    export const blank_re: RegExp;
    export const space_re: RegExp;
    export const prop_re: RegExp;
    export const new_re: RegExp;
    export const acc_re: RegExp;
    export const arr_re: RegExp;
    export const self_getter1_re: RegExp;
    export const self_getter2_re: RegExp;
    export const self_accessor_re: RegExp;
    export const self_setter_re: RegExp;
    export const self_invoke_re: RegExp;
    export const AssignmentOps: {
        "=": string;
        "+=": string;
        "-=": string;
        "&=": string;
        "|=": string;
        "^=": string;
    };
    export const OpAttr: {
        "get": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "ref": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "notify": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "set": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "add": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "sub": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "and": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "or": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "xor": {
            arity: number;
            atomic: string;
            synchronic: string;
            vanilla: string;
        };
        "loadWhenEqual": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "loadWhenNotEqual": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "expectUpdate": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
        "compareExchange": {
            arity: number;
            atomic: string;
            synchronic: string;
        };
    };
}
declare module "parser/ParamParser" {
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class ParamParser {
        private file;
        private line;
        private input;
        private pos;
        private requireRightParen;
        private stopAtSemi;
        private lim;
        private done;
        sawSemi: boolean;
        constructor(file: string, line: number, input: string, pos: number, requireRightParen?: boolean, stopAtSemi?: boolean);
        nextArg(): string;
        allArgs(): string[];
        where: number;
        cleanupArg(s: string): string;
    }
}
declare module "services/DefinitionService" {
    import { UserDefn } from "define/UserDefn";
    import { SourceLine } from "source/SourceLine";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class DefinitionService {
        collectDefinitions(filename: string, lines: string[]): [UserDefn[], SourceLine[]];
        private parameterToArgument(file, line, s);
    }
}
declare module "source/SourceProvider" {
    import { Source } from "source/Source";
    import { DefinitionService } from "services/DefinitionService";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class SourceProvider {
        allSources: Source[];
        definitionService: DefinitionService;
        constructor(args: string[]);
    }
}
declare module "define/AtomicDefn" {
    import { PrimitiveDefn } from "define/PrimitiveDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class AtomicDefn extends PrimitiveDefn {
        constructor(name: string, size: number, align: number);
    }
}
declare module "define/SynchronicDefn" {
    import { PrimitiveDefn } from "define/PrimitiveDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class SynchronicDefn extends PrimitiveDefn {
        baseSize: number;
        constructor(name: string, size: number, align: number, baseSize: number);
        static bias: number;
    }
}
declare module "define/SIMDDefn" {
    import { PrimitiveDefn } from "define/PrimitiveDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class SIMDDefn extends PrimitiveDefn {
        baseSize: number;
        constructor(name: string, size: number, align: number, baseSize: number);
    }
}
declare module "iterators/VirtualMethodIterator" {
    import { ClassDefn } from "define/ClassDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class VirtualMethodIterator {
        private cls;
        private i;
        private inherited;
        private filter;
        constructor(cls: ClassDefn);
        next(): [string, string[], boolean];
    }
}
declare module "iterators/InclusiveSubclassIterator" {
    import { ClassDefn } from "define/ClassDefn";
    /**
     * Created by Nidin Vinayakan on 4/7/2016.
     */
    export class InclusiveSubclassIterator {
        private stack;
        constructor(cls: ClassDefn);
        next(): ClassDefn;
    }
}
declare module "Compiler" {
    import { SourceProvider } from "source/SourceProvider";
    import { ClassDefn } from "define/ClassDefn";
    import { SMap, MapEntry } from "utils/index";
    import { Defn } from "define/Defn";
    import { UserDefn } from "define/UserDefn";
    import { SourceLine } from "source/SourceLine";
    import { ParamParser } from "parser/ParamParser";
    /**
     * Created by Nidin Vinayakan on 6/18/2016.
     */
    export class Compiler {
        static VERSION: string;
        private knownTypes;
        private knownIds;
        private userTypes;
        constructor(args?: string[]);
        compile(args: string[]): void;
        buildTypeMap(sourceProvider: SourceProvider): void;
        resolveTypeRefs(): void;
        checkRecursion(): void;
        checkMethods(): void;
        layoutTypes(): void;
        layoutClass(d: ClassDefn): void;
        layoutStruct(d: UserDefn): void;
        layoutDefn(d: UserDefn, map: SMap<MapEntry>, size: number, align: number): void;
        computeClassId(name: string): number;
        createVirtuals(): void;
        createVirtualsFor(cls: ClassDefn): void;
        findMethodImplFor(cls: ClassDefn, stopAt: ClassDefn, name: string): string;
        findType(name: string): Defn;
        expandSelfAccessors(): void;
        linePusher(info: () => [string, number], nlines: SourceLine[]): (text: string) => void;
        pasteupTypes(sourceProvider: SourceProvider): void;
        expandGlobalAccessorsAndMacros(sourceProvider: SourceProvider): void;
        accMacro(file: string, line: number, s: string, p: number, ms: RegExpExecArray): [string, number];
        loadFromRef(file: string, line: number, ref: string, type: Defn, s: string, left: string, operation: string, pp: ParamParser, rhs: string, rhs2: string, nomatch: [string, number]): [string, number];
        arrMacro(file: string, line: number, s: string, p: number, ms: RegExpExecArray): [string, number];
        newMacro(file: string, line: number, s: string, p: number, ms: RegExpExecArray): [string, number];
        expandMacrosIn(file: string, line: number, text: string): string;
        myExec(file: string, line: number, re: RegExp, macro: (fn: string, l: number, s: string, p: number, m: RegExpExecArray) => [string, number], text: string): string;
        replaceSetterShorthand(file: string, line: number, s: string, p: number, ms: RegExpExecArray, t: UserDefn): [string, number];
        isInitial(c: string): boolean;
        isSubsequent(c: string): boolean;
        log2(x: number): number;
        warning(file: string, line: number, msg: string): void;
    }
}
