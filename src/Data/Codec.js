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

import DataType from './DataType.js';
import ResourceComparisonResult from './ResourceComparisionResult.js';
import StructureComparisonResult from './StructureComparisonResult.js';

import AsyncBag from '../Engine/AsyncBag.js';
import AsyncReply from '../Engine/AsyncReply.js';
import Structure from './Structure.js';
import PropertyValue from './PropertyValue.js';
import {DC, BL} from './DataConverter.js';
import BinaryList from './BinaryList.js';
import DistributedPropertyContext from '../Net/IIP/DistributedPropertyContext.JS';

export default class Codec {

    static parse(data, offset, sizeObject, connection, dataType = DataType.Unspecified) {

        var size;

        var reply = new AsyncReply();

        var isArray;
        var t;

        if (dataType == DataType.Unspecified) {
            size = 1;
            dataType = data[offset++];
        }
        else
            size = 0;

        t = dataType & 0x7F;

        isArray = (dataType & 0x80) == 0x80;

        var payloadSize = DataType.sizeOf(dataType);

        var contentLength = 0;

        // check if we have the enough data
        if (payloadSize == -1) {
            contentLength = data.getUint32(offset);
            offset += 4;
            size += 4 + contentLength;
        }
        else
            size += payloadSize;


        sizeObject.size = size;

        if (isArray) {
            switch (t) {
                // VarArray ?
                case DataType.Void:
                    return Codec.parseVarArray(data, offset, contentLength, connection);

                case DataType.Bool:
                    return new AsyncReply(data.getBooleanArray(offset, contentLength));

                case DataType.UInt8:
                    return new AsyncReply(data.getUint8Array(offset, contentLength));

                case DataType.Int8:
                    return new AsyncReply(data.getInt8Array(offset, contentLength));

                case DataType.Char:
                    return new AsyncReply(data.getCharArray(offset, contentLength));

                case DataType.Int16:
                    return new AsyncReply(data.getInt16Array(offset, contentLength));

                case DataType.UInt16:
                    return new AsyncReply(data.getUint16Array(offset, contentLength));

                case DataType.Int32:
                    return new AsyncReply(data.getInt32Array(offset, contentLength));

                case DataType.UInt32:
                    return new AsyncReply(data.getUint32Array(offset, contentLength));

                case DataType.Int64:
                    return new AsyncReply(data.getInt64Array(offset, contentLength));

                case DataType.UInt64:
                    return new AsyncReply(data.getUint64Array(offset, contentLength));

                case DataType.Float32:
                    return new AsyncReply(data.getFloat32Array(offset, contentLength));

                case DataType.Float64:
                    return new AsyncReply(data.getFloat64Array(offset, contentLength));

                case DataType.String:
                    return new AsyncReply(data.getStringArray(offset, contentLength));

                case DataType.Resource:
                case DataType.DistributedResource:
                    return Codec.parseResourceArray(data, offset, contentLength, connection);

                case DataType.DateTime:
                    return new AsyncReply(data.getDateTimeArray(offset, contentLength));

                case DataType.Structure:
                    return Codec.parseStructureArray(data, offset, contentLength, connection);
            }
        }
        else {
            switch (t) {
                case DataType.NotModified:
                    return new AsyncReply(new NotModified());

                case DataType.Void:
                    return new AsyncReply(null);

                case DataType.Bool:
                    return new AsyncReply(data.getBoolean(offset));

                case DataType.UInt8:
                    return new AsyncReply(data[offset]);

                case DataType.Int8:
                    return new AsyncReply(data.getInt8(offset));

                case DataType.Char:
                    return new AsyncReply(data.getChar(offset));

                case DataType.Int16:
                    return new AsyncReply(data.getInt16(offset));

                case DataType.UInt16:
                    return new AsyncReply(data.getUint16(offset));

                case DataType.Int32:
                    return new AsyncReply(data.getInt32(offset));

                case DataType.UInt32:
                    return new AsyncReply(data.getUint32(offset));

                case DataType.Int64:
                    return new AsyncReply(data.getInt64(offset));

                case DataType.UInt64:
                    return new AsyncReply(data.getUint64(offset));

                case DataType.Float32:
                    return new AsyncReply(data.getFloat32(offset));

                case DataType.Float64:
                    return new AsyncReply(data.getFloat64(offset));

                case DataType.String:
                    return new AsyncReply(data.getString(offset, contentLength));

                case DataType.Resource:
                    return Codec.parseResource(data, offset);

                case DataType.DistributedResource:
                    return Codec.parseDistributedResource(data, offset, connection);

                case DataType.DateTime:
                    return new AsyncReply(data.getDateTime(offset));

                case DataType.Structure:
                    return Codec.parseStructure(data, offset, contentLength, connection);
            }
        }


        return null;
    }

    static parseResource(data, offset) {
        return Warehouse.get(data.getUint32(offset));
    }

    static parseDistributedResource(data, offset, connection) {
        //var g = data.getGuid(offset);
        //offset += 16;

        // find the object
        var iid = data.getUint32(offset);

        return connection.fetch(iid);// Warehouse.Get(iid);
    }

            /// <summary>
        /// Parse an array of bytes into array of resources
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns>Array of resources.</returns>
        static parseResourceArray(data, offset, length, connection)
        {
            var reply = new AsyncBag();
            if (length == 0)
            {
                reply.seal();
                return reply;
            }

            var end = offset + length;

            // 
            var result = data[offset++];

            var previous = null;

            if (result == ResourceComparisonResult.Null)
                previous = new AsyncReply(null);
            else if (result == ResourceComparisonResult.Local)
            {
                previous = Warehouse.get(data.getUint32(offset));
                offset += 4;
            }
            else if (result == ResourceComparisonResult.Distributed)
            {
                previous = connection.fetch(data.getUint32(offset));
                offset += 4;
            }

            reply.add(previous);


            while (offset < end)
            {
                result = data[offset++];

                var current = null;

                if (result == ResourceComparisonResult.Null)
                {
                    current = new AsyncReply(null);
                }
                else if (result == ResourceComparisonResult.Same)
                {
                    current = previous;
                }
                else if (result == ResourceComparisonResult.Local)
                {
                    current = Warehouse.get(data.getUint32(offset));
                    offset += 4;
                }
                else if (result == ResourceComparisonResult.Distributed)
                {
                    current = connection.fetch(data.getUint32(offset));
                    offset += 4;
                }

                reply.add(current);

                previous = current;
            }

            reply.seal();
            return reply;
        }

        /// <summary>
        /// Compose an array of property values.
        /// </summary>
        /// <param name="array">PropertyValue array.</param>
        /// <param name="connection">DistributedConnection is required to check locality.</param>
        /// <param name="prependLength">If True, prepend the length as UInt32 at the beginning of the output.</param>
        /// <returns>Array of bytes in the network byte order.</returns>
    
        static composePropertyValueArray(array, connection, prependLength = false)
        {
            var rt = BL();
            for (var i = 0; i < array.Length; i++)
                rt.addUint8Array(Codec.composePropertyValue(array[i], connection));
            if (prependLength)
                rt.addUint32(rt.length, 0);
            return rt.toArray();
        }

        /// <summary>
        /// Compose a property value.
        /// </summary>
        /// <param name="propertyValue">Property value</param>
        /// <param name="connection">DistributedConnection is required to check locality.</param>
        /// <returns>Array of bytes in the network byte order.</returns>
        static composePropertyValue(propertyValue, connection)
        {
            // age, date, value
            return BL().addUint64(propertyValue.age)
                       .addDateTime(propertyValue.date)
                       .addUint8Array(Codec.compose(propertyValue.value, connection))
                       .toArray();
        }


        /// <summary>
        /// Parse property value.
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <param name="cs">Output content size.</param>
        /// <returns>PropertyValue.</returns>
        static parsePropertyValue(data, offset, sizeObject, connection)
        {
            var reply = new AsyncReply();
            
            var age = data.getUint64(offset);
            offset += 8;
    
            var date = data.getDateTime(offset);
            offset += 8;

            var cs = {};

            Codec.parse(data, offset, cs, connection).then(function(value)
            {
                reply.trigger(new PropertyValue(value, age, date));
            });

            sizeObject.size = 16 + cs.size;
            return reply;
        }


        /// <summary>
        /// Parse resource history
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="resource">Resource</param>
        /// <param name="fromAge">Starting age.</param>
        /// <param name="toAge">Ending age.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static parseHistory(data, offset, length, resource, connection)
        {
            var list = new KeyList();

            var reply = new AsyncReply();

            var bagOfBags = new AsyncBag();

            var ends = offset + length;
            while (offset < ends)
            {
                var index = data[offset++];
                var pt = resource.instance.template.getPropertyTemplateByIndex(index);

                list.add(pt, null);

                
                var cs = data.getUint32(offset);
                offset += 4;
                bagOfBags.add(Codec.parsePropertyValueArray(data, offset, cs, connection));
                offset += cs;
            }

            bagOfBags.seal();

            bagOfBags.then(x =>
            {
                for(var i = 0; i < list.length; i++)
                    list.values[i] = x[i];

                reply.trigger(list);
            });

            return reply;
            
        }

        /// <summary>
        /// Compose resource history
        /// </summary>
        /// <param name="history">History</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static composeHistory(history, connection, prependLength = false)
        {
            var rt = new BinaryList();

            for (var i = 0; i < history.length; i++)
                rt.addUint8(history.keys[i].index).addUint8Array(Codec.composePropertyValueArray(history.values[i], connection, true));

            if (prependLength)
                rt.addUint32(rt.length, 0);
                
            return rt.toArray();
        }

        /// <summary>
        /// Parse an array of ProperyValue.
        /// </summary>
        /// <param name="data">Array of bytes.</param>
        /// <param name="offset">Zero-indexed offset.</param>
        /// <param name="length">Number of bytes to parse.</param>
        /// <param name="connection">DistributedConnection is required to fetch resources.</param>
        /// <returns></returns>
        static parsePropertyValueArray(data, offset, length, connection)
        {
            var rt = new AsyncBag();

            while (length > 0)
            {
                var cs = {};

                rt.add(Codec.parsePropertyValue(data, offset, cs, connection));
                
                if (cs.size > 0)
                {
                    offset += cs.size;
                    length -= cs.size;
                }
                else
                    throw new Exception("Error while parsing ValueInfo structured data");
            }

            rt.seal();
            return rt;
        }

        static parseStructure(data, offset, contentLength, connection, metadata = null, keys = null, types = null) 
        {
            var reply = new AsyncReply();
            var bag = new AsyncBag();


            var keylist = [];
            var typelist = [];


        if (keys == null) {
            while (contentLength > 0) {
                var len = data[offset++];
                keylist.push(data.getString(offset, len));
                offset += len;

                typelist.push(data[offset]);

                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection));
                contentLength -= rt.size + len + 1;
                offset += rt.size;
            }
        }
        else if (types == null) {
            for (var i = 0; i < keys.length; i++)
                keylist.push(keys[i]);

            while (contentLength > 0) {
                typelist.push(data[offset]);

                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection));
                contentLength -= rt.size;
                offset += rt.size;
            }
        }
        else {
            
            for (var i = 0; i < keys.length; i++) {
                keylist.push(keys[i]);
                typelist.push(types[i]);
            }

            var i = 0;
            while (contentLength > 0) {
                var rt = {};
                bag.add(Codec.parse(data, offset, rt, connection, types[i]));
                contentLength -= rt.size;
                offset += rt.size;
                i++;
            }
        }

        bag.seal();

        bag.then(function (res) {
            // compose the list
            var s = new Structure();
            for (var i = 0; i < keylist.length; i++)
                s[keylist[i]] = res[i];
            reply.trigger(s);
        });

        if (metadata != null)
        {
            metadata.keys = keylist;
            metadata.types = typelist;
        }
        
        return reply;
    }


    static parseVarArray(data, offset, contentLength, connection) {
        var rt = new AsyncBag();

        while (contentLength > 0) {
            var cs = {};

            rt.add(Codec.parse(data, offset, cs, connection));

            if (cs.size > 0) {
                offset += cs.size;
                contentLength -= cs.size;
            }
            else
                throw new Exception("Error while parsing structured data");

        }

        rt.seal();
        return rt;
    }


    static compose(value, connection, prependType = true) {

        if (value instanceof Function)
            value = value(connection);
        else if (value instanceof DistributedPropertyContext)
            value = value.method(this);
        
        var type = Codec.getDataType(value, connection);
        var rt = new BinaryList();

        switch (type) {
            case DataType.Void:
                // nothing to do;
                break;

            case DataType.String:
                var st = DC.stringToBytes(value);
                rt.addUint32(st.length).addUint8Array(st);
                break;

            case DataType.Resource:
                rt.addUint32(value._p.instanceId);
                break;

            case DataType.DistributedResource:
//                rt.addUint8Array(DC.stringToBytes(value.instance.template.classId)).addUint32(value.instance.id);
                rt.addUint32(value.instance.id);
                break;

            case DataType.Structure:
                rt.addUint8Array(Codec.composeStructure(value, connection, true, true, true));
                break;

            case DataType.VarArray:
                rt.addUint8Array(Codec.composeVarArray(value, connection, true));
                break;

            case DataType.ResourceArray:
                rt.addUint8Array(Codec.composeResourceArray(value, connection, true));
                break;

            case DataType.StructureArray:
                rt.addUint8Array(Codec.composeStructureArray(value, connection, true));
                break;

            default:
                rt.add({type: type, value: value});
                if (DataType.isArray(type))
                    rt.addUint32(rt.length, 0);

                break;
        }

        if (prependType)
            rt.addUint8(type, 0);

        return rt.toArray();
    }

    static composeVarArray(array, connection, prependLength = false) {
        var rt = new BinaryList();

        for (var i = 0; i < array.length; i++)
            rt.addUint8Array(Codec.compose(array[i], connection));

        if (prependLength)
            rt.addUint32(rt.length, 0);
        return rt.toArray();
    }

    static composeStructure(value, connection, includeKeys = true, includeTypes = true, prependLength = false) {
        var rt = new BinaryList();

        var keys = value.getKeys();

        if (includeKeys) {
            for (var i = 0; i < keys.length; i++) {
                var key = DC.stringToBytes(keys[i]);
                rt.addUint8(key.length).addUint8Array(key).addUint8Array(Codec.compose(value[keys[i]], connection));
            }
        }
        else {
            for (var i = 0; i < keys.length; i++)
                rt.addUint8Array(Codec.compose(value[keys[i]], connection, includeTypes));
        }

        if (prependLength)
            rt.addUint32(rt.length, 0);

        return rt.toArray();
    }

    static composeStructureArray(structures, connection, prependLength = false) {
        if (structures == null || structures.length == 0 || !(structures instanceof StructureArray))
            return new DC(0);

        var rt = new BinaryList();
        var comparision = StructureComparisonResult.Structure;

        rt.addUint8(comparision);
        rt.addUint8Array(Codec.composeStructure(structures[0], connection));

        for (var i = 1; i < structures.Length; i++) {
            comparision = Codec.compareStructure(structures[i - 1], structures[i], connection);
            rt.addUint8(comparision);

            if (comparision == StructureComparisonResult.Structure)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection));
            else if (comparision == StructureComparisonResult.StructureSameKeys)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection, false));
            else if (comparision == StructureComparisonResult.StructureSameTypes)
                rt.addUint8Array(Codec.composeStructure(structures[i], connection, false, false));
        }

        if (prependLength)
            rt.addUint32(rt.length, 0);

        return rt.toArray();
    }

    static compareStructure(previous, next, connection) {
        if (next == null)
            return StructureComparisonResult.Null;

        if (previous == null)
            return StructureComparisonResult.Structure;

        if (next == previous)
            return StructureComparisonResult.Same;

        if (previous.length != next.length)
            return StructureComparisonResult.Structure;

        var previousKeys = previous.getKeys();
        var nextKeys = next.getKeys();

        for (var i = 0; i < previousKeys.length; i++)
            if (previousKeys[i] != nextKeys[i])
                return StructureComparisonResult.Structure;

        var previousTypes = Codec.getStructureDateTypes(previous, connection);
        var nextTypes = Codec.getStructureDateTypes(next, connection);

        for (var i = 0; i < previousTypes.length; i++)
            if (previousTypes[i] != nextTypes[i])
                return StructureComparisonResult.StructureSameKeys;

        return StructureComparisonResult.StructureSameTypes;
    }

    static getStructureDateTypes(structure, connection) {
        var keys = structure.getKeys();
        var types = [];

        for (var i = 0; i < keys.length; i++)
            types.push(Codec.getDataType(structure[keys[i]], connection));
        return types;
    }

static isLocalResource(resource, connection) {
    if (resource instanceof DistributedResource)
        if (resource._p.connection == connection)
            return true;

    return false;
}

    static composeResource(resource, connection) {
        if (Codec.isLocalResource(resource, connection))
            return BL().addUint32(resource.id);
        else {
            return BL().addUint8Array(resource.instance.template.classId.value).addUint32(resource.instance.id);
        }
    }

    static compareResource(previous, next, connection) {

        if (next == null)
            return ResourceComparisonResult.Null;
        else if (next == previous)
            return ResourceComparisonResult.Same;
        else if (Codec.isLocalResource(next, connection))
            return ResourceComparisonResult.Local;
        else
            return ResourceComparisonResult.Distributed;
    }

 static composeResourceArray(resources, connection, prependLength = false) {

    if (resources == null || resources.length == 0)// || !(resources instanceof ResourceArray))
        return prependLength ? new DC(4) : new DC(0);

    var rt = new BinaryList();
    var comparsion = Codec.compareResource(null, resources[0], connection);

    rt.addUint8(comparsion);

    if (comparsion == ResourceComparisonResult.Local)
        rt.addUint32(resources[0]._p.instanceId);
    else if (comparsion == ResourceComparisonResult.Distributed)
        rt.addUint32(resources[0].instance.id);

    for (var i = 1; i < resources.Length; i++)
    {
        comparsion = Codec.compareResource(resources[i - 1], resources[i], connection);
        rt.addUint8(comparsion);
        if (comparsion == ResourceComparisonResult.Local)
            rt.addUint32(resources[i]._p.instanceId);
        else if (comparsion == ResourceComparisonResult.Distributed)
            rt.addUint32(resources[i].instance.id);
    }

    if (prependLength)
        rt.addUint32(rt.length, 0);
    

    return rt.toArray();
 }



static getDataType(value) {
        switch (typeof value) {
            case "number":
                // float or ?
                if (Math.floor(value) == value) {
                    if (value > 0) {
                        // larger than byte ?
                        if (value > 0xFF) {
                            // larger than short ?
                            if (value > 0xFFFF) {
                                // larger than int ?
                                if (value > 0xFFFFFFFF) {
                                    return DataType.UInt64;
                                }
                                else {
                                    return DataType.UInt32;
                                }
                            }
                            else {
                                return DataType.UInt16;
                            }
                        }
                        else {
                            return DataType.UInt8;
                        }
                    }
                    else {
                        if (value < -128) {
                            if (value < -32768) {
                                if (value < -2147483648) {
                                    return DataType.Int64;
                                }
                                else {
                                    return DataType.Int32;
                                }
                            }
                            else {
                                return DataType.Int16;
                            }
                        }
                        else {
                            return DataType.Int8;
                        }
                    }
                }
                else {
                    // float or double
                    return DataType.Float64;
                }
                break;

            case "string":
                return DataType.String;
            case "boolean":
                return DataType.Bool;
            case "object":
                if (value instanceof Array) {
                    return DataType.VarArray;
                }
                else if (value instanceof IResource) {
                    return Codec.isLocalResource(value, connection) ? DataType.Resource : DataType.DistributedResource;
                }
                else if (value instanceof Date) {
                    return DataType.DateTime;
                }
                else if (value instanceof Uint8Array
                    || value instanceof ArrayBuffer) {
                    return DataType.UInt8Array;
                }
                else if (value instanceof Number) {
                    // JS numbers are always 64-bit float
                    return DataType.Float64;
                }
                else if (value instanceof Structure) {
                    return DataType.Structure;
                }
                else {
                    return DataType.Void
                }

                break;

            default:
                return DataType.Void;
        }
    }


            /// <summary>
        /// Parse an array of structures
        /// </summary>
        /// <param name="data">Bytes array</param>
        /// <param name="offset">Zero-indexed offset</param>
        /// <param name="length">Number of bytes to parse</param>
        /// <param name="connection">DistributedConnection is required in case a structure in the array holds items at the other end</param>
        /// <returns>Array of structures</returns>
        static parseStructureArray(data, offset, length, connection)
        {
            var reply = new AsyncBag();
            if (length == 0)
            {
                reply.seal();
                return reply;
            }

            var end = offset + length;

            var result = data[offset++];

            var previous = null;
            //var previousKeys = [];
            //var previousTypes = [];

            var metadata = {keys: null, types: null};
             

            if (result == StructureComparisonResult.Null)
                previous = new AsyncReply(null);
            else if (result == StructureComparisonResult.Structure)
            {
                var cs = data.getUint32(offset);
                offset += 4;          
                previous = this.parseStructure(data, offset, cs, connection, metadata);
                offset += cs;
            }
 
            reply.add(previous);


            while (offset < end)
            {
                result = data[offset++];

                if (result == StructureComparisonResult.Null)
                    previous = new AsyncReply(null);
                else if (result == StructureComparisonResult.Structure)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata);
                    offset += cs;
                }
                else if (result == StructureComparisonResult.StructureSameKeys)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys);
                    offset += cs;
                }
                else if (result == StructureComparisonResult.StructureSameTypes)
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    previous = this.parseStructure(data, offset, cs, connection, metadata, metadata.keys, metadata.types);
                    offset += cs;
                }

                reply.add(previous);
            }

            reply.seal();
            return reply;
        }


}