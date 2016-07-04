import {ClassDefn} from "../define/ClassDefn";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class InclusiveSubclassIterator {
    private stack:(ClassDefn|number|ClassDefn[])[] = [];

    constructor(cls:ClassDefn) {
        this.stack.push(cls);
    }

    next():ClassDefn {
        if (this.stack.length == 0)
            return null;
        let top = this.stack.pop();
        if (typeof top == "number") {
            let x = <number> top;
            let xs = <ClassDefn[]> this.stack.pop();
            let cls = xs[x++];
            if (x < xs.length) {
                this.stack.push(xs);
                this.stack.push(x);
            }
            if (cls.subclasses.length > 0) {
                this.stack.push(cls.subclasses);
                this.stack.push(0);
            }
            return cls;
        }
        else {
            let x = <ClassDefn> top;
            if (x.subclasses.length > 0) {
                this.stack.push(x.subclasses);
                this.stack.push(0);
            }
            return x;
        }
    }
}