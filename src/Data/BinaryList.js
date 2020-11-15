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
 * Created by Ahmed Zamil on 25/08/2017.
 */

"use strict";  

import DataType from './DataType.js';
import DC from './DataConverter.js';

export default class BinaryList
{

    constructor()
    {
        this.list = [];
    }


    addRange(bl)
    {
        for(var i = 0; i < bl.list.length; i++)
            this.list.push(bl.list[i]);

        return this;
    }

    add(typedValue, position)
    {
        if (position !== undefined)
            this.list.splice(position, 0, typedValue);
        else
            this.list.push(typedValue);
        return this;
    }

    get length()
    {
        return this.toArray().length;
    }

    toArray()
    {
        var ars = [];
        // calculate length
        for(var i = 0; i < this.list.length; i++)
        {
            switch (this.list[i].type)
            {
                case DataType.Bool:
                    ars.push(DC.boolToBytes(this.list[i].value));
                    break;
                case DataType.UInt8:
                    ars.push(DC.uint8ToBytes(this.list[i].value));
                    break;
                case DataType.Int8:
                    ars.push(DC.int8ToBytes(this.list[i].value));
                    break;
                case DataType.Char:
                    ars.push(DC.charToBytes(this.list[i].value));
                    break;
                case DataType.UInt16:
                    ars.push(DC.uint16ToBytes(this.list[i].value));
                    break;
                case DataType.Int16:
                    ars.push(DC.int16ToBytes(this.list[i].value));
                    break;
                case DataType.UInt32:
                    ars.push(DC.uint32ToBytes(this.list[i].value));
                    break;
                case DataType.Int32:
                    ars.push(DC.int32ToBytes(this.list[i].value));
                    break;
                case DataType.UInt64:
                    ars.push(DC.uint64ToBytes(this.list[i].value));
                    break;
                case DataType.Int64:
                    ars.push(DC.int64ToBytes(this.list[i].value));
                    break;
                case DataType.Float32:
                    ars.push(DC.float32ToBytes(this.list[i].value));
                    break;
                case DataType.Float64:
                    ars.push(DC.float64ToBytes(this.list[i].value));
                    break;
                case DataType.String:
                    ars.push(DC.stringToBytes(this.list[i].value));
                    break;
                case DataType.DateTime:
                    ars.push(DC.dateTimeToBytes(this.list[i].value));
                    break;
                case DataType.UInt8Array:
                    ars.push(this.list[i].value);
                    break;

                case DataType.UInt16Array:
                    ars.push(DC.uint16ArrayToBytes(this.list[i].value));
                    break;
    
                case DataType.UInt32Array:
                    ars.push(DC.uint32ArrayToBytes(this.list[i].value));
                    break;

                case DataType.Int16Array:
                    ars.push(DC.int16ArrayToBytes(this.list[i].value));
                    break;

                case DataType.Int32Array:
                    ars.push(DC.int32ArrayToBytes(this.list[i].value));
                    break;

                case DataType.Float32Array:
                    ars.push(DC.float32ArrayToBytes(this.list[i].value));
                    break;

                case DataType.Float64Array:
                    ars.push(DC.float64ArrayToBytes(this.list[i].value));
                    break;

                //case DataType.Resource:
                //    ars.push(DC.uint32ToBytes(this.list[i].value.instance.id));
                //    break;
                //case DataType.DistributedResource:
                //    ars.push(DC.int8ToBytes(this.list[i].value));
                //    break;



            }
        }

        var length = 0;
        ars.forEach(function(a){
            length += a.length ;//?? a.byteLength;
        });

        var rt = new Uint8Array(length);

        var offset = 0;
        for(var i = 0; i < ars.length; i++) {
            rt.set(ars[i], offset);
            offset+=ars[i].length;// ?? ars[i].byteLength;
        }

        return rt;
    }

    toDC()
    {
        return new DC(this.toArray());
    }
    
    addDateTime(value, position)
    {
        return this.add({type: DataType.DateTime, value: value}, position);
    }

    addUint8Array(value, position)
    {
        return this.add({type: DataType.UInt8Array, value: value}, position);
    }


    addHex(value, position)
    {
        return this.addUint8Array(DC.hexToBytes(value), position);
    }

    addString(value, position)
    {
        return this.add({type: DataType.String, value: value}, position);
    }

    addUint8(value, position)
    {
        return this.add({type: DataType.UInt8, value: value}, position);
    }

    addInt8(value, position)
    {
        return this.add({type: DataType.Int8, value: value}, position);
    }

    addChar(value, position)
    {
        return this.add({type: DataType.Char, value: value}, position);
    }

    addUint16(value, position)
    {
        return this.add({type: DataType.UInt16, value: value}, position);
    }

    addInt16(value, position)
    {
        return this.add({type: DataType.Int16, value: value}, position);
    }

    addUint32(value, position)
    {
        return this.add({type: DataType.UInt32, value: value}, position);
    }

    addInt32(value, position)
    {
        return this.add({type: DataType.Int32, value: value}, position);
    }

    addUint64(value, position)
    {
        return this.add({type: DataType.UInt64, value: value}, position);
    }

    addInt64(value, position)
    {
        return this.add({type: DataType.Int64, value: value}, position);
    }

    addFloat32(value, position)
    {
        return this.add({type: DataType.Float32, value: value}, position);
    }

    addFloat64(value, position)
    {
        return this.add({type: DataType.Float64, value: value}, position);
    }

}