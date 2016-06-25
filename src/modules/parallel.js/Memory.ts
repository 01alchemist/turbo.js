/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
export class Memory{

    constructor(TOTAL_MEMORY:number) {
        super(new ArrayBuffer(TOTAL_MEMORY));
    }
}