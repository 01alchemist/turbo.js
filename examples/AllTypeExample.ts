import {Pointer} from "../src/modules/parallel.js/decorator/Pointer";
import {DataType, float64} from "../src/modules/parallel.js/types/DataType";
/**
 * Created by Nidin Vinayakan on 24/6/2016.
 */
export class AllTypeExample {

    constructor() {

    }
}

@Pointer({
    type:DataType.Class
})
class MyVectorClass{

    constructor(x:float64,y:number,z:number){

    }
}