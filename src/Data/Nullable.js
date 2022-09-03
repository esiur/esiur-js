export default class Nullable {

    static cache = { };

    static getType(nullableType){
        return nullableType.constructor.type;
    }

    static of(type){

        if (type.constructor.isNullable)
            return type;

        if (Nullable.cache[type] != null)
            return Nullable.cache[type];

        let c = class extends type{}
        Object.defineProperty(c, "isNullable", {value: true});
        Object.defineProperty(c, "type", {value: type});

        Nullable.cache[type] = c;

        return c;
    }
}