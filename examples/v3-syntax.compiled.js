var unsafe = {
    mem_i8:new Int8Array(),
    m_i16:new Int16Array(),
    m_i32:new Int32Array(),
    m_u8:new Uint8Array(),
    m_u16:new Uint16Array(),
    m_u32:new Uint32Array(),
    m_f32:new Float32Array(),
    m_f64:new Float64Array()
};

var alloc = function (bytes, align) {

};
var MyParallelObject = {};
MyParallelObject.NAME = "MyParallelObject";
MyParallelObject.SIZE = 16;
MyParallelObject.ALIGN = 4;
MyParallelObject.CLSID = 25480;
MyParallelObject.internal_init = function (ptr, id) {
    unsafe.m_i32[(ptr + 8) >> 2] = id;
    return ptr;
};
MyParallelObject.internal_initInstance = function (ptr) {
    unsafe.m_i32[ptr >> 2] = MyParallelObject.CLSID;
    return ptr;
};
MyParallelObject.new = function (id) {
    return MyParallelObject.init(
        MyParallelObject.initInstance(
            alloc(MyParallelObject.SIZE, MyParallelObject.ALIGN)
        ), id);
};
