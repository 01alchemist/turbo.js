import {SourceLine} from "./SourceLine";
import {UserDefn} from "../define/UserDefn";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class Source {
    constructor(public input_file:string, public output_file:string, public defs:UserDefn[], public lines:SourceLine[]) {
    }

    allText():string {
        return this.lines.map(function (x) {
            return x.text
        }).join("\n");
    }
}