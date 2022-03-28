 
 import TemplateType from '../Resource/Template/TemplateType.js';
import IRecord from './IRecord.js';
import IResource from '../Resource/IResource.js';
 
import BinaryList from './BinaryList.js'; 
import DC from './DC.js';
 
import Warehouse  from '../Resource/Warehouse.js';
import {Int8, Int16, Int32, Int64, Int128, UInt8, UInt16, UInt32, UInt64, UInt128, Char8, Char16, Float32, Float64, Float128} from './ExtendedTypes.js';

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

let RuntimeTypes = {};

RuntimeTypes[RepresentationTypeIdentifier.Void] = [Object, Object];
RuntimeTypes[RepresentationTypeIdentifier.Bool] = [Boolean, Object];
RuntimeTypes[RepresentationTypeIdentifier.Char] = [Char8, Object];
RuntimeTypes[RepresentationTypeIdentifier.Char16] = [Char16, Object];
RuntimeTypes[RepresentationTypeIdentifier.UInt8] = [UInt8, UInt8];
RuntimeTypes[RepresentationTypeIdentifier.Int8] = [Int8, Object];
RuntimeTypes[RepresentationTypeIdentifier.Int16] = [Int16, Object];
RuntimeTypes[RepresentationTypeIdentifier.UInt16] = [UInt16, Object];
RuntimeTypes[RepresentationTypeIdentifier.Int32] = [Int32, Object];
RuntimeTypes[RepresentationTypeIdentifier.UInt32] = [UInt32, Object];
RuntimeTypes[RepresentationTypeIdentifier.Int64] = [Int64, Object];
RuntimeTypes[RepresentationTypeIdentifier.UInt64] = [UInt64, Object];
RuntimeTypes[RepresentationTypeIdentifier.Int128] = [Int128, Object];
RuntimeTypes[RepresentationTypeIdentifier.UInt128] = [UInt128, Object];
RuntimeTypes[RepresentationTypeIdentifier.Float32] = [Float32, Object];
RuntimeTypes[RepresentationTypeIdentifier.Float64] = [Float64, Object];
RuntimeTypes[RepresentationTypeIdentifier.Decimal] = [Float128, Object];
RuntimeTypes[RepresentationTypeIdentifier.String] = [String, Object];
RuntimeTypes[RepresentationTypeIdentifier.DateTime] = [Date, Object];
RuntimeTypes[RepresentationTypeIdentifier.Resource] = [IResource, IResource];
RuntimeTypes[RepresentationTypeIdentifier.Record] = [IRecord, IRecord];

 
export class RepresentationTypeParseResults {
  //RepresentationType type;
  //int size;
  constructor(size, type){
      this.size= size;
      this.type = type;
  }
}

export default class RepresentationType {
//   static getTypeFromName(name) {
//     const types = {
//       "int": int,
//       "bool": bool,
//       "double": double,
//       "String": String,
//       "IResource": IResource,
//       "IRecord": IRecord,
//       "IEnum": IEnum,
//       "DC": DC,
//     };

//     if (types[name] != null) {
//       return types[name];
//     } else
//       return Object().runtimeType;
//   }

  toNullable() {
    return new RepresentationType(this.identifier, true, this.guid, this.subTypes);
  }

  static get Void () { return new RepresentationType(RepresentationTypeIdentifier.Void, true, null, null);}

  static get Dynamic() { return new RepresentationType(RepresentationTypeIdentifier.Dynamic, true, null, null);}

  static fromType(type) {
    return Warehouse.typesFactory[type]?.representationType;
  }
  

  getRuntimeType() {
    if (RuntimeTypes[this.identifier])
      return this.nullable
          ? RuntimeTypes[this.identifier][1]
          : RuntimeTypes[this.identifier][0];
    if (this.identifier == RepresentationTypeIdentifier.TypedRecord)
      return Warehouse.getTemplateByClassId(this.guid, TemplateType.Record)
          ?.definedType;
    else if (this.identifier == RepresentationTypeIdentifier.TypedResource)
      return Warehouse.getTemplateByClassId(this.guid, TemplateType.Unspecified)
          ?.definedType;
    else if (this.identifier == RepresentationTypeIdentifier.Enum)
      return Warehouse.getTemplateByClassId(this.guid, TemplateType.Enum)
          ?.definedType;

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
