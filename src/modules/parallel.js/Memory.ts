import {MemoryBase} from "./MemoryBase";
/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
export class Memory extends MemoryBase{
    
    constructor(public TOTAL_MEMORY:number) {
        super(new ArrayBuffer(TOTAL_MEMORY));
    }
}