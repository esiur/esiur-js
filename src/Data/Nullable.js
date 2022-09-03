export default class Nullable {

    static cache = { };

    static getType(nullableType){
        return nullableType.constructor.underlyingType;
    }

    static of(type){

        if (type.isNullable)
            return type;

        if (Nullable.cache[type] != null)
            return Nullable.cache[type];

        let c = class extends type{}
        Object.defineProperty(c, "isNullable", {value: true});
        Object.defineProperty(c, "underlyingType", {value: type});

        Nullable.cache[type] = c;

        return c;
    }
}