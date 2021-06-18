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

export default
{ 
    Void: 0x0,
    //Variant,
    Bool: 1,
    Int8: 2,
    UInt8: 3,
    Char: 4,
    Int16: 5,
    UInt16: 6,
    Int32: 7,
    UInt32: 8,
    Int64: 9,
    UInt64: 10,
    Float32: 11,
    Float64: 12,
    Decimal: 13,
    DateTime: 14,
    Resource: 15,
    DistributedResource: 16,
    ResourceLink: 17,
    String: 18,
    Structure: 19,
    Record: 20,
    //Stream,
    //Array = 0x80,
    VarArray: 0x80,
    BoolArray: 0x81,
    Int8Array: 0x82,
    UInt8Array: 0x83,
    CharArray: 0x84,
    Int16Array: 0x85,
    UInt16Array: 0x86,
    Int32Array: 0x87,
    UInt32Array: 0x88,
    Int64Array: 0x89,
    UInt64Array: 0x8A,
    Float32Array: 0x8B,
    Float64Array: 0x8C,
    DecimalArray: 0x8D,
    DateTimeArray: 0x8E,
    ResourceArray: 0x8F,
    DistributedResourceArray: 0x90,
    ResourceLinkArray: 0x91,
    StringArray: 0x92,
    StructureArray: 0x93,
    RecordArray: 0x94,
    NotModified: 0x7f,
    Unspecified: 0xff,

    isArray: function(type)
    {
        return ((type & 0x80) == 0x80) && (type != this.NotModified);
    },

    sizeOf: function(type)
    {
        switch (type)
        {
            case this.Void:
            case this.NotModified:
                return 0;
            case this.Bool:
            case this.Int8:
            case this.UInt8:
                return 1;
            case this.Char:
            case this.Int16:
            case this.UInt16:
                return 2;
            case this.Int32:
            case this.UInt32:
            case this.Float32:
            case this.Resource:
                return 4;
            case this.Int64:
            case this.UInt64:
            case this.Float64:
            case this.DateTime:
                return 8;
            case this.DistributedResource:
                return 4;

            default:
                return -1;
        }
    }
};
