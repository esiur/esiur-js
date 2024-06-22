
export default class TypedMap extends Map {
    
    constructor(data)
    {
        super();
        if (data instanceof Object)
            for(var i in data)
                this.set(i, data[i]);
    }

    

    static getTypes(typedMap){
        return [typedMap.constructor.keyType ?? Object, typedMap.constructor.valueType ?? Object];
    }


    static cache = {};

    static of(keyType, valueType){

        if (TypedMap.cache[[keyType, valueType]] != null)
            return TypedMap.cache[[keyType, valueType]];

        //if (TypedMap.cache[keyType] != null)
        //    if (TypedMap.cache[keyType][valueType] != null)
        //        return TypedMap.cache[keyType][valueType];
        
        let c = class extends TypedMap{}
        Object.defineProperty(c, "name", {value: keyType.name + valueType.name + "Map"});
        Object.defineProperty(c, "keyType", {value: keyType});
        Object.defineProperty(c, "valueType", {value: valueType});

        //if (TypedMap.cache[keyType] == null)
        //    TypedMap.cache[keyType] = {[valueType]: c};
        //else
        //    TypedMap.cache[keyType][valueType] = c;

        TypedMap.cache[[keyType, valueType]] = c;

        return c;
    }

}