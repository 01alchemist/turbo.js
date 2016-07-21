import {SMap} from "../utils/index";
/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class Virtual {
    constructor(public name:string, private sign:string[], public reverseCases:SMap<number[]>, public default_:string) {
    }

    signature():string {
        if (this.sign == null)
            return ", ...args";
        if (this.sign.length == 0)
            return "";
        return ", " + this.sign.join(",");
    }
}