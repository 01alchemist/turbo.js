import {MapEntry, SMap} from "../utils/index";
import {Method} from "../entities/Method";
import {Prop} from "../entities/Prop";
import {DefnKind} from "../kind/DefnKind";
import {StructDefn} from "./StructDefn";
import {Defn} from "./Defn";
import {PrimitiveDefn} from "./PrimitiveDefn";
import {PrimKind} from "../kind/PrimKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class UserDefn extends Defn {
    typeRef:StructDefn = null;
    map:SMap<MapEntry> = null;
    live = false;
    checked = false;

    constructor(public file:string, public line:number, name:string, kind:DefnKind, public props:Prop[],
                public methods:Method[], public origin:number) {
        super(name, kind);
    }

    findAccessibleFieldFor(operation:string, prop:string):MapEntry {
        let d = this.map.get(prop);
        if (!d)
            return null;
        switch (operation) {
            case "get":
            case "set":
            case "ref":
                return d;
            case "add":
            case "sub":
            case "and":
            case "or":
            case "xor":
            case "compareExchange":
            {
                if (d.type.kind != DefnKind.Primitive)
                    return null;
                let prim = <PrimitiveDefn> d.type;
                // add, sub, and, or, and xor are defined on plain primitives too, for
                // internal reasons, but that is not documented.
                //if (prim.primKind != PrimKind.Atomic && prim.primKind != PrimKind.Synchronic)
                //    return null;
                return d;
            }
            case "loadWhenEqual":
            case "loadWhenNotEqual":
            case "expectUpdate":
            case "notify":
            {
                if (d.type.kind != DefnKind.Primitive)
                    return null;
                let prim = <PrimitiveDefn> d.type;
                if (prim.primKind != PrimKind.Synchronic)
                    return null;
                return d;
            }
            default:
                return null;
        }
    }
}