/**
 * Created by Nidin Vinayakan on 6/13/2016.
 */
declare var Atomics: any;
declare var SharedArrayBuffer: any;
declare namespace turbo {
    class RuntimeConstructor {
        NULL: number;
        int8: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        uint8: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        int16: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        uint16: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        int32: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        uint32: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        float32: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        float64: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        int32x4: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        float32x4: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        float64x2: {
            SIZE: number;
            ALIGN: number;
            NAME: string;
        };
        _mem_int8: any;
        _mem_uint8: any;
        _mem_int16: any;
        _mem_uint16: any;
        _mem_int32: any;
        _mem_uint32: any;
        _mem_float32: any;
        _mem_float64: any;
        _now: any;
        _idToType: any;
        init(buffer: any, start: any, limit: any, initialize: any): void;
        alloc(nbytes: any, alignment: any): number;
        allocOrThrow(nbytes: any, alignment: any): number;
        free(p: any): void;
        identify(p: any): any;
        _badType(self: any): Error;
        _synchronicStore(self: any, mem: any, idx: any, value: any): any;
        _synchronicCompareExchange(self: any, mem: any, idx: any, oldval: any, newval: any): any;
        _synchronicAdd(self: any, mem: any, idx: any, value: any): any;
        _synchronicSub(self: any, mem: any, idx: any, value: any): any;
        _synchronicAnd(self: any, mem: any, idx: any, value: any): any;
        _synchronicOr(self: any, mem: any, idx: any, value: any): any;
        _synchronicXor(self: any, mem: any, idx: any, value: any): any;
        _synchronicLoadWhenNotEqual(self: any, mem: any, idx: any, value: any): any;
        _synchronicLoadWhenEqual(self: any, mem: any, idx: any, value: any): any;
        _synchronicExpectUpdate(self: any, mem: any, idx: any, value: any, timeout: any): void;
        _waitForUpdate(self: any, tag: any, timeout: any): void;
        _notify(self: any): void;
    }
    var Runtime: RuntimeConstructor;
}
