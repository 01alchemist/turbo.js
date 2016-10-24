/**
 * Created by Nidin Vinayakan on 4/7/2016.
 *
 */
export const Ws = "\\s+";
export const Os = "\\s*";
export const Id = "[A-Za-z][A-Za-z0-9]*"; // Note, no underscores are allowed yet
export const Lbrace = Os + "\\{";
export const Rbrace = Os + "\\}";
export const LParen = Os + "\\(";
export const CommentOpt = Os + "(?:\\/\\/.*)?";
export const QualifierOpt = "(?:\\.(atomic|synchronic))?"
export const OpNames = "at|get|setAt|set|ref|add|sub|and|or|xor|compareExchange|loadWhenEqual|loadWhenNotEqual|expectUpdate|notify";
export const Operation = "(?:\\.(" + OpNames + "))";
export const OperationOpt = Operation + "?";
export const OperationLParen = "(?:\\.(" + OpNames + ")" + LParen + ")";
export const NullaryOperation = "(?:\\.(ref|notify))";
export const Path = "((?:\\." + Id + ")+)";
export const PathLazy = "((?:\\." + Id + ")+?)";
export const PathOpt = "((?:\\." + Id + ")*)";
export const PathOptLazy = "((?:\\." + Id + ")*?)";
export const AssignOp = "(=|\\+=|-=|&=|\\|=|\\^=)(?!=)";

export const Matcher = {
    START: new RegExp("^" + Os + "@turbo" + Ws + "(?:struct|class)" + Ws + "(?:" + Id + ")"),
    END: new RegExp("^" + Rbrace + Os + "//@end" + CommentOpt + "$"),
    STRUCT: new RegExp("^" + Os + "@turbo" + Ws + "struct" + Ws + "(" + Id + ")" + Lbrace + CommentOpt + "$"),
    CLASS: new RegExp("^" + Os + "@turbo" + Ws + "class" + Ws + "(" + Id + ")" + Os + "(?:extends" + Ws + "(" + Id + "))?" + Lbrace + CommentOpt + "$"),
    SPECIAL: new RegExp("^" + Os + "@(get|set)" + "(" + LParen + Os + "SELF.*)$"),
    METHOD: new RegExp("^" + Os + "@(method|virtual)" + Ws + "(" + Id + ")" + "(" + LParen + Os + "SELF.*)$"),
    BLANK: new RegExp("^" + Os + CommentOpt + "$"),
    SPACE: new RegExp("^" + Os + "$"),
    PROP: new RegExp("^" + Os + "(" + Id + ")" + Os + ":" + Os + "(" + Id + ")" + QualifierOpt + "(?:\.(Array))?" + Os + ",?" + CommentOpt + "$"),

    NEW: new RegExp("@new\\s+(" + Id + ")" + QualifierOpt + "(?:\\.(Array)" + LParen + ")?", "g"),

    ACC: new RegExp("(" + Id + ")" + PathOptLazy + "(?:" + Operation + "|)" + LParen, "g"),

    // It would sure be nice to avoid the explicit ".Array" here, but I don't yet know how.
    ARR: new RegExp("(" + Id + ")" + QualifierOpt + "\\.Array" + PathOpt + Operation + LParen, "g"),

    // Macro expansion and pasteup

    self_getter1: new RegExp("SELF" + Path + NullaryOperation, "g"),
    self_getter2: new RegExp("SELF" + Path, "g"),
    self_accessor: new RegExp("SELF" + Path + OperationLParen, "g"),
    self_setter: new RegExp("SELF" + Path + Os + AssignOp + Os, "g"),
    self_invoke: new RegExp("SELF\\.(" + Id + ")" + LParen, "g")
};

export const start_re = new RegExp("^" + Os + "@turbo" + Ws + "(?:struct|class)" + Ws + "(?:" + Id + ")");
export const end_re = new RegExp("^" + Rbrace + Os + "//@end" + CommentOpt + "$");
export const struct_re = new RegExp("^" + Os + "@turbo" + Ws + "struct" + Ws + "(" + Id + ")" + Lbrace + CommentOpt + "$");
export const class_re = new RegExp("^" + Os + "@turbo" + Ws + "class" + Ws + "(" + Id + ")" + Os + "(?:extends" + Ws + "(" + Id + "))?" + Lbrace + CommentOpt + "$");
export const special_re = new RegExp("^" + Os + "@(get|set)" + "(" + LParen + Os + "SELF.*)$");
export const method_re = new RegExp("^" + Os + "@(method|virtual)" + Ws + "(" + Id + ")" + "(" + LParen + Os + "SELF.*)$");
export const blank_re = new RegExp("^" + Os + CommentOpt + "$");
export const space_re = new RegExp("^" + Os + "$");
export const prop_re = new RegExp("^" + Os + "(" + Id + ")" + Os + ":" + Os + "(" + Id + ")" + QualifierOpt + "(?:\.(Array))?" + Os + ";?" + CommentOpt + "$");

export const new_re = new RegExp("@new\\s+(" + Id + ")" + QualifierOpt + "(?:\\.(Array)" + LParen + ")?", "g");

export const acc_re = new RegExp("(" + Id + ")" + PathOptLazy + "(?:" + Operation + "|)" + LParen, "g");

// It would sure be nice to avoid the explicit ".Array" here, but I don't yet know how.
export const arr_re = new RegExp("(" + Id + ")" + QualifierOpt + "\\.Array" + PathOpt + Operation + LParen, "g");

// Macro expansion and pasteup

export const self_getter1_re = new RegExp("SELF" + Path + NullaryOperation, "g");
export const self_getter2_re = new RegExp("SELF" + Path, "g");
export const self_accessor_re = new RegExp("SELF" + Path + OperationLParen, "g");
export const self_setter_re = new RegExp("SELF" + Path + Os + AssignOp + Os, "g");
export const self_invoke_re = new RegExp("SELF\\.(" + Id + ")" + LParen, "g");

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

export const AssignmentOps =
{
    "=": "set",
    "+=": "add",
    "-=": "sub",
    "&=": "and",
    "|=": "or",
    "^=": "xor"
};
export const OpAttr = {
    "get": {arity: 1, atomic: "load", synchronic: ""},
    "ref": {arity: 1, atomic: "", synchronic: ""},
    "notify": {arity: 1, atomic: "", synchronic: "_synchronicNotify"},
    "set": {arity: 2, atomic: "store", synchronic: "_synchronicStore", vanilla: "="},
    "add": {arity: 2, atomic: "add", synchronic: "_synchronicAdd", vanilla: "+="},
    "sub": {arity: 2, atomic: "sub", synchronic: "_synchronicSub", vanilla: "-="},
    "and": {arity: 2, atomic: "and", synchronic: "_synchronicAnd", vanilla: "&="},
    "or": {arity: 2, atomic: "or", synchronic: "_synchronicOr", vanilla: "|="},
    "xor": {arity: 2, atomic: "xor", synchronic: "_synchronicXor", vanilla: "^="},
    "loadWhenEqual": {arity: 2, atomic: "", synchronic: "_synchronicLoadWhenEqual"},
    "loadWhenNotEqual": {arity: 2, atomic: "", synchronic: "_synchronicLoadWhenNotEqual"},
    "expectUpdate": {arity: 3, atomic: "", synchronic: "_synchronicExpectUpdate"},
    "compareExchange": {arity: 3, atomic: "compareExchange", synchronic: "_synchronicCompareExchange"},
};