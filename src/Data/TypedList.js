import IResource from "../Resource/IResource.js";
import IRecord from "./IRecord.js";
import Record from "./Record.js";
import PropertyValue from "./PropertyValue.js";
import PropertyValueArray from "./PropertyValueArray.js";
import RecordArray from "./RecordArray.js";
import ResourceArray from "./ResourceArray.js";

export default class TypedList extends Array
{
    // constructor(data)
    // {

    //     if (data != undefined && data instanceof Array)
    //         for(var i = 0; i < data.length; i++)
    //             this.push(data[i]);
    // }

    static cache = { [IResource] : ResourceArray,
                     [PropertyValue] : PropertyValueArray,
                     [IRecord] : RecordArray,
                     [Record] : RecordArray
                   };

    static getType(typedList){
        return typedList.constructor.elementType;
    }

    static of(type){
        if (TypedList.cache[type] != null)
            return TypedList.cache[type];

        let c = class extends TypedList{}
        Object.defineProperty(c, "name", {value: type.name + "List"});
        Object.defineProperty(c, "elementType", {value: type});

        TypedList.cache[type] = c;
        
        return c;
    }
}