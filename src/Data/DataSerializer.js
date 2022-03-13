 import BinaryList from './BinaryList.js';
 import Codec from './Codec.js';
 //import IRecord from './IRecord.js';
 //import DistributedResource from '../Net/IIP/DistributedResource.js';

 //import IResource from '../Resource/IResource.js';
 
 import Warehouse from '../Resource/Warehouse.js';

 //import PropertyTemplate from '../Resource/Template/PropertyTemplate.js';
//import PropertyValue from './PropertyValue.js';
import { TransmissionTypeIdentifier} from './TransmissionType.js';

//import DistributedConnection from '../Net/IIP/DistributedConnection.js';
import DC, { BL } from './DC.js';
import RepresentationType from './RepresentationType.js';
import Tuple from './Tuple.js';

export class DataSerializerComposeResults {
//  int identifier;
  //DC data;

  constructor(identifier, data){
      this.identifier = identifier;
      this.data = data;
  }
}

export default class DataSerializer {
  //public delegate byte[] Serializer(object value);

  static historyComposer(history, connection, prependLength = false) {
    throw new Error("Not implemented");
  }

  static int32Composer(
      value, connection) {
    var rt = new DC(4);
    rt.setInt32(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Int32, rt);
  }

  static uInt32Composer(
      value, connection) {
    var rt = new DC(4);
    rt.setUint32(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.UInt32, rt);
  }

  static int16Composer(
      value,  connection) {
    var rt = new DC(2);
    rt.setInt16(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Int16, rt);
  }

  static uInt16Composer(
      value, connection) {
    var rt = new DC(2);
    rt.setUint16(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.UInt16, rt);
  }

  static float32Composer(
      value,  connection) {
    var rt = new DC(4);
    rt.setFloat32(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Float32, rt);
  }

  static float64Composer(value, connection) {
    var rt = new DC(8);
    rt.setFloat64(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Float64, rt);
  }

  static int64Composer(
      value,  connection) {
    var rt = new DC(8);
    rt.setInt64(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Int64, rt);
  }

  static numberComposer(value,  connection) {
    var rt = new DC(8);
    if (Number.isInteger(value)){
      rt.setInt64(0, value);
      return new DataSerializerComposeResults(TransmissionTypeIdentifier.Int64, rt);
    }
    else {
      rt.setFloat64(0, value);
      return new DataSerializerComposeResults(TransmissionTypeIdentifier.Float64, rt);
    }
  }


  static uInt64Composer(
      value,  connection) {
    var rt = new DC(8);
    rt.setUint64(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.UInt64, rt);
  }

  static dateTimeComposer(
      value, connection) {
    var rt = new DC(8);
    rt.setDateTime(0, value);
    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.DateTime, rt);
  }

  static float128Composer(
      value, connection) {
    //@TODO: implement decimal
    var rt = new DC(16);
    rt.setFloat64(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Float64, rt);
  }

  static stringComposer(
      value, connection) {
    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.String, DC.stringToBytes(value));
  }

  static enumComposer(
      value,  connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var template = Warehouse.getTemplateByType(value.runtimeType);

    if (template == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var cts = template.constants.where((x) => x.value == value);

    if (cts.isEmpty)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var rt = BinaryList();

    rt.addGuid(template.classId);
    rt.addUint8(cts.first.index);

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.Enum, rt.toDC());
  }

  static uInt8Composer(
      value, connection) {
    var rt = new DC(1);
    rt[0] = value;
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.UInt8, rt);
  }

  static int8Composer(
      value,  connection) {
    var rt = new DC(1);
    rt[0] = value;
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Int8, rt);
  }

  static char8Composer(
      value, connection) {
    var rt = new DC(1);
    rt[0] = value;
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Char8, rt);
  }

  static char16Composer(
      value,  connection) {
    var rt = new DC(2);
    rt.setUint16(0, value);
    return new DataSerializerComposeResults(TransmissionTypeIdentifier.Char16, rt);
  }

  static boolComposer(
      value, connection) {
    return new DataSerializerComposeResults(
        value
            ? TransmissionTypeIdentifier.True
            : TransmissionTypeIdentifier.False,
        new DC(0));
  }

  static notModifiedComposer(
      value, connection) {
    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.NotModified, new DC(0));
  }

  static rawDataComposer(
      value, connection) {
    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.RawData, value);
  }

  static listComposer(
      value, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));
    else
      return new DataSerializerComposeResults(TransmissionTypeIdentifier.List,
        DataSerializer.arrayComposer(value , connection));

    //var rt = new List<byte>();
    //var list = (IEnumerable)value;// ((List<object>)value);

    //foreach (var o in list)
    //    rt.AddRange(Codec.Compose(o, connection));

    //return (TransmissionTypeIdentifier.List, rt.ToArray());
  }

  static typedListComposer(
      value, type, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var composed = DataSerializer.arrayComposer(value, connection);

    var header =
        (RepresentationType.fromType(type) ?? RepresentationType.Dynamic)
            .compose();

    var rt = new BinaryList()
      .addDC(header)
      .addDC(composed);

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.TypedList, rt.toDC());
  }

  static propertyValueArrayComposer(
      value, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var rt = BL();
    

    for (var i = 0; i < value.length; i ++){
      rt.addDC(Codec.compose(value[i].age, connection));
      rt.addDC(Codec.compose(value[i].date, connection));
      rt.addDC(Codec.compose(value[i].value, connection));
    }

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.List, rt.toDC());
  }

  static typedMapComposer(
      value, keyType, valueType, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var kt =
        (RepresentationType.fromType(keyType) ?? RepresentationType.Dynamic)
            .compose();
    var vt =
        (RepresentationType.fromType(valueType) ?? RepresentationType.Dynamic)
            .compose();

    var rt = new BinaryList();

    rt.addDC(kt);
    rt.addDC(vt);

    
//@TODO

    for(let [k, v] of value)
    {
      rt.addDC(Codec.compose(k, connection));
      rt.addDC(Codec.compose(v, connection));
    }

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.TypedMap, rt.toDC());
  }

  static arrayComposer(value, connection) {
    var rt = new BinaryList();

    for (var i of value)
       rt.addDC(Codec.compose(i, connection));

    return rt.toDC();
  }

  static resourceListComposer(
      value, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    return new DataSerializerComposeResults(TransmissionTypeIdentifier.ResourceList,
        DataSerializer.arrayComposer(value, connection));
  }

  static recordListComposer(
      value, connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    return new DataSerializerComposeResults(TransmissionTypeIdentifier.RecordList,
      DataSerializer.arrayComposer(value, connection));
  }

  static resourceComposer(
      value, connection) {
    var resource = value;
    var rt = new DC(4);

    if (Codec.isLocalResource(resource, connection)) {
      rt.setUint32(0, resource.id ?? 0);
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.ResourceLocal, rt);
    } else {
      // @TODO: connection.cache.Add(value as IResource, DateTime.UtcNow);
      rt.setUint32(0, resource.instance?.id ?? 0);
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Resource, rt);
    }
  }

  static mapComposer(
      value,  connection) {
    if (value == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    var rt = BinaryList();

    for (var el in value) {
      rt.addDC(Codec.compose(el.key, connection));
      rt.addDC(Codec.compose(el.value, connection));
    }

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.Map, rt.toDC());
  }

  static recordComposer(
      value, connection) {
    var rt = BinaryList();
    

    var template = Warehouse.getTemplateByType(value.runtimeType);

    if (template == null)
      return new DataSerializerComposeResults(
          TransmissionTypeIdentifier.Null, new DC(0));

    rt.addDC(DC.guidToBytes(template.classId));

    var recordData = value.serialize();

    for (var pt in template.properties) {
      var propValue = recordData[pt.name];
      rt.addDC(Codec.compose(propValue, connection));
    }

    return new DataSerializerComposeResults(
        TransmissionTypeIdentifier.Record, rt.toDC());
  }

  // TODO:
  // static DataSerializerComposeResults historyComposer(KeyList<PropertyTemplate, PropertyValue[]> history,
  //                                     DistributedConnection connection, bool prependLength = false)
  // {
  //     //@TODO:Test
  //     var rt = new BinaryList();

  //     for (var i = 0; i < history.Count; i++)
  //         rt.AddUInt8(history.Keys.ElementAt(i).Index)
  //           .AddUInt8Array(Codec.Compose(history.Values.ElementAt(i), connection));

  //     if (prependLength)
  //         rt.InsertInt32(0, rt.Length);

  //     return rt.ToArray();
  // }

  static tupleComposer(value, connection) {
    if (value == null)
      return new DataSerializerComposeResults(TransmissionTypeIdentifier.Null, new DC(0));

     var rt = BL();

     var fields = Tuple.getTypes(value);
     var types = fields.map(x => RepresentationType.fromType(x).compose());

     rt.Add(value.length);

     for (var t of types)
         rt.addUint8Array(t);

     var composed = DataSerializer.arrayComposer(value, connection);

     if (composed == null)
         return new DataSerializerComposeResults(TransmissionTypeIdentifier.Null, new DC(0));
     else
     {
         rt.addUint8Array(composed);
         return new DataSerializerComposeResults(TransmissionTypeIdentifier.Tuple, rt.toArray());
     }
  }
}
