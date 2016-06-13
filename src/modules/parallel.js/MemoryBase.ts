import {SharedArrayBuffer} from "./IMemory";
/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
export class MemoryBase {

    protected Math_abs = Math.abs;
    protected Math_cos = Math.cos;
    protected Math_sin = Math.sin;
    protected Math_tan = Math.tan;
    protected Math_acos = Math.acos;
    protected Math_asin = Math.asin;
    protected Math_atan = Math.atan;
    protected Math_atan2 = Math.atan2;
    protected Math_exp = Math.exp;
    protected Math_log = Math.log;
    protected Math_sqrt = Math.sqrt;
    protected Math_ceil = Math.ceil;
    protected Math_floor = Math.floor;
    protected Math_pow = Math.pow;
    protected Math_imul = Math["imul"];
    protected Math_fround = Math["fround"];
    protected Math_min = Math.min;
    protected Math_clz32 = Math["clz32"];

    protected PAGE_SIZE = 4096;
    protected tempI64;
    protected tempDouble;
    protected HEAP8:Int8Array;
    protected HEAP16:Int16Array;
    protected HEAP32:Int32Array;
    protected HEAPU8:Uint8Array;
    protected HEAPU16:Uint16Array;
    protected HEAPU32:Uint32Array;
    protected HEAPF32:Float32Array;
    protected HEAPF64:Float64Array;

    protected abortDecorators = [];

    constructor(protected buffer:ArrayBuffer|SharedArrayBuffer, private TOTAL_STACK = 5242880, private TOTAL_MEMORY = 16777216) {

        this.HEAP8 = new Int8Array(this.buffer);
        this.HEAP16 = new Int16Array(this.buffer);
        this.HEAP32 = new Int32Array(this.buffer);
        this.HEAPU8 = new Uint8Array(this.buffer);
        this.HEAPU16 = new Uint16Array(this.buffer);
        this.HEAPU32 = new Uint32Array(this.buffer);
        this.HEAPF32 = new Float32Array(this.buffer);
        this.HEAPF64 = new Float64Array(this.buffer);

        var totalMemory = 64 * 1024;
        while (totalMemory < this.TOTAL_MEMORY || totalMemory < 2 * this.TOTAL_STACK) {
            if (totalMemory < 16 * 1024 * 1024) {
                totalMemory *= 2;
            } else {
                totalMemory += 16 * 1024 * 1024
            }
        }
        if (totalMemory !== this.TOTAL_MEMORY) {
            console.error('increasing TOTAL_MEMORY to ' + totalMemory + ' to be compliant with the asm.js spec (and given that TOTAL_STACK=' + TOTAL_STACK + ')');
            this.TOTAL_MEMORY = totalMemory;
        }
    }


    static alignMemoryPage(x) {
        if (x % 4096 > 0) {
            x += (4096 - (x % 4096));
        }
        return x;
    }

    setValue(ptr, value, type, noSafe) {
        type = type || 'i8';
        if (type.charAt(type.length - 1) === '*') type = 'i32'; // pointers are 32-bit
        switch (type) {
            case 'i1':
                this.HEAP8[((ptr) >> 0)] = value;
                break;
            case 'i8':
                this.HEAP8[((ptr) >> 0)] = value;
                break;
            case 'i16':
                this.HEAP16[((ptr) >> 1)] = value;
                break;
            case 'i32':
                this.HEAP32[((ptr) >> 2)] = value;
                break;
            case 'i64':
                (this.tempI64 = [value >>> 0, (this.tempDouble = value, (+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble) / 4294967296.0))), 4294967295.0)) | 0) >>> 0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296.0))))) >>> 0) : 0)], HEAP32[((ptr) >> 2)] = tempI64[0], HEAP32[(((ptr) + (4)) >> 2)] = tempI64[1]);
                break;
            case 'float':
                this.HEAPF32[((ptr) >> 2)] = value;
                break;
            case 'double':
                this.HEAPF64[((ptr) >> 3)] = value;
                break;
            default:
                this.abort('invalid type for setValue: ' + type);
        }
    }

    allocate(slab, types, allocator, ptr) {
        var zeroinit, size;
        if (typeof slab === 'number') {
            zeroinit = true;
            size = slab;
        } else {
            zeroinit = false;
            size = slab.length;
        }

        var singleType = typeof types === 'string' ? types : null;

        var ret;
        if (allocator == ALLOC_NONE) {
            ret = ptr;
        } else {
            ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
        }

        if (zeroinit) {
            var ptr = ret, stop;
            assert((ret & 3) == 0);
            stop = ret + (size & ~3);
            for (; ptr < stop; ptr += 4) {
                HEAP32[((ptr) >> 2)] = 0;
            }
            stop = ret + size;
            while (ptr < stop) {
                HEAP8[((ptr++) >> 0)] = 0;
            }
            return ret;
        }

        if (singleType === 'i8') {
            if (slab.subarray || slab.slice) {
                HEAPU8.set(slab, ret);
            } else {
                HEAPU8.set(new Uint8Array(slab), ret);
            }
            return ret;
        }

        var i = 0, type, typeSize, previousType;
        while (i < size) {
            var curr = slab[i];

            if (typeof curr === 'function') {
                curr = Runtime.getFunctionIndex(curr);
            }

            type = singleType || types[i];
            if (type === 0) {
                i++;
                continue;
            }
            assert(type, 'Must know what type to store in allocate!');

            if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

            setValue(ret + i, curr, type);

            // no need to look up size unless type changes, so cache it
            if (previousType !== type) {
                typeSize = Runtime.getNativeTypeSize(type);
                previousType = type;
            }
            i += typeSize;
        }

        return ret;
    }

    abort(what) {
        if (what !== undefined) {
            console.error(what);
            what = JSON.stringify(what)
        } else {
            what = '';
        }

        ABORT = true;
        EXITSTATUS = 1;

        var extra = '';

        var output = 'abort(' + what + ') at ' + stackTrace() + extra;
        if (abortDecorators) {
            abortDecorators.forEach(function (decorator) {
                output = decorator(output, what);
            });
        }
        throw output;
    }
}