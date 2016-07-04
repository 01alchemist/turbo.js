import {Runtime} from "../Runtime";
import {DataType} from "../types/DataType";
/**
 * Created by Nidin Vinayakan on 6/18/2016.
 */
export class Compiler {

    static compileClass(parameters:{type:DataType; members:any}) {
        return function (constructor:Function) {

            console.log(DataType[parameters.type]);
            console.log(constructor.toString());

            var prototype = constructor.prototype;

            for (let prop in prototype) {

                if (prototype.hasOwnProperty(prop)) {

                    var value = prototype[prop];

                    if (value instanceof Function) {
                        eval(`prototype.${prop} = function(a) {
                            return new MyVectorClass(this.x - a.x, this.y - a.y, this.z - a.z);
                        }`);
                    }

                    console.log(prop, prototype[prop]);
                }

            }
        }
    }

    static compileStructure({type, members}:{type:DataType, members:any}) {
        return function (constructor:any) {

            console.log(DataType[type]);
            console.log(constructor.toString());

            var prototype = constructor.prototype;

            constructor.getImplementation = function (SELF) {
                console.log("getImplementation");
            };

            /*source.setImplementation = function (SELF, value) {
                Runtime._mem_float64[(SELF + 0) >> 3] = (value.x);
                Runtime._mem_float64[(SELF + 8) >> 3] = (value.y);
                Runtime._mem_float64[(SELF + 16) >> 3] = (value.z);
            };*/

            /*let getImplementation = "function (SELF) {";
            let setImplementation = "function (SELF, value) {";

            for (let member in members) {

                if (members.hasOwnProperty(member)) {

                    var value = members[member];
                    //return DL3(_mem_float64[(SELF + 0) >> 3], _mem_float64[(SELF + 8) >> 3], _mem_float64[(SELF + 16) >> 3]);
                    getImplementation += `Runtime._mem_${DataType[value]}[(SELF + 0) >> 3];`;
                    setImplementation += `Runtime._mem_${DataType[value]}[(SELF + 0) >> 3] = (value.${member});`;

                    console.log(member, members[member]);
                }
            }

            setImplementation += "}";

            eval("source.setImplementation=" + setImplementation);*/
        }
    }
}