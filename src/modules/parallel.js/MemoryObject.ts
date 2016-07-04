/**
 * Created by Nidin Vinayakan on 4/7/2016.
 */
export class MemoryObject {

    constructor() {

    }
    static get_impl(ptr:number):any{
        throw "[getImplementation] should override from compiler!";
    }
    static set_impl(ptr:number, value:any){
        throw "[setImplementation] should override from compiler!";
    }
}