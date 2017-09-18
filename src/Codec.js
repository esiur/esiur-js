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

var ResourceComparisonResult =
    {
        Null: 0,
        Distributed: 1,
        DistributedSameClass: 2,
        Local: 3,
        Same: 4
    };

var StructureComparisonResult =
    {
        Null: 0,
        Structure: 1,
        StructureSameKeys: 2,
        StructureSameTypes: 3,
        Same: 4
    };

class Codec {

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


    static parseStructure(data, offset, contentLength, connection, keylist = null, typelist = null, keys = null, types = null) {
        var reply = new AsyncReply();
        var bag = new AsyncBag();


        if (keylist == null)
            keylist = [];
        if (typelist == null)
            typelist = [];

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
                contentLength -= rt.size + 1;
                offset += rt.size + 1;
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
                rt.addUint32(value.instance.id);
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
                rt.addUint8(key.length).addString(key).addUint8Array(DC.compose(value[i], connection));
            }
        }
        else {
            for (var i = 0; i < keys.length; i++)
                rt.addUint8Array(DC.compose(value[keys[i]], connection, includeTypes));
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
        if (resource.connection == connection)
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

        if (next == previous)
            return ResourceComparisonResult.Same;

        if (Codec.isLocalResource(next, connection))
            return ResourceComparisonResult.Local;

        if (previous == null)
            return ResourceComparisonResult.Distributed;

        if (previous.instance.template.classId.valueOf() == next.instance.template.classId.valueOf())
            return ResourceComparisonResult.DistributedSameClass;

        return ResourceComparisonResult.Distributed;
    }

 static composeResourceArray(resources, connection, prependLength = false) {
     if (resources == null || resources.length == 0 || !(resources instanceof ResourceArray))
         return new DC(0);

     var rt = new BinaryList();
     var comparsion = Codec.compareResource(null, resources[0], connection);

     rt.addUint8(comparsion);

     if (comparsion == ResourceComparisonResult.Local)
         rt.addUint32(resources[0].id);
     else if (comparsion == ResourceComparisonResult.Distributed) {
         rt.addUint8Array(resources[0].instance.template.classId.value);
         rt.addUint32(resources[0].instance.id);
     }

     for (var i = 1; i < resources.length; i++) {
         comparsion = Codec.compareResource(resources[i - 1], resources[i], connection);
         rt.addUint8(comparsion);
         if (comparsion == ResourceComparisonResult.Local)
             rt.addUint32(resources[0].id);
         else if (comparsion == ResourceComparisonResult.Distributed) {
             rt.addUint8Array(resources[0].instance.template.classId.value);
             rt.addUint32(resources[0].instance.id);
         }
         else if (comparsion == ResourceComparisonResult.DistributedSameClass) {
             rt.addUint32(resources[0].instance.id);
         }
     }

     if (prependLength)
         rt.addUint32(0, rt.length);

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
}