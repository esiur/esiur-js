 
 import TemplateType from '../Resource/Template/TemplateType.js';
import IRecord from './IRecord.js';
import IResource from '../Resource/IResource.js';
 
import BinaryList from './BinaryList.js'; 
import DC from './DC.js';
 
import Warehouse  from '../Resource/Warehouse.js';
import {Int8, Int16, Int32, Int64, Int128, UInt8, UInt16, UInt32, UInt64, UInt128, Char8, Char16, Float32, Float64, Float128} from './ExtendedTypes.js';

import Nullable from './Nullable.js';
import IEnum from './IEnum.js';
import TypedList from './TypedList.js';
import TypedMap from './TypedMap.js';
import RecordArray from './RecordArray.js';
import ResourceArray from './ResourceArray.js';
import Tuple from './Tuple.js';
import Void from './Void.js';

export const RepresentationTypeIdentifier = {
      Void: 0x0,
      Dynamic : 0x1,
      Bool : 0x2,
      UInt8 : 0x3,
      Int8 : 0x4,
      Char : 0x5,
      Int16 : 0x6,
      UInt16 : 0x7,
      Int32 : 0x8,
      UInt32 : 0x9,
      Float32 : 0xA,
      Int64 : 0xB,
      UInt64 : 0xC,
      Float64 : 0xD,
      DateTime : 0xE,
      Int128 : 0xF,
      UInt128 : 0x10,
      Decimal : 0x11,
      String : 0x12,
      RawData : 0x13,
      Resource : 0x14,
      Record : 0x15,
      List : 0x16,
      Map : 0x17,
      Enum : 0x44,
      TypedResource : 0x45, // Followed by UUID
      TypedRecord : 0x46, // Followed by UUID
      TypedList : 0x48, // Followed by element type
      Tuple2 : 0x50, // Followed by element type
      TypedMap : 0x51, // Followed by key type and value type
      Tuple3 : 0x58,
      Tuple4 : 0x60,
      Tuple5 : 0x68,
      Tuple6 : 0x70,
      Tuple7 : 0x78
}

let IdentifierToTypeMap = {};

IdentifierToTypeMap[RepresentationTypeIdentifier.Void] = Void;
IdentifierToTypeMap[RepresentationTypeIdentifier.Bool] = Boolean;
IdentifierToTypeMap[RepresentationTypeIdentifier.Char] = Char8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Char16] = Char16;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt8] = UInt8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int8] = Int8;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int16] = Int16;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt16] = UInt16;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int32] = Int32;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt32] = UInt32;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int64] = Int64;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt64] = UInt64;
IdentifierToTypeMap[RepresentationTypeIdentifier.Int128] = Int128;
IdentifierToTypeMap[RepresentationTypeIdentifier.UInt128] = UInt128;
IdentifierToTypeMap[RepresentationTypeIdentifier.Float32] = Float32;
IdentifierToTypeMap[RepresentationTypeIdentifier.Float64] = Float64;
IdentifierToTypeMap[RepresentationTypeIdentifier.Decimal] = Float128;
IdentifierToTypeMap[RepresentationTypeIdentifier.String] = String;
IdentifierToTypeMap[RepresentationTypeIdentifier.DateTime] = Date;
IdentifierToTypeMap[RepresentationTypeIdentifier.Resource] = IResource;
IdentifierToTypeMap[RepresentationTypeIdentifier.Record] = IRecord;
IdentifierToTypeMap[RepresentationTypeIdentifier.List] = Array;
IdentifierToTypeMap[RepresentationTypeIdentifier.Map] = Map;
IdentifierToTypeMap[RepresentationTypeIdentifier.ResourceArray] = ResourceArray;
IdentifierToTypeMap[RepresentationTypeIdentifier.RecordArray] = RecordArray;

const TypeToIdentifierMap = {};
TypeToIdentifierMap[Void] = RepresentationTypeIdentifier.Void;
TypeToIdentifierMap[Boolean] = RepresentationTypeIdentifier.Bool;
TypeToIdentifierMap[Char8] = RepresentationTypeIdentifier.Char;
TypeToIdentifierMap[Char16] = RepresentationTypeIdentifier.Char16;
TypeToIdentifierMap[UInt8] = RepresentationTypeIdentifier.UInt8;
TypeToIdentifierMap[Int8] = RepresentationTypeIdentifier.Int8;
TypeToIdentifierMap[Int16] = RepresentationTypeIdentifier.Int16;
TypeToIdentifierMap[UInt16] = RepresentationTypeIdentifier.UInt16;
TypeToIdentifierMap[Int32] = RepresentationTypeIdentifier.Int32;
TypeToIdentifierMap[UInt32] = RepresentationTypeIdentifier.UInt32;
TypeToIdentifierMap[Int64] = RepresentationTypeIdentifier.Int64;
TypeToIdentifierMap[UInt64] = RepresentationTypeIdentifier.UInt64;
TypeToIdentifierMap[Int128] = RepresentationTypeIdentifier.Int128;
TypeToIdentifierMap[UInt128] = RepresentationTypeIdentifier.UInt128;
TypeToIdentifierMap[Float32] = RepresentationTypeIdentifier.Float32;
TypeToIdentifierMap[Float64] = RepresentationTypeIdentifier.Float64;
TypeToIdentifierMap[Float128] = RepresentationTypeIdentifier.Decimal;
TypeToIdentifierMap[String] = RepresentationTypeIdentifier.String;
TypeToIdentifierMap[Date] = RepresentationTypeIdentifier.DateTime;
TypeToIdentifierMap[IResource] = RepresentationTypeIdentifier.Resource;
TypeToIdentifierMap[IRecord] = RepresentationTypeIdentifier.Record;
TypeToIdentifierMap[Array] = RepresentationTypeIdentifier.List;
TypeToIdentifierMap[Map] = RepresentationTypeIdentifier.Map;
TypeToIdentifierMap[RecordArray] = RepresentationTypeIdentifier.RecordArray;
TypeToIdentifierMap[ResourceArray] = RepresentationTypeIdentifier.ResourceArray;
TypeToIdentifierMap[Object] = RepresentationTypeIdentifier.Dynamic;

const TupleIdentifierByLength = {
  2: RepresentationTypeIdentifier.Tuple2,
  3: RepresentationTypeIdentifier.Tuple3,
  4: RepresentationTypeIdentifier.Tuple4,
  5: RepresentationTypeIdentifier.Tuple5,
  6: RepresentationTypeIdentifier.Tuple6,
  7: RepresentationTypeIdentifier.Tuple7,
}

export class RepresentationTypeParseResults {
  //RepresentationType type;
  //int size;
  constructor(size, type){
      this.size= size;
      this.type = type;
  }
}

export default class RepresentationType {

  getRuntimeType() {
    let runtimeType = null;

    if (IdentifierToTypeMap[this.identifier] != undefined)
      runtimeType = IdentifierToTypeMap[this.identifier]
    if (this.identifier == RepresentationTypeIdentifier.TypedResource) {
      runtimeType = Warehouse.getTemplateByClassId(this.guid, TemplateType.Resource)?.definedType;
    } else if (this.identifier == RepresentationTypeIdentifier.TypedRecord) {
      runtimeType = Warehouse.getTemplateByClassId(this.guid, TemplateType.Record)?.definedType;
    } else if (this.identifier == RepresentationTypeIdentifier.Enum) {
      runtimeType = Warehouse.getTemplateByClassId(this.guid, TemplateType.Enum)?.definedType;
    }  else if (this.identifier == RepresentationTypeIdentifier.TypedList){
      let elementType = this.subTypes[0].getRuntimeType();
      runtimeType = TypedList.of(elementType);
    } else if (this.identifier == RepresentationTypeIdentifier.TypedMap){
      let keyType = this.subTypes[0].getRuntimeType();
      let valueType = this.subTypes[1].getRuntimeType();
      runtimeType = TypedMap.of(keyType, valueType);
    } else if (this.identifier == RepresentationTypeIdentifier.Tuple2
              || this.identifier == RepresentationTypeIdentifier.Tuple3
              || this.identifier == RepresentationTypeIdentifier.Tuple4
              || this.identifier == RepresentationTypeIdentifier.Tuple5
              || this.identifier == RepresentationTypeIdentifier.Tuple6
              || this.identifier == RepresentationTypeIdentifier.Tuple7) {

        let subs = this.subTypes.map(x=>x.getRuntimeType());
        runtimeType = Tuple.of(...subs);
      }

      if (this.nullable)
        return Nullable.of(runtimeType);
      else
        return runtimeType;
  }

  toNullable() {
    return new RepresentationType(this.identifier, true, this.guid, this.subTypes);
  }

  static get Void () { return new RepresentationType(RepresentationTypeIdentifier.Void, true, null, null);}

  static get Dynamic() { return new RepresentationType(RepresentationTypeIdentifier.Dynamic, true, null, null);}


  static fromType(type) {

    
    if (type == null)
      throw new Error("Type can't be null.");

    let nullable = type.isNullable;

    if (nullable)
      type = type.underlyingType; // original type

    let identifier = TypeToIdentifierMap[type];

    if (identifier != null)
      return new RepresentationType(identifier, null);
    
    if (type.prototype instanceof IResource){

      let template = Warehouse.getTemplateByType(type);
      return new RepresentationType(RepresentationTypeIdentifier.TypedResource, nullable, template.classId);

    } else if (type.prototype instanceof IRecord) {
      
      let template = Warehouse.getTemplateByType(type);
      return new RepresentationType(RepresentationTypeIdentifier.TypedRecord, nullable, template.classId);
      
    } else if (type.prototype instanceof IEnum) {
      
      let template = Warehouse.getTemplateByType(type);
      return new RepresentationType(RepresentationTypeIdentifier.Enum, nullable, template.classId);

    } else if (type.prototype instanceof TypedList) {

      let elementType = RepresentationType.fromType(type.elementType);
      return new RepresentationType(RepresentationTypeIdentifier.TypedList, null, null, [elementType]);

    } else if (type.prototype instanceof TypedMap) {

      let keyType = RepresentationType.fromType(type.keyType);
      let valueType = RepresentationType.fromType(type.valueType);
      return new RepresentationType(RepresentationTypeIdentifier.TypedMap, null, null, [keyType, valueType]);

    } else if (type.prototype instanceof Tuple) {
      
      let subs = type.subTypes.map(x => RepresentationType.fromType(x));  
      return new RepresentationType(TupleIdentifierByLength[subs.length], nullable, null, subs);
    }
    

    return null;
  }
  
 
  constructor(identifier, nullable, guid, subTypes) {
        this.identifier = identifier;
        this.nullable = nullable;
        this.guid = guid;
        this.subTypes = subTypes;
    }

  compose() {
    var rt = new BinaryList();

    if (this.nullable)
      rt.addUint8(0x80 | this.identifier);
    else
      rt.addUint8(this.identifier);

    if (this.guid != null) rt.addDC(DC.guidToBytes(this.guid));

    if (this.subTypes != null)
      for (var i = 0; i < this.subTypes.length; i++)
        rt.addDC(this.subTypes[i].compose());

    return rt.toDC();
  }

  //public override string ToString() => Identifier.ToString() + (Nullable ? "?" : "")
  //      + TypeTemplate != null ? "<" + TypeTemplate.ClassName + ">" : "";

  static parse(data, offset) {
    let oOffset = offset;

    let header = data[offset++];
    let nullable = (header & 0x80) > 0;
    let identifier = (header & 0x7F);

    if ((header & 0x40) > 0) {
        let hasGUID = (header & 0x4) > 0;
      let subsCount = (header >> 3) & 0x7;

      let guid = null;

      if (hasGUID) {
        guid = data.getGuid(offset);
        offset += 16;
      }

      let subs = [];

      for (let i = 0; i < subsCount; i++) {
        let parsed = RepresentationType.parse(data, offset);
        subs.push(parsed.type);
        offset += parsed.size;
      }

      return new RepresentationTypeParseResults(offset - oOffset,
          new RepresentationType(identifier, nullable, guid, subs));
    } else {
      return new RepresentationTypeParseResults(
          1, new RepresentationType(identifier, nullable, null, null));
    }
  }
}

export {RepresentationType};
