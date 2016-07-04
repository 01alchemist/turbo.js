import {UserDefn} from "./UserDefn";
import {Defn} from "./Defn";
import {Prop} from "../entities/Prop";
import {Method} from "../entities/Method";
import {Virtual} from "../entities/Virtual";
import {DefnKind} from "../kind/DefnKind";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class ClassDefn extends UserDefn {
    baseTypeRef:ClassDefn = null;
    className = "";		// Base1>Base2>name
    classId = 0;
    subclasses:ClassDefn[] = []; // direct proper subclasses
    vtable:Virtual[] = null;

    constructor(file:string, line:number, name:string, public baseName:string, props:Prop[], methods:Method[], origin:number) {
        super(file, line, name, DefnKind.Class, props, methods, origin);
    }

    get elementSize():number {
        return Defn.pointerSize;
    }

    get elementAlign():number {
        return Defn.pointerAlign;
    }

    hasMethod(name:string):boolean {
        for (let m of this.methods)
            if (m.name == name)
                return true;
        return false;
    }

    getMethod(name:string):Method {
        for (let m of this.methods)
            if (m.name == name)
                return m;
        return null;
    }
}