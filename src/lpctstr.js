var ffi = require('ffi-napi');
var ref = require('ref-napi');

const lpctstr = {
    name: 'lpctstr',
    indirection: 1,
    size: ref.sizeof.pointer,
    get: function(buffer, offset) {
        var _buf = buffer.readPointer(offset);
        if(_buf.isNull()) {
            return null;
        }
        return _buf.readCString(0);
    },
    set: function(buffer, offset, value) {
        var _buf = ref.allocCString(value, 'ucs2');

        return buffer.writePointer(_buf, offset);
    },
    ffi_type: ffi.types.CString.ffi_type
};

module.exports = lpctstr;
