/**
 * Created by Nidin Vinayakan on 6/15/2016.
 */
export class Allocation {
    static get ALLOC_NORMAL():number {return 0;} // Tries to use _malloc()
    static get ALLOC_STACK():number {return 1;} // Lives for the duration of the current function call
    static get ALLOC_STATIC():number {return 2;} // Cannot be freed
    static get ALLOC_DYNAMIC():number {return 3;} // Cannot be freed except through sbrk
    static get ALLOC_NONE():number {return 4;} // Do not allocate
}