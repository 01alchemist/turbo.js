import {PrimKind} from "../kind/PrimKind";
import {Defn} from "./Defn";
import {DefnKind} from "../kind/DefnKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class PrimitiveDefn extends Defn {
    private _memory:string;

    constructor(name:string, size:number, align:number, public primKind:PrimKind = PrimKind.Vanilla) {
        super(name, DefnKind.Primitive);
        this.size = size;
        this.align = align;
        if (primKind == PrimKind.SIMD)
            this._memory = "_mem_" + name.split("x")[0];
        else
            this._memory = "_mem_" + name.split("/").pop();
    }

    get memory():string {
        return this._memory;
    }
}