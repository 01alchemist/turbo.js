"use strict";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 *
 */
exports.Ws = "\\s+";
exports.Os = "\\s*";
exports.Id = "[A-Za-z][A-Za-z0-9]*"; // Note, no underscores are allowed yet
exports.Lbrace = exports.Os + "\\{";
exports.Rbrace = exports.Os + "\\}";
exports.LParen = exports.Os + "\\(";
exports.CommentOpt = exports.Os + "(?:\\/\\/.*)?";
exports.QualifierOpt = "(?:\\.(atomic|synchronic))?";
exports.OpNames = "at|get|setAt|set|ref|add|sub|and|or|xor|compareExchange|loadWhenEqual|loadWhenNotEqual|expectUpdate|notify";
exports.Operation = "(?:\\.(" + exports.OpNames + "))";
exports.OperationOpt = exports.Operation + "?";
exports.OperationLParen = "(?:\\.(" + exports.OpNames + ")" + exports.LParen + ")";
exports.NullaryOperation = "(?:\\.(ref|notify))";
exports.Path = "((?:\\." + exports.Id + ")+)";
exports.PathLazy = "((?:\\." + exports.Id + ")+?)";
exports.PathOpt = "((?:\\." + exports.Id + ")*)";
exports.PathOptLazy = "((?:\\." + exports.Id + ")*?)";
exports.AssignOp = "(=|\\+=|-=|&=|\\|=|\\^=)(?!=)";
exports.start_re = new RegExp("^" + exports.Os + "@turbo::" + exports.Ws + "(?:struct|class)" + exports.Ws + "(?:" + exports.Id + ")");
exports.end_re = new RegExp("^" + exports.Rbrace + exports.Os + "@end" + exports.CommentOpt + "$");
exports.struct_re = new RegExp("^" + exports.Os + "@turbo::" + exports.Ws + "struct" + exports.Ws + "(" + exports.Id + ")" + exports.Lbrace + exports.CommentOpt + "$");
exports.class_re = new RegExp("^" + exports.Os + "@turbo::" + exports.Ws + "class" + exports.Ws + "(" + exports.Id + ")" + exports.Os + "(?:extends" + exports.Ws + "(" + exports.Id + "))?" + exports.Lbrace + exports.CommentOpt + "$");
exports.special_re = new RegExp("^" + exports.Os + "@(get|set)" + "(" + exports.LParen + exports.Os + "SELF.*)$");
exports.method_re = new RegExp("^" + exports.Os + "@(method|virtual)" + exports.Ws + "(" + exports.Id + ")" + "(" + exports.LParen + exports.Os + "SELF.*)$");
exports.blank_re = new RegExp("^" + exports.Os + exports.CommentOpt + "$");
exports.space_re = new RegExp("^" + exports.Os + "$");
exports.prop_re = new RegExp("^" + exports.Os + "(" + exports.Id + ")" + exports.Os + ":" + exports.Os + "(" + exports.Id + ")" + exports.QualifierOpt + "(?:\.(Array))?" + exports.Os + ";?" + exports.CommentOpt + "$");
exports.new_re = new RegExp("@new\\s+(" + exports.Id + ")" + exports.QualifierOpt + "(?:\\.(Array)" + exports.LParen + ")?", "g");
exports.acc_re = new RegExp("(" + exports.Id + ")" + exports.PathOptLazy + "(?:" + exports.Operation + "|)" + exports.LParen, "g");
// It would sure be nice to avoid the explicit ".Array" here, but I don't yet know how.
exports.arr_re = new RegExp("(" + exports.Id + ")" + exports.QualifierOpt + "\\.Array" + exports.PathOpt + exports.Operation + exports.LParen, "g");
// Macro expansion and pasteup
exports.self_getter1_re = new RegExp("SELF" + exports.Path + exports.NullaryOperation, "g");
exports.self_getter2_re = new RegExp("SELF" + exports.Path, "g");
exports.self_accessor_re = new RegExp("SELF" + exports.Path + exports.OperationLParen, "g");
exports.self_setter_re = new RegExp("SELF" + exports.Path + exports.Os + exports.AssignOp + exports.Os, "g");
exports.self_invoke_re = new RegExp("SELF\\.(" + exports.Id + ")" + exports.LParen, "g");
// We've eaten "SELF.id op " and need to grab a plausible RHS.
//
// Various complications here:
//
//   nested fields: SELF.x_y_z += 10
//   stacked:  SELF.x = SELF.y = SELF.z = 0
//   used for value:  v = (SELF.x = 10)
//
// Easiest fix is to change the spec so that a setter returns a value,
// which is the rhs.  The regular assignment and Atomics.store
// already does that.  I just changed _synchronicsStore so that it
// does that too.  BUT SIMD STORE INSTRUCTIONS DO NOT.  Good grief.
//
// For now, disallow stacking of simd values (but don't detect it).
exports.AssignmentOps = {
    "=": "set",
    "+=": "add",
    "-=": "sub",
    "&=": "and",
    "|=": "or",
    "^=": "xor"
};
exports.OpAttr = {
    "get": { arity: 1, atomic: "load", synchronic: "" },
    "ref": { arity: 1, atomic: "", synchronic: "" },
    "notify": { arity: 1, atomic: "", synchronic: "_synchronicNotify" },
    "set": { arity: 2, atomic: "store", synchronic: "_synchronicStore", vanilla: "=" },
    "add": { arity: 2, atomic: "add", synchronic: "_synchronicAdd", vanilla: "+=" },
    "sub": { arity: 2, atomic: "sub", synchronic: "_synchronicSub", vanilla: "-=" },
    "and": { arity: 2, atomic: "and", synchronic: "_synchronicAnd", vanilla: "&=" },
    "or": { arity: 2, atomic: "or", synchronic: "_synchronicOr", vanilla: "|=" },
    "xor": { arity: 2, atomic: "xor", synchronic: "_synchronicXor", vanilla: "^=" },
    "loadWhenEqual": { arity: 2, atomic: "", synchronic: "_synchronicLoadWhenEqual" },
    "loadWhenNotEqual": { arity: 2, atomic: "", synchronic: "_synchronicLoadWhenNotEqual" },
    "expectUpdate": { arity: 3, atomic: "", synchronic: "_synchronicExpectUpdate" },
    "compareExchange": { arity: 3, atomic: "compareExchange", synchronic: "_synchronicCompareExchange" },
};
//# sourceMappingURL=CONST.js.map