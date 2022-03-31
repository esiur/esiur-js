/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";  


import AsyncBag from '../Core/AsyncBag.js';
import AsyncReply from '../Core/AsyncReply.js';
import PropertyValue from './PropertyValue.js';
import {DC, BL} from './DC.js';
import BinaryList from './BinaryList.js';
import DistributedPropertyContext from '../Net/IIP/DistributedPropertyContext.js';
import DistributedResource from '../Net/IIP/DistributedResource.js'
import IResource from '../Resource/IResource.js';
import IRecord from './IRecord.js';
import Record from './Record.js';
import ResourceArrayType from './ResourceArrayType.js';
import Warehouse from '../Resource/Warehouse.js';
import TemplateType from '../Resource/Template/TemplateType.js';
import NotModified from './NotModified.js';
import KeyList from './KeyList.js';


import DataSerializer from './DataSerializer.js';
import DataDeserializer from './DataDeserializer.js';
import TypedList from './TypedList.js';
import TypedMap from './TypedMap.js';
import IEnum from './IEnum.js';

import {TransmissionType, TransmissionTypeIdentifier, TransmissionTypeClass} from './TransmissionType.js';

import { Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, Int128, UInt128, Float32, Float64, Float128, Char16, Char8 } from './ExtendedTypes.js';

import PropertyValueArray from './PropertyValueArray.js';
import RecordArray from './RecordArray.js';
import ResourceArray from './ResourceArray.js';
import Tuple from './Tuple.js';


export class CodecComposeResults {
  //final int transmissionTypeIdentifier;
  //final DC data;
  constructor(transmissionTypeIdentifier, data) {
      this.transmissionTypeIdentifier = transmissionTypeIdentifier;
      this.data = data;
  }
}

export class CodecParseResults {
  //final AsyncReply reply;
  //final int size;

  constructor(size, reply){
      this.size = size;
      this.reply = reply;
  }
}

export default class Codec {
  //AsyncReply Parser(byte[] data, uint offset, uint length, DistributedConnection connection);

  static fixedParsers = [
    [
      DataDeserializer.nullParser,
      DataDeserializer.booleanFalseParser,
      DataDeserializer.booleanTrueParser,
      DataDeserializer.notModifiedParser,
    ],
    [
      DataDeserializer.byteParser,
      DataDeserializer.sByteParser,
      DataDeserializer.char8Parser,
    ],
    [
      DataDeserializer.int16Parser,
      DataDeserializer.uInt16Parser,
      DataDeserializer.char16Parser,
    ],
    [
      DataDeserializer.int32Parser,
      DataDeserializer.uInt32Parser,
      DataDeserializer.float32Parser,
      DataDeserializer.resourceParser,
      DataDeserializer.localResourceParser,
    ],
    [
      DataDeserializer.int64Parser,
      DataDeserializer.uInt64Parser,
      DataDeserializer.float64Parser,
      DataDeserializer.dateTimeParser,
    ],
    [
      DataDeserializer.int128Parser, // int 128
      DataDeserializer.uInt128Parser, // uint 128
      DataDeserializer.float128Parser,
    ]
  ];

  static dynamicParsers = [
    DataDeserializer.rawDataParser,
    DataDeserializer.stringParser,
    DataDeserializer.listParser,
    DataDeserializer.resourceListParser,
    DataDeserializer.recordListParser,
  ];

  static typedParsers = [
    DataDeserializer.recordParser,
    DataDeserializer.typedListParser,
    DataDeserializer.typedMapParser,
    DataDeserializer.tupleParser,
    DataDeserializer.enumParser,
    DataDeserializer.constantParser,
  ];

  /// <summary>
  /// Parse a value
  /// </summary>
  /// <param name="data">Bytes array</param>
  /// <param name="offset">Zero-indexed offset.</param>
  /// <param name="size">Output the number of bytes parsed</param>
  /// <param name="connection">DistributedConnection is required in case a structure in the array holds items at the other end.</param>
  /// <param name="dataType">DataType, in case the data is not prepended with DataType</param>
  /// <returns>Value</returns>
  static parse(
       data,  offset, connection,
       requestSequence, dataType = null) {

    let len = 0;

    if (dataType == null) {
      var parsedDataTyped = TransmissionType.parse(data, offset, data.length);
      len = parsedDataTyped.size;
      dataType = parsedDataTyped.type;
      offset = dataType?.offset ?? 0;
    } else
      len = dataType.contentLength;

    if (dataType != null) {
      if (dataType.classType == TransmissionTypeClass.Fixed) {
        return new CodecParseResults(
            len,
            Codec.fixedParsers[dataType.exponent][dataType.index](
                data, dataType.offset, dataType.contentLength, connection, requestSequence));
      } else if (dataType.classType == TransmissionTypeClass.Dynamic) {
        return new CodecParseResults(
            len,
            Codec.dynamicParsers[dataType.index](
                data, dataType.offset, dataType.contentLength, connection, requestSequence));
      } else //if (tt.Class == TransmissionTypeClass.Typed)
      {
        return new CodecParseResults(
            len,
            Codec.typedParsers[dataType.index](
                data, dataType.offset, dataType.contentLength, connection, requestSequence));
      }
    }

    throw Error("Can't parse transmission type.");
  }

  static mapFromObject(map){
      var rt = new Map();
      for(var i in map)
        rt.set(i, map[i]);
  }

  static composers = {
    // Fixed
    [Boolean]: DataSerializer.boolComposer,
    [NotModified]: DataSerializer.notModifiedComposer,
    [Char8]: DataSerializer.char8Composer,
    [Char16]: DataSerializer.char16Composer,
    [Int64]: DataSerializer.int64Composer,
    [UInt64]: DataSerializer.uInt64Composer,
    [Int32]: DataSerializer.int32Composer,
    [UInt32]: DataSerializer.uInt32Composer,
    [Int16]: DataSerializer.int16Composer,
    [UInt16]: DataSerializer.uInt16Composer,
    [Int8]: DataSerializer.int8Composer,
    [UInt8]: DataSerializer.uInt8Composer,
    [Float32]: DataSerializer.float32Composer,
    [Float64]: DataSerializer.float64Composer,
    [Float128]: DataSerializer.float128Composer,
    [Number]: DataSerializer.numberComposer,
    [Date]: DataSerializer.dateTimeComposer,
    [DC]: DataSerializer.rawDataComposer,
    [Uint8Array]: DataSerializer.rawDataComposer,
    [String]: DataSerializer.stringComposer,
    // Special
    [Array]: DataSerializer.listComposer, 
    [ResourceArray]: DataSerializer.resourceListComposer, 
    [RecordArray]: DataSerializer.recordListComposer, 
    [Map]: DataSerializer.mapComposer,
    [PropertyValueArray]: DataSerializer.propertyValueArrayComposer
    // Typed
   };

 
  static getListType(list) {
    if (list instanceof TypedList)
        return TypedList.getType(list);
    else 
        return Object;
  }

  static getMapTypes(map) {

    if (map instanceof TypedMap)
        return TypedMap.getTypes(map);
    else
        return [Object, Object];
  }

  /// <summary>
  /// Compose a variable
  /// </summary>
  /// <param name="value">Value to compose.</param>
  /// <param name="connection">DistributedConnection is required to check locality.</param>
  /// <param name="prependType">If True, prepend the DataType at the beginning of the output.</param>
  /// <returns>Array of bytes in the network byte order.</returns>
  static compose(valueOrSource, connection) {
    if (valueOrSource == null)
      return TransmissionType.compose(TransmissionTypeIdentifier.Null, new DC(0));

    var type = valueOrSource.constructor;

    // if (type.)
    // {

    //     var genericType = type.GetGenericTypeDefinition();
    //     if (genericType == typeof(DistributedPropertyContext<>))
    //     {
    //         valueOrSource = ((IDistributedPropertyContext)valueOrSource).GetValue(connection);
    //     }
    //     else if (genericType == typeof(Func<>))
    //     {
    //         var args = genericType.GetGenericArguments();
    //         if (args.Length == 2 && args[0] == typeof(DistributedConnection))
    //         {
    //             //Func<DistributedConnection, DistributedConnection> a;
    //             //a.Invoke()
    //         }
    //     }
    // }

    // if (valueOrSource is IUserType)
    //     valueOrSource = (valueOrSource as IUserType).Get();

    //if (valueOrSource is Func<DistributedConnection, object>)
    //    valueOrSource = (valueOrSource as Func<DistributedConnection, object>)(connection);

    // if (valueOrSource == null)
    //     return TransmissionType.Compose(TransmissionTypeIdentifier.Null, null);

    // type = valueOrSource.GetType();

    
    if (this.composers[type] != undefined) {
      let results = this.composers[type](valueOrSource, connection);
      return TransmissionType.compose(results.identifier, results.data);
    } else {
      if (valueOrSource instanceof TypedList) {
        let genericType = this.getListType(valueOrSource);
        let results = DataSerializer.typedListComposer(
            valueOrSource, genericType, connection);
        return TransmissionType.compose(results.identifier, results.data);
      } else if (valueOrSource instanceof TypedMap) {
        let genericTypes =TypedMap.getTypes(valueOrSource);
        let results = DataSerializer.typedMapComposer(
            valueOrSource, genericTypes[0], genericTypes[1], connection);
        return TransmissionType.compose(results.identifier, results.data);
      } else if (valueOrSource instanceof IResource) {
        let results =
            DataSerializer.resourceComposer(valueOrSource, connection);
        return TransmissionType.compose(results.identifier, results.data);
      } else if (valueOrSource instanceof IRecord) {
        let results = DataSerializer.recordComposer(valueOrSource, connection);
        return TransmissionType.compose(results.identifier, results.data);
      } else if (valueOrSource instanceof IEnum) {
        let results = DataSerializer.enumComposer(valueOrSource, connection);
        return TransmissionType.compose(results.identifier, results.data);
      }
      else if (valueOrSource instanceof Tuple) {
        let results = DataSerializer.tupleComposer(valueOrSource, connection);
        return TransmissionType.compose(results.identifier, results.data);
      }
    }

    return TransmissionType.compose(TransmissionTypeIdentifier.Null, new DC(0));
  }

  /// <summary>
  /// Check if a resource is local to a given connection.
  /// </summary>
  /// <param name="resource">Resource to check.</param>
  /// <param name="connection">DistributedConnection to check if the resource is local to it.</param>
  /// <returns>True, if the resource owner is the given connection, otherwise False.</returns>
  static isLocalResource( resource, connection) {
    if (connection == null) return false;
    if (resource instanceof DistributedResource) {
      if (resource._p.connection == connection) return true;
    }
    return false;
  }

}

