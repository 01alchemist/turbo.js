import {Defn} from "../define/Defn";
import {DefnKind} from "../kind/DefnKind";
import {PrimitiveDefn} from "../define/PrimitiveDefn";
import {InternalError} from "../errors/InternalError";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class MapEntry {
    constructor(public name:string, public expand:boolean, public offset:number, public type:Defn) {
    }

    get memory():string {
        if (this.type.kind != DefnKind.Primitive)
            throw new InternalError("No memory type available for non-primitive type " + this.type.name);
        return (<PrimitiveDefn> this.type).memory;
    }

    get size():number {
        return this.type.size;
    }

    toString():string {
        return "(" + this.name + " " + this.expand + " " + this.offset + " " + this.type.name + ")";
    }
}
export class SMap<T> {
    private props:{name:string, value:T}[] = [];
    private mapping = {};	// Map from name to index
    private generation = 0;	// Incremented on update (but not on add)

    test(n:string):boolean {
        return typeof this.mapping[n] == "number";
    }

    get(n:string):T {
        let probe = this.mapping[n];
        if (typeof probe == "number")
            return this.props[probe].value;
        return null;
    }

    put(n:string, v:T):void {
        let probe = this.mapping[n];
        if (typeof probe == "number") {
            this.props[probe].value = v;
            this.generation++;
        }
        else {
            this.mapping[n] = this.props.length;
            this.props.push({name: n, value: v});
        }
    }

    copy():SMap<T> {
        let newMap = new SMap<T>();
        newMap.props = this.props.slice(0);
        for (let n in this.mapping)
            if (this.mapping.hasOwnProperty(n))
                newMap.mapping[n] = this.mapping[n];
        return newMap;
    }

    values():{ next:() => T } {
        const theMap = this;
        const generation = this.generation;
        const props = this.props;
        let i = 0;
        return {
            next: function ():T {
                if (theMap.generation != generation)
                    throw new InternalError("Generator invalidated by assignment");
                if (i == props.length)
                    return null;
                return props[i++].value;
            }
        };
    }

    keysValues():{ next:() => [string,T] } {
        const theMap = this;
        const generation = this.generation;
        const props = this.props;
        let i = 0;
        return {
            next: function ():[string,T] {
                if (theMap.generation != generation)
                    throw new InternalError("Generator invalidated by assignment");
                if (i == props.length)
                    return [null, null];
                let x = props[i++];
                return [x.name, x.value];
            }
        };
    }
}
export class SSet {
    private mapping = {};	// Map from name to true

    test(n:string):boolean {
        return typeof this.mapping[n] == "boolean";
    }

    put(n:string):void {
        this.mapping[n] = true;
    }
}

// This can also check if x is already properly parenthesized, though that
// involves counting parens, at least trivially (and then does it matter?).
// Consider (a).(b), which should be parenthesized as ((a).(b)).
//
// Issue #16: Parentheses are not actually reliable.

export function endstrip(x:string):string {
    if (/^[a-zA-Z0-9]+$/.test(x))
        return x;
    return "(" + x + ")";
}