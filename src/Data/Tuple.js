export default class Tuple extends Array {
    static cache = {};

    static getTypes(tuple){
        return tuple.constructor.types;
    }

    static of(){

        let types = [];
        for(let i =0 ; i < arguments.length; i++){
            types.push(arguments[i]);
        }

        if (Tuple.cache[types] != null)
            return Tuple.cache[types];

        let c = class extends Tuple{}
        Object.defineProperty(c, "name", {value: types.map(x => x.name).join('') + "Tuple"});
        Object.defineProperty(c, "types", {value: types});

        Tuple.cache[types] = c;

        return c;
    }
}