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

    static compileStructure({type, source, members}:{type:DataType, source:any,  members:any}) {
        return function (constructor:Function) {

            console.log(DataType[type]);
            console.log(constructor.toString());

            var prototype = constructor.prototype;

            source.getImplementation = function(SELF){

            };

            for (let member in members) {

                if (members.hasOwnProperty(member)) {

                    var value = members[members];

                    console.log(member, members[member]);
                }

            }
        }
    }
}