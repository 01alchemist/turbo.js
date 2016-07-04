import {PrimitiveDefn} from "./PrimitiveDefn";
import {PrimKind} from "../kind/PrimKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class AtomicDefn extends PrimitiveDefn {
    constructor(name:string, size:number, align:number) {
        super(name, size, align, PrimKind.Atomic);
    }
}