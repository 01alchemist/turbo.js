import {Defn} from "../define/Defn";
import {PropQual} from "./PropQual";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class Prop {
    typeRef:Defn = null;

    constructor(public line:number, public name:string, public qual:PropQual, public isArray:boolean, public typeName:string) {
    }
}