import {abort, assert} from "./utils/helpers";
/**
 * Created by Nidin Vinayakan on 6/15/2016.
 */
var asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };

function nullFunc_ii(x) { Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_vi(x) { Module["printErr"]("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function invoke_ii(index,a1) {
    try {
        return Module["dynCall_ii"](index,a1);
    } catch(e) {
        if (typeof e !== 'number' && e !== 'longjmp') throw e;
        asm["setThrew"](1, 0);
    }
}

function invoke_iiii(index,a1,a2,a3) {
    try {
        return Module["dynCall_iiii"](index,a1,a2,a3);
    } catch(e) {
        if (typeof e !== 'number' && e !== 'longjmp') throw e;
        asm["setThrew"](1, 0);
    }
}

function invoke_vi(index,a1) {
    try {
        Module["dynCall_vi"](index,a1);
    } catch(e) {
        if (typeof e !== 'number' && e !== 'longjmp') throw e;
        asm["setThrew"](1, 0);
    }
}
var asmLibraryArg = { "abort": abort, "assert": assert, "nullFunc_ii": nullFunc_ii, "nullFunc_iiii": nullFunc_iiii, "nullFunc_vi": nullFunc_vi, "invoke_ii": invoke_ii, "invoke_iiii": invoke_iiii, "invoke_vi": invoke_vi, "_pthread_cleanup_pop": _pthread_cleanup_pop, "_pthread_self": _pthread_self, "_sysconf": _sysconf, "___lock": ___lock, "___syscall6": ___syscall6, "___setErrNo": ___setErrNo, "_abort": _abort, "_sbrk": _sbrk, "_time": _time, "_pthread_cleanup_push": _pthread_cleanup_push, "_emscripten_memcpy_big": _emscripten_memcpy_big, "___syscall54": ___syscall54, "___unlock": ___unlock, "___syscall140": ___syscall140, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___syscall146": ___syscall146, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT };
// EMSCRIPTEN_START_ASM
export var new_asm = (function(global, env, buffer) {
    'almost asm';


    var HEAP8 = new global.Int8Array(buffer);
    var HEAP16 = new global.Int16Array(buffer);
    var HEAP32 = new global.Int32Array(buffer);
    var HEAPU8 = new global.Uint8Array(buffer);
    var HEAPU16 = new global.Uint16Array(buffer);
    var HEAPU32 = new global.Uint32Array(buffer);
    var HEAPF32 = new global.Float32Array(buffer);
    var HEAPF64 = new global.Float64Array(buffer);


    var STACKTOP=env.STACKTOP|0;
    var STACK_MAX=env.STACK_MAX|0;
    var tempDoublePtr=env.tempDoublePtr|0;
    var ABORT=env.ABORT|0;

    var __THREW__ = 0;
    var threwValue = 0;
    var setjmpId = 0;
    var undef = 0;
    var nan = global.NaN, inf = global.Infinity;
    var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;

    var tempRet0 = 0;
    var tempRet1 = 0;
    var tempRet2 = 0;
    var tempRet3 = 0;
    var tempRet4 = 0;
    var tempRet5 = 0;
    var tempRet6 = 0;
    var tempRet7 = 0;
    var tempRet8 = 0;
    var tempRet9 = 0;
    var Math_floor=global.Math.floor;
    var Math_abs=global.Math.abs;
    var Math_sqrt=global.Math.sqrt;
    var Math_pow=global.Math.pow;
    var Math_cos=global.Math.cos;
    var Math_sin=global.Math.sin;
    var Math_tan=global.Math.tan;
    var Math_acos=global.Math.acos;
    var Math_asin=global.Math.asin;
    var Math_atan=global.Math.atan;
    var Math_atan2=global.Math.atan2;
    var Math_exp=global.Math.exp;
    var Math_log=global.Math.log;
    var Math_ceil=global.Math.ceil;
    var Math_imul=global.Math.imul;
    var Math_min=global.Math.min;
    var Math_clz32=global.Math.clz32;
    var abort=env.abort;
    var assert=env.assert;
    var nullFunc_ii=env.nullFunc_ii;
    var nullFunc_iiii=env.nullFunc_iiii;
    var nullFunc_vi=env.nullFunc_vi;
    var invoke_ii=env.invoke_ii;
    var invoke_iiii=env.invoke_iiii;
    var invoke_vi=env.invoke_vi;
    var _pthread_cleanup_pop=env._pthread_cleanup_pop;
    var _pthread_self=env._pthread_self;
    var _sysconf=env._sysconf;
    var ___lock=env.___lock;
    var ___syscall6=env.___syscall6;
    var ___setErrNo=env.___setErrNo;
    var _abort=env._abort;
    var _sbrk=env._sbrk;
    var _time=env._time;
    var _pthread_cleanup_push=env._pthread_cleanup_push;
    var _emscripten_memcpy_big=env._emscripten_memcpy_big;
    var ___syscall54=env.___syscall54;
    var ___unlock=env.___unlock;
    var ___syscall140=env.___syscall140;
    var _emscripten_set_main_loop_timing=env._emscripten_set_main_loop_timing;
    var _emscripten_set_main_loop=env._emscripten_set_main_loop;
    var ___syscall146=env.___syscall146;
    var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
    function stackAlloc(size) {
        size = size|0;
        var ret = 0;
        ret = STACKTOP;
        STACKTOP = (STACKTOP + size)|0;
        STACKTOP = (STACKTOP + 15)&-16;
        if ((STACKTOP|0) >= (STACK_MAX|0)) abort();

        return ret|0;
    }
    function stackSave() {
        return STACKTOP|0;
    }
    function stackRestore(top) {
        top = top|0;
        STACKTOP = top;
    }
    function establishStackSpace(stackBase, stackMax) {
        stackBase = stackBase|0;
        stackMax = stackMax|0;
        STACKTOP = stackBase;
        STACK_MAX = stackMax;
    }

    function setThrew(threw, value) {
        threw = threw|0;
        value = value|0;
        if ((__THREW__|0) == 0) {
            __THREW__ = threw;
            threwValue = value;
        }
    }
    function copyTempFloat(ptr) {
        ptr = ptr|0;
        HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
        HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
        HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
        HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
    }
    function copyTempDouble(ptr) {
        ptr = ptr|0;
        HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
        HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
        HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
        HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
        HEAP8[tempDoublePtr+4>>0] = HEAP8[ptr+4>>0];
        HEAP8[tempDoublePtr+5>>0] = HEAP8[ptr+5>>0];
        HEAP8[tempDoublePtr+6>>0] = HEAP8[ptr+6>>0];
        HEAP8[tempDoublePtr+7>>0] = HEAP8[ptr+7>>0];
    }

    function setTempRet0(value) {
        value = value|0;
        tempRet0 = value;
    }
    function getTempRet0() {
        return tempRet0|0;
    }

    function ___errno_location() {
        var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = HEAP32[8>>2]|0;
        $1 = ($0|0)==(0|0);
        if ($1) {
            $$0 = 56;
        } else {
            $2 = (_pthread_self()|0);
            $3 = ((($2)) + 60|0);
            $4 = HEAP32[$3>>2]|0;
            $$0 = $4;
        }
        return ($$0|0);
    }
    function ___syscall_ret($r) {
        $r = $r|0;
        var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ($r>>>0)>(4294963200);
        if ($0) {
            $1 = (0 - ($r))|0;
            $2 = (___errno_location()|0);
            HEAP32[$2>>2] = $1;
            $$0 = -1;
        } else {
            $$0 = $r;
        }
        return ($$0|0);
    }
    function _fflush($f) {
        $f = $f|0;
        var $$0 = 0, $$01 = 0, $$012 = 0, $$014 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
        var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $phitmp = 0, $r$0$lcssa = 0, $r$03 = 0, $r$1 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ($f|0)==(0|0);
        do {
            if ($0) {
                $7 = HEAP32[52>>2]|0;
                $8 = ($7|0)==(0|0);
                if ($8) {
                    $27 = 0;
                } else {
                    $9 = HEAP32[52>>2]|0;
                    $10 = (_fflush($9)|0);
                    $27 = $10;
                }
                ___lock(((36)|0));
                $$012 = HEAP32[(32)>>2]|0;
                $11 = ($$012|0)==(0|0);
                if ($11) {
                    $r$0$lcssa = $27;
                } else {
                    $$014 = $$012;$r$03 = $27;
                    while(1) {
                        $12 = ((($$014)) + 76|0);
                        $13 = HEAP32[$12>>2]|0;
                        $14 = ($13|0)>(-1);
                        if ($14) {
                            $15 = (___lockfile($$014)|0);
                            $23 = $15;
                        } else {
                            $23 = 0;
                        }
                        $16 = ((($$014)) + 20|0);
                        $17 = HEAP32[$16>>2]|0;
                        $18 = ((($$014)) + 28|0);
                        $19 = HEAP32[$18>>2]|0;
                        $20 = ($17>>>0)>($19>>>0);
                        if ($20) {
                            $21 = (___fflush_unlocked($$014)|0);
                            $22 = $21 | $r$03;
                            $r$1 = $22;
                        } else {
                            $r$1 = $r$03;
                        }
                        $24 = ($23|0)==(0);
                        if (!($24)) {
                            ___unlockfile($$014);
                        }
                        $25 = ((($$014)) + 56|0);
                        $$01 = HEAP32[$25>>2]|0;
                        $26 = ($$01|0)==(0|0);
                        if ($26) {
                            $r$0$lcssa = $r$1;
                            break;
                        } else {
                            $$014 = $$01;$r$03 = $r$1;
                        }
                    }
                }
                ___unlock(((36)|0));
                $$0 = $r$0$lcssa;
            } else {
                $1 = ((($f)) + 76|0);
                $2 = HEAP32[$1>>2]|0;
                $3 = ($2|0)>(-1);
                if (!($3)) {
                    $4 = (___fflush_unlocked($f)|0);
                    $$0 = $4;
                    break;
                }
                $5 = (___lockfile($f)|0);
                $phitmp = ($5|0)==(0);
                $6 = (___fflush_unlocked($f)|0);
                if ($phitmp) {
                    $$0 = $6;
                } else {
                    ___unlockfile($f);
                    $$0 = $6;
                }
            }
        } while(0);
        return ($$0|0);
    }
    function ___lockfile($f) {
        $f = $f|0;
        var label = 0, sp = 0;
        sp = STACKTOP;
        return 0;
    }
    function ___unlockfile($f) {
        $f = $f|0;
        var label = 0, sp = 0;
        sp = STACKTOP;
        return;
    }
    function ___stdio_close($f) {
        $f = $f|0;
        var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $vararg_buffer = 0, label = 0, sp = 0;
        sp = STACKTOP;
        STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
        $vararg_buffer = sp;
        $0 = ((($f)) + 60|0);
        $1 = HEAP32[$0>>2]|0;
        HEAP32[$vararg_buffer>>2] = $1;
        $2 = (___syscall6(6,($vararg_buffer|0))|0);
        $3 = (___syscall_ret($2)|0);
        STACKTOP = sp;return ($3|0);
    }
    function ___stdio_seek($f,$off,$whence) {
        $f = $f|0;
        $off = $off|0;
        $whence = $whence|0;
        var $$pre = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $ret = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr4 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
        $vararg_buffer = sp;
        $ret = sp + 20|0;
        $0 = ((($f)) + 60|0);
        $1 = HEAP32[$0>>2]|0;
        HEAP32[$vararg_buffer>>2] = $1;
        $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
        HEAP32[$vararg_ptr1>>2] = 0;
        $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
        HEAP32[$vararg_ptr2>>2] = $off;
        $vararg_ptr3 = ((($vararg_buffer)) + 12|0);
        HEAP32[$vararg_ptr3>>2] = $ret;
        $vararg_ptr4 = ((($vararg_buffer)) + 16|0);
        HEAP32[$vararg_ptr4>>2] = $whence;
        $2 = (___syscall140(140,($vararg_buffer|0))|0);
        $3 = (___syscall_ret($2)|0);
        $4 = ($3|0)<(0);
        if ($4) {
            HEAP32[$ret>>2] = -1;
            $5 = -1;
        } else {
            $$pre = HEAP32[$ret>>2]|0;
            $5 = $$pre;
        }
        STACKTOP = sp;return ($5|0);
    }
    function ___stdio_write($f,$buf,$len) {
        $f = $f|0;
        $buf = $buf|0;
        $len = $len|0;
        var $$0 = 0, $$phi$trans$insert = 0, $$pre = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0;
        var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
        var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $cnt$0 = 0, $cnt$1 = 0, $iov$0 = 0, $iov$0$lcssa11 = 0, $iov$1 = 0, $iovcnt$0 = 0;
        var $iovcnt$0$lcssa12 = 0, $iovcnt$1 = 0, $iovs = 0, $rem$0 = 0, $vararg_buffer = 0, $vararg_buffer3 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr6 = 0, $vararg_ptr7 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
        $vararg_buffer3 = sp + 16|0;
        $vararg_buffer = sp;
        $iovs = sp + 32|0;
        $0 = ((($f)) + 28|0);
        $1 = HEAP32[$0>>2]|0;
        HEAP32[$iovs>>2] = $1;
        $2 = ((($iovs)) + 4|0);
        $3 = ((($f)) + 20|0);
        $4 = HEAP32[$3>>2]|0;
        $5 = $4;
        $6 = (($5) - ($1))|0;
        HEAP32[$2>>2] = $6;
        $7 = ((($iovs)) + 8|0);
        HEAP32[$7>>2] = $buf;
        $8 = ((($iovs)) + 12|0);
        HEAP32[$8>>2] = $len;
        $9 = (($6) + ($len))|0;
        $10 = ((($f)) + 60|0);
        $11 = ((($f)) + 44|0);
        $iov$0 = $iovs;$iovcnt$0 = 2;$rem$0 = $9;
        while(1) {
            $12 = HEAP32[8>>2]|0;
            $13 = ($12|0)==(0|0);
            if ($13) {
                $17 = HEAP32[$10>>2]|0;
                HEAP32[$vararg_buffer3>>2] = $17;
                $vararg_ptr6 = ((($vararg_buffer3)) + 4|0);
                HEAP32[$vararg_ptr6>>2] = $iov$0;
                $vararg_ptr7 = ((($vararg_buffer3)) + 8|0);
                HEAP32[$vararg_ptr7>>2] = $iovcnt$0;
                $18 = (___syscall146(146,($vararg_buffer3|0))|0);
                $19 = (___syscall_ret($18)|0);
                $cnt$0 = $19;
            } else {
                _pthread_cleanup_push((4|0),($f|0));
                $14 = HEAP32[$10>>2]|0;
                HEAP32[$vararg_buffer>>2] = $14;
                $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
                HEAP32[$vararg_ptr1>>2] = $iov$0;
                $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
                HEAP32[$vararg_ptr2>>2] = $iovcnt$0;
                $15 = (___syscall146(146,($vararg_buffer|0))|0);
                $16 = (___syscall_ret($15)|0);
                _pthread_cleanup_pop(0);
                $cnt$0 = $16;
            }
            $20 = ($rem$0|0)==($cnt$0|0);
            if ($20) {
                label = 6;
                break;
            }
            $27 = ($cnt$0|0)<(0);
            if ($27) {
                $iov$0$lcssa11 = $iov$0;$iovcnt$0$lcssa12 = $iovcnt$0;
                label = 8;
                break;
            }
            $35 = (($rem$0) - ($cnt$0))|0;
            $36 = ((($iov$0)) + 4|0);
            $37 = HEAP32[$36>>2]|0;
            $38 = ($cnt$0>>>0)>($37>>>0);
            if ($38) {
                $39 = HEAP32[$11>>2]|0;
                HEAP32[$0>>2] = $39;
                HEAP32[$3>>2] = $39;
                $40 = (($cnt$0) - ($37))|0;
                $41 = ((($iov$0)) + 8|0);
                $42 = (($iovcnt$0) + -1)|0;
                $$phi$trans$insert = ((($iov$0)) + 12|0);
                $$pre = HEAP32[$$phi$trans$insert>>2]|0;
                $50 = $$pre;$cnt$1 = $40;$iov$1 = $41;$iovcnt$1 = $42;
            } else {
                $43 = ($iovcnt$0|0)==(2);
                if ($43) {
                    $44 = HEAP32[$0>>2]|0;
                    $45 = (($44) + ($cnt$0)|0);
                    HEAP32[$0>>2] = $45;
                    $50 = $37;$cnt$1 = $cnt$0;$iov$1 = $iov$0;$iovcnt$1 = 2;
                } else {
                    $50 = $37;$cnt$1 = $cnt$0;$iov$1 = $iov$0;$iovcnt$1 = $iovcnt$0;
                }
            }
            $46 = HEAP32[$iov$1>>2]|0;
            $47 = (($46) + ($cnt$1)|0);
            HEAP32[$iov$1>>2] = $47;
            $48 = ((($iov$1)) + 4|0);
            $49 = (($50) - ($cnt$1))|0;
            HEAP32[$48>>2] = $49;
            $iov$0 = $iov$1;$iovcnt$0 = $iovcnt$1;$rem$0 = $35;
        }
        if ((label|0) == 6) {
            $21 = HEAP32[$11>>2]|0;
            $22 = ((($f)) + 48|0);
            $23 = HEAP32[$22>>2]|0;
            $24 = (($21) + ($23)|0);
            $25 = ((($f)) + 16|0);
            HEAP32[$25>>2] = $24;
            $26 = $21;
            HEAP32[$0>>2] = $26;
            HEAP32[$3>>2] = $26;
            $$0 = $len;
        }
        else if ((label|0) == 8) {
            $28 = ((($f)) + 16|0);
            HEAP32[$28>>2] = 0;
            HEAP32[$0>>2] = 0;
            HEAP32[$3>>2] = 0;
            $29 = HEAP32[$f>>2]|0;
            $30 = $29 | 32;
            HEAP32[$f>>2] = $30;
            $31 = ($iovcnt$0$lcssa12|0)==(2);
            if ($31) {
                $$0 = 0;
            } else {
                $32 = ((($iov$0$lcssa11)) + 4|0);
                $33 = HEAP32[$32>>2]|0;
                $34 = (($len) - ($33))|0;
                $$0 = $34;
            }
        }
        STACKTOP = sp;return ($$0|0);
    }
    function ___stdout_write($f,$buf,$len) {
        $f = $f|0;
        $buf = $buf|0;
        $len = $len|0;
        var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $tio = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
        $vararg_buffer = sp;
        $tio = sp + 12|0;
        $0 = ((($f)) + 36|0);
        HEAP32[$0>>2] = 5;
        $1 = HEAP32[$f>>2]|0;
        $2 = $1 & 64;
        $3 = ($2|0)==(0);
        if ($3) {
            $4 = ((($f)) + 60|0);
            $5 = HEAP32[$4>>2]|0;
            HEAP32[$vararg_buffer>>2] = $5;
            $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
            HEAP32[$vararg_ptr1>>2] = 21505;
            $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
            HEAP32[$vararg_ptr2>>2] = $tio;
            $6 = (___syscall54(54,($vararg_buffer|0))|0);
            $7 = ($6|0)==(0);
            if (!($7)) {
                $8 = ((($f)) + 75|0);
                HEAP8[$8>>0] = -1;
            }
        }
        $9 = (___stdio_write($f,$buf,$len)|0);
        STACKTOP = sp;return ($9|0);
    }
    function ___fflush_unlocked($f) {
        $f = $f|0;
        var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
        var $9 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ((($f)) + 20|0);
        $1 = HEAP32[$0>>2]|0;
        $2 = ((($f)) + 28|0);
        $3 = HEAP32[$2>>2]|0;
        $4 = ($1>>>0)>($3>>>0);
        if ($4) {
            $5 = ((($f)) + 36|0);
            $6 = HEAP32[$5>>2]|0;
            (FUNCTION_TABLE_iiii[$6 & 7]($f,0,0)|0);
            $7 = HEAP32[$0>>2]|0;
            $8 = ($7|0)==(0|0);
            if ($8) {
                $$0 = -1;
            } else {
                label = 3;
            }
        } else {
            label = 3;
        }
        if ((label|0) == 3) {
            $9 = ((($f)) + 4|0);
            $10 = HEAP32[$9>>2]|0;
            $11 = ((($f)) + 8|0);
            $12 = HEAP32[$11>>2]|0;
            $13 = ($10>>>0)<($12>>>0);
            if ($13) {
                $14 = ((($f)) + 40|0);
                $15 = HEAP32[$14>>2]|0;
                $16 = $10;
                $17 = $12;
                $18 = (($16) - ($17))|0;
                (FUNCTION_TABLE_iiii[$15 & 7]($f,$18,1)|0);
            }
            $19 = ((($f)) + 16|0);
            HEAP32[$19>>2] = 0;
            HEAP32[$2>>2] = 0;
            HEAP32[$0>>2] = 0;
            HEAP32[$11>>2] = 0;
            HEAP32[$9>>2] = 0;
            $$0 = 0;
        }
        return ($$0|0);
    }
    function _cleanup526($p) {
        $p = $p|0;
        var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ((($p)) + 68|0);
        $1 = HEAP32[$0>>2]|0;
        $2 = ($1|0)==(0);
        if ($2) {
            ___unlockfile($p);
        }
        return;
    }
    function _malloc($bytes) {
        $bytes = $bytes|0;
        var $$3$i = 0, $$lcssa = 0, $$lcssa211 = 0, $$lcssa215 = 0, $$lcssa216 = 0, $$lcssa217 = 0, $$lcssa219 = 0, $$lcssa222 = 0, $$lcssa224 = 0, $$lcssa226 = 0, $$lcssa228 = 0, $$lcssa230 = 0, $$lcssa232 = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i22$i = 0, $$pre$i25 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i23$iZ2D = 0;
        var $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre105 = 0, $$pre106 = 0, $$pre14$i$i = 0, $$pre43$i = 0, $$pre56$i$i = 0, $$pre57$i$i = 0, $$pre8$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0, $$sum$i13$i = 0, $$sum$i14$i = 0, $$sum$i17$i = 0, $$sum$i19$i = 0;
        var $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i15$i = 0, $$sum1$i20$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum11$i = 0, $$sum11$i$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0;
        var $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum121$i = 0, $$sum122$i = 0, $$sum123$i = 0, $$sum124$i = 0, $$sum125$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0;
        var $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i16$i = 0, $$sum2$i18$i = 0, $$sum2$i21$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0, $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i27 = 0;
        var $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0, $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0;
        var $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0;
        var $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0;
        var $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0;
        var $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0;
        var $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0;
        var $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0;
        var $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0;
        var $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0;
        var $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0;
        var $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0;
        var $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0;
        var $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0;
        var $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0;
        var $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0;
        var $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0;
        var $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0;
        var $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0;
        var $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0;
        var $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0;
        var $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0;
        var $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0;
        var $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0;
        var $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0;
        var $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0;
        var $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0;
        var $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0;
        var $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0;
        var $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0;
        var $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0;
        var $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0;
        var $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0;
        var $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0;
        var $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0;
        var $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0;
        var $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0;
        var $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0;
        var $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0;
        var $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0;
        var $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0;
        var $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0;
        var $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0;
        var $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0;
        var $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0;
        var $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0;
        var $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0;
        var $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0;
        var $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0;
        var $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0;
        var $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0;
        var $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0;
        var $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0;
        var $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0;
        var $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0;
        var $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0;
        var $F5$0$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$029$i = 0, $K2$07$i$i = 0, $K8$051$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i$i$lcssa = 0, $R$0$i$lcssa = 0, $R$0$i18 = 0, $R$0$i18$lcssa = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i$i$lcssa = 0, $RP$0$i$lcssa = 0;
        var $RP$0$i17 = 0, $RP$0$i17$lcssa = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i25$i = 0, $T$028$i = 0, $T$028$i$lcssa = 0, $T$050$i$i = 0, $T$050$i$i$lcssa = 0, $T$06$i$i = 0, $T$06$i$i$lcssa = 0, $br$0$ph$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0;
        var $not$$i = 0, $not$$i$i = 0, $not$$i26$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i30 = 0, $or$cond1$i = 0, $or$cond19$i = 0, $or$cond2$i = 0, $or$cond3$i = 0, $or$cond5$i = 0, $or$cond57$i = 0, $or$cond6$i = 0, $or$cond8$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i$lcssa = 0, $rsize$0$i15 = 0, $rsize$1$i = 0;
        var $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$331$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$084$i = 0, $sp$084$i$lcssa = 0, $sp$183$i = 0, $sp$183$i$lcssa = 0, $ssize$0$$i = 0, $ssize$0$i = 0, $ssize$1$ph$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0;
        var $t$2$v$3$i = 0, $t$230$i = 0, $tbase$255$i = 0, $tsize$0$ph$i = 0, $tsize$0323944$i = 0, $tsize$1$i = 0, $tsize$254$i = 0, $v$0$i = 0, $v$0$i$lcssa = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0, $v$3$ph$i = 0, $v$332$i = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ($bytes>>>0)<(245);
        do {
            if ($0) {
                $1 = ($bytes>>>0)<(11);
                $2 = (($bytes) + 11)|0;
                $3 = $2 & -8;
                $4 = $1 ? 16 : $3;
                $5 = $4 >>> 3;
                $6 = HEAP32[172>>2]|0;
                $7 = $6 >>> $5;
                $8 = $7 & 3;
                $9 = ($8|0)==(0);
                if (!($9)) {
                    $10 = $7 & 1;
                    $11 = $10 ^ 1;
                    $12 = (($11) + ($5))|0;
                    $13 = $12 << 1;
                    $14 = (212 + ($13<<2)|0);
                    $$sum10 = (($13) + 2)|0;
                    $15 = (212 + ($$sum10<<2)|0);
                    $16 = HEAP32[$15>>2]|0;
                    $17 = ((($16)) + 8|0);
                    $18 = HEAP32[$17>>2]|0;
                    $19 = ($14|0)==($18|0);
                    do {
                        if ($19) {
                            $20 = 1 << $12;
                            $21 = $20 ^ -1;
                            $22 = $6 & $21;
                            HEAP32[172>>2] = $22;
                        } else {
                            $23 = HEAP32[(188)>>2]|0;
                            $24 = ($18>>>0)<($23>>>0);
                            if ($24) {
                                _abort();
                                // unreachable;
                            }
                            $25 = ((($18)) + 12|0);
                            $26 = HEAP32[$25>>2]|0;
                            $27 = ($26|0)==($16|0);
                            if ($27) {
                                HEAP32[$25>>2] = $14;
                                HEAP32[$15>>2] = $18;
                                break;
                            } else {
                                _abort();
                                // unreachable;
                            }
                        }
                    } while(0);
                    $28 = $12 << 3;
                    $29 = $28 | 3;
                    $30 = ((($16)) + 4|0);
                    HEAP32[$30>>2] = $29;
                    $$sum1112 = $28 | 4;
                    $31 = (($16) + ($$sum1112)|0);
                    $32 = HEAP32[$31>>2]|0;
                    $33 = $32 | 1;
                    HEAP32[$31>>2] = $33;
                    $mem$0 = $17;
                    return ($mem$0|0);
                }
                $34 = HEAP32[(180)>>2]|0;
                $35 = ($4>>>0)>($34>>>0);
                if ($35) {
                    $36 = ($7|0)==(0);
                    if (!($36)) {
                        $37 = $7 << $5;
                        $38 = 2 << $5;
                        $39 = (0 - ($38))|0;
                        $40 = $38 | $39;
                        $41 = $37 & $40;
                        $42 = (0 - ($41))|0;
                        $43 = $41 & $42;
                        $44 = (($43) + -1)|0;
                        $45 = $44 >>> 12;
                        $46 = $45 & 16;
                        $47 = $44 >>> $46;
                        $48 = $47 >>> 5;
                        $49 = $48 & 8;
                        $50 = $49 | $46;
                        $51 = $47 >>> $49;
                        $52 = $51 >>> 2;
                        $53 = $52 & 4;
                        $54 = $50 | $53;
                        $55 = $51 >>> $53;
                        $56 = $55 >>> 1;
                        $57 = $56 & 2;
                        $58 = $54 | $57;
                        $59 = $55 >>> $57;
                        $60 = $59 >>> 1;
                        $61 = $60 & 1;
                        $62 = $58 | $61;
                        $63 = $59 >>> $61;
                        $64 = (($62) + ($63))|0;
                        $65 = $64 << 1;
                        $66 = (212 + ($65<<2)|0);
                        $$sum4 = (($65) + 2)|0;
                        $67 = (212 + ($$sum4<<2)|0);
                        $68 = HEAP32[$67>>2]|0;
                        $69 = ((($68)) + 8|0);
                        $70 = HEAP32[$69>>2]|0;
                        $71 = ($66|0)==($70|0);
                        do {
                            if ($71) {
                                $72 = 1 << $64;
                                $73 = $72 ^ -1;
                                $74 = $6 & $73;
                                HEAP32[172>>2] = $74;
                                $88 = $34;
                            } else {
                                $75 = HEAP32[(188)>>2]|0;
                                $76 = ($70>>>0)<($75>>>0);
                                if ($76) {
                                    _abort();
                                    // unreachable;
                                }
                                $77 = ((($70)) + 12|0);
                                $78 = HEAP32[$77>>2]|0;
                                $79 = ($78|0)==($68|0);
                                if ($79) {
                                    HEAP32[$77>>2] = $66;
                                    HEAP32[$67>>2] = $70;
                                    $$pre = HEAP32[(180)>>2]|0;
                                    $88 = $$pre;
                                    break;
                                } else {
                                    _abort();
                                    // unreachable;
                                }
                            }
                        } while(0);
                        $80 = $64 << 3;
                        $81 = (($80) - ($4))|0;
                        $82 = $4 | 3;
                        $83 = ((($68)) + 4|0);
                        HEAP32[$83>>2] = $82;
                        $84 = (($68) + ($4)|0);
                        $85 = $81 | 1;
                        $$sum56 = $4 | 4;
                        $86 = (($68) + ($$sum56)|0);
                        HEAP32[$86>>2] = $85;
                        $87 = (($68) + ($80)|0);
                        HEAP32[$87>>2] = $81;
                        $89 = ($88|0)==(0);
                        if (!($89)) {
                            $90 = HEAP32[(192)>>2]|0;
                            $91 = $88 >>> 3;
                            $92 = $91 << 1;
                            $93 = (212 + ($92<<2)|0);
                            $94 = HEAP32[172>>2]|0;
                            $95 = 1 << $91;
                            $96 = $94 & $95;
                            $97 = ($96|0)==(0);
                            if ($97) {
                                $98 = $94 | $95;
                                HEAP32[172>>2] = $98;
                                $$pre105 = (($92) + 2)|0;
                                $$pre106 = (212 + ($$pre105<<2)|0);
                                $$pre$phiZ2D = $$pre106;$F4$0 = $93;
                            } else {
                                $$sum9 = (($92) + 2)|0;
                                $99 = (212 + ($$sum9<<2)|0);
                                $100 = HEAP32[$99>>2]|0;
                                $101 = HEAP32[(188)>>2]|0;
                                $102 = ($100>>>0)<($101>>>0);
                                if ($102) {
                                    _abort();
                                    // unreachable;
                                } else {
                                    $$pre$phiZ2D = $99;$F4$0 = $100;
                                }
                            }
                            HEAP32[$$pre$phiZ2D>>2] = $90;
                            $103 = ((($F4$0)) + 12|0);
                            HEAP32[$103>>2] = $90;
                            $104 = ((($90)) + 8|0);
                            HEAP32[$104>>2] = $F4$0;
                            $105 = ((($90)) + 12|0);
                            HEAP32[$105>>2] = $93;
                        }
                        HEAP32[(180)>>2] = $81;
                        HEAP32[(192)>>2] = $84;
                        $mem$0 = $69;
                        return ($mem$0|0);
                    }
                    $106 = HEAP32[(176)>>2]|0;
                    $107 = ($106|0)==(0);
                    if ($107) {
                        $nb$0 = $4;
                    } else {
                        $108 = (0 - ($106))|0;
                        $109 = $106 & $108;
                        $110 = (($109) + -1)|0;
                        $111 = $110 >>> 12;
                        $112 = $111 & 16;
                        $113 = $110 >>> $112;
                        $114 = $113 >>> 5;
                        $115 = $114 & 8;
                        $116 = $115 | $112;
                        $117 = $113 >>> $115;
                        $118 = $117 >>> 2;
                        $119 = $118 & 4;
                        $120 = $116 | $119;
                        $121 = $117 >>> $119;
                        $122 = $121 >>> 1;
                        $123 = $122 & 2;
                        $124 = $120 | $123;
                        $125 = $121 >>> $123;
                        $126 = $125 >>> 1;
                        $127 = $126 & 1;
                        $128 = $124 | $127;
                        $129 = $125 >>> $127;
                        $130 = (($128) + ($129))|0;
                        $131 = (476 + ($130<<2)|0);
                        $132 = HEAP32[$131>>2]|0;
                        $133 = ((($132)) + 4|0);
                        $134 = HEAP32[$133>>2]|0;
                        $135 = $134 & -8;
                        $136 = (($135) - ($4))|0;
                        $rsize$0$i = $136;$t$0$i = $132;$v$0$i = $132;
                        while(1) {
                            $137 = ((($t$0$i)) + 16|0);
                            $138 = HEAP32[$137>>2]|0;
                            $139 = ($138|0)==(0|0);
                            if ($139) {
                                $140 = ((($t$0$i)) + 20|0);
                                $141 = HEAP32[$140>>2]|0;
                                $142 = ($141|0)==(0|0);
                                if ($142) {
                                    $rsize$0$i$lcssa = $rsize$0$i;$v$0$i$lcssa = $v$0$i;
                                    break;
                                } else {
                                    $144 = $141;
                                }
                            } else {
                                $144 = $138;
                            }
                            $143 = ((($144)) + 4|0);
                            $145 = HEAP32[$143>>2]|0;
                            $146 = $145 & -8;
                            $147 = (($146) - ($4))|0;
                            $148 = ($147>>>0)<($rsize$0$i>>>0);
                            $$rsize$0$i = $148 ? $147 : $rsize$0$i;
                            $$v$0$i = $148 ? $144 : $v$0$i;
                            $rsize$0$i = $$rsize$0$i;$t$0$i = $144;$v$0$i = $$v$0$i;
                        }
                        $149 = HEAP32[(188)>>2]|0;
                        $150 = ($v$0$i$lcssa>>>0)<($149>>>0);
                        if ($150) {
                            _abort();
                            // unreachable;
                        }
                        $151 = (($v$0$i$lcssa) + ($4)|0);
                        $152 = ($v$0$i$lcssa>>>0)<($151>>>0);
                        if (!($152)) {
                            _abort();
                            // unreachable;
                        }
                        $153 = ((($v$0$i$lcssa)) + 24|0);
                        $154 = HEAP32[$153>>2]|0;
                        $155 = ((($v$0$i$lcssa)) + 12|0);
                        $156 = HEAP32[$155>>2]|0;
                        $157 = ($156|0)==($v$0$i$lcssa|0);
                        do {
                            if ($157) {
                                $167 = ((($v$0$i$lcssa)) + 20|0);
                                $168 = HEAP32[$167>>2]|0;
                                $169 = ($168|0)==(0|0);
                                if ($169) {
                                    $170 = ((($v$0$i$lcssa)) + 16|0);
                                    $171 = HEAP32[$170>>2]|0;
                                    $172 = ($171|0)==(0|0);
                                    if ($172) {
                                        $R$1$i = 0;
                                        break;
                                    } else {
                                        $R$0$i = $171;$RP$0$i = $170;
                                    }
                                } else {
                                    $R$0$i = $168;$RP$0$i = $167;
                                }
                                while(1) {
                                    $173 = ((($R$0$i)) + 20|0);
                                    $174 = HEAP32[$173>>2]|0;
                                    $175 = ($174|0)==(0|0);
                                    if (!($175)) {
                                        $R$0$i = $174;$RP$0$i = $173;
                                        continue;
                                    }
                                    $176 = ((($R$0$i)) + 16|0);
                                    $177 = HEAP32[$176>>2]|0;
                                    $178 = ($177|0)==(0|0);
                                    if ($178) {
                                        $R$0$i$lcssa = $R$0$i;$RP$0$i$lcssa = $RP$0$i;
                                        break;
                                    } else {
                                        $R$0$i = $177;$RP$0$i = $176;
                                    }
                                }
                                $179 = ($RP$0$i$lcssa>>>0)<($149>>>0);
                                if ($179) {
                                    _abort();
                                    // unreachable;
                                } else {
                                    HEAP32[$RP$0$i$lcssa>>2] = 0;
                                    $R$1$i = $R$0$i$lcssa;
                                    break;
                                }
                            } else {
                                $158 = ((($v$0$i$lcssa)) + 8|0);
                                $159 = HEAP32[$158>>2]|0;
                                $160 = ($159>>>0)<($149>>>0);
                                if ($160) {
                                    _abort();
                                    // unreachable;
                                }
                                $161 = ((($159)) + 12|0);
                                $162 = HEAP32[$161>>2]|0;
                                $163 = ($162|0)==($v$0$i$lcssa|0);
                                if (!($163)) {
                                    _abort();
                                    // unreachable;
                                }
                                $164 = ((($156)) + 8|0);
                                $165 = HEAP32[$164>>2]|0;
                                $166 = ($165|0)==($v$0$i$lcssa|0);
                                if ($166) {
                                    HEAP32[$161>>2] = $156;
                                    HEAP32[$164>>2] = $159;
                                    $R$1$i = $156;
                                    break;
                                } else {
                                    _abort();
                                    // unreachable;
                                }
                            }
                        } while(0);
                        $180 = ($154|0)==(0|0);
                        do {
                            if (!($180)) {
                                $181 = ((($v$0$i$lcssa)) + 28|0);
                                $182 = HEAP32[$181>>2]|0;
                                $183 = (476 + ($182<<2)|0);
                                $184 = HEAP32[$183>>2]|0;
                                $185 = ($v$0$i$lcssa|0)==($184|0);
                                if ($185) {
                                    HEAP32[$183>>2] = $R$1$i;
                                    $cond$i = ($R$1$i|0)==(0|0);
                                    if ($cond$i) {
                                        $186 = 1 << $182;
                                        $187 = $186 ^ -1;
                                        $188 = HEAP32[(176)>>2]|0;
                                        $189 = $188 & $187;
                                        HEAP32[(176)>>2] = $189;
                                        break;
                                    }
                                } else {
                                    $190 = HEAP32[(188)>>2]|0;
                                    $191 = ($154>>>0)<($190>>>0);
                                    if ($191) {
                                        _abort();
                                        // unreachable;
                                    }
                                    $192 = ((($154)) + 16|0);
                                    $193 = HEAP32[$192>>2]|0;
                                    $194 = ($193|0)==($v$0$i$lcssa|0);
                                    if ($194) {
                                        HEAP32[$192>>2] = $R$1$i;
                                    } else {
                                        $195 = ((($154)) + 20|0);
                                        HEAP32[$195>>2] = $R$1$i;
                                    }
                                    $196 = ($R$1$i|0)==(0|0);
                                    if ($196) {
                                        break;
                                    }
                                }
                                $197 = HEAP32[(188)>>2]|0;
                                $198 = ($R$1$i>>>0)<($197>>>0);
                                if ($198) {
                                    _abort();
                                    // unreachable;
                                }
                                $199 = ((($R$1$i)) + 24|0);
                                HEAP32[$199>>2] = $154;
                                $200 = ((($v$0$i$lcssa)) + 16|0);
                                $201 = HEAP32[$200>>2]|0;
                                $202 = ($201|0)==(0|0);
                                do {
                                    if (!($202)) {
                                        $203 = ($201>>>0)<($197>>>0);
                                        if ($203) {
                                            _abort();
                                            // unreachable;
                                        } else {
                                            $204 = ((($R$1$i)) + 16|0);
                                            HEAP32[$204>>2] = $201;
                                            $205 = ((($201)) + 24|0);
                                            HEAP32[$205>>2] = $R$1$i;
                                            break;
                                        }
                                    }
                                } while(0);
                                $206 = ((($v$0$i$lcssa)) + 20|0);
                                $207 = HEAP32[$206>>2]|0;
                                $208 = ($207|0)==(0|0);
                                if (!($208)) {
                                    $209 = HEAP32[(188)>>2]|0;
                                    $210 = ($207>>>0)<($209>>>0);
                                    if ($210) {
                                        _abort();
                                        // unreachable;
                                    } else {
                                        $211 = ((($R$1$i)) + 20|0);
                                        HEAP32[$211>>2] = $207;
                                        $212 = ((($207)) + 24|0);
                                        HEAP32[$212>>2] = $R$1$i;
                                        break;
                                    }
                                }
                            }
                        } while(0);
                        $213 = ($rsize$0$i$lcssa>>>0)<(16);
                        if ($213) {
                            $214 = (($rsize$0$i$lcssa) + ($4))|0;
                            $215 = $214 | 3;
                            $216 = ((($v$0$i$lcssa)) + 4|0);
                            HEAP32[$216>>2] = $215;
                            $$sum4$i = (($214) + 4)|0;
                            $217 = (($v$0$i$lcssa) + ($$sum4$i)|0);
                            $218 = HEAP32[$217>>2]|0;
                            $219 = $218 | 1;
                            HEAP32[$217>>2] = $219;
                        } else {
                            $220 = $4 | 3;
                            $221 = ((($v$0$i$lcssa)) + 4|0);
                            HEAP32[$221>>2] = $220;
                            $222 = $rsize$0$i$lcssa | 1;
                            $$sum$i35 = $4 | 4;
                            $223 = (($v$0$i$lcssa) + ($$sum$i35)|0);
                            HEAP32[$223>>2] = $222;
                            $$sum1$i = (($rsize$0$i$lcssa) + ($4))|0;
                            $224 = (($v$0$i$lcssa) + ($$sum1$i)|0);
                            HEAP32[$224>>2] = $rsize$0$i$lcssa;
                            $225 = HEAP32[(180)>>2]|0;
                            $226 = ($225|0)==(0);
                            if (!($226)) {
                                $227 = HEAP32[(192)>>2]|0;
                                $228 = $225 >>> 3;
                                $229 = $228 << 1;
                                $230 = (212 + ($229<<2)|0);
                                $231 = HEAP32[172>>2]|0;
                                $232 = 1 << $228;
                                $233 = $231 & $232;
                                $234 = ($233|0)==(0);
                                if ($234) {
                                    $235 = $231 | $232;
                                    HEAP32[172>>2] = $235;
                                    $$pre$i = (($229) + 2)|0;
                                    $$pre8$i = (212 + ($$pre$i<<2)|0);
                                    $$pre$phi$iZ2D = $$pre8$i;$F1$0$i = $230;
                                } else {
                                    $$sum3$i = (($229) + 2)|0;
                                    $236 = (212 + ($$sum3$i<<2)|0);
                                    $237 = HEAP32[$236>>2]|0;
                                    $238 = HEAP32[(188)>>2]|0;
                                    $239 = ($237>>>0)<($238>>>0);
                                    if ($239) {
                                        _abort();
                                        // unreachable;
                                    } else {
                                        $$pre$phi$iZ2D = $236;$F1$0$i = $237;
                                    }
                                }
                                HEAP32[$$pre$phi$iZ2D>>2] = $227;
                                $240 = ((($F1$0$i)) + 12|0);
                                HEAP32[$240>>2] = $227;
                                $241 = ((($227)) + 8|0);
                                HEAP32[$241>>2] = $F1$0$i;
                                $242 = ((($227)) + 12|0);
                                HEAP32[$242>>2] = $230;
                            }
                            HEAP32[(180)>>2] = $rsize$0$i$lcssa;
                            HEAP32[(192)>>2] = $151;
                        }
                        $243 = ((($v$0$i$lcssa)) + 8|0);
                        $mem$0 = $243;
                        return ($mem$0|0);
                    }
                } else {
                    $nb$0 = $4;
                }
            } else {
                $244 = ($bytes>>>0)>(4294967231);
                if ($244) {
                    $nb$0 = -1;
                } else {
                    $245 = (($bytes) + 11)|0;
                    $246 = $245 & -8;
                    $247 = HEAP32[(176)>>2]|0;
                    $248 = ($247|0)==(0);
                    if ($248) {
                        $nb$0 = $246;
                    } else {
                        $249 = (0 - ($246))|0;
                        $250 = $245 >>> 8;
                        $251 = ($250|0)==(0);
                        if ($251) {
                            $idx$0$i = 0;
                        } else {
                            $252 = ($246>>>0)>(16777215);
                            if ($252) {
                                $idx$0$i = 31;
                            } else {
                                $253 = (($250) + 1048320)|0;
                                $254 = $253 >>> 16;
                                $255 = $254 & 8;
                                $256 = $250 << $255;
                                $257 = (($256) + 520192)|0;
                                $258 = $257 >>> 16;
                                $259 = $258 & 4;
                                $260 = $259 | $255;
                                $261 = $256 << $259;
                                $262 = (($261) + 245760)|0;
                                $263 = $262 >>> 16;
                                $264 = $263 & 2;
                                $265 = $260 | $264;
                                $266 = (14 - ($265))|0;
                                $267 = $261 << $264;
                                $268 = $267 >>> 15;
                                $269 = (($266) + ($268))|0;
                                $270 = $269 << 1;
                                $271 = (($269) + 7)|0;
                                $272 = $246 >>> $271;
                                $273 = $272 & 1;
                                $274 = $273 | $270;
                                $idx$0$i = $274;
                            }
                        }
                        $275 = (476 + ($idx$0$i<<2)|0);
                        $276 = HEAP32[$275>>2]|0;
                        $277 = ($276|0)==(0|0);
                        L123: do {
                            if ($277) {
                                $rsize$2$i = $249;$t$1$i = 0;$v$2$i = 0;
                                label = 86;
                            } else {
                                $278 = ($idx$0$i|0)==(31);
                                $279 = $idx$0$i >>> 1;
                                $280 = (25 - ($279))|0;
                                $281 = $278 ? 0 : $280;
                                $282 = $246 << $281;
                                $rsize$0$i15 = $249;$rst$0$i = 0;$sizebits$0$i = $282;$t$0$i14 = $276;$v$0$i16 = 0;
                                while(1) {
                                    $283 = ((($t$0$i14)) + 4|0);
                                    $284 = HEAP32[$283>>2]|0;
                                    $285 = $284 & -8;
                                    $286 = (($285) - ($246))|0;
                                    $287 = ($286>>>0)<($rsize$0$i15>>>0);
                                    if ($287) {
                                        $288 = ($285|0)==($246|0);
                                        if ($288) {
                                            $rsize$331$i = $286;$t$230$i = $t$0$i14;$v$332$i = $t$0$i14;
                                            label = 90;
                                            break L123;
                                        } else {
                                            $rsize$1$i = $286;$v$1$i = $t$0$i14;
                                        }
                                    } else {
                                        $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
                                    }
                                    $289 = ((($t$0$i14)) + 20|0);
                                    $290 = HEAP32[$289>>2]|0;
                                    $291 = $sizebits$0$i >>> 31;
                                    $292 = (((($t$0$i14)) + 16|0) + ($291<<2)|0);
                                    $293 = HEAP32[$292>>2]|0;
                                    $294 = ($290|0)==(0|0);
                                    $295 = ($290|0)==($293|0);
                                    $or$cond19$i = $294 | $295;
                                    $rst$1$i = $or$cond19$i ? $rst$0$i : $290;
                                    $296 = ($293|0)==(0|0);
                                    $297 = $sizebits$0$i << 1;
                                    if ($296) {
                                        $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
                                        label = 86;
                                        break;
                                    } else {
                                        $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $297;$t$0$i14 = $293;$v$0$i16 = $v$1$i;
                                    }
                                }
                            }
                        } while(0);
                        if ((label|0) == 86) {
                            $298 = ($t$1$i|0)==(0|0);
                            $299 = ($v$2$i|0)==(0|0);
                            $or$cond$i = $298 & $299;
                            if ($or$cond$i) {
                                $300 = 2 << $idx$0$i;
                                $301 = (0 - ($300))|0;
                                $302 = $300 | $301;
                                $303 = $247 & $302;
                                $304 = ($303|0)==(0);
                                if ($304) {
                                    $nb$0 = $246;
                                    break;
                                }
                                $305 = (0 - ($303))|0;
                                $306 = $303 & $305;
                                $307 = (($306) + -1)|0;
                                $308 = $307 >>> 12;
                                $309 = $308 & 16;
                                $310 = $307 >>> $309;
                                $311 = $310 >>> 5;
                                $312 = $311 & 8;
                                $313 = $312 | $309;
                                $314 = $310 >>> $312;
                                $315 = $314 >>> 2;
                                $316 = $315 & 4;
                                $317 = $313 | $316;
                                $318 = $314 >>> $316;
                                $319 = $318 >>> 1;
                                $320 = $319 & 2;
                                $321 = $317 | $320;
                                $322 = $318 >>> $320;
                                $323 = $322 >>> 1;
                                $324 = $323 & 1;
                                $325 = $321 | $324;
                                $326 = $322 >>> $324;
                                $327 = (($325) + ($326))|0;
                                $328 = (476 + ($327<<2)|0);
                                $329 = HEAP32[$328>>2]|0;
                                $t$2$ph$i = $329;$v$3$ph$i = 0;
                            } else {
                                $t$2$ph$i = $t$1$i;$v$3$ph$i = $v$2$i;
                            }
                            $330 = ($t$2$ph$i|0)==(0|0);
                            if ($330) {
                                $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$3$ph$i;
                            } else {
                                $rsize$331$i = $rsize$2$i;$t$230$i = $t$2$ph$i;$v$332$i = $v$3$ph$i;
                                label = 90;
                            }
                        }
                        if ((label|0) == 90) {
                            while(1) {
                                label = 0;
                                $331 = ((($t$230$i)) + 4|0);
                                $332 = HEAP32[$331>>2]|0;
                                $333 = $332 & -8;
                                $334 = (($333) - ($246))|0;
                                $335 = ($334>>>0)<($rsize$331$i>>>0);
                                $$rsize$3$i = $335 ? $334 : $rsize$331$i;
                                $t$2$v$3$i = $335 ? $t$230$i : $v$332$i;
                                $336 = ((($t$230$i)) + 16|0);
                                $337 = HEAP32[$336>>2]|0;
                                $338 = ($337|0)==(0|0);
                                if (!($338)) {
                                    $rsize$331$i = $$rsize$3$i;$t$230$i = $337;$v$332$i = $t$2$v$3$i;
                                    label = 90;
                                    continue;
                                }
                                $339 = ((($t$230$i)) + 20|0);
                                $340 = HEAP32[$339>>2]|0;
                                $341 = ($340|0)==(0|0);
                                if ($341) {
                                    $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
                                    break;
                                } else {
                                    $rsize$331$i = $$rsize$3$i;$t$230$i = $340;$v$332$i = $t$2$v$3$i;
                                    label = 90;
                                }
                            }
                        }
                        $342 = ($v$3$lcssa$i|0)==(0|0);
                        if ($342) {
                            $nb$0 = $246;
                        } else {
                            $343 = HEAP32[(180)>>2]|0;
                            $344 = (($343) - ($246))|0;
                            $345 = ($rsize$3$lcssa$i>>>0)<($344>>>0);
                            if ($345) {
                                $346 = HEAP32[(188)>>2]|0;
                                $347 = ($v$3$lcssa$i>>>0)<($346>>>0);
                                if ($347) {
                                    _abort();
                                    // unreachable;
                                }
                                $348 = (($v$3$lcssa$i) + ($246)|0);
                                $349 = ($v$3$lcssa$i>>>0)<($348>>>0);
                                if (!($349)) {
                                    _abort();
                                    // unreachable;
                                }
                                $350 = ((($v$3$lcssa$i)) + 24|0);
                                $351 = HEAP32[$350>>2]|0;
                                $352 = ((($v$3$lcssa$i)) + 12|0);
                                $353 = HEAP32[$352>>2]|0;
                                $354 = ($353|0)==($v$3$lcssa$i|0);
                                do {
                                    if ($354) {
                                        $364 = ((($v$3$lcssa$i)) + 20|0);
                                        $365 = HEAP32[$364>>2]|0;
                                        $366 = ($365|0)==(0|0);
                                        if ($366) {
                                            $367 = ((($v$3$lcssa$i)) + 16|0);
                                            $368 = HEAP32[$367>>2]|0;
                                            $369 = ($368|0)==(0|0);
                                            if ($369) {
                                                $R$1$i20 = 0;
                                                break;
                                            } else {
                                                $R$0$i18 = $368;$RP$0$i17 = $367;
                                            }
                                        } else {
                                            $R$0$i18 = $365;$RP$0$i17 = $364;
                                        }
                                        while(1) {
                                            $370 = ((($R$0$i18)) + 20|0);
                                            $371 = HEAP32[$370>>2]|0;
                                            $372 = ($371|0)==(0|0);
                                            if (!($372)) {
                                                $R$0$i18 = $371;$RP$0$i17 = $370;
                                                continue;
                                            }
                                            $373 = ((($R$0$i18)) + 16|0);
                                            $374 = HEAP32[$373>>2]|0;
                                            $375 = ($374|0)==(0|0);
                                            if ($375) {
                                                $R$0$i18$lcssa = $R$0$i18;$RP$0$i17$lcssa = $RP$0$i17;
                                                break;
                                            } else {
                                                $R$0$i18 = $374;$RP$0$i17 = $373;
                                            }
                                        }
                                        $376 = ($RP$0$i17$lcssa>>>0)<($346>>>0);
                                        if ($376) {
                                            _abort();
                                            // unreachable;
                                        } else {
                                            HEAP32[$RP$0$i17$lcssa>>2] = 0;
                                            $R$1$i20 = $R$0$i18$lcssa;
                                            break;
                                        }
                                    } else {
                                        $355 = ((($v$3$lcssa$i)) + 8|0);
                                        $356 = HEAP32[$355>>2]|0;
                                        $357 = ($356>>>0)<($346>>>0);
                                        if ($357) {
                                            _abort();
                                            // unreachable;
                                        }
                                        $358 = ((($356)) + 12|0);
                                        $359 = HEAP32[$358>>2]|0;
                                        $360 = ($359|0)==($v$3$lcssa$i|0);
                                        if (!($360)) {
                                            _abort();
                                            // unreachable;
                                        }
                                        $361 = ((($353)) + 8|0);
                                        $362 = HEAP32[$361>>2]|0;
                                        $363 = ($362|0)==($v$3$lcssa$i|0);
                                        if ($363) {
                                            HEAP32[$358>>2] = $353;
                                            HEAP32[$361>>2] = $356;
                                            $R$1$i20 = $353;
                                            break;
                                        } else {
                                            _abort();
                                            // unreachable;
                                        }
                                    }
                                } while(0);
                                $377 = ($351|0)==(0|0);
                                do {
                                    if (!($377)) {
                                        $378 = ((($v$3$lcssa$i)) + 28|0);
                                        $379 = HEAP32[$378>>2]|0;
                                        $380 = (476 + ($379<<2)|0);
                                        $381 = HEAP32[$380>>2]|0;
                                        $382 = ($v$3$lcssa$i|0)==($381|0);
                                        if ($382) {
                                            HEAP32[$380>>2] = $R$1$i20;
                                            $cond$i21 = ($R$1$i20|0)==(0|0);
                                            if ($cond$i21) {
                                                $383 = 1 << $379;
                                                $384 = $383 ^ -1;
                                                $385 = HEAP32[(176)>>2]|0;
                                                $386 = $385 & $384;
                                                HEAP32[(176)>>2] = $386;
                                                break;
                                            }
                                        } else {
                                            $387 = HEAP32[(188)>>2]|0;
                                            $388 = ($351>>>0)<($387>>>0);
                                            if ($388) {
                                                _abort();
                                                // unreachable;
                                            }
                                            $389 = ((($351)) + 16|0);
                                            $390 = HEAP32[$389>>2]|0;
                                            $391 = ($390|0)==($v$3$lcssa$i|0);
                                            if ($391) {
                                                HEAP32[$389>>2] = $R$1$i20;
                                            } else {
                                                $392 = ((($351)) + 20|0);
                                                HEAP32[$392>>2] = $R$1$i20;
                                            }
                                            $393 = ($R$1$i20|0)==(0|0);
                                            if ($393) {
                                                break;
                                            }
                                        }
                                        $394 = HEAP32[(188)>>2]|0;
                                        $395 = ($R$1$i20>>>0)<($394>>>0);
                                        if ($395) {
                                            _abort();
                                            // unreachable;
                                        }
                                        $396 = ((($R$1$i20)) + 24|0);
                                        HEAP32[$396>>2] = $351;
                                        $397 = ((($v$3$lcssa$i)) + 16|0);
                                        $398 = HEAP32[$397>>2]|0;
                                        $399 = ($398|0)==(0|0);
                                        do {
                                            if (!($399)) {
                                                $400 = ($398>>>0)<($394>>>0);
                                                if ($400) {
                                                    _abort();
                                                    // unreachable;
                                                } else {
                                                    $401 = ((($R$1$i20)) + 16|0);
                                                    HEAP32[$401>>2] = $398;
                                                    $402 = ((($398)) + 24|0);
                                                    HEAP32[$402>>2] = $R$1$i20;
                                                    break;
                                                }
                                            }
                                        } while(0);
                                        $403 = ((($v$3$lcssa$i)) + 20|0);
                                        $404 = HEAP32[$403>>2]|0;
                                        $405 = ($404|0)==(0|0);
                                        if (!($405)) {
                                            $406 = HEAP32[(188)>>2]|0;
                                            $407 = ($404>>>0)<($406>>>0);
                                            if ($407) {
                                                _abort();
                                                // unreachable;
                                            } else {
                                                $408 = ((($R$1$i20)) + 20|0);
                                                HEAP32[$408>>2] = $404;
                                                $409 = ((($404)) + 24|0);
                                                HEAP32[$409>>2] = $R$1$i20;
                                                break;
                                            }
                                        }
                                    }
                                } while(0);
                                $410 = ($rsize$3$lcssa$i>>>0)<(16);
                                L199: do {
                                    if ($410) {
                                        $411 = (($rsize$3$lcssa$i) + ($246))|0;
                                        $412 = $411 | 3;
                                        $413 = ((($v$3$lcssa$i)) + 4|0);
                                        HEAP32[$413>>2] = $412;
                                        $$sum18$i = (($411) + 4)|0;
                                        $414 = (($v$3$lcssa$i) + ($$sum18$i)|0);
                                        $415 = HEAP32[$414>>2]|0;
                                        $416 = $415 | 1;
                                        HEAP32[$414>>2] = $416;
                                    } else {
                                        $417 = $246 | 3;
                                        $418 = ((($v$3$lcssa$i)) + 4|0);
                                        HEAP32[$418>>2] = $417;
                                        $419 = $rsize$3$lcssa$i | 1;
                                        $$sum$i2334 = $246 | 4;
                                        $420 = (($v$3$lcssa$i) + ($$sum$i2334)|0);
                                        HEAP32[$420>>2] = $419;
                                        $$sum1$i24 = (($rsize$3$lcssa$i) + ($246))|0;
                                        $421 = (($v$3$lcssa$i) + ($$sum1$i24)|0);
                                        HEAP32[$421>>2] = $rsize$3$lcssa$i;
                                        $422 = $rsize$3$lcssa$i >>> 3;
                                        $423 = ($rsize$3$lcssa$i>>>0)<(256);
                                        if ($423) {
                                            $424 = $422 << 1;
                                            $425 = (212 + ($424<<2)|0);
                                            $426 = HEAP32[172>>2]|0;
                                            $427 = 1 << $422;
                                            $428 = $426 & $427;
                                            $429 = ($428|0)==(0);
                                            if ($429) {
                                                $430 = $426 | $427;
                                                HEAP32[172>>2] = $430;
                                                $$pre$i25 = (($424) + 2)|0;
                                                $$pre43$i = (212 + ($$pre$i25<<2)|0);
                                                $$pre$phi$i26Z2D = $$pre43$i;$F5$0$i = $425;
                                            } else {
                                                $$sum17$i = (($424) + 2)|0;
                                                $431 = (212 + ($$sum17$i<<2)|0);
                                                $432 = HEAP32[$431>>2]|0;
                                                $433 = HEAP32[(188)>>2]|0;
                                                $434 = ($432>>>0)<($433>>>0);
                                                if ($434) {
                                                    _abort();
                                                    // unreachable;
                                                } else {
                                                    $$pre$phi$i26Z2D = $431;$F5$0$i = $432;
                                                }
                                            }
                                            HEAP32[$$pre$phi$i26Z2D>>2] = $348;
                                            $435 = ((($F5$0$i)) + 12|0);
                                            HEAP32[$435>>2] = $348;
                                            $$sum15$i = (($246) + 8)|0;
                                            $436 = (($v$3$lcssa$i) + ($$sum15$i)|0);
                                            HEAP32[$436>>2] = $F5$0$i;
                                            $$sum16$i = (($246) + 12)|0;
                                            $437 = (($v$3$lcssa$i) + ($$sum16$i)|0);
                                            HEAP32[$437>>2] = $425;
                                            break;
                                        }
                                        $438 = $rsize$3$lcssa$i >>> 8;
                                        $439 = ($438|0)==(0);
                                        if ($439) {
                                            $I7$0$i = 0;
                                        } else {
                                            $440 = ($rsize$3$lcssa$i>>>0)>(16777215);
                                            if ($440) {
                                                $I7$0$i = 31;
                                            } else {
                                                $441 = (($438) + 1048320)|0;
                                                $442 = $441 >>> 16;
                                                $443 = $442 & 8;
                                                $444 = $438 << $443;
                                                $445 = (($444) + 520192)|0;
                                                $446 = $445 >>> 16;
                                                $447 = $446 & 4;
                                                $448 = $447 | $443;
                                                $449 = $444 << $447;
                                                $450 = (($449) + 245760)|0;
                                                $451 = $450 >>> 16;
                                                $452 = $451 & 2;
                                                $453 = $448 | $452;
                                                $454 = (14 - ($453))|0;
                                                $455 = $449 << $452;
                                                $456 = $455 >>> 15;
                                                $457 = (($454) + ($456))|0;
                                                $458 = $457 << 1;
                                                $459 = (($457) + 7)|0;
                                                $460 = $rsize$3$lcssa$i >>> $459;
                                                $461 = $460 & 1;
                                                $462 = $461 | $458;
                                                $I7$0$i = $462;
                                            }
                                        }
                                        $463 = (476 + ($I7$0$i<<2)|0);
                                        $$sum2$i = (($246) + 28)|0;
                                        $464 = (($v$3$lcssa$i) + ($$sum2$i)|0);
                                        HEAP32[$464>>2] = $I7$0$i;
                                        $$sum3$i27 = (($246) + 16)|0;
                                        $465 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
                                        $$sum4$i28 = (($246) + 20)|0;
                                        $466 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
                                        HEAP32[$466>>2] = 0;
                                        HEAP32[$465>>2] = 0;
                                        $467 = HEAP32[(176)>>2]|0;
                                        $468 = 1 << $I7$0$i;
                                        $469 = $467 & $468;
                                        $470 = ($469|0)==(0);
                                        if ($470) {
                                            $471 = $467 | $468;
                                            HEAP32[(176)>>2] = $471;
                                            HEAP32[$463>>2] = $348;
                                            $$sum5$i = (($246) + 24)|0;
                                            $472 = (($v$3$lcssa$i) + ($$sum5$i)|0);
                                            HEAP32[$472>>2] = $463;
                                            $$sum6$i = (($246) + 12)|0;
                                            $473 = (($v$3$lcssa$i) + ($$sum6$i)|0);
                                            HEAP32[$473>>2] = $348;
                                            $$sum7$i = (($246) + 8)|0;
                                            $474 = (($v$3$lcssa$i) + ($$sum7$i)|0);
                                            HEAP32[$474>>2] = $348;
                                            break;
                                        }
                                        $475 = HEAP32[$463>>2]|0;
                                        $476 = ((($475)) + 4|0);
                                        $477 = HEAP32[$476>>2]|0;
                                        $478 = $477 & -8;
                                        $479 = ($478|0)==($rsize$3$lcssa$i|0);
                                        L217: do {
                                            if ($479) {
                                                $T$0$lcssa$i = $475;
                                            } else {
                                                $480 = ($I7$0$i|0)==(31);
                                                $481 = $I7$0$i >>> 1;
                                                $482 = (25 - ($481))|0;
                                                $483 = $480 ? 0 : $482;
                                                $484 = $rsize$3$lcssa$i << $483;
                                                $K12$029$i = $484;$T$028$i = $475;
                                                while(1) {
                                                    $491 = $K12$029$i >>> 31;
                                                    $492 = (((($T$028$i)) + 16|0) + ($491<<2)|0);
                                                    $487 = HEAP32[$492>>2]|0;
                                                    $493 = ($487|0)==(0|0);
                                                    if ($493) {
                                                        $$lcssa232 = $492;$T$028$i$lcssa = $T$028$i;
                                                        break;
                                                    }
                                                    $485 = $K12$029$i << 1;
                                                    $486 = ((($487)) + 4|0);
                                                    $488 = HEAP32[$486>>2]|0;
                                                    $489 = $488 & -8;
                                                    $490 = ($489|0)==($rsize$3$lcssa$i|0);
                                                    if ($490) {
                                                        $T$0$lcssa$i = $487;
                                                        break L217;
                                                    } else {
                                                        $K12$029$i = $485;$T$028$i = $487;
                                                    }
                                                }
                                                $494 = HEAP32[(188)>>2]|0;
                                                $495 = ($$lcssa232>>>0)<($494>>>0);
                                                if ($495) {
                                                    _abort();
                                                    // unreachable;
                                                } else {
                                                    HEAP32[$$lcssa232>>2] = $348;
                                                    $$sum11$i = (($246) + 24)|0;
                                                    $496 = (($v$3$lcssa$i) + ($$sum11$i)|0);
                                                    HEAP32[$496>>2] = $T$028$i$lcssa;
                                                    $$sum12$i = (($246) + 12)|0;
                                                    $497 = (($v$3$lcssa$i) + ($$sum12$i)|0);
                                                    HEAP32[$497>>2] = $348;
                                                    $$sum13$i = (($246) + 8)|0;
                                                    $498 = (($v$3$lcssa$i) + ($$sum13$i)|0);
                                                    HEAP32[$498>>2] = $348;
                                                    break L199;
                                                }
                                            }
                                        } while(0);
                                        $499 = ((($T$0$lcssa$i)) + 8|0);
                                        $500 = HEAP32[$499>>2]|0;
                                        $501 = HEAP32[(188)>>2]|0;
                                        $502 = ($500>>>0)>=($501>>>0);
                                        $not$$i = ($T$0$lcssa$i>>>0)>=($501>>>0);
                                        $503 = $502 & $not$$i;
                                        if ($503) {
                                            $504 = ((($500)) + 12|0);
                                            HEAP32[$504>>2] = $348;
                                            HEAP32[$499>>2] = $348;
                                            $$sum8$i = (($246) + 8)|0;
                                            $505 = (($v$3$lcssa$i) + ($$sum8$i)|0);
                                            HEAP32[$505>>2] = $500;
                                            $$sum9$i = (($246) + 12)|0;
                                            $506 = (($v$3$lcssa$i) + ($$sum9$i)|0);
                                            HEAP32[$506>>2] = $T$0$lcssa$i;
                                            $$sum10$i = (($246) + 24)|0;
                                            $507 = (($v$3$lcssa$i) + ($$sum10$i)|0);
                                            HEAP32[$507>>2] = 0;
                                            break;
                                        } else {
                                            _abort();
                                            // unreachable;
                                        }
                                    }
                                } while(0);
                                $508 = ((($v$3$lcssa$i)) + 8|0);
                                $mem$0 = $508;
                                return ($mem$0|0);
                            } else {
                                $nb$0 = $246;
                            }
                        }
                    }
                }
            }
        } while(0);
        $509 = HEAP32[(180)>>2]|0;
        $510 = ($509>>>0)<($nb$0>>>0);
        if (!($510)) {
            $511 = (($509) - ($nb$0))|0;
            $512 = HEAP32[(192)>>2]|0;
            $513 = ($511>>>0)>(15);
            if ($513) {
                $514 = (($512) + ($nb$0)|0);
                HEAP32[(192)>>2] = $514;
                HEAP32[(180)>>2] = $511;
                $515 = $511 | 1;
                $$sum2 = (($nb$0) + 4)|0;
                $516 = (($512) + ($$sum2)|0);
                HEAP32[$516>>2] = $515;
                $517 = (($512) + ($509)|0);
                HEAP32[$517>>2] = $511;
                $518 = $nb$0 | 3;
                $519 = ((($512)) + 4|0);
                HEAP32[$519>>2] = $518;
            } else {
                HEAP32[(180)>>2] = 0;
                HEAP32[(192)>>2] = 0;
                $520 = $509 | 3;
                $521 = ((($512)) + 4|0);
                HEAP32[$521>>2] = $520;
                $$sum1 = (($509) + 4)|0;
                $522 = (($512) + ($$sum1)|0);
                $523 = HEAP32[$522>>2]|0;
                $524 = $523 | 1;
                HEAP32[$522>>2] = $524;
            }
            $525 = ((($512)) + 8|0);
            $mem$0 = $525;
            return ($mem$0|0);
        }
        $526 = HEAP32[(184)>>2]|0;
        $527 = ($526>>>0)>($nb$0>>>0);
        if ($527) {
            $528 = (($526) - ($nb$0))|0;
            HEAP32[(184)>>2] = $528;
            $529 = HEAP32[(196)>>2]|0;
            $530 = (($529) + ($nb$0)|0);
            HEAP32[(196)>>2] = $530;
            $531 = $528 | 1;
            $$sum = (($nb$0) + 4)|0;
            $532 = (($529) + ($$sum)|0);
            HEAP32[$532>>2] = $531;
            $533 = $nb$0 | 3;
            $534 = ((($529)) + 4|0);
            HEAP32[$534>>2] = $533;
            $535 = ((($529)) + 8|0);
            $mem$0 = $535;
            return ($mem$0|0);
        }
        $536 = HEAP32[644>>2]|0;
        $537 = ($536|0)==(0);
        do {
            if ($537) {
                $538 = (_sysconf(30)|0);
                $539 = (($538) + -1)|0;
                $540 = $539 & $538;
                $541 = ($540|0)==(0);
                if ($541) {
                    HEAP32[(652)>>2] = $538;
                    HEAP32[(648)>>2] = $538;
                    HEAP32[(656)>>2] = -1;
                    HEAP32[(660)>>2] = -1;
                    HEAP32[(664)>>2] = 0;
                    HEAP32[(616)>>2] = 0;
                    $542 = (_time((0|0))|0);
                    $543 = $542 & -16;
                    $544 = $543 ^ 1431655768;
                    HEAP32[644>>2] = $544;
                    break;
                } else {
                    _abort();
                    // unreachable;
                }
            }
        } while(0);
        $545 = (($nb$0) + 48)|0;
        $546 = HEAP32[(652)>>2]|0;
        $547 = (($nb$0) + 47)|0;
        $548 = (($546) + ($547))|0;
        $549 = (0 - ($546))|0;
        $550 = $548 & $549;
        $551 = ($550>>>0)>($nb$0>>>0);
        if (!($551)) {
            $mem$0 = 0;
            return ($mem$0|0);
        }
        $552 = HEAP32[(612)>>2]|0;
        $553 = ($552|0)==(0);
        if (!($553)) {
            $554 = HEAP32[(604)>>2]|0;
            $555 = (($554) + ($550))|0;
            $556 = ($555>>>0)<=($554>>>0);
            $557 = ($555>>>0)>($552>>>0);
            $or$cond1$i = $556 | $557;
            if ($or$cond1$i) {
                $mem$0 = 0;
                return ($mem$0|0);
            }
        }
        $558 = HEAP32[(616)>>2]|0;
        $559 = $558 & 4;
        $560 = ($559|0)==(0);
        L258: do {
            if ($560) {
                $561 = HEAP32[(196)>>2]|0;
                $562 = ($561|0)==(0|0);
                L260: do {
                    if ($562) {
                        label = 174;
                    } else {
                        $sp$0$i$i = (620);
                        while(1) {
                            $563 = HEAP32[$sp$0$i$i>>2]|0;
                            $564 = ($563>>>0)>($561>>>0);
                            if (!($564)) {
                                $565 = ((($sp$0$i$i)) + 4|0);
                                $566 = HEAP32[$565>>2]|0;
                                $567 = (($563) + ($566)|0);
                                $568 = ($567>>>0)>($561>>>0);
                                if ($568) {
                                    $$lcssa228 = $sp$0$i$i;$$lcssa230 = $565;
                                    break;
                                }
                            }
                            $569 = ((($sp$0$i$i)) + 8|0);
                            $570 = HEAP32[$569>>2]|0;
                            $571 = ($570|0)==(0|0);
                            if ($571) {
                                label = 174;
                                break L260;
                            } else {
                                $sp$0$i$i = $570;
                            }
                        }
                        $594 = HEAP32[(184)>>2]|0;
                        $595 = (($548) - ($594))|0;
                        $596 = $595 & $549;
                        $597 = ($596>>>0)<(2147483647);
                        if ($597) {
                            $598 = (_sbrk(($596|0))|0);
                            $599 = HEAP32[$$lcssa228>>2]|0;
                            $600 = HEAP32[$$lcssa230>>2]|0;
                            $601 = (($599) + ($600)|0);
                            $602 = ($598|0)==($601|0);
                            $$3$i = $602 ? $596 : 0;
                            if ($602) {
                                $603 = ($598|0)==((-1)|0);
                                if ($603) {
                                    $tsize$0323944$i = $$3$i;
                                } else {
                                    $tbase$255$i = $598;$tsize$254$i = $$3$i;
                                    label = 194;
                                    break L258;
                                }
                            } else {
                                $br$0$ph$i = $598;$ssize$1$ph$i = $596;$tsize$0$ph$i = $$3$i;
                                label = 184;
                            }
                        } else {
                            $tsize$0323944$i = 0;
                        }
                    }
                } while(0);
                do {
                    if ((label|0) == 174) {
                        $572 = (_sbrk(0)|0);
                        $573 = ($572|0)==((-1)|0);
                        if ($573) {
                            $tsize$0323944$i = 0;
                        } else {
                            $574 = $572;
                            $575 = HEAP32[(648)>>2]|0;
                            $576 = (($575) + -1)|0;
                            $577 = $576 & $574;
                            $578 = ($577|0)==(0);
                            if ($578) {
                                $ssize$0$i = $550;
                            } else {
                                $579 = (($576) + ($574))|0;
                                $580 = (0 - ($575))|0;
                                $581 = $579 & $580;
                                $582 = (($550) - ($574))|0;
                                $583 = (($582) + ($581))|0;
                                $ssize$0$i = $583;
                            }
                            $584 = HEAP32[(604)>>2]|0;
                            $585 = (($584) + ($ssize$0$i))|0;
                            $586 = ($ssize$0$i>>>0)>($nb$0>>>0);
                            $587 = ($ssize$0$i>>>0)<(2147483647);
                            $or$cond$i30 = $586 & $587;
                            if ($or$cond$i30) {
                                $588 = HEAP32[(612)>>2]|0;
                                $589 = ($588|0)==(0);
                                if (!($589)) {
                                    $590 = ($585>>>0)<=($584>>>0);
                                    $591 = ($585>>>0)>($588>>>0);
                                    $or$cond2$i = $590 | $591;
                                    if ($or$cond2$i) {
                                        $tsize$0323944$i = 0;
                                        break;
                                    }
                                }
                                $592 = (_sbrk(($ssize$0$i|0))|0);
                                $593 = ($592|0)==($572|0);
                                $ssize$0$$i = $593 ? $ssize$0$i : 0;
                                if ($593) {
                                    $tbase$255$i = $572;$tsize$254$i = $ssize$0$$i;
                                    label = 194;
                                    break L258;
                                } else {
                                    $br$0$ph$i = $592;$ssize$1$ph$i = $ssize$0$i;$tsize$0$ph$i = $ssize$0$$i;
                                    label = 184;
                                }
                            } else {
                                $tsize$0323944$i = 0;
                            }
                        }
                    }
                } while(0);
                L280: do {
                    if ((label|0) == 184) {
                        $604 = (0 - ($ssize$1$ph$i))|0;
                        $605 = ($br$0$ph$i|0)!=((-1)|0);
                        $606 = ($ssize$1$ph$i>>>0)<(2147483647);
                        $or$cond5$i = $606 & $605;
                        $607 = ($545>>>0)>($ssize$1$ph$i>>>0);
                        $or$cond6$i = $607 & $or$cond5$i;
                        do {
                            if ($or$cond6$i) {
                                $608 = HEAP32[(652)>>2]|0;
                                $609 = (($547) - ($ssize$1$ph$i))|0;
                                $610 = (($609) + ($608))|0;
                                $611 = (0 - ($608))|0;
                                $612 = $610 & $611;
                                $613 = ($612>>>0)<(2147483647);
                                if ($613) {
                                    $614 = (_sbrk(($612|0))|0);
                                    $615 = ($614|0)==((-1)|0);
                                    if ($615) {
                                        (_sbrk(($604|0))|0);
                                        $tsize$0323944$i = $tsize$0$ph$i;
                                        break L280;
                                    } else {
                                        $616 = (($612) + ($ssize$1$ph$i))|0;
                                        $ssize$2$i = $616;
                                        break;
                                    }
                                } else {
                                    $ssize$2$i = $ssize$1$ph$i;
                                }
                            } else {
                                $ssize$2$i = $ssize$1$ph$i;
                            }
                        } while(0);
                        $617 = ($br$0$ph$i|0)==((-1)|0);
                        if ($617) {
                            $tsize$0323944$i = $tsize$0$ph$i;
                        } else {
                            $tbase$255$i = $br$0$ph$i;$tsize$254$i = $ssize$2$i;
                            label = 194;
                            break L258;
                        }
                    }
                } while(0);
                $618 = HEAP32[(616)>>2]|0;
                $619 = $618 | 4;
                HEAP32[(616)>>2] = $619;
                $tsize$1$i = $tsize$0323944$i;
                label = 191;
            } else {
                $tsize$1$i = 0;
                label = 191;
            }
        } while(0);
        if ((label|0) == 191) {
            $620 = ($550>>>0)<(2147483647);
            if ($620) {
                $621 = (_sbrk(($550|0))|0);
                $622 = (_sbrk(0)|0);
                $623 = ($621|0)!=((-1)|0);
                $624 = ($622|0)!=((-1)|0);
                $or$cond3$i = $623 & $624;
                $625 = ($621>>>0)<($622>>>0);
                $or$cond8$i = $625 & $or$cond3$i;
                if ($or$cond8$i) {
                    $626 = $622;
                    $627 = $621;
                    $628 = (($626) - ($627))|0;
                    $629 = (($nb$0) + 40)|0;
                    $630 = ($628>>>0)>($629>>>0);
                    $$tsize$1$i = $630 ? $628 : $tsize$1$i;
                    if ($630) {
                        $tbase$255$i = $621;$tsize$254$i = $$tsize$1$i;
                        label = 194;
                    }
                }
            }
        }
        if ((label|0) == 194) {
            $631 = HEAP32[(604)>>2]|0;
            $632 = (($631) + ($tsize$254$i))|0;
            HEAP32[(604)>>2] = $632;
            $633 = HEAP32[(608)>>2]|0;
            $634 = ($632>>>0)>($633>>>0);
            if ($634) {
                HEAP32[(608)>>2] = $632;
            }
            $635 = HEAP32[(196)>>2]|0;
            $636 = ($635|0)==(0|0);
            L299: do {
                if ($636) {
                    $637 = HEAP32[(188)>>2]|0;
                    $638 = ($637|0)==(0|0);
                    $639 = ($tbase$255$i>>>0)<($637>>>0);
                    $or$cond9$i = $638 | $639;
                    if ($or$cond9$i) {
                        HEAP32[(188)>>2] = $tbase$255$i;
                    }
                    HEAP32[(620)>>2] = $tbase$255$i;
                    HEAP32[(624)>>2] = $tsize$254$i;
                    HEAP32[(632)>>2] = 0;
                    $640 = HEAP32[644>>2]|0;
                    HEAP32[(208)>>2] = $640;
                    HEAP32[(204)>>2] = -1;
                    $i$02$i$i = 0;
                    while(1) {
                        $641 = $i$02$i$i << 1;
                        $642 = (212 + ($641<<2)|0);
                        $$sum$i$i = (($641) + 3)|0;
                        $643 = (212 + ($$sum$i$i<<2)|0);
                        HEAP32[$643>>2] = $642;
                        $$sum1$i$i = (($641) + 2)|0;
                        $644 = (212 + ($$sum1$i$i<<2)|0);
                        HEAP32[$644>>2] = $642;
                        $645 = (($i$02$i$i) + 1)|0;
                        $exitcond$i$i = ($645|0)==(32);
                        if ($exitcond$i$i) {
                            break;
                        } else {
                            $i$02$i$i = $645;
                        }
                    }
                    $646 = (($tsize$254$i) + -40)|0;
                    $647 = ((($tbase$255$i)) + 8|0);
                    $648 = $647;
                    $649 = $648 & 7;
                    $650 = ($649|0)==(0);
                    $651 = (0 - ($648))|0;
                    $652 = $651 & 7;
                    $653 = $650 ? 0 : $652;
                    $654 = (($tbase$255$i) + ($653)|0);
                    $655 = (($646) - ($653))|0;
                    HEAP32[(196)>>2] = $654;
                    HEAP32[(184)>>2] = $655;
                    $656 = $655 | 1;
                    $$sum$i13$i = (($653) + 4)|0;
                    $657 = (($tbase$255$i) + ($$sum$i13$i)|0);
                    HEAP32[$657>>2] = $656;
                    $$sum2$i$i = (($tsize$254$i) + -36)|0;
                    $658 = (($tbase$255$i) + ($$sum2$i$i)|0);
                    HEAP32[$658>>2] = 40;
                    $659 = HEAP32[(660)>>2]|0;
                    HEAP32[(200)>>2] = $659;
                } else {
                    $sp$084$i = (620);
                    while(1) {
                        $660 = HEAP32[$sp$084$i>>2]|0;
                        $661 = ((($sp$084$i)) + 4|0);
                        $662 = HEAP32[$661>>2]|0;
                        $663 = (($660) + ($662)|0);
                        $664 = ($tbase$255$i|0)==($663|0);
                        if ($664) {
                            $$lcssa222 = $660;$$lcssa224 = $661;$$lcssa226 = $662;$sp$084$i$lcssa = $sp$084$i;
                            label = 204;
                            break;
                        }
                        $665 = ((($sp$084$i)) + 8|0);
                        $666 = HEAP32[$665>>2]|0;
                        $667 = ($666|0)==(0|0);
                        if ($667) {
                            break;
                        } else {
                            $sp$084$i = $666;
                        }
                    }
                    if ((label|0) == 204) {
                        $668 = ((($sp$084$i$lcssa)) + 12|0);
                        $669 = HEAP32[$668>>2]|0;
                        $670 = $669 & 8;
                        $671 = ($670|0)==(0);
                        if ($671) {
                            $672 = ($635>>>0)>=($$lcssa222>>>0);
                            $673 = ($635>>>0)<($tbase$255$i>>>0);
                            $or$cond57$i = $673 & $672;
                            if ($or$cond57$i) {
                                $674 = (($$lcssa226) + ($tsize$254$i))|0;
                                HEAP32[$$lcssa224>>2] = $674;
                                $675 = HEAP32[(184)>>2]|0;
                                $676 = (($675) + ($tsize$254$i))|0;
                                $677 = ((($635)) + 8|0);
                                $678 = $677;
                                $679 = $678 & 7;
                                $680 = ($679|0)==(0);
                                $681 = (0 - ($678))|0;
                                $682 = $681 & 7;
                                $683 = $680 ? 0 : $682;
                                $684 = (($635) + ($683)|0);
                                $685 = (($676) - ($683))|0;
                                HEAP32[(196)>>2] = $684;
                                HEAP32[(184)>>2] = $685;
                                $686 = $685 | 1;
                                $$sum$i17$i = (($683) + 4)|0;
                                $687 = (($635) + ($$sum$i17$i)|0);
                                HEAP32[$687>>2] = $686;
                                $$sum2$i18$i = (($676) + 4)|0;
                                $688 = (($635) + ($$sum2$i18$i)|0);
                                HEAP32[$688>>2] = 40;
                                $689 = HEAP32[(660)>>2]|0;
                                HEAP32[(200)>>2] = $689;
                                break;
                            }
                        }
                    }
                    $690 = HEAP32[(188)>>2]|0;
                    $691 = ($tbase$255$i>>>0)<($690>>>0);
                    if ($691) {
                        HEAP32[(188)>>2] = $tbase$255$i;
                        $755 = $tbase$255$i;
                    } else {
                        $755 = $690;
                    }
                    $692 = (($tbase$255$i) + ($tsize$254$i)|0);
                    $sp$183$i = (620);
                    while(1) {
                        $693 = HEAP32[$sp$183$i>>2]|0;
                        $694 = ($693|0)==($692|0);
                        if ($694) {
                            $$lcssa219 = $sp$183$i;$sp$183$i$lcssa = $sp$183$i;
                            label = 212;
                            break;
                        }
                        $695 = ((($sp$183$i)) + 8|0);
                        $696 = HEAP32[$695>>2]|0;
                        $697 = ($696|0)==(0|0);
                        if ($697) {
                            $sp$0$i$i$i = (620);
                            break;
                        } else {
                            $sp$183$i = $696;
                        }
                    }
                    if ((label|0) == 212) {
                        $698 = ((($sp$183$i$lcssa)) + 12|0);
                        $699 = HEAP32[$698>>2]|0;
                        $700 = $699 & 8;
                        $701 = ($700|0)==(0);
                        if ($701) {
                            HEAP32[$$lcssa219>>2] = $tbase$255$i;
                            $702 = ((($sp$183$i$lcssa)) + 4|0);
                            $703 = HEAP32[$702>>2]|0;
                            $704 = (($703) + ($tsize$254$i))|0;
                            HEAP32[$702>>2] = $704;
                            $705 = ((($tbase$255$i)) + 8|0);
                            $706 = $705;
                            $707 = $706 & 7;
                            $708 = ($707|0)==(0);
                            $709 = (0 - ($706))|0;
                            $710 = $709 & 7;
                            $711 = $708 ? 0 : $710;
                            $712 = (($tbase$255$i) + ($711)|0);
                            $$sum112$i = (($tsize$254$i) + 8)|0;
                            $713 = (($tbase$255$i) + ($$sum112$i)|0);
                            $714 = $713;
                            $715 = $714 & 7;
                            $716 = ($715|0)==(0);
                            $717 = (0 - ($714))|0;
                            $718 = $717 & 7;
                            $719 = $716 ? 0 : $718;
                            $$sum113$i = (($719) + ($tsize$254$i))|0;
                            $720 = (($tbase$255$i) + ($$sum113$i)|0);
                            $721 = $720;
                            $722 = $712;
                            $723 = (($721) - ($722))|0;
                            $$sum$i19$i = (($711) + ($nb$0))|0;
                            $724 = (($tbase$255$i) + ($$sum$i19$i)|0);
                            $725 = (($723) - ($nb$0))|0;
                            $726 = $nb$0 | 3;
                            $$sum1$i20$i = (($711) + 4)|0;
                            $727 = (($tbase$255$i) + ($$sum1$i20$i)|0);
                            HEAP32[$727>>2] = $726;
                            $728 = ($720|0)==($635|0);
                            L324: do {
                                if ($728) {
                                    $729 = HEAP32[(184)>>2]|0;
                                    $730 = (($729) + ($725))|0;
                                    HEAP32[(184)>>2] = $730;
                                    HEAP32[(196)>>2] = $724;
                                    $731 = $730 | 1;
                                    $$sum42$i$i = (($$sum$i19$i) + 4)|0;
                                    $732 = (($tbase$255$i) + ($$sum42$i$i)|0);
                                    HEAP32[$732>>2] = $731;
                                } else {
                                    $733 = HEAP32[(192)>>2]|0;
                                    $734 = ($720|0)==($733|0);
                                    if ($734) {
                                        $735 = HEAP32[(180)>>2]|0;
                                        $736 = (($735) + ($725))|0;
                                        HEAP32[(180)>>2] = $736;
                                        HEAP32[(192)>>2] = $724;
                                        $737 = $736 | 1;
                                        $$sum40$i$i = (($$sum$i19$i) + 4)|0;
                                        $738 = (($tbase$255$i) + ($$sum40$i$i)|0);
                                        HEAP32[$738>>2] = $737;
                                        $$sum41$i$i = (($736) + ($$sum$i19$i))|0;
                                        $739 = (($tbase$255$i) + ($$sum41$i$i)|0);
                                        HEAP32[$739>>2] = $736;
                                        break;
                                    }
                                    $$sum2$i21$i = (($tsize$254$i) + 4)|0;
                                    $$sum114$i = (($$sum2$i21$i) + ($719))|0;
                                    $740 = (($tbase$255$i) + ($$sum114$i)|0);
                                    $741 = HEAP32[$740>>2]|0;
                                    $742 = $741 & 3;
                                    $743 = ($742|0)==(1);
                                    if ($743) {
                                        $744 = $741 & -8;
                                        $745 = $741 >>> 3;
                                        $746 = ($741>>>0)<(256);
                                        L332: do {
                                            if ($746) {
                                                $$sum3738$i$i = $719 | 8;
                                                $$sum124$i = (($$sum3738$i$i) + ($tsize$254$i))|0;
                                                $747 = (($tbase$255$i) + ($$sum124$i)|0);
                                                $748 = HEAP32[$747>>2]|0;
                                                $$sum39$i$i = (($tsize$254$i) + 12)|0;
                                                $$sum125$i = (($$sum39$i$i) + ($719))|0;
                                                $749 = (($tbase$255$i) + ($$sum125$i)|0);
                                                $750 = HEAP32[$749>>2]|0;
                                                $751 = $745 << 1;
                                                $752 = (212 + ($751<<2)|0);
                                                $753 = ($748|0)==($752|0);
                                                do {
                                                    if (!($753)) {
                                                        $754 = ($748>>>0)<($755>>>0);
                                                        if ($754) {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                        $756 = ((($748)) + 12|0);
                                                        $757 = HEAP32[$756>>2]|0;
                                                        $758 = ($757|0)==($720|0);
                                                        if ($758) {
                                                            break;
                                                        }
                                                        _abort();
                                                        // unreachable;
                                                    }
                                                } while(0);
                                                $759 = ($750|0)==($748|0);
                                                if ($759) {
                                                    $760 = 1 << $745;
                                                    $761 = $760 ^ -1;
                                                    $762 = HEAP32[172>>2]|0;
                                                    $763 = $762 & $761;
                                                    HEAP32[172>>2] = $763;
                                                    break;
                                                }
                                                $764 = ($750|0)==($752|0);
                                                do {
                                                    if ($764) {
                                                        $$pre57$i$i = ((($750)) + 8|0);
                                                        $$pre$phi58$i$iZ2D = $$pre57$i$i;
                                                    } else {
                                                        $765 = ($750>>>0)<($755>>>0);
                                                        if ($765) {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                        $766 = ((($750)) + 8|0);
                                                        $767 = HEAP32[$766>>2]|0;
                                                        $768 = ($767|0)==($720|0);
                                                        if ($768) {
                                                            $$pre$phi58$i$iZ2D = $766;
                                                            break;
                                                        }
                                                        _abort();
                                                        // unreachable;
                                                    }
                                                } while(0);
                                                $769 = ((($748)) + 12|0);
                                                HEAP32[$769>>2] = $750;
                                                HEAP32[$$pre$phi58$i$iZ2D>>2] = $748;
                                            } else {
                                                $$sum34$i$i = $719 | 24;
                                                $$sum115$i = (($$sum34$i$i) + ($tsize$254$i))|0;
                                                $770 = (($tbase$255$i) + ($$sum115$i)|0);
                                                $771 = HEAP32[$770>>2]|0;
                                                $$sum5$i$i = (($tsize$254$i) + 12)|0;
                                                $$sum116$i = (($$sum5$i$i) + ($719))|0;
                                                $772 = (($tbase$255$i) + ($$sum116$i)|0);
                                                $773 = HEAP32[$772>>2]|0;
                                                $774 = ($773|0)==($720|0);
                                                do {
                                                    if ($774) {
                                                        $$sum67$i$i = $719 | 16;
                                                        $$sum122$i = (($$sum2$i21$i) + ($$sum67$i$i))|0;
                                                        $784 = (($tbase$255$i) + ($$sum122$i)|0);
                                                        $785 = HEAP32[$784>>2]|0;
                                                        $786 = ($785|0)==(0|0);
                                                        if ($786) {
                                                            $$sum123$i = (($$sum67$i$i) + ($tsize$254$i))|0;
                                                            $787 = (($tbase$255$i) + ($$sum123$i)|0);
                                                            $788 = HEAP32[$787>>2]|0;
                                                            $789 = ($788|0)==(0|0);
                                                            if ($789) {
                                                                $R$1$i$i = 0;
                                                                break;
                                                            } else {
                                                                $R$0$i$i = $788;$RP$0$i$i = $787;
                                                            }
                                                        } else {
                                                            $R$0$i$i = $785;$RP$0$i$i = $784;
                                                        }
                                                        while(1) {
                                                            $790 = ((($R$0$i$i)) + 20|0);
                                                            $791 = HEAP32[$790>>2]|0;
                                                            $792 = ($791|0)==(0|0);
                                                            if (!($792)) {
                                                                $R$0$i$i = $791;$RP$0$i$i = $790;
                                                                continue;
                                                            }
                                                            $793 = ((($R$0$i$i)) + 16|0);
                                                            $794 = HEAP32[$793>>2]|0;
                                                            $795 = ($794|0)==(0|0);
                                                            if ($795) {
                                                                $R$0$i$i$lcssa = $R$0$i$i;$RP$0$i$i$lcssa = $RP$0$i$i;
                                                                break;
                                                            } else {
                                                                $R$0$i$i = $794;$RP$0$i$i = $793;
                                                            }
                                                        }
                                                        $796 = ($RP$0$i$i$lcssa>>>0)<($755>>>0);
                                                        if ($796) {
                                                            _abort();
                                                            // unreachable;
                                                        } else {
                                                            HEAP32[$RP$0$i$i$lcssa>>2] = 0;
                                                            $R$1$i$i = $R$0$i$i$lcssa;
                                                            break;
                                                        }
                                                    } else {
                                                        $$sum3536$i$i = $719 | 8;
                                                        $$sum117$i = (($$sum3536$i$i) + ($tsize$254$i))|0;
                                                        $775 = (($tbase$255$i) + ($$sum117$i)|0);
                                                        $776 = HEAP32[$775>>2]|0;
                                                        $777 = ($776>>>0)<($755>>>0);
                                                        if ($777) {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                        $778 = ((($776)) + 12|0);
                                                        $779 = HEAP32[$778>>2]|0;
                                                        $780 = ($779|0)==($720|0);
                                                        if (!($780)) {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                        $781 = ((($773)) + 8|0);
                                                        $782 = HEAP32[$781>>2]|0;
                                                        $783 = ($782|0)==($720|0);
                                                        if ($783) {
                                                            HEAP32[$778>>2] = $773;
                                                            HEAP32[$781>>2] = $776;
                                                            $R$1$i$i = $773;
                                                            break;
                                                        } else {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                    }
                                                } while(0);
                                                $797 = ($771|0)==(0|0);
                                                if ($797) {
                                                    break;
                                                }
                                                $$sum30$i$i = (($tsize$254$i) + 28)|0;
                                                $$sum118$i = (($$sum30$i$i) + ($719))|0;
                                                $798 = (($tbase$255$i) + ($$sum118$i)|0);
                                                $799 = HEAP32[$798>>2]|0;
                                                $800 = (476 + ($799<<2)|0);
                                                $801 = HEAP32[$800>>2]|0;
                                                $802 = ($720|0)==($801|0);
                                                do {
                                                    if ($802) {
                                                        HEAP32[$800>>2] = $R$1$i$i;
                                                        $cond$i$i = ($R$1$i$i|0)==(0|0);
                                                        if (!($cond$i$i)) {
                                                            break;
                                                        }
                                                        $803 = 1 << $799;
                                                        $804 = $803 ^ -1;
                                                        $805 = HEAP32[(176)>>2]|0;
                                                        $806 = $805 & $804;
                                                        HEAP32[(176)>>2] = $806;
                                                        break L332;
                                                    } else {
                                                        $807 = HEAP32[(188)>>2]|0;
                                                        $808 = ($771>>>0)<($807>>>0);
                                                        if ($808) {
                                                            _abort();
                                                            // unreachable;
                                                        }
                                                        $809 = ((($771)) + 16|0);
                                                        $810 = HEAP32[$809>>2]|0;
                                                        $811 = ($810|0)==($720|0);
                                                        if ($811) {
                                                            HEAP32[$809>>2] = $R$1$i$i;
                                                        } else {
                                                            $812 = ((($771)) + 20|0);
                                                            HEAP32[$812>>2] = $R$1$i$i;
                                                        }
                                                        $813 = ($R$1$i$i|0)==(0|0);
                                                        if ($813) {
                                                            break L332;
                                                        }
                                                    }
                                                } while(0);
                                                $814 = HEAP32[(188)>>2]|0;
                                                $815 = ($R$1$i$i>>>0)<($814>>>0);
                                                if ($815) {
                                                    _abort();
                                                    // unreachable;
                                                }
                                                $816 = ((($R$1$i$i)) + 24|0);
                                                HEAP32[$816>>2] = $771;
                                                $$sum3132$i$i = $719 | 16;
                                                $$sum119$i = (($$sum3132$i$i) + ($tsize$254$i))|0;
                                                $817 = (($tbase$255$i) + ($$sum119$i)|0);
                                                $818 = HEAP32[$817>>2]|0;
                                                $819 = ($818|0)==(0|0);
                                                do {
                                                    if (!($819)) {
                                                        $820 = ($818>>>0)<($814>>>0);
                                                        if ($820) {
                                                            _abort();
                                                            // unreachable;
                                                        } else {
                                                            $821 = ((($R$1$i$i)) + 16|0);
                                                            HEAP32[$821>>2] = $818;
                                                            $822 = ((($818)) + 24|0);
                                                            HEAP32[$822>>2] = $R$1$i$i;
                                                            break;
                                                        }
                                                    }
                                                } while(0);
                                                $$sum120$i = (($$sum2$i21$i) + ($$sum3132$i$i))|0;
                                                $823 = (($tbase$255$i) + ($$sum120$i)|0);
                                                $824 = HEAP32[$823>>2]|0;
                                                $825 = ($824|0)==(0|0);
                                                if ($825) {
                                                    break;
                                                }
                                                $826 = HEAP32[(188)>>2]|0;
                                                $827 = ($824>>>0)<($826>>>0);
                                                if ($827) {
                                                    _abort();
                                                    // unreachable;
                                                } else {
                                                    $828 = ((($R$1$i$i)) + 20|0);
                                                    HEAP32[$828>>2] = $824;
                                                    $829 = ((($824)) + 24|0);
                                                    HEAP32[$829>>2] = $R$1$i$i;
                                                    break;
                                                }
                                            }
                                        } while(0);
                                        $$sum9$i$i = $744 | $719;
                                        $$sum121$i = (($$sum9$i$i) + ($tsize$254$i))|0;
                                        $830 = (($tbase$255$i) + ($$sum121$i)|0);
                                        $831 = (($744) + ($725))|0;
                                        $oldfirst$0$i$i = $830;$qsize$0$i$i = $831;
                                    } else {
                                        $oldfirst$0$i$i = $720;$qsize$0$i$i = $725;
                                    }
                                    $832 = ((($oldfirst$0$i$i)) + 4|0);
                                    $833 = HEAP32[$832>>2]|0;
                                    $834 = $833 & -2;
                                    HEAP32[$832>>2] = $834;
                                    $835 = $qsize$0$i$i | 1;
                                    $$sum10$i$i = (($$sum$i19$i) + 4)|0;
                                    $836 = (($tbase$255$i) + ($$sum10$i$i)|0);
                                    HEAP32[$836>>2] = $835;
                                    $$sum11$i$i = (($qsize$0$i$i) + ($$sum$i19$i))|0;
                                    $837 = (($tbase$255$i) + ($$sum11$i$i)|0);
                                    HEAP32[$837>>2] = $qsize$0$i$i;
                                    $838 = $qsize$0$i$i >>> 3;
                                    $839 = ($qsize$0$i$i>>>0)<(256);
                                    if ($839) {
                                        $840 = $838 << 1;
                                        $841 = (212 + ($840<<2)|0);
                                        $842 = HEAP32[172>>2]|0;
                                        $843 = 1 << $838;
                                        $844 = $842 & $843;
                                        $845 = ($844|0)==(0);
                                        do {
                                            if ($845) {
                                                $846 = $842 | $843;
                                                HEAP32[172>>2] = $846;
                                                $$pre$i22$i = (($840) + 2)|0;
                                                $$pre56$i$i = (212 + ($$pre$i22$i<<2)|0);
                                                $$pre$phi$i23$iZ2D = $$pre56$i$i;$F4$0$i$i = $841;
                                            } else {
                                                $$sum29$i$i = (($840) + 2)|0;
                                                $847 = (212 + ($$sum29$i$i<<2)|0);
                                                $848 = HEAP32[$847>>2]|0;
                                                $849 = HEAP32[(188)>>2]|0;
                                                $850 = ($848>>>0)<($849>>>0);
                                                if (!($850)) {
                                                    $$pre$phi$i23$iZ2D = $847;$F4$0$i$i = $848;
                                                    break;
                                                }
                                                _abort();
                                                // unreachable;
                                            }
                                        } while(0);
                                        HEAP32[$$pre$phi$i23$iZ2D>>2] = $724;
                                        $851 = ((($F4$0$i$i)) + 12|0);
                                        HEAP32[$851>>2] = $724;
                                        $$sum27$i$i = (($$sum$i19$i) + 8)|0;
                                        $852 = (($tbase$255$i) + ($$sum27$i$i)|0);
                                        HEAP32[$852>>2] = $F4$0$i$i;
                                        $$sum28$i$i = (($$sum$i19$i) + 12)|0;
                                        $853 = (($tbase$255$i) + ($$sum28$i$i)|0);
                                        HEAP32[$853>>2] = $841;
                                        break;
                                    }
                                    $854 = $qsize$0$i$i >>> 8;
                                    $855 = ($854|0)==(0);
                                    do {
                                        if ($855) {
                                            $I7$0$i$i = 0;
                                        } else {
                                            $856 = ($qsize$0$i$i>>>0)>(16777215);
                                            if ($856) {
                                                $I7$0$i$i = 31;
                                                break;
                                            }
                                            $857 = (($854) + 1048320)|0;
                                            $858 = $857 >>> 16;
                                            $859 = $858 & 8;
                                            $860 = $854 << $859;
                                            $861 = (($860) + 520192)|0;
                                            $862 = $861 >>> 16;
                                            $863 = $862 & 4;
                                            $864 = $863 | $859;
                                            $865 = $860 << $863;
                                            $866 = (($865) + 245760)|0;
                                            $867 = $866 >>> 16;
                                            $868 = $867 & 2;
                                            $869 = $864 | $868;
                                            $870 = (14 - ($869))|0;
                                            $871 = $865 << $868;
                                            $872 = $871 >>> 15;
                                            $873 = (($870) + ($872))|0;
                                            $874 = $873 << 1;
                                            $875 = (($873) + 7)|0;
                                            $876 = $qsize$0$i$i >>> $875;
                                            $877 = $876 & 1;
                                            $878 = $877 | $874;
                                            $I7$0$i$i = $878;
                                        }
                                    } while(0);
                                    $879 = (476 + ($I7$0$i$i<<2)|0);
                                    $$sum12$i$i = (($$sum$i19$i) + 28)|0;
                                    $880 = (($tbase$255$i) + ($$sum12$i$i)|0);
                                    HEAP32[$880>>2] = $I7$0$i$i;
                                    $$sum13$i$i = (($$sum$i19$i) + 16)|0;
                                    $881 = (($tbase$255$i) + ($$sum13$i$i)|0);
                                    $$sum14$i$i = (($$sum$i19$i) + 20)|0;
                                    $882 = (($tbase$255$i) + ($$sum14$i$i)|0);
                                    HEAP32[$882>>2] = 0;
                                    HEAP32[$881>>2] = 0;
                                    $883 = HEAP32[(176)>>2]|0;
                                    $884 = 1 << $I7$0$i$i;
                                    $885 = $883 & $884;
                                    $886 = ($885|0)==(0);
                                    if ($886) {
                                        $887 = $883 | $884;
                                        HEAP32[(176)>>2] = $887;
                                        HEAP32[$879>>2] = $724;
                                        $$sum15$i$i = (($$sum$i19$i) + 24)|0;
                                        $888 = (($tbase$255$i) + ($$sum15$i$i)|0);
                                        HEAP32[$888>>2] = $879;
                                        $$sum16$i$i = (($$sum$i19$i) + 12)|0;
                                        $889 = (($tbase$255$i) + ($$sum16$i$i)|0);
                                        HEAP32[$889>>2] = $724;
                                        $$sum17$i$i = (($$sum$i19$i) + 8)|0;
                                        $890 = (($tbase$255$i) + ($$sum17$i$i)|0);
                                        HEAP32[$890>>2] = $724;
                                        break;
                                    }
                                    $891 = HEAP32[$879>>2]|0;
                                    $892 = ((($891)) + 4|0);
                                    $893 = HEAP32[$892>>2]|0;
                                    $894 = $893 & -8;
                                    $895 = ($894|0)==($qsize$0$i$i|0);
                                    L418: do {
                                        if ($895) {
                                            $T$0$lcssa$i25$i = $891;
                                        } else {
                                            $896 = ($I7$0$i$i|0)==(31);
                                            $897 = $I7$0$i$i >>> 1;
                                            $898 = (25 - ($897))|0;
                                            $899 = $896 ? 0 : $898;
                                            $900 = $qsize$0$i$i << $899;
                                            $K8$051$i$i = $900;$T$050$i$i = $891;
                                            while(1) {
                                                $907 = $K8$051$i$i >>> 31;
                                                $908 = (((($T$050$i$i)) + 16|0) + ($907<<2)|0);
                                                $903 = HEAP32[$908>>2]|0;
                                                $909 = ($903|0)==(0|0);
                                                if ($909) {
                                                    $$lcssa = $908;$T$050$i$i$lcssa = $T$050$i$i;
                                                    break;
                                                }
                                                $901 = $K8$051$i$i << 1;
                                                $902 = ((($903)) + 4|0);
                                                $904 = HEAP32[$902>>2]|0;
                                                $905 = $904 & -8;
                                                $906 = ($905|0)==($qsize$0$i$i|0);
                                                if ($906) {
                                                    $T$0$lcssa$i25$i = $903;
                                                    break L418;
                                                } else {
                                                    $K8$051$i$i = $901;$T$050$i$i = $903;
                                                }
                                            }
                                            $910 = HEAP32[(188)>>2]|0;
                                            $911 = ($$lcssa>>>0)<($910>>>0);
                                            if ($911) {
                                                _abort();
                                                // unreachable;
                                            } else {
                                                HEAP32[$$lcssa>>2] = $724;
                                                $$sum23$i$i = (($$sum$i19$i) + 24)|0;
                                                $912 = (($tbase$255$i) + ($$sum23$i$i)|0);
                                                HEAP32[$912>>2] = $T$050$i$i$lcssa;
                                                $$sum24$i$i = (($$sum$i19$i) + 12)|0;
                                                $913 = (($tbase$255$i) + ($$sum24$i$i)|0);
                                                HEAP32[$913>>2] = $724;
                                                $$sum25$i$i = (($$sum$i19$i) + 8)|0;
                                                $914 = (($tbase$255$i) + ($$sum25$i$i)|0);
                                                HEAP32[$914>>2] = $724;
                                                break L324;
                                            }
                                        }
                                    } while(0);
                                    $915 = ((($T$0$lcssa$i25$i)) + 8|0);
                                    $916 = HEAP32[$915>>2]|0;
                                    $917 = HEAP32[(188)>>2]|0;
                                    $918 = ($916>>>0)>=($917>>>0);
                                    $not$$i26$i = ($T$0$lcssa$i25$i>>>0)>=($917>>>0);
                                    $919 = $918 & $not$$i26$i;
                                    if ($919) {
                                        $920 = ((($916)) + 12|0);
                                        HEAP32[$920>>2] = $724;
                                        HEAP32[$915>>2] = $724;
                                        $$sum20$i$i = (($$sum$i19$i) + 8)|0;
                                        $921 = (($tbase$255$i) + ($$sum20$i$i)|0);
                                        HEAP32[$921>>2] = $916;
                                        $$sum21$i$i = (($$sum$i19$i) + 12)|0;
                                        $922 = (($tbase$255$i) + ($$sum21$i$i)|0);
                                        HEAP32[$922>>2] = $T$0$lcssa$i25$i;
                                        $$sum22$i$i = (($$sum$i19$i) + 24)|0;
                                        $923 = (($tbase$255$i) + ($$sum22$i$i)|0);
                                        HEAP32[$923>>2] = 0;
                                        break;
                                    } else {
                                        _abort();
                                        // unreachable;
                                    }
                                }
                            } while(0);
                            $$sum1819$i$i = $711 | 8;
                            $924 = (($tbase$255$i) + ($$sum1819$i$i)|0);
                            $mem$0 = $924;
                            return ($mem$0|0);
                        } else {
                            $sp$0$i$i$i = (620);
                        }
                    }
                    while(1) {
                        $925 = HEAP32[$sp$0$i$i$i>>2]|0;
                        $926 = ($925>>>0)>($635>>>0);
                        if (!($926)) {
                            $927 = ((($sp$0$i$i$i)) + 4|0);
                            $928 = HEAP32[$927>>2]|0;
                            $929 = (($925) + ($928)|0);
                            $930 = ($929>>>0)>($635>>>0);
                            if ($930) {
                                $$lcssa215 = $925;$$lcssa216 = $928;$$lcssa217 = $929;
                                break;
                            }
                        }
                        $931 = ((($sp$0$i$i$i)) + 8|0);
                        $932 = HEAP32[$931>>2]|0;
                        $sp$0$i$i$i = $932;
                    }
                    $$sum$i14$i = (($$lcssa216) + -47)|0;
                    $$sum1$i15$i = (($$lcssa216) + -39)|0;
                    $933 = (($$lcssa215) + ($$sum1$i15$i)|0);
                    $934 = $933;
                    $935 = $934 & 7;
                    $936 = ($935|0)==(0);
                    $937 = (0 - ($934))|0;
                    $938 = $937 & 7;
                    $939 = $936 ? 0 : $938;
                    $$sum2$i16$i = (($$sum$i14$i) + ($939))|0;
                    $940 = (($$lcssa215) + ($$sum2$i16$i)|0);
                    $941 = ((($635)) + 16|0);
                    $942 = ($940>>>0)<($941>>>0);
                    $943 = $942 ? $635 : $940;
                    $944 = ((($943)) + 8|0);
                    $945 = (($tsize$254$i) + -40)|0;
                    $946 = ((($tbase$255$i)) + 8|0);
                    $947 = $946;
                    $948 = $947 & 7;
                    $949 = ($948|0)==(0);
                    $950 = (0 - ($947))|0;
                    $951 = $950 & 7;
                    $952 = $949 ? 0 : $951;
                    $953 = (($tbase$255$i) + ($952)|0);
                    $954 = (($945) - ($952))|0;
                    HEAP32[(196)>>2] = $953;
                    HEAP32[(184)>>2] = $954;
                    $955 = $954 | 1;
                    $$sum$i$i$i = (($952) + 4)|0;
                    $956 = (($tbase$255$i) + ($$sum$i$i$i)|0);
                    HEAP32[$956>>2] = $955;
                    $$sum2$i$i$i = (($tsize$254$i) + -36)|0;
                    $957 = (($tbase$255$i) + ($$sum2$i$i$i)|0);
                    HEAP32[$957>>2] = 40;
                    $958 = HEAP32[(660)>>2]|0;
                    HEAP32[(200)>>2] = $958;
                    $959 = ((($943)) + 4|0);
                    HEAP32[$959>>2] = 27;
                    ;HEAP32[$944>>2]=HEAP32[(620)>>2]|0;HEAP32[$944+4>>2]=HEAP32[(620)+4>>2]|0;HEAP32[$944+8>>2]=HEAP32[(620)+8>>2]|0;HEAP32[$944+12>>2]=HEAP32[(620)+12>>2]|0;
                    HEAP32[(620)>>2] = $tbase$255$i;
                    HEAP32[(624)>>2] = $tsize$254$i;
                    HEAP32[(632)>>2] = 0;
                    HEAP32[(628)>>2] = $944;
                    $960 = ((($943)) + 28|0);
                    HEAP32[$960>>2] = 7;
                    $961 = ((($943)) + 32|0);
                    $962 = ($961>>>0)<($$lcssa217>>>0);
                    if ($962) {
                        $964 = $960;
                        while(1) {
                            $963 = ((($964)) + 4|0);
                            HEAP32[$963>>2] = 7;
                            $965 = ((($964)) + 8|0);
                            $966 = ($965>>>0)<($$lcssa217>>>0);
                            if ($966) {
                                $964 = $963;
                            } else {
                                break;
                            }
                        }
                    }
                    $967 = ($943|0)==($635|0);
                    if (!($967)) {
                        $968 = $943;
                        $969 = $635;
                        $970 = (($968) - ($969))|0;
                        $971 = HEAP32[$959>>2]|0;
                        $972 = $971 & -2;
                        HEAP32[$959>>2] = $972;
                        $973 = $970 | 1;
                        $974 = ((($635)) + 4|0);
                        HEAP32[$974>>2] = $973;
                        HEAP32[$943>>2] = $970;
                        $975 = $970 >>> 3;
                        $976 = ($970>>>0)<(256);
                        if ($976) {
                            $977 = $975 << 1;
                            $978 = (212 + ($977<<2)|0);
                            $979 = HEAP32[172>>2]|0;
                            $980 = 1 << $975;
                            $981 = $979 & $980;
                            $982 = ($981|0)==(0);
                            if ($982) {
                                $983 = $979 | $980;
                                HEAP32[172>>2] = $983;
                                $$pre$i$i = (($977) + 2)|0;
                                $$pre14$i$i = (212 + ($$pre$i$i<<2)|0);
                                $$pre$phi$i$iZ2D = $$pre14$i$i;$F$0$i$i = $978;
                            } else {
                                $$sum4$i$i = (($977) + 2)|0;
                                $984 = (212 + ($$sum4$i$i<<2)|0);
                                $985 = HEAP32[$984>>2]|0;
                                $986 = HEAP32[(188)>>2]|0;
                                $987 = ($985>>>0)<($986>>>0);
                                if ($987) {
                                    _abort();
                                    // unreachable;
                                } else {
                                    $$pre$phi$i$iZ2D = $984;$F$0$i$i = $985;
                                }
                            }
                            HEAP32[$$pre$phi$i$iZ2D>>2] = $635;
                            $988 = ((($F$0$i$i)) + 12|0);
                            HEAP32[$988>>2] = $635;
                            $989 = ((($635)) + 8|0);
                            HEAP32[$989>>2] = $F$0$i$i;
                            $990 = ((($635)) + 12|0);
                            HEAP32[$990>>2] = $978;
                            break;
                        }
                        $991 = $970 >>> 8;
                        $992 = ($991|0)==(0);
                        if ($992) {
                            $I1$0$i$i = 0;
                        } else {
                            $993 = ($970>>>0)>(16777215);
                            if ($993) {
                                $I1$0$i$i = 31;
                            } else {
                                $994 = (($991) + 1048320)|0;
                                $995 = $994 >>> 16;
                                $996 = $995 & 8;
                                $997 = $991 << $996;
                                $998 = (($997) + 520192)|0;
                                $999 = $998 >>> 16;
                                $1000 = $999 & 4;
                                $1001 = $1000 | $996;
                                $1002 = $997 << $1000;
                                $1003 = (($1002) + 245760)|0;
                                $1004 = $1003 >>> 16;
                                $1005 = $1004 & 2;
                                $1006 = $1001 | $1005;
                                $1007 = (14 - ($1006))|0;
                                $1008 = $1002 << $1005;
                                $1009 = $1008 >>> 15;
                                $1010 = (($1007) + ($1009))|0;
                                $1011 = $1010 << 1;
                                $1012 = (($1010) + 7)|0;
                                $1013 = $970 >>> $1012;
                                $1014 = $1013 & 1;
                                $1015 = $1014 | $1011;
                                $I1$0$i$i = $1015;
                            }
                        }
                        $1016 = (476 + ($I1$0$i$i<<2)|0);
                        $1017 = ((($635)) + 28|0);
                        HEAP32[$1017>>2] = $I1$0$i$i;
                        $1018 = ((($635)) + 20|0);
                        HEAP32[$1018>>2] = 0;
                        HEAP32[$941>>2] = 0;
                        $1019 = HEAP32[(176)>>2]|0;
                        $1020 = 1 << $I1$0$i$i;
                        $1021 = $1019 & $1020;
                        $1022 = ($1021|0)==(0);
                        if ($1022) {
                            $1023 = $1019 | $1020;
                            HEAP32[(176)>>2] = $1023;
                            HEAP32[$1016>>2] = $635;
                            $1024 = ((($635)) + 24|0);
                            HEAP32[$1024>>2] = $1016;
                            $1025 = ((($635)) + 12|0);
                            HEAP32[$1025>>2] = $635;
                            $1026 = ((($635)) + 8|0);
                            HEAP32[$1026>>2] = $635;
                            break;
                        }
                        $1027 = HEAP32[$1016>>2]|0;
                        $1028 = ((($1027)) + 4|0);
                        $1029 = HEAP32[$1028>>2]|0;
                        $1030 = $1029 & -8;
                        $1031 = ($1030|0)==($970|0);
                        L459: do {
                            if ($1031) {
                                $T$0$lcssa$i$i = $1027;
                            } else {
                                $1032 = ($I1$0$i$i|0)==(31);
                                $1033 = $I1$0$i$i >>> 1;
                                $1034 = (25 - ($1033))|0;
                                $1035 = $1032 ? 0 : $1034;
                                $1036 = $970 << $1035;
                                $K2$07$i$i = $1036;$T$06$i$i = $1027;
                                while(1) {
                                    $1043 = $K2$07$i$i >>> 31;
                                    $1044 = (((($T$06$i$i)) + 16|0) + ($1043<<2)|0);
                                    $1039 = HEAP32[$1044>>2]|0;
                                    $1045 = ($1039|0)==(0|0);
                                    if ($1045) {
                                        $$lcssa211 = $1044;$T$06$i$i$lcssa = $T$06$i$i;
                                        break;
                                    }
                                    $1037 = $K2$07$i$i << 1;
                                    $1038 = ((($1039)) + 4|0);
                                    $1040 = HEAP32[$1038>>2]|0;
                                    $1041 = $1040 & -8;
                                    $1042 = ($1041|0)==($970|0);
                                    if ($1042) {
                                        $T$0$lcssa$i$i = $1039;
                                        break L459;
                                    } else {
                                        $K2$07$i$i = $1037;$T$06$i$i = $1039;
                                    }
                                }
                                $1046 = HEAP32[(188)>>2]|0;
                                $1047 = ($$lcssa211>>>0)<($1046>>>0);
                                if ($1047) {
                                    _abort();
                                    // unreachable;
                                } else {
                                    HEAP32[$$lcssa211>>2] = $635;
                                    $1048 = ((($635)) + 24|0);
                                    HEAP32[$1048>>2] = $T$06$i$i$lcssa;
                                    $1049 = ((($635)) + 12|0);
                                    HEAP32[$1049>>2] = $635;
                                    $1050 = ((($635)) + 8|0);
                                    HEAP32[$1050>>2] = $635;
                                    break L299;
                                }
                            }
                        } while(0);
                        $1051 = ((($T$0$lcssa$i$i)) + 8|0);
                        $1052 = HEAP32[$1051>>2]|0;
                        $1053 = HEAP32[(188)>>2]|0;
                        $1054 = ($1052>>>0)>=($1053>>>0);
                        $not$$i$i = ($T$0$lcssa$i$i>>>0)>=($1053>>>0);
                        $1055 = $1054 & $not$$i$i;
                        if ($1055) {
                            $1056 = ((($1052)) + 12|0);
                            HEAP32[$1056>>2] = $635;
                            HEAP32[$1051>>2] = $635;
                            $1057 = ((($635)) + 8|0);
                            HEAP32[$1057>>2] = $1052;
                            $1058 = ((($635)) + 12|0);
                            HEAP32[$1058>>2] = $T$0$lcssa$i$i;
                            $1059 = ((($635)) + 24|0);
                            HEAP32[$1059>>2] = 0;
                            break;
                        } else {
                            _abort();
                            // unreachable;
                        }
                    }
                }
            } while(0);
            $1060 = HEAP32[(184)>>2]|0;
            $1061 = ($1060>>>0)>($nb$0>>>0);
            if ($1061) {
                $1062 = (($1060) - ($nb$0))|0;
                HEAP32[(184)>>2] = $1062;
                $1063 = HEAP32[(196)>>2]|0;
                $1064 = (($1063) + ($nb$0)|0);
                HEAP32[(196)>>2] = $1064;
                $1065 = $1062 | 1;
                $$sum$i32 = (($nb$0) + 4)|0;
                $1066 = (($1063) + ($$sum$i32)|0);
                HEAP32[$1066>>2] = $1065;
                $1067 = $nb$0 | 3;
                $1068 = ((($1063)) + 4|0);
                HEAP32[$1068>>2] = $1067;
                $1069 = ((($1063)) + 8|0);
                $mem$0 = $1069;
                return ($mem$0|0);
            }
        }
        $1070 = (___errno_location()|0);
        HEAP32[$1070>>2] = 12;
        $mem$0 = 0;
        return ($mem$0|0);
    }
    function _free($mem) {
        $mem = $mem|0;
        var $$lcssa = 0, $$pre = 0, $$pre$phi59Z2D = 0, $$pre$phi61Z2D = 0, $$pre$phiZ2D = 0, $$pre57 = 0, $$pre58 = 0, $$pre60 = 0, $$sum = 0, $$sum11 = 0, $$sum12 = 0, $$sum13 = 0, $$sum14 = 0, $$sum1718 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0;
        var $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0;
        var $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0;
        var $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0;
        var $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0;
        var $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0;
        var $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0;
        var $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0;
        var $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0;
        var $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0;
        var $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0;
        var $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0;
        var $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
        var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
        var $321 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0;
        var $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0;
        var $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
        var $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $K19$052 = 0, $R$0 = 0, $R$0$lcssa = 0, $R$1 = 0;
        var $R7$0 = 0, $R7$0$lcssa = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$lcssa = 0, $RP9$0 = 0, $RP9$0$lcssa = 0, $T$0$lcssa = 0, $T$051 = 0, $T$051$lcssa = 0, $cond = 0, $cond47 = 0, $not$ = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
        sp = STACKTOP;
        $0 = ($mem|0)==(0|0);
        if ($0) {
            return;
        }
        $1 = ((($mem)) + -8|0);
        $2 = HEAP32[(188)>>2]|0;
        $3 = ($1>>>0)<($2>>>0);
        if ($3) {
            _abort();
            // unreachable;
        }
        $4 = ((($mem)) + -4|0);
        $5 = HEAP32[$4>>2]|0;
        $6 = $5 & 3;
        $7 = ($6|0)==(1);
        if ($7) {
            _abort();
            // unreachable;
        }
        $8 = $5 & -8;
        $$sum = (($8) + -8)|0;
        $9 = (($mem) + ($$sum)|0);
        $10 = $5 & 1;
        $11 = ($10|0)==(0);
        do {
            if ($11) {
                $12 = HEAP32[$1>>2]|0;
                $13 = ($6|0)==(0);
                if ($13) {
                    return;
                }
                $$sum2 = (-8 - ($12))|0;
                $14 = (($mem) + ($$sum2)|0);
                $15 = (($12) + ($8))|0;
                $16 = ($14>>>0)<($2>>>0);
                if ($16) {
                    _abort();
                    // unreachable;
                }
                $17 = HEAP32[(192)>>2]|0;
                $18 = ($14|0)==($17|0);
                if ($18) {
                    $$sum3 = (($8) + -4)|0;
                    $103 = (($mem) + ($$sum3)|0);
                    $104 = HEAP32[$103>>2]|0;
                    $105 = $104 & 3;
                    $106 = ($105|0)==(3);
                    if (!($106)) {
                        $p$0 = $14;$psize$0 = $15;
                        break;
                    }
                    HEAP32[(180)>>2] = $15;
                    $107 = $104 & -2;
                    HEAP32[$103>>2] = $107;
                    $108 = $15 | 1;
                    $$sum20 = (($$sum2) + 4)|0;
                    $109 = (($mem) + ($$sum20)|0);
                    HEAP32[$109>>2] = $108;
                    HEAP32[$9>>2] = $15;
                    return;
                }
                $19 = $12 >>> 3;
                $20 = ($12>>>0)<(256);
                if ($20) {
                    $$sum30 = (($$sum2) + 8)|0;
                    $21 = (($mem) + ($$sum30)|0);
                    $22 = HEAP32[$21>>2]|0;
                    $$sum31 = (($$sum2) + 12)|0;
                    $23 = (($mem) + ($$sum31)|0);
                    $24 = HEAP32[$23>>2]|0;
                    $25 = $19 << 1;
                    $26 = (212 + ($25<<2)|0);
                    $27 = ($22|0)==($26|0);
                    if (!($27)) {
                        $28 = ($22>>>0)<($2>>>0);
                        if ($28) {
                            _abort();
                            // unreachable;
                        }
                        $29 = ((($22)) + 12|0);
                        $30 = HEAP32[$29>>2]|0;
                        $31 = ($30|0)==($14|0);
                        if (!($31)) {
                            _abort();
                            // unreachable;
                        }
                    }
                    $32 = ($24|0)==($22|0);
                    if ($32) {
                        $33 = 1 << $19;
                        $34 = $33 ^ -1;
                        $35 = HEAP32[172>>2]|0;
                        $36 = $35 & $34;
                        HEAP32[172>>2] = $36;
                        $p$0 = $14;$psize$0 = $15;
                        break;
                    }
                    $37 = ($24|0)==($26|0);
                    if ($37) {
                        $$pre60 = ((($24)) + 8|0);
                        $$pre$phi61Z2D = $$pre60;
                    } else {
                        $38 = ($24>>>0)<($2>>>0);
                        if ($38) {
                            _abort();
                            // unreachable;
                        }
                        $39 = ((($24)) + 8|0);
                        $40 = HEAP32[$39>>2]|0;
                        $41 = ($40|0)==($14|0);
                        if ($41) {
                            $$pre$phi61Z2D = $39;
                        } else {
                            _abort();
                            // unreachable;
                        }
                    }
                    $42 = ((($22)) + 12|0);
                    HEAP32[$42>>2] = $24;
                    HEAP32[$$pre$phi61Z2D>>2] = $22;
                    $p$0 = $14;$psize$0 = $15;
                    break;
                }
                $$sum22 = (($$sum2) + 24)|0;
                $43 = (($mem) + ($$sum22)|0);
                $44 = HEAP32[$43>>2]|0;
                $$sum23 = (($$sum2) + 12)|0;
                $45 = (($mem) + ($$sum23)|0);
                $46 = HEAP32[$45>>2]|0;
                $47 = ($46|0)==($14|0);
                do {
                    if ($47) {
                        $$sum25 = (($$sum2) + 20)|0;
                        $57 = (($mem) + ($$sum25)|0);
                        $58 = HEAP32[$57>>2]|0;
                        $59 = ($58|0)==(0|0);
                        if ($59) {
                            $$sum24 = (($$sum2) + 16)|0;
                            $60 = (($mem) + ($$sum24)|0);
                            $61 = HEAP32[$60>>2]|0;
                            $62 = ($61|0)==(0|0);
                            if ($62) {
                                $R$1 = 0;
                                break;
                            } else {
                                $R$0 = $61;$RP$0 = $60;
                            }
                        } else {
                            $R$0 = $58;$RP$0 = $57;
                        }
                        while(1) {
                            $63 = ((($R$0)) + 20|0);
                            $64 = HEAP32[$63>>2]|0;
                            $65 = ($64|0)==(0|0);
                            if (!($65)) {
                                $R$0 = $64;$RP$0 = $63;
                                continue;
                            }
                            $66 = ((($R$0)) + 16|0);
                            $67 = HEAP32[$66>>2]|0;
                            $68 = ($67|0)==(0|0);
                            if ($68) {
                                $R$0$lcssa = $R$0;$RP$0$lcssa = $RP$0;
                                break;
                            } else {
                                $R$0 = $67;$RP$0 = $66;
                            }
                        }
                        $69 = ($RP$0$lcssa>>>0)<($2>>>0);
                        if ($69) {
                            _abort();
                            // unreachable;
                        } else {
                            HEAP32[$RP$0$lcssa>>2] = 0;
                            $R$1 = $R$0$lcssa;
                            break;
                        }
                    } else {
                        $$sum29 = (($$sum2) + 8)|0;
                        $48 = (($mem) + ($$sum29)|0);
                        $49 = HEAP32[$48>>2]|0;
                        $50 = ($49>>>0)<($2>>>0);
                        if ($50) {
                            _abort();
                            // unreachable;
                        }
                        $51 = ((($49)) + 12|0);
                        $52 = HEAP32[$51>>2]|0;
                        $53 = ($52|0)==($14|0);
                        if (!($53)) {
                            _abort();
                            // unreachable;
                        }
                        $54 = ((($46)) + 8|0);
                        $55 = HEAP32[$54>>2]|0;
                        $56 = ($55|0)==($14|0);
                        if ($56) {
                            HEAP32[$51>>2] = $46;
                            HEAP32[$54>>2] = $49;
                            $R$1 = $46;
                            break;
                        } else {
                            _abort();
                            // unreachable;
                        }
                    }
                } while(0);
                $70 = ($44|0)==(0|0);
                if ($70) {
                    $p$0 = $14;$psize$0 = $15;
                } else {
                    $$sum26 = (($$sum2) + 28)|0;
                    $71 = (($mem) + ($$sum26)|0);
                    $72 = HEAP32[$71>>2]|0;
                    $73 = (476 + ($72<<2)|0);
                    $74 = HEAP32[$73>>2]|0;
                    $75 = ($14|0)==($74|0);
                    if ($75) {
                        HEAP32[$73>>2] = $R$1;
                        $cond = ($R$1|0)==(0|0);
                        if ($cond) {
                            $76 = 1 << $72;
                            $77 = $76 ^ -1;
                            $78 = HEAP32[(176)>>2]|0;
                            $79 = $78 & $77;
                            HEAP32[(176)>>2] = $79;
                            $p$0 = $14;$psize$0 = $15;
                            break;
                        }
                    } else {
                        $80 = HEAP32[(188)>>2]|0;
                        $81 = ($44>>>0)<($80>>>0);
                        if ($81) {
                            _abort();
                            // unreachable;
                        }
                        $82 = ((($44)) + 16|0);
                        $83 = HEAP32[$82>>2]|0;
                        $84 = ($83|0)==($14|0);
                        if ($84) {
                            HEAP32[$82>>2] = $R$1;
                        } else {
                            $85 = ((($44)) + 20|0);
                            HEAP32[$85>>2] = $R$1;
                        }
                        $86 = ($R$1|0)==(0|0);
                        if ($86) {
                            $p$0 = $14;$psize$0 = $15;
                            break;
                        }
                    }
                    $87 = HEAP32[(188)>>2]|0;
                    $88 = ($R$1>>>0)<($87>>>0);
                    if ($88) {
                        _abort();
                        // unreachable;
                    }
                    $89 = ((($R$1)) + 24|0);
                    HEAP32[$89>>2] = $44;
                    $$sum27 = (($$sum2) + 16)|0;
                    $90 = (($mem) + ($$sum27)|0);
                    $91 = HEAP32[$90>>2]|0;
                    $92 = ($91|0)==(0|0);
                    do {
                        if (!($92)) {
                            $93 = ($91>>>0)<($87>>>0);
                            if ($93) {
                                _abort();
                                // unreachable;
                            } else {
                                $94 = ((($R$1)) + 16|0);
                                HEAP32[$94>>2] = $91;
                                $95 = ((($91)) + 24|0);
                                HEAP32[$95>>2] = $R$1;
                                break;
                            }
                        }
                    } while(0);
                    $$sum28 = (($$sum2) + 20)|0;
                    $96 = (($mem) + ($$sum28)|0);
                    $97 = HEAP32[$96>>2]|0;
                    $98 = ($97|0)==(0|0);
                    if ($98) {
                        $p$0 = $14;$psize$0 = $15;
                    } else {
                        $99 = HEAP32[(188)>>2]|0;
                        $100 = ($97>>>0)<($99>>>0);
                        if ($100) {
                            _abort();
                            // unreachable;
                        } else {
                            $101 = ((($R$1)) + 20|0);
                            HEAP32[$101>>2] = $97;
                            $102 = ((($97)) + 24|0);
                            HEAP32[$102>>2] = $R$1;
                            $p$0 = $14;$psize$0 = $15;
                            break;
                        }
                    }
                }
            } else {
                $p$0 = $1;$psize$0 = $8;
            }
        } while(0);
        $110 = ($p$0>>>0)<($9>>>0);
        if (!($110)) {
            _abort();
            // unreachable;
        }
        $$sum19 = (($8) + -4)|0;
        $111 = (($mem) + ($$sum19)|0);
        $112 = HEAP32[$111>>2]|0;
        $113 = $112 & 1;
        $114 = ($113|0)==(0);
        if ($114) {
            _abort();
            // unreachable;
        }
        $115 = $112 & 2;
        $116 = ($115|0)==(0);
        if ($116) {
            $117 = HEAP32[(196)>>2]|0;
            $118 = ($9|0)==($117|0);
            if ($118) {
                $119 = HEAP32[(184)>>2]|0;
                $120 = (($119) + ($psize$0))|0;
                HEAP32[(184)>>2] = $120;
                HEAP32[(196)>>2] = $p$0;
                $121 = $120 | 1;
                $122 = ((($p$0)) + 4|0);
                HEAP32[$122>>2] = $121;
                $123 = HEAP32[(192)>>2]|0;
                $124 = ($p$0|0)==($123|0);
                if (!($124)) {
                    return;
                }
                HEAP32[(192)>>2] = 0;
                HEAP32[(180)>>2] = 0;
                return;
            }
            $125 = HEAP32[(192)>>2]|0;
            $126 = ($9|0)==($125|0);
            if ($126) {
                $127 = HEAP32[(180)>>2]|0;
                $128 = (($127) + ($psize$0))|0;
                HEAP32[(180)>>2] = $128;
                HEAP32[(192)>>2] = $p$0;
                $129 = $128 | 1;
                $130 = ((($p$0)) + 4|0);
                HEAP32[$130>>2] = $129;
                $131 = (($p$0) + ($128)|0);
                HEAP32[$131>>2] = $128;
                return;
            }
            $132 = $112 & -8;
            $133 = (($132) + ($psize$0))|0;
            $134 = $112 >>> 3;
            $135 = ($112>>>0)<(256);
            do {
                if ($135) {
                    $136 = (($mem) + ($8)|0);
                    $137 = HEAP32[$136>>2]|0;
                    $$sum1718 = $8 | 4;
                    $138 = (($mem) + ($$sum1718)|0);
                    $139 = HEAP32[$138>>2]|0;
                    $140 = $134 << 1;
                    $141 = (212 + ($140<<2)|0);
                    $142 = ($137|0)==($141|0);
                    if (!($142)) {
                        $143 = HEAP32[(188)>>2]|0;
                        $144 = ($137>>>0)<($143>>>0);
                        if ($144) {
                            _abort();
                            // unreachable;
                        }
                        $145 = ((($137)) + 12|0);
                        $146 = HEAP32[$145>>2]|0;
                        $147 = ($146|0)==($9|0);
                        if (!($147)) {
                            _abort();
                            // unreachable;
                        }
                    }
                    $148 = ($139|0)==($137|0);
                    if ($148) {
                        $149 = 1 << $134;
                        $150 = $149 ^ -1;
                        $151 = HEAP32[172>>2]|0;
                        $152 = $151 & $150;
                        HEAP32[172>>2] = $152;
                        break;
                    }
                    $153 = ($139|0)==($141|0);
                    if ($153) {
                        $$pre58 = ((($139)) + 8|0);
                        $$pre$phi59Z2D = $$pre58;
                    } else {
                        $154 = HEAP32[(188)>>2]|0;
                        $155 = ($139>>>0)<($154>>>0);
                        if ($155) {
                            _abort();
                            // unreachable;
                        }
                        $156 = ((($139)) + 8|0);
                        $157 = HEAP32[$156>>2]|0;
                        $158 = ($157|0)==($9|0);
                        if ($158) {
                            $$pre$phi59Z2D = $156;
                        } else {
                            _abort();
                            // unreachable;
                        }
                    }
                    $159 = ((($137)) + 12|0);
                    HEAP32[$159>>2] = $139;
                    HEAP32[$$pre$phi59Z2D>>2] = $137;
                } else {
                    $$sum5 = (($8) + 16)|0;
                    $160 = (($mem) + ($$sum5)|0);
                    $161 = HEAP32[$160>>2]|0;
                    $$sum67 = $8 | 4;
                    $162 = (($mem) + ($$sum67)|0);
                    $163 = HEAP32[$162>>2]|0;
                    $164 = ($163|0)==($9|0);
                    do {
                        if ($164) {
                            $$sum9 = (($8) + 12)|0;
                            $175 = (($mem) + ($$sum9)|0);
                            $176 = HEAP32[$175>>2]|0;
                            $177 = ($176|0)==(0|0);
                            if ($177) {
                                $$sum8 = (($8) + 8)|0;
                                $178 = (($mem) + ($$sum8)|0);
                                $179 = HEAP32[$178>>2]|0;
                                $180 = ($179|0)==(0|0);
                                if ($180) {
                                    $R7$1 = 0;
                                    break;
                                } else {
                                    $R7$0 = $179;$RP9$0 = $178;
                                }
                            } else {
                                $R7$0 = $176;$RP9$0 = $175;
                            }
                            while(1) {
                                $181 = ((($R7$0)) + 20|0);
                                $182 = HEAP32[$181>>2]|0;
                                $183 = ($182|0)==(0|0);
                                if (!($183)) {
                                    $R7$0 = $182;$RP9$0 = $181;
                                    continue;
                                }
                                $184 = ((($R7$0)) + 16|0);
                                $185 = HEAP32[$184>>2]|0;
                                $186 = ($185|0)==(0|0);
                                if ($186) {
                                    $R7$0$lcssa = $R7$0;$RP9$0$lcssa = $RP9$0;
                                    break;
                                } else {
                                    $R7$0 = $185;$RP9$0 = $184;
                                }
                            }
                            $187 = HEAP32[(188)>>2]|0;
                            $188 = ($RP9$0$lcssa>>>0)<($187>>>0);
                            if ($188) {
                                _abort();
                                // unreachable;
                            } else {
                                HEAP32[$RP9$0$lcssa>>2] = 0;
                                $R7$1 = $R7$0$lcssa;
                                break;
                            }
                        } else {
                            $165 = (($mem) + ($8)|0);
                            $166 = HEAP32[$165>>2]|0;
                            $167 = HEAP32[(188)>>2]|0;
                            $168 = ($166>>>0)<($167>>>0);
                            if ($168) {
                                _abort();
                                // unreachable;
                            }
                            $169 = ((($166)) + 12|0);
                            $170 = HEAP32[$169>>2]|0;
                            $171 = ($170|0)==($9|0);
                            if (!($171)) {
                                _abort();
                                // unreachable;
                            }
                            $172 = ((($163)) + 8|0);
                            $173 = HEAP32[$172>>2]|0;
                            $174 = ($173|0)==($9|0);
                            if ($174) {
                                HEAP32[$169>>2] = $163;
                                HEAP32[$172>>2] = $166;
                                $R7$1 = $163;
                                break;
                            } else {
                                _abort();
                                // unreachable;
                            }
                        }
                    } while(0);
                    $189 = ($161|0)==(0|0);
                    if (!($189)) {
                        $$sum12 = (($8) + 20)|0;
                        $190 = (($mem) + ($$sum12)|0);
                        $191 = HEAP32[$190>>2]|0;
                        $192 = (476 + ($191<<2)|0);
                        $193 = HEAP32[$192>>2]|0;
                        $194 = ($9|0)==($193|0);
                        if ($194) {
                            HEAP32[$192>>2] = $R7$1;
                            $cond47 = ($R7$1|0)==(0|0);
                            if ($cond47) {
                                $195 = 1 << $191;
                                $196 = $195 ^ -1;
                                $197 = HEAP32[(176)>>2]|0;
                                $198 = $197 & $196;
                                HEAP32[(176)>>2] = $198;
                                break;
                            }
                        } else {
                            $199 = HEAP32[(188)>>2]|0;
                            $200 = ($161>>>0)<($199>>>0);
                            if ($200) {
                                _abort();
                                // unreachable;
                            }
                            $201 = ((($161)) + 16|0);
                            $202 = HEAP32[$201>>2]|0;
                            $203 = ($202|0)==($9|0);
                            if ($203) {
                                HEAP32[$201>>2] = $R7$1;
                            } else {
                                $204 = ((($161)) + 20|0);
                                HEAP32[$204>>2] = $R7$1;
                            }
                            $205 = ($R7$1|0)==(0|0);
                            if ($205) {
                                break;
                            }
                        }
                        $206 = HEAP32[(188)>>2]|0;
                        $207 = ($R7$1>>>0)<($206>>>0);
                        if ($207) {
                            _abort();
                            // unreachable;
                        }
                        $208 = ((($R7$1)) + 24|0);
                        HEAP32[$208>>2] = $161;
                        $$sum13 = (($8) + 8)|0;
                        $209 = (($mem) + ($$sum13)|0);
                        $210 = HEAP32[$209>>2]|0;
                        $211 = ($210|0)==(0|0);
                        do {
                            if (!($211)) {
                                $212 = ($210>>>0)<($206>>>0);
                                if ($212) {
                                    _abort();
                                    // unreachable;
                                } else {
                                    $213 = ((($R7$1)) + 16|0);
                                    HEAP32[$213>>2] = $210;
                                    $214 = ((($210)) + 24|0);
                                    HEAP32[$214>>2] = $R7$1;
                                    break;
                                }
                            }
                        } while(0);
                        $$sum14 = (($8) + 12)|0;
                        $215 = (($mem) + ($$sum14)|0);
                        $216 = HEAP32[$215>>2]|0;
                        $217 = ($216|0)==(0|0);
                        if (!($217)) {
                            $218 = HEAP32[(188)>>2]|0;
                            $219 = ($216>>>0)<($218>>>0);
                            if ($219) {
                                _abort();
                                // unreachable;
                            } else {
                                $220 = ((($R7$1)) + 20|0);
                                HEAP32[$220>>2] = $216;
                                $221 = ((($216)) + 24|0);
                                HEAP32[$221>>2] = $R7$1;
                                break;
                            }
                        }
                    }
                }
            } while(0);
            $222 = $133 | 1;
            $223 = ((($p$0)) + 4|0);
            HEAP32[$223>>2] = $222;
            $224 = (($p$0) + ($133)|0);
            HEAP32[$224>>2] = $133;
            $225 = HEAP32[(192)>>2]|0;
            $226 = ($p$0|0)==($225|0);
            if ($226) {
                HEAP32[(180)>>2] = $133;
                return;
            } else {
                $psize$1 = $133;
            }
        } else {
            $227 = $112 & -2;
            HEAP32[$111>>2] = $227;
            $228 = $psize$0 | 1;
            $229 = ((($p$0)) + 4|0);
            HEAP32[$229>>2] = $228;
            $230 = (($p$0) + ($psize$0)|0);
            HEAP32[$230>>2] = $psize$0;
            $psize$1 = $psize$0;
        }
        $231 = $psize$1 >>> 3;
        $232 = ($psize$1>>>0)<(256);
        if ($232) {
            $233 = $231 << 1;
            $234 = (212 + ($233<<2)|0);
            $235 = HEAP32[172>>2]|0;
            $236 = 1 << $231;
            $237 = $235 & $236;
            $238 = ($237|0)==(0);
            if ($238) {
                $239 = $235 | $236;
                HEAP32[172>>2] = $239;
                $$pre = (($233) + 2)|0;
                $$pre57 = (212 + ($$pre<<2)|0);
                $$pre$phiZ2D = $$pre57;$F16$0 = $234;
            } else {
                $$sum11 = (($233) + 2)|0;
                $240 = (212 + ($$sum11<<2)|0);
                $241 = HEAP32[$240>>2]|0;
                $242 = HEAP32[(188)>>2]|0;
                $243 = ($241>>>0)<($242>>>0);
                if ($243) {
                    _abort();
                    // unreachable;
                } else {
                    $$pre$phiZ2D = $240;$F16$0 = $241;
                }
            }
            HEAP32[$$pre$phiZ2D>>2] = $p$0;
            $244 = ((($F16$0)) + 12|0);
            HEAP32[$244>>2] = $p$0;
            $245 = ((($p$0)) + 8|0);
            HEAP32[$245>>2] = $F16$0;
            $246 = ((($p$0)) + 12|0);
            HEAP32[$246>>2] = $234;
            return;
        }
        $247 = $psize$1 >>> 8;
        $248 = ($247|0)==(0);
        if ($248) {
            $I18$0 = 0;
        } else {
            $249 = ($psize$1>>>0)>(16777215);
            if ($249) {
                $I18$0 = 31;
            } else {
                $250 = (($247) + 1048320)|0;
                $251 = $250 >>> 16;
                $252 = $251 & 8;
                $253 = $247 << $252;
                $254 = (($253) + 520192)|0;
                $255 = $254 >>> 16;
                $256 = $255 & 4;
                $257 = $256 | $252;
                $258 = $253 << $256;
                $259 = (($258) + 245760)|0;
                $260 = $259 >>> 16;
                $261 = $260 & 2;
                $262 = $257 | $261;
                $263 = (14 - ($262))|0;
                $264 = $258 << $261;
                $265 = $264 >>> 15;
                $266 = (($263) + ($265))|0;
                $267 = $266 << 1;
                $268 = (($266) + 7)|0;
                $269 = $psize$1 >>> $268;
                $270 = $269 & 1;
                $271 = $270 | $267;
                $I18$0 = $271;
            }
        }
        $272 = (476 + ($I18$0<<2)|0);
        $273 = ((($p$0)) + 28|0);
        HEAP32[$273>>2] = $I18$0;
        $274 = ((($p$0)) + 16|0);
        $275 = ((($p$0)) + 20|0);
        HEAP32[$275>>2] = 0;
        HEAP32[$274>>2] = 0;
        $276 = HEAP32[(176)>>2]|0;
        $277 = 1 << $I18$0;
        $278 = $276 & $277;
        $279 = ($278|0)==(0);
        L199: do {
            if ($279) {
                $280 = $276 | $277;
                HEAP32[(176)>>2] = $280;
                HEAP32[$272>>2] = $p$0;
                $281 = ((($p$0)) + 24|0);
                HEAP32[$281>>2] = $272;
                $282 = ((($p$0)) + 12|0);
                HEAP32[$282>>2] = $p$0;
                $283 = ((($p$0)) + 8|0);
                HEAP32[$283>>2] = $p$0;
            } else {
                $284 = HEAP32[$272>>2]|0;
                $285 = ((($284)) + 4|0);
                $286 = HEAP32[$285>>2]|0;
                $287 = $286 & -8;
                $288 = ($287|0)==($psize$1|0);
                L202: do {
                    if ($288) {
                        $T$0$lcssa = $284;
                    } else {
                        $289 = ($I18$0|0)==(31);
                        $290 = $I18$0 >>> 1;
                        $291 = (25 - ($290))|0;
                        $292 = $289 ? 0 : $291;
                        $293 = $psize$1 << $292;
                        $K19$052 = $293;$T$051 = $284;
                        while(1) {
                            $300 = $K19$052 >>> 31;
                            $301 = (((($T$051)) + 16|0) + ($300<<2)|0);
                            $296 = HEAP32[$301>>2]|0;
                            $302 = ($296|0)==(0|0);
                            if ($302) {
                                $$lcssa = $301;$T$051$lcssa = $T$051;
                                break;
                            }
                            $294 = $K19$052 << 1;
                            $295 = ((($296)) + 4|0);
                            $297 = HEAP32[$295>>2]|0;
                            $298 = $297 & -8;
                            $299 = ($298|0)==($psize$1|0);
                            if ($299) {
                                $T$0$lcssa = $296;
                                break L202;
                            } else {
                                $K19$052 = $294;$T$051 = $296;
                            }
                        }
                        $303 = HEAP32[(188)>>2]|0;
                        $304 = ($$lcssa>>>0)<($303>>>0);
                        if ($304) {
                            _abort();
                            // unreachable;
                        } else {
                            HEAP32[$$lcssa>>2] = $p$0;
                            $305 = ((($p$0)) + 24|0);
                            HEAP32[$305>>2] = $T$051$lcssa;
                            $306 = ((($p$0)) + 12|0);
                            HEAP32[$306>>2] = $p$0;
                            $307 = ((($p$0)) + 8|0);
                            HEAP32[$307>>2] = $p$0;
                            break L199;
                        }
                    }
                } while(0);
                $308 = ((($T$0$lcssa)) + 8|0);
                $309 = HEAP32[$308>>2]|0;
                $310 = HEAP32[(188)>>2]|0;
                $311 = ($309>>>0)>=($310>>>0);
                $not$ = ($T$0$lcssa>>>0)>=($310>>>0);
                $312 = $311 & $not$;
                if ($312) {
                    $313 = ((($309)) + 12|0);
                    HEAP32[$313>>2] = $p$0;
                    HEAP32[$308>>2] = $p$0;
                    $314 = ((($p$0)) + 8|0);
                    HEAP32[$314>>2] = $309;
                    $315 = ((($p$0)) + 12|0);
                    HEAP32[$315>>2] = $T$0$lcssa;
                    $316 = ((($p$0)) + 24|0);
                    HEAP32[$316>>2] = 0;
                    break;
                } else {
                    _abort();
                    // unreachable;
                }
            }
        } while(0);
        $317 = HEAP32[(204)>>2]|0;
        $318 = (($317) + -1)|0;
        HEAP32[(204)>>2] = $318;
        $319 = ($318|0)==(0);
        if ($319) {
            $sp$0$in$i = (628);
        } else {
            return;
        }
        while(1) {
            $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
            $320 = ($sp$0$i|0)==(0|0);
            $321 = ((($sp$0$i)) + 8|0);
            if ($320) {
                break;
            } else {
                $sp$0$in$i = $321;
            }
        }
        HEAP32[(204)>>2] = -1;
        return;
    }
    function runPostSets() {
    }
    function _memset(ptr, value, num) {
        ptr = ptr|0; value = value|0; num = num|0;
        var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
        stop = (ptr + num)|0;
        if ((num|0) >= 20) {
            // This is unaligned, but quite large, so work hard to get to aligned settings
            value = value & 0xff;
            unaligned = ptr & 3;
            value4 = value | (value << 8) | (value << 16) | (value << 24);
            stop4 = stop & ~3;
            if (unaligned) {
                unaligned = (ptr + 4 - unaligned)|0;
                while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
                    HEAP8[((ptr)>>0)]=value;
                    ptr = (ptr+1)|0;
                }
            }
            while ((ptr|0) < (stop4|0)) {
                HEAP32[((ptr)>>2)]=value4;
                ptr = (ptr+4)|0;
            }
        }
        while ((ptr|0) < (stop|0)) {
            HEAP8[((ptr)>>0)]=value;
            ptr = (ptr+1)|0;
        }
        return (ptr-num)|0;
    }
    function _memcpy(dest, src, num) {
        dest = dest|0; src = src|0; num = num|0;
        var ret = 0;
        if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
        ret = dest|0;
        if ((dest&3) == (src&3)) {
            while (dest & 3) {
                if ((num|0) == 0) return ret|0;
                HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
                dest = (dest+1)|0;
                src = (src+1)|0;
                num = (num-1)|0;
            }
            while ((num|0) >= 4) {
                HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
                dest = (dest+4)|0;
                src = (src+4)|0;
                num = (num-4)|0;
            }
        }
        while ((num|0) > 0) {
            HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
            dest = (dest+1)|0;
            src = (src+1)|0;
            num = (num-1)|0;
        }
        return ret|0;
    }


    function dynCall_ii(index,a1) {
        index = index|0;
        a1=a1|0;
        return FUNCTION_TABLE_ii[index&1](a1|0)|0;
    }


    function dynCall_iiii(index,a1,a2,a3) {
        index = index|0;
        a1=a1|0; a2=a2|0; a3=a3|0;
        return FUNCTION_TABLE_iiii[index&7](a1|0,a2|0,a3|0)|0;
    }


    function dynCall_vi(index,a1) {
        index = index|0;
        a1=a1|0;
        FUNCTION_TABLE_vi[index&7](a1|0);
    }

    function b0(p0) {
        p0 = p0|0; nullFunc_ii(0);return 0;
    }
    function b1(p0,p1,p2) {
        p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(1);return 0;
    }
    function b2(p0) {
        p0 = p0|0; nullFunc_vi(2);
    }

// EMSCRIPTEN_END_FUNCS
    var FUNCTION_TABLE_ii = [b0,___stdio_close];
    var FUNCTION_TABLE_iiii = [b1,b1,___stdout_write,___stdio_seek,b1,___stdio_write,b1,b1];
    var FUNCTION_TABLE_vi = [b2,b2,b2,b2,_cleanup526,b2,b2,b2];

    return { _free: _free, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _fflush: _fflush, ___errno_location: ___errno_location, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_ii: dynCall_ii, dynCall_iiii: dynCall_iiii, dynCall_vi: dynCall_vi };
})
// EMSCRIPTEN_END_ASM