/**
 * Created by Nidin Vinayakan on 24/6/2016.
 */
export enum DataType {
    int8,
    int16,
    int32,
    uint8,
    uint16,
    uint32,
    float32,
    float64,
    int32x4,
    float32x4,
    float64x2,
    Structure,
    Class
}
export type int8 = number;
export type int16 = number;
export type int32 = number;
export type uint8 = number;
export type uint16 = number;
export type uint32 = number;
export type float32 = number;
export type float64 = number;

export type int8x16 = Int8Array|number[];
export type uint8x16 = Uint8Array|number[];
export type int16x8 = Int16Array|number[];
export type uint16x8 = Uint16Array|number[];
export type int32x4 = Int32Array|number[];
export type uint32x4 = Uint32Array|number[];
export type float32x4 = Float32Array|number[];
export type float64x2 = Float64Array|number[];