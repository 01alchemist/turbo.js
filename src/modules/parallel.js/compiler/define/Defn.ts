import {DefnKind} from "../kind/DefnKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class Defn {
    size = 0;
    align = 0;

    constructor(public name:string, public kind:DefnKind) {
    }

    get elementSize():number {
        return this.size;
    }

    get elementAlign():number {
        return this.align;
    }

    static pointerSize = 4;
    static pointerAlign = 4;
    static pointerTypeName = "int32";
    static pointerMemName = "_mem_int32";
}