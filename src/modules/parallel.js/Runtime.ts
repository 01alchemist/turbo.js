/**
 * Created by Nidin Vinayakan on 6/13/2016.
 */
export class Runtime {

    static _mem_int8 = null;
    static _mem_uint8 = null;
    static _mem_int16 = null;
    static _mem_uint16 = null;
    static _mem_int32 = null;
    static _mem_uint32 = null;
    static _mem_float32 = null;
    static _mem_float64 = null;

    static init(buffer, start, limit, initialize) {
        if (arguments.length < 3)
            throw new Error("Required arguments: buffer, start, limit");
        if (buffer instanceof ArrayBuffer)
            Runtime._init_ab(this, buffer, start, limit, initialize);
        else if (buffer instanceof SharedArrayBuffer)
            Runtime._init_sab(this, buffer, start, limit, initialize);
        else
            throw new Error("FlatJS can be initialized only on SharedArrayBuffer or ArrayBuffer");
    }

    static get memory():Memory{
        return null;
    }
}