import {UserDefn} from "./UserDefn";
import {DefnKind} from "../kind/DefnKind";
import {MethodKind} from "../kind/MethodKind";
import {Method} from "../entities/Method";
import {Prop} from "../entities/Prop";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class StructDefn extends UserDefn {
    hasGetMethod = false;
    hasSetMethod = false;

    constructor(file:string, line:number, name:string, props:Prop[], methods:Method[], origin:number) {
        super(file, line, name, DefnKind.Struct, props, methods, origin);
        for (let m of methods) {
            if (m.kind == MethodKind.Get)
                this.hasGetMethod = true;
            else if (m.kind == MethodKind.Set)
                this.hasSetMethod = true;
        }
    }
}