import {MethodKind} from "../kind/MethodKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class Method {
    constructor(public line:number, public kind:MethodKind, public name:string, public signature:string[], public body:string[]) {
    }
}