import {SharedArrayBuffer} from "./IMemory";
import {abort, assert} from "./utils/helpers";
import {Runtime} from "./Runtime";
import {Allocation} from "./Allocation";
/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
let Math_abs = Math.abs;
let Math_cos = Math.cos;
let Math_sin = Math.sin;
let Math_tan = Math.tan;
let Math_acos = Math.acos;
let Math_asin = Math.asin;
let Math_atan = Math.atan;
let Math_atan2 = Math.atan2;
let Math_exp = Math.exp;
let Math_log = Math.log;
let Math_sqrt = Math.sqrt;
let Math_ceil = Math.ceil;
let Math_floor = Math.floor;
let Math_pow = Math.pow;
let Math_imul = Math["imul"];
let Math_fround = Math["fround"];
let Math_min = Math.min;
let Math_clz32 = Math["clz32"];
var tempI64;
var tempDouble;

export class MemoryBase {

    protected PAGE_SIZE = 4096;
    protected HEAP8:Int8Array;
    protected HEAP16:Int16Array;
    protected HEAP32:Int32Array;
    protected HEAPU8:Uint8Array;
    protected HEAPU16:Uint16Array;
    protected HEAPU32:Uint32Array;
    protected HEAPF32:Float32Array;
    protected HEAPF64:Float64Array;

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

    setValue(ptr, value, type, noSafe?) {
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
                (tempI64 = [
                    value >>> 0,
                    (
                        tempDouble = value,
                            (+(Math_abs(tempDouble))) >= 1.0 ?
                                (tempDouble > 0.0 ?
                                    ((Math_min((+(Math_floor((tempDouble) / 4294967296.0))), 4294967295.0)) | 0) >>> 0 :
                                (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296.0))))) >>> 0) :
                                0)
                ],
                    this.HEAP32[((ptr) >> 2)] = tempI64[0],
                    this.HEAP32[(((ptr) + (4)) >> 2)] = tempI64[1]);
                break;
            case 'float':
                this.HEAPF32[((ptr) >> 2)] = value;
                break;
            case 'double':
                this.HEAPF64[((ptr) >> 3)] = value;
                break;
            default:
                abort('invalid type for setValue: ' + type);
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
        if (allocator == Allocation.ALLOC_NONE) {
            ret = ptr;
        } else {
            ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc]
                    [allocator === undefined ? Allocation.ALLOC_STATIC : allocator]
                        (Math.max(size, singleType ? 1 : types.length));
        }

        if (zeroinit) {
            var ptr = ret, stop;
            assert((ret & 3) == 0);
            stop = ret + (size & ~3);
            for (; ptr < stop; ptr += 4) {
                this.HEAP32[((ptr) >> 2)] = 0;
            }
            stop = ret + size;
            while (ptr < stop) {
                this.HEAP8[((ptr++) >> 0)] = 0;
            }
            return ret;
        }

        if (singleType === 'i8') {
            if (slab.subarray || slab.slice) {
                this.HEAPU8.set(slab, ret);
            } else {
                this.HEAPU8.set(new Uint8Array(slab), ret);
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

            this.setValue(ret + i, curr, type);

            // no need to look up size unless type changes, so cache it
            if (previousType !== type) {
                typeSize = Runtime.getNativeTypeSize(type);
                previousType = type;
            }
            i += typeSize;
        }

        return ret;
    }
}