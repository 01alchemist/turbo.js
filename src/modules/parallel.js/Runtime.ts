/**
 * Created by Nidin Vinayakan on 6/13/2016.
 */
export class Runtime {

    STATIC_BASE = 0; STATICTOP = 0; staticSealed = false; // static area
    STACK_BASE = 0; STACKTOP = 0; STACK_MAX = 0; // stack area
    DYNAMIC_BASE = 0; DYNAMICTOP = 0; // dynamic area handled by sbrk

    __THREW__ = 0; // Used in checking for thrown exceptions.

    ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
    EXITSTATUS = 0;

    undef = 0;
    // tempInt is used for 32-bit signed values or smaller. tempBigInt is used
    // for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
    tempValue;tempInt;tempBigInt;tempInt2;tempBigInt2;tempPair;tempBigIntI;tempBigIntR;tempBigIntS;tempBigIntP;tempBigIntD;tempDouble;tempFloat;
    tempI64;tempI64b;
    tempRet0;tempRet1;tempRet2;tempRet3;tempRet4;tempRet5;tempRet6;tempRet7;tempRet8;tempRet9;

    STACK_ALIGN = 16;
    GLOBAL_BASE = 8;
    QUANTUM_SIZE = 4;
    __dummy__;
    funcWrappers = {};
    functionPointers = [];

    constructor() {
    }

    setTempRet0(value) {
        this.tempRet0 = value;
    }

    getTempRet0() {
        return this.tempRet0;
    }

    stackSave() {
        return this.STACKTOP;
    }

    stackRestore(stackTop) {
        this.STACKTOP = stackTop;
    }

    getNativeTypeSize(type) {
        switch (type) {
            case 'i1':
            case 'i8':
                return 1;
            case 'i16':
                return 2;
            case 'i32':
                return 4;
            case 'i64':
                return 8;
            case 'float':
                return 4;
            case 'double':
                return 8;
            default:
            {
                if (type[type.length - 1] === '*') {
                    return Runtime.QUANTUM_SIZE; // A pointer
                } else if (type[0] === 'i') {
                    var bits = parseInt(type.substr(1));
                    assert(bits % 8 === 0);
                    return bits / 8;
                } else {
                    return 0;
                }
            }
        }
    }

    getNativeFieldSize(type) {
        return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
    }

    prepVararg(ptr, type) {
        if (type === 'double' || type === 'i64') {
            // move so the load is aligned
            if (ptr & 7) {
                assert((ptr & 7) === 4);
                ptr += 4;
            }
        } else {
            assert((ptr & 3) === 0);
        }
        return ptr;
    }

    getAlignSize(type, size, vararg) {
        // we align i64s and doubles on 64-bit boundaries, unlike x86
        if (!vararg && (type == 'i64' || type == 'double')) return 8;
        if (!type) return Math.min(size, 8); // align structures internally to 64 bits
        return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
    }

    dynCall(sig, ptr, args) {
        if (args && args.length) {
            assert(args.length == sig.length - 1);
            if (!args.splice) args = Array.prototype.slice.call(args);
            args.splice(0, 0, ptr);
            assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
            return Module['dynCall_' + sig].apply(null, args);
        } else {
            assert(sig.length == 1);
            assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
            return Module['dynCall_' + sig].call(null, ptr);
        }
    }

    addFunction(func) {
        for (var i = 0; i < Runtime.functionPointers.length; i++) {
            if (!Runtime.functionPointers[i]) {
                Runtime.functionPointers[i] = func;
                return 2 * (1 + i);
            }
        }
        throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
    }

    removeFunction(index) {
        Runtime.functionPointers[(index - 2) / 2] = null;
    }

    warnOnce(text) {
        if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
        if (!Runtime.warnOnce.shown[text]) {
            Runtime.warnOnce.shown[text] = 1;
            Module.printErr(text);
        }
    }

    getFuncWrapper(func, sig) {
        assert(sig);
        if (!Runtime.funcWrappers[sig]) {
            Runtime.funcWrappers[sig] = {};
        }
        var sigCache = Runtime.funcWrappers[sig];
        if (!sigCache[func]) {
            sigCache[func] = function dynCall_wrapper() {
                return Runtime.dynCall(sig, func, arguments);
            };
        }
        return sigCache[func];
    }

    stackAlloc(size) {
        var ret = STACKTOP;
        STACKTOP = (STACKTOP + size) | 0;
        STACKTOP = (((STACKTOP) + 15) & -16);
        (assert((((STACKTOP | 0) < (STACK_MAX | 0)) | 0)) | 0);
        return ret;
    }

    staticAlloc(size) {
        var ret = STATICTOP;
        STATICTOP = (STATICTOP + (assert(!staticSealed), size)) | 0;
        STATICTOP = (((STATICTOP) + 15) & -16);
        return ret;
    }

    dynamicAlloc(size) {
        var ret = DYNAMICTOP;
        DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0), size)) | 0;
        DYNAMICTOP = (((DYNAMICTOP) + 15) & -16);
        if (DYNAMICTOP >= TOTAL_MEMORY) {
            var success = enlargeMemory();
            if (!success) {
                DYNAMICTOP = ret;
                return 0;
            }
        }
        return ret;
    }

    static alignMemory(size, quantum) {
        var ret = size = Math.ceil((size) / (quantum ? quantum : 16)) * (quantum ? quantum : 16);
        return ret;
    }

    static makeBigInt(low, high, unsigned) {
        var ret = (unsigned ? ((+((low >>> 0))) + ((+((high >>> 0))) * 4294967296.0)) : ((+((low >>> 0))) + ((+((high | 0))) * 4294967296.0)));
        return ret;
    }
}