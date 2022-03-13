import DC from './DC.js';

export const TransmissionTypeIdentifier = {
      Null : 0x0,
      False : 0x1,
      True : 0x2,
      NotModified : 0x3,
      UInt8 : 0x8,
      Int8 : 0x9,
      Char8 : 0xA,
      Int16 : 0x10,
      UInt16 : 0x11,
      Char16 : 0x12,
      Int32 : 0x18,
      UInt32 : 0x19,
      Float32 : 0x1A,
      Resource : 0x1B,
      ResourceLocal : 0x1C,
      Int64 : 0x20,
      UInt64 : 0x21,
      Float64 : 0x22,
      DateTime : 0x23,
      Int128 : 0x28,
      UInt128 : 0x29,
      Float128 : 0x2A,
      RawData : 0x40,
      String : 0x41,
      List : 0x42,
      ResourceList : 0x43,
      RecordList : 0x44,
      Map : 0x45,
      MapList : 0x46,
      //Tuple = 0x47,

      Record : 0x80,
      TypedList : 0x81,
      TypedMap : 0x82,
      Tuple : 0x83,
      Enum : 0x84,
      Constant : 0x85
};


export let TransmissionTypeClass = {
  Fixed : 0, 
  Dynamic : 1, 
  Typed : 2
}

export class TransmissionTypeParseResults {
  constructor(size, type) {
      this.size = size;
      this.type = type;
  }
}

export default class TransmissionType {
//   final int identifier;
//   final int index;
//   final int classType;
//   final int offset;
//   final int contentLength;
//   final int exponent;

  static get Null() { return new 
      TransmissionType(TransmissionTypeIdentifier.Null, 0, 0, 0, 0);}

  constructor(identifier, classType, index, offset, contentLength, exponent = 0){
    this.identifier = identifier;
    this.classType = classType;
    this.index = index;
    this.offset = offset;
    this.contentLength = contentLength;
    this.exponent = exponent;
}

  static compose(identifier, data) {
    if (data.length == 0) return DC.fromList([identifier]);

    var cls = identifier >> 6;
    if (cls == TransmissionTypeClass.Fixed) {
      return DC.combine([identifier], 0, 1, data, 0, data.length);
    } else {
      var len = data.length;

      if (len == 0) {
        return DC.fromList([identifier]);
      } else if (len <= 0xFF) {
        let rt = new DC(2 + len);
        rt[0] = identifier | 0x8;
        rt[1] = len;
        rt.set(data, 2);
        return rt;
      } else if (len <= 0xFFFF) {
        let rt = new DC(3 + len);
        rt[0] = identifier | 0x10;
        rt[1] = (len >> 8) & 0xFF;
        rt[2] = len & 0xFF;
        rt.set(data, 3);
        return rt;
      } else if (len <= 0xFFFFFF) {
        let rt = new DC(4 + len);
        rt[0] = identifier | 0x18;
        rt[1] = (len >> 16) & 0xFF;
        rt[2] = (len >> 8) & 0xFF;
        rt[3] = len & 0xFF;

        rt.set(data, 4);
        return rt;
      } else if (len <= 0xFFFFFFFF) {
        let rt = new DC(5 + len);
        rt[0] = (identifier | 0x20);
        rt[1] = ((len >> 24) & 0xFF);
        rt[2] = ((len >> 16) & 0xFF);
        rt[3] = ((len >> 8) & 0xFF);
        rt[4] = (len & 0xFF);
        rt.set(data, 5);
        return rt;
      } else if (len <= 0xFFFFFFFFFF) {
        let rt = new DC(6 + len);

        rt[0] = identifier | 0x28;
        rt[1] = ((len >> 32) & 0xFF);
        rt[2] = ((len >> 24) & 0xFF);
        rt[3] = ((len >> 16) & 0xFF);
        rt[4] = ((len >> 8) & 0xFF);
        rt[5] = (len & 0xFF);
        rt.set(data, 6);

        return rt;
      } else if (len <= 0xFFFFFFFFFFFF) {
        let rt = new DC(7 + len);

        rt[0] = identifier | 0x30;
        rt[1] = (len >> 40) & 0xFF;
        rt[2] = (len >> 32) & 0xFF;
        rt[3] = (len >> 24) & 0xFF;
        rt[4] = (len >> 16) & 0xFF;
        rt[5] = (len >> 8) & 0xFF;
        rt[6] = len & 0xFF;

        rt.set(data, 7);
        return rt;
      } else //if (len <= 0xFF_FF_FF_FF_FF_FF_FF)
      {
        let rt = new DC(8 + len);
        rt[0] = identifier | 0x38;
        rt[1] = (len >> 48) & 0xFF;
        rt[2] = (len >> 40) & 0xFF;
        rt[3] = (len >> 32) & 0xFF;
        rt[4] = (len >> 24) & 0xFF;
        rt[5] = (len >> 16) & 0xFF;
        rt[6] = (len >> 8) & 0xFF;
        rt[7] = len & 0xFF;
        data.set(data, 8);
        return rt;
      }
    }
  }

  static parse(data, offset, ends) {
    var h = data[offset++];

    var cls = h >> 6;

    if (cls == TransmissionTypeClass.Fixed) {
      var exp = (h & 0x38) >> 3;

      if (exp == 0)
        return new TransmissionTypeParseResults(
            1, new TransmissionType(h, cls, h & 0x7, 0, exp));

      let cl = (1 << (exp - 1));

      if (ends - offset < cl)
        return new TransmissionTypeParseResults(ends - offset - cl, null);

      return new TransmissionTypeParseResults(
          1 + cl, new TransmissionType(h, cls, h & 0x7, offset, cl, exp));
    } else {
      let cll = (h >> 3) & 0x7;

      if (ends - offset < cll)
        return new TransmissionTypeParseResults(ends - offset - cll, null);

      let cl = 0;

      for (var i = 0; i < cll; i++) cl = cl << 8 | data[offset++];

      return new TransmissionTypeParseResults(
          1 + cl + cll, new TransmissionType((h & 0xC7), cls, h & 0x7, offset, cl));
    }
  }
}

export {TransmissionType}