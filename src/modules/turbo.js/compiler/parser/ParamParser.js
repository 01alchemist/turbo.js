"use strict";
var ProgramError_1 = require("../errors/ProgramError");
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
var ParamParser = (function () {
    function ParamParser(file, line, input, pos, requireRightParen, stopAtSemi) {
        if (requireRightParen === void 0) { requireRightParen = true; }
        if (stopAtSemi === void 0) { stopAtSemi = false; }
        this.file = file;
        this.line = line;
        this.input = input;
        this.pos = pos;
        this.requireRightParen = requireRightParen;
        this.stopAtSemi = stopAtSemi;
        this.lim = 0;
        this.done = false;
        this.sawSemi = false;
        this.lim = input.length;
    }
    // Returns null on failure to find a next argument
    ParamParser.prototype.nextArg = function () {
        if (this.done)
            return null;
        var depth = 0;
        var start = this.pos;
        var sawRightParen = false;
        var sawComma = false;
        var fellOff = false;
        // Issue #8: Really should handle regular expressions, but much harder, and somewhat marginal
        loop: for (;;) {
            if (this.pos == this.lim) {
                this.done = true;
                fellOff = true;
                break loop;
            }
            switch (this.input.charAt(this.pos++)) {
                case '/':
                    if (this.pos < this.lim && this.input.charAt(this.pos) == '/') {
                        this.done = true;
                        break loop;
                    }
                    if (this.pos < this.lim && this.input.charAt(this.pos) == '*') {
                        this.pos++;
                        for (;;) {
                            if (this.pos == this.lim)
                                throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within comment.");
                            if (this.input.charAt(this.pos++) == '*' && this.pos < this.lim && this.input.charAt(this.pos) == '/')
                                break;
                        }
                    }
                    break;
                case ';':
                    if (depth == 0 && this.stopAtSemi) {
                        this.done = true;
                        this.sawSemi = true;
                        break loop;
                    }
                    break;
                case ',':
                    if (depth == 0) {
                        sawComma = true;
                        break loop;
                    }
                    break;
                case '(':
                case '{':
                case '[':
                    depth++;
                    break;
                case '}':
                case ']':
                    depth--;
                    break;
                case ')':
                    if (depth == 0) {
                        this.done = true;
                        sawRightParen = true;
                        break loop;
                    }
                    depth--;
                    break;
                case '\'':
                case '"':
                    {
                        var c = this.input.charAt(this.pos - 1);
                        for (;;) {
                            if (this.pos == this.lim)
                                throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - within a string.");
                            var d = this.input.charAt(this.pos++);
                            if (d == c)
                                break;
                            if (d == '\\') {
                                if (this.pos < this.lim)
                                    this.pos++;
                            }
                        }
                        break;
                    }
                case '`':
                    // Issue #25: Allow template strings
                    throw new ProgramError_1.ProgramError(this.file, this.line, "Avoid template strings in arguments for now");
            }
        }
        var result = this.cleanupArg(this.input.substring(start, fellOff ? this.pos : this.pos - 1));
        // Don't consume it if we don't know if we're going to find it.
        if (sawRightParen && !this.requireRightParen)
            this.pos--;
        if (this.done && depth > 0)
            throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within parentheses.");
        if (this.done && this.requireRightParen && !sawRightParen)
            throw new ProgramError_1.ProgramError(this.file, this.line, "Line ended unexpectedly - expected ')'.  " + this.input);
        return result;
    };
    ParamParser.prototype.allArgs = function () {
        var as = [];
        var a;
        while (a = this.nextArg())
            as.push(a);
        return as;
    };
    Object.defineProperty(ParamParser.prototype, "where", {
        get: function () {
            return this.pos;
        },
        enumerable: true,
        configurable: true
    });
    ParamParser.prototype.cleanupArg = function (s) {
        s = s.replace(/^\s*|\s*$/g, "");
        if (s == "")
            return null;
        return s;
    };
    return ParamParser;
}());
exports.ParamParser = ParamParser;
//# sourceMappingURL=ParamParser.js.map