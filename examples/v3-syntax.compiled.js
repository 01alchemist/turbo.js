var m_i8;
var m_i16;
var m_i32;
var m_u8;
var m_u16;
var m_u32;
var m_f32;
var m_f64;
var alloc = function (bytes, align) {

};
var MyParallelObject = {};
MyParallelObject.NAME = "MyParallelObject";
MyParallelObject.SIZE = 16;
MyParallelObject.ALIGN = 4;
MyParallelObject.CLSID = 25480;
MyParallelObject.init = function (ptr, id) {
    m_i32[(ptr + 8) >> 2] = id;
    return ptr;
};
MyParallelObject.initInstance = function (ptr) {
    m_i32[ptr >> 2] = MyParallelObject.CLSID;
    return ptr;
};
MyParallelObject.new = function (id) {
    return MyParallelObject.init(
        MyParallelObject.initInstance(
            alloc(MyParallelObject.SIZE, MyParallelObject.ALIGN)
        ), id);
};
