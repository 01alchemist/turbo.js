import {Pointer} from "../parallel.js/Pointer";
import {float} from "../parallel.js/types";
import {sizeof} from "../parallel.js/utils/sizeof";
/**
 * Created by Nidin Vinayakan on 6/18/2016.
 */
export class Sample1 {

    constructor() {
        var vec3 = new Vector3();

        Object.preventExtensions(vec3);
        // vec3.w = 0;
        console.log(vec3);
    }

}

@Pointer({
    size: sizeof(float) * 3,
    allocation:{
        x:"float",
        y:"float",
        z:"float"
    }
})
export class Vector3 {

    constructor(public x:number = 0,
                public y:number = 0,
                public z:number = 0) {

    }
}