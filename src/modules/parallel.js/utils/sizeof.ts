import {int8, int16, int32, uint8, uint16, uint32, float32, float64,
    int8x16,int16x8, int32x4, uint8x16, uint16x8, uint32x4,
    float32x4, float64x2
} from "../types/DataType";
/**
 * Created by Nidin Vinayakan on 6/18/2016.
 * sizeof type in bytes
 */
export function sizeof (type:any){

    switch(type){
        case typeof int8:
        case uint8: return 1;
        case short:
        case ushort: return 2;
        case int:
        case uint:
        case float: return 4;
        case double: return 8;
        default:{
            if(!type.size) {
                console.error("sizeof(Unknown data) Unknown type");
            }
            return 0;
        }
    }

}