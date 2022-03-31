import IEnum from './IEnum.js';
import Tuple from './Tuple.js';
import TemplateType from '../Resource/Template/TemplateType.js';
import Warehouse from '../Resource/Warehouse.js';
import AsyncBag from '../Core/AsyncBag.js';
import AsyncReply from '../Core/AsyncReply.js';
import DC from './DC.js';
import DistributedConnection from '../Net/IIP/DistributedConnection.js';
import NotModified from './NotModified.js';
import RepresentationType from './RepresentationType.js';
import Codec from './Codec.js';
import TypedMap from './TypedMap.js';
import PropertyValueArray from './PropertyValueArray.js';
import PropertyValue from './PropertyValue.js';
import Record from './Record.js';
import { UInt64, Int64 } from '../Data/ExtendedTypes.js';
import AsyncException from '../Core/AsyncException.js';
import ExceptionCode from '../Core/ExceptionCode.js';
import ErrorType from '../Core/ErrorType.js';

export class PropertyValueParserResults {
  //final int size;
  ///final AsyncReply<PropertyValue> reply;

  constructor(size, reply){
      this.size = size;
      this.reply = reply;
  }
}

export default class DataDeserializer {
  static nullParser(data, offset,  length,  connection, requestSequence) {
    return new AsyncReply(null);
  }

  static booleanTrueParser(
      data, offset, length, connection, requestSequence) {
        return new AsyncReply(true);
  }

  static booleanFalseParser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(false);
  }

  static notModifiedParser(
      data,  offset,  length,  connection, requestSequence) {
        return new AsyncReply(NotModified());
  }

  static byteParser(
       data,  offset,  length,  connection, requestSequence) {
        return new AsyncReply(data[offset]);
  }

  static sByteParser(
       data, offset, length,  connection, requestSequence) {
        return new AsyncReply(
        data[offset] > 127 ? data[offset] - 256 : data[offset]);
  }

  static char16Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getChar(offset));
  }

  static char8Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(String.fromCharCode(data[offset]));
  }

  static int16Parser(
      data, offset, length, connection, requestSequence) {
        return new AsyncReply(data.getInt16(offset));
  }

  static  uInt16Parser(
      data, offset,  length, connection, requestSequence) {
        return new AsyncReply(data.getUint16(offset));
  }

  static int32Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getInt32(offset));
  }

  static  uInt32Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getUint32(offset));
  }

  static float32Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getFloat32(offset));
  }

  static float64Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getFloat64(offset));
  }

  static float128Parser(
      data, offset, length,  connection, requestSequence) {
    // @TODO
    return new AsyncReply(data.getFloat64(offset));
  }

  static int128Parser(
      data, offset,  length,  connection, requestSequence) {
    // @TODO
    return new AsyncReply(data.getInt64(offset));
  }

  static uInt128Parser(
       data,  offset,  length,  connection, requestSequence) {
        return new AsyncReply(data.getUint64(offset));
  }

  static int64Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(new Int64(data.getInt64(offset)));
  }

  static uInt64Parser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(new UInt64(data.getUint64(offset)));
  }

  static dateTimeParser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getDateTime(offset));
  }

  static resourceParser(
      data, offset, length,  connection, requestSequence) {
    if (connection != null) {
      var id = data.getUint32(offset, requestSequence);
      return connection.fetch(id);
    }
    throw Error("Can't parse resource with no connection");
  }

  static localResourceParser(
       data, offset, length,  connection, requestSequence) {
    var id = data.getUint32(offset);
    return Warehouse.getById(id);
  }

  static rawDataParser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.clip(offset, length));
  }

  static  stringParser(
      data, offset, length,  connection, requestSequence) {
        return new AsyncReply(data.getString(offset, length));
  }

  static recordParser(
      data, offset, length, connection, requestSequence) {
    var reply = new AsyncReply();

    var classId = data.getGuid(offset);
    offset += 16;
    length -= 16;

    var template = Warehouse.getTemplateByClassId(classId, TemplateType.Record);

    var initRecord = (template) => {
        DataDeserializer.listParser(data, offset, length, connection, requestSequence).then((ar) => {
        let record;

        if (template.definedType != null) {
          record = Warehouse.createInstance(template.definedType);
        } else {
          record = new Record();
        }

        for (var i = 0; i < template.properties.length; i++)
          record[template.properties[i].name] = ar[i]; 

        reply.trigger(record);
      });
    };

    if (template != null) {
      initRecord(template);
    } else {
      if (connection == null)
        throw Error("Can't parse record with no connection");

      connection.getTemplate(classId).then((tmp) => {
        if (tmp == null)
        {
            reply.triggerError(new AsyncException(
              ErrorType.Management,
              ExceptionCode.TemplateNotFound.index,
              "Template not found for record."));
        } else {
          initRecord(tmp);
        }
     
      }).error((x) => reply.triggerError(x));
    }

    return reply;
  }

  static constantParser(
      data, offset, length,  connection, requestSequence) {
    throw Error("NotImplementedException");
  }

  static enumParser(data, offset, length,  connection, requestSequence) {
    var classId = data.getGuid(offset);
    offset += 16;
    var index = data[offset++];

    var template = Warehouse.getTemplateByClassId(classId, TemplateType.Enum);

    if (template != null) {
      if (template.definedType != null) {
        var enumVal = Warehouse.createInstance(template.definedType);
        enumVal.index = index;
        enumVal.name = template.constants[index].name;
        enumVal.value = template.constants[index].value;
        return new AsyncReply(enumVal);
      } else {
        return new AsyncReply(new IEnum(index, template.constants[index].value,
            template.constants[index].name, template));
      }
    } else {
      var reply = new AsyncReply();

      if (connection == null)
        throw Error("Can't parse enum with no connection");
      connection.getTemplate(classId).then((tmp) => {
        if (tmp != null) {
          if (tmp.definedType != null) {
            var enumVal = Warehouse.createInstance(tmp.definedType);
            enumVal.index = index;
            enumVal.name = tmp.constants[index].name;
            enumVal.value = tmp.constants[index].value;
            reply.trigger(enumVal);
          } else {
            reply.trigger(new IEnum(
                index, tmp.constants[index].value, tmp.constants[index].name, tmp));
          }
        } else
          reply.triggerError(new Error("Template not found for enum"));
      }).error((x) => reply.triggerError(x));

      return reply;
    }
  }

  static recordListParser(
      data, offset, length,  connection, requestSequence) {
    var rt = new AsyncBag();

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      rt.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    rt.seal();
    return rt;
  }

  static resourceListParser(
      data, offset, length,  connection, requestSequence) {
    var rt = new AsyncBag();

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      rt.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    rt.seal();
    return rt;
  }

  static listParser(
      data, offset, length,  connection, requestSequence) {
    var rt = new AsyncBag();

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      rt.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    rt.seal();
    return rt;
  }

  static typedMapParser(
      data, offset, length, connection, requestSequence) {
    // get key type
    var keyRep = RepresentationType.parse(data, offset);
    offset += keyRep.size;
    length -= keyRep.size;

    var valueRep = RepresentationType.parse(data, offset);
    offset += valueRep.size;
    length -= valueRep.size;

    

    var map = new TypedMap();
    var rt = new AsyncReply();

    var results = new AsyncBag();

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      results.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    results.seal();

    results.then((ar) => {
      for (var i = 0; i < ar.length; i += 2) 
        map.set(ar[i], ar[i + 1]);

      rt.trigger(map);
    });

    return rt;
  }

  static tupleParser(
      data, offset, length,  connection, requestSequence) {

        
    var results = new AsyncBag();
    var rt = new AsyncReply();

    var tupleSize = data[offset++];
    length--;

    var types = [];

    for (var i = 0; i < tupleSize; i++) {
      var rep = RepresentationType.parse(data, offset, requestSequence);
      if (rep.type != null) 
        types.push(rep.type.getRuntimeType() ?? Object);
      offset += rep.size;
      length -= rep.size;
    }

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      results.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    results.seal();

    results.then((ar) => {
      rt.trigger(new (Tuple.of(...types))(...ar));
    });

    return rt;
  }

  static typedListParser(
      data, offset, length, connection, requestSequence) {
    var rt = new AsyncBag();

    // get the type
    var rep = RepresentationType.parse(data, offset);

    offset += rep.size;
    length -= rep.size;

    var runtimeType = rep.type.getRuntimeType();

    rt.arrayType = runtimeType;

    while (length > 0) {
      var parsed = Codec.parse(data, offset, connection, requestSequence);

      rt.add(parsed.reply);

      if (parsed.size > 0) {
        offset += parsed.size;
        length -= parsed.size;
      } else
        throw new Error("Error while parsing structured data");
    }

    rt.seal();
    return rt;
  }

  static PropertyValueArrayParser(
      data,
      offset,
      length,
      connection, requestSequence) //, bool ageIncluded = true)
  {
    var rt = new AsyncBag();

    DataDeserializer.listParser(data, offset, length, connection, requestSequence).then((x) => {
      var pvs = new PropertyValueArray();

      for (var i = 0; i < x.length; i += 3)
        pvs.push(new PropertyValue(x[2], x[0], x[1]));

      rt.trigger(pvs);
    });

    return rt;
  }

  static propertyValueParser(data, offset,
      connection, requestSequence) //, bool ageIncluded = true)
  {
    let reply = new AsyncReply();

    let age = data.getUint64(offset);
    offset += 8;

    let date = data.getDateTime(offset);
    offset += 8;

    let parsed = Codec.parse(data, offset, connection, requestSequence);

    parsed.reply.then((value) => {
      reply.trigger(new PropertyValue(value, age, date));
    });

    return new PropertyValueParserResults(16 + parsed.size, reply);
  }

  static 
      historyParser(data, offset, length, resource,
           connection, requestSequence) {
    throw new Error("Not implemented");
    // @TODO
    // var list = new KeyList<PropertyTemplate, List<PropertyValue>>();

    // var reply = new AsyncReply<KeyList<PropertyTemplate, List<PropertyValue[]>>>();

    // var bagOfBags = new AsyncBag<PropertyValue[]>();

    // var ends = offset + length;
    // while (offset < ends)
    // {
    //     var index = data[offset++];
    //     var pt = resource.Instance.Template.GetPropertyTemplateByIndex(index);
    //     list.Add(pt, null);
    //     var cs = data.GetUInt32(offset);
    //     offset += 4;

    //     var (len, pv) = PropertyValueParser(data, offset, connection);

    //     bagOfBags.Add(pv);// ParsePropertyValueArray(data, offset, cs, connection));
    //     offset += len;
    // }

    // bagOfBags.Seal();

    // bagOfBags.Then(x =>
    // {
    //     for (var i = 0; i < list.Count; i++)
    //         list[list.Keys.ElementAt(i)] = x[i];

    //     reply.Trigger(list);
    // });

    // return reply;
  }
}
