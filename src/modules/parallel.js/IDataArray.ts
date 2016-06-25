/**
 * Created by Nidin Vinayakan on 13/6/2016.
 */
export interface IDataArray {

    endian:string;
    phyPosition:number;
    bufferOffset:number;
    position:number;
    length:number;
    bytesAvailable:number;

    clear():void;
    setBuffer(buffer:ArrayBuffer, offset:number, length:number);
    readBoolean():boolean;
    readByte():number;
    readBytes(_bytes:IDataArray, offset:number, length:number, createNewBuffer:boolean):IDataArray;
    readDouble():number;
    readFloat():number;
    readInt():number;
    readMultiByte(length:number, charSet?:string):string;
    readShort():number;
    readUnsignedByte():number;
    readUnsignedInt():number;
    readVariableSizedUnsignedInt():number;
    readU16VX():number;
    readUnsignedShort():number;
    readUTF():string;
    readUTFBytes(length:number):string;
    readStandardString(length:number):string;
    readStringTillNull(keepEvenByte:boolean):string;
    writeBoolean(value:boolean):void;
    writeByte(value:number):void;
    writeUnsignedByte(value:number):void;
    writeBytes(_bytes:IDataArray, offset:number, length:number):void;
    writeDouble(value:number):void;
    writeFloat(value:number):void;
    writeInt(value:number):void;
    writeMultiByte(value:string, charSet:string):void;
    writeShort(value:number):void;
    writeUnsignedShort(value:number):void;
    writeUnsignedInt(value:number):void;
    writeUTF(value:string):void;
    writeUTFBytes(value:string):void;
    toString():string;
    writeUint8Array(_bytes:Uint8Array):void;
    writeUint16Array(_bytes:Uint16Array):void;
    writeUint32Array(_bytes:Uint32Array):void;
    writeInt8Array(_bytes:Int8Array):void;
    writeInt16Array(_bytes:Int16Array):void;
    writeInt32Array(_bytes:Int32Array):void;
    writeFloat32Array(_bytes:Float32Array):void;
    writeFloat64Array(_bytes:Float64Array):void;
    readUint8Array(length:number, createNewBuffer:boolean):Uint8Array;
    readUint16Array(length:number, createNewBuffer:boolean):Uint16Array;
    readUint32Array(length:number, createNewBuffer:boolean):Uint32Array;
    readInt8Array(length:number, createNewBuffer:boolean):Int8Array;
    readInt16Array(length:number, createNewBuffer:boolean):Int16Array;
    readInt32Array(length:number, createNewBuffer:boolean):Int32Array;
    readFloat32Array(length:number, createNewBuffer:boolean):Float32Array;
    readFloat64Array(length:number, createNewBuffer:boolean):Float64Array;
    validate(len:number):boolean;
}