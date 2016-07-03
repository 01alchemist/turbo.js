System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Created by Nidin Vinayakan on 6/18/2016.
     * sizeof type in bytes
     */
    function sizeof(type) {
        switch (type) {
            case typeof int8:
            case uint8: return 1;
            case short:
            case ushort: return 2;
            case int:
            case uint:
            case float: return 4;
            case double: return 8;
            default: {
                if (!type.size) {
                    console.error("sizeof(Unknown data) Unknown type");
                }
                return 0;
            }
        }
    }
    exports_1("sizeof", sizeof);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=sizeof.js.map