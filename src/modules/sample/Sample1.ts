import {Pointer} from "../parallel.js/decorator/Pointer";
import {float32, DataType, float64} from "../parallel.js/types/DataType";
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
    type: DataType.Structure,
    source: Vector3,
    members: {
        x: DataType.float64,
        y: DataType.float64,
        z: DataType.float64
    }
})
class Vector3 {

    constructor(public x:float64 = 0, public y:float64 = 0, public z:float64 = 0) {

    }

    add(a:Vector3):Vector3 {
        return new Vector3(this.x + a.x, this.y + a.y, this.z + a.z);
    }
}