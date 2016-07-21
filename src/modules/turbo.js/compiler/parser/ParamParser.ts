import {ProgramError} from "../errors/ProgramError";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class ParamParser {
    private lim = 0;
    private done = false;

    sawSemi = false;

    constructor(private file:string, private line:number, private input:string, private pos:number,
                private requireRightParen = true, private stopAtSemi = false) {
        this.lim = input.length;
    }

    // Returns null on failure to find a next argument
    nextArg():string {
        if (this.done)
            return null;
        let depth = 0;
        let start = this.pos;
        let sawRightParen = false;
        let sawComma = false;
        let fellOff = false;
        // Issue #8: Really should handle regular expressions, but much harder, and somewhat marginal
        loop:
            for (; ;) {
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
                            for (; ;) {
                                if (this.pos == this.lim)
                                    throw new ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within comment.");
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
                        let c = this.input.charAt(this.pos - 1);
                        for (; ;) {
                            if (this.pos == this.lim)
                                throw new ProgramError(this.file, this.line, "Line ended unexpectedly - within a string.");
                            let d = this.input.charAt(this.pos++);
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
                        throw new ProgramError(this.file, this.line, "Avoid template strings in arguments for now");
                }
            }

        var result = this.cleanupArg(this.input.substring(start, fellOff ? this.pos : this.pos - 1));

        // Don't consume it if we don't know if we're going to find it.
        if (sawRightParen && !this.requireRightParen)
            this.pos--;

        if (this.done && depth > 0)
            throw new ProgramError(this.file, this.line, "Line ended unexpectedly - still nested within parentheses.");
        if (this.done && this.requireRightParen && !sawRightParen)
            throw new ProgramError(this.file, this.line, "Line ended unexpectedly - expected ')'.  " + this.input);

        return result;
    }

    allArgs():string[] {
        let as:string[] = [];
        let a:string;
        while (a = this.nextArg())
            as.push(a);
        return as;
    }

    get where():number {
        return this.pos;
    }

    cleanupArg(s:string):string {
        s = s.replace(/^\s*|\s*$/g, "");
        if (s == "")
            return null;
        return s;
    }
}