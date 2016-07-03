import {Pointer} from "../src/modules/parallel.js/decorator/Pointer";
import {DataType, float64, float32} from "../src/modules/parallel.js/types/DataType";
/**
 * Created by Nidin Vinayakan on 24/6/2016.
 */
export class AllTypeExample {

    constructor() {

        var v1 = new MyVectorClass(0, 0, 0);
        var v2 = new MyVectorClass(1, 1, 1);

        v1.temp = 43;
    }
}

@Pointer({
    type: DataType.Class,
    source: MyVectorClass,
    members: {
        x: DataType.float64,
        y: DataType.float64,
        z: DataType.float64
    }
})
class MyVectorClass {

    public temp:float32;

    constructor(public x:float64, public y:float64, public z:float64) {

    }

    add(a:MyVectorClass):MyVectorClass {
        return new MyVectorClass(this.x + a.x, this.y + a.y, this.z + a.z);
    }
}

@Pointer({
    type: DataType.Structure
})
class MyMatrixClass {

    constructor(public x:float64, public y:float64, public z:float64) {

    }
}