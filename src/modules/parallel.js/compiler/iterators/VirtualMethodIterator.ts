import {ClassDefn} from "../define/ClassDefn";
import {SSet} from "../utils/index";
import {MethodKind} from "../kind/MethodKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class VirtualMethodIterator {
    private i = 0;
    private inherited = false;
    private filter = new SSet();

    constructor(private cls:ClassDefn) {
    }

    next():[string,string[],boolean] {
        for (; ;) {
            if (this.i == this.cls.methods.length) {
                if (!this.cls.baseTypeRef)
                    return ["", null, false];
                this.i = 0;
                this.cls = this.cls.baseTypeRef;
                this.inherited = true;
                continue;
            }
            let m = this.cls.methods[this.i++];
            if (m.kind != MethodKind.Virtual)
                continue;
            if (this.filter.test(m.name))
                continue;
            this.filter.put(m.name);
            return [m.name, m.signature, this.inherited];
        }
    }
}