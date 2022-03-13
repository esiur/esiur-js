export default class FactoryEntry {

    //Type get type => T;

    //late Type nullableType;
    //final Function instanceCreator;
    //final Function arrayCreator = () => <T>[];
    //final RepresentationType representationType;
  
    isMapKeySubType(map) {
      //return map is Map<T, dynamic>;
    }
  
    isMapValueSubType(map) {
      //return map is Map<dynamic, T>;
    }
  
    isListSubType(list) {
      //return list is List<T>;
    }

    constructor(type, representationType) {
        this.type = type;
        this.nullableType = this.getNullableType(type);
        this.representationType = representationType;
    }

    getNullableType(type){
        let c = class extends type {};
        Object.defineProperty(c, "name", {value: "Nullable" + type.name});
        Object.defineProperty(c, "nullable", {value: true});
        return c;
    }
}