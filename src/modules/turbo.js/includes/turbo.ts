export class MemoryObject {
   static NAME:string;
   static SIZE:number;
   static ALIGN:number;
   private _pointer:number;

   get pointer():number { return this._pointer; };

   constructor(p:number){
       this._pointer = (p | 0);
   }
}