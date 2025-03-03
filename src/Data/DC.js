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

import BinaryList from './BinaryList.js';
import UUID from './UUID.js';

export const UNIX_EPOCH = 621355968000000000;
export const TWO_PWR_32 = (1 << 16) * (1 << 16);

export const Endian = {
    Big: 0,
    Little: 1
}

export default class DC extends Uint8Array
{
    constructor(bufferOrSize) {
        super(bufferOrSize);

        //if (bufferOrSize instanceof ArrayBuffer) {
          //  this.buffer = bufferOrSize;
        //}
        //else
        //{
          //  this.buffer = new Uint8Array(bufferOrSize);
        //}

        this.dv = new DataView(this.buffer);
    }


    static uuidToBytes(value){
        return value.value;
    }
    
    static boolToBytes(value)
    {
        var rt = new DC(1);
        rt.setBoolean(0, value);
        return rt;
    }

    static int8ToBytes(value)
    {
        var rt = new DC(1);
        rt.setInt8(0, value);
        return rt;
    }

    static fromList(list){
        return new DC(list);
    }
    
    static fromHex(value)
    {
        // convert hex to Uint8Array
        var rt = new DC(value.length/2);
        for(var i = 0; i < rt.length; i++)
            rt[i] = parseInt(value.substr(i*2, 2), 16);
        return rt;
    }

    static uint8ToBytes(value)
    {
        var rt = new DC(1);
        rt.setUint8(0, value);
        return rt;
    }

    static charToBytes(value, endian)
    {
        var rt = new DC(2);
        rt.setChar(0, value, endian);
        return rt;
    }

    static int16ToBytes(value, endian)
    {
        var rt = new DC(2);
        rt.setInt16(0, value, endian);
        return rt;
    }

    static uint16ToBytes(value, endian)
    {
        var rt = new DC(2);
        rt.setUint16(0, value, endian);
        return rt;
    }

    static int32ToBytes(value, endian)
    {
        var rt = new DC(4);
        rt.setInt32(0, value, endian);
        return rt;
    }

    static uint32ToBytes(value, endian)
    {
        var rt = new DC(4);
        rt.setUint32(0, value, endian);
        return rt;
    }

    static float32ToBytes(value, endian)
    {
        var rt = new DC(4);
        rt.setFloat32(0, value, endian);
        return rt;
    }

    static int64ToBytes(value, endian)
    {
        var rt = new DC(8);
        rt.setInt64(0, value, endian);
        return rt;
    }

    static uint64ToBytes(value, endian)
    {
        var rt = new DC(8);
        rt.setUint64(0, value, endian);
        return rt;
    }

    static float64ToBytes(value, endian)
    {
        var rt = new DC(8);
        rt.setFloat64(0, value, endian);
        return rt;
    }

    static dateTimeToBytes(value, endian)
    {
        var rt = new DC(8);
        rt.setDateTime(0, value, endian);
        return rt;
    }

    static stringToBytes(value)
    {
        var utf8 = unescape(encodeURIComponent(value));
        var rt = [];

        for (var i = 0; i < utf8.length; i++)
            rt.push(utf8.charCodeAt(i));

        return new DC(rt);
    }

    static stringArrayToBytes(values)
    {
        var list = new BinaryList();
        for(var i = 0; i < values.length; i++)
        {
            var s = DC.stringToBytes(values[i]);
            list.addUint32(s.length).addUint8Array(s);
        }

        return list.toArray();
    }

    static uint16ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 2);
        for(var i = 0; i < values.length; i++)
            rt.setUint16(i * 2, values[i], endian);
        return rt;
    }

    static int16ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 2);
        for(var i = 0; i < values.length; i++)
            rt.setInt16(i * 2, values[i], endian);
        return rt;
    }

    static uint32ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 4);
        for(var i = 0; i < values.length; i++)
            rt.setUint32(i * 4, values[i], endian);
        return rt;
    }


    static int32ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 4);
        for(var i = 0; i < values.length; i++)
            rt.setInt32(i * 4, values[i], endian);
        return rt;
    }

    static int64ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 8);
        for(var i = 0; i < values.length; i++)
            rt.setInt64(i * 8, values[i], endian);
        return rt;
    }

    static uint64ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 8);
        for(var i = 0; i < values.length; i++)
            rt.setUint64(i * 8, values[i], endian);
        return rt;
    }

    static float32ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 4);
        for(var i = 0; i < values.length; i++)
            rt.setFloat32(i * 4, values[i], endian);
        return rt;
    }

    static float64ArrayToBytes(values, endian)
    {
        var rt = new DC(values.length * 8);
        for(var i = 0; i < values.length; i++)
            rt.setFloat64(i * 8, values[i], endian);
        return rt;
    }

    append(src, offset, length)
    {
        if (!(src instanceof DC))
            src = new DC(src);

        var appendix = src.clip(offset, length);
        var rt = new DC(this.length + appendix.length);
        rt.set(this, 0);
        rt.set(appendix, this.length);
        return rt;
    }

    static combine(a, aOffset, aLength, b, bOffset, bLength)
    {
        if (!(a instanceof DC))
            a = new DC(a);
        if (!(b instanceof DC))
            b = new DC(b);

        a = a.clip(aOffset, aLength);
        b = b.clip(bOffset, bLength);

        var rt = new DC(a.length  + b.length);
        rt.set(a, 0);
        rt.set(b, a.length);
        return rt;
    }

    clip(offset, length)
    {
        return this.slice(offset, offset+length);
    }

    getInt8(offset)
    {
        return this.dv.getUint8(offset);
    }

    getUint8(offset)
    {
        return this[offset];// this.dv.getUint8(offset);
    }

    getInt16(offset, endian)
    {
        return this.dv.getInt16(offset, endian != Endian.Big);
    }

    getUint16(offset, endian)
    {
        return this.dv.getUint16(offset, endian != Endian.Big);
    }

    getInt32(offset, endian)
    {
        return this.dv.getInt32(offset, endian != Endian.Big);
    }

    getUint32(offset, endian)
    {
        return this.dv.getUint32(offset, endian != Endian.Big);
    }

    getFloat32(offset, endian)
    {
        return this.dv.getFloat32(offset, endian != Endian.Big);
    }

    getFloat64(offset, endian)
    {
        return this.dv.getFloat64(offset, endian != Endian.Big);
    }

    setInt8(offset, value)
    {
        return this.dv.setInt8(offset, value);
    }

    setUint8(offset, value)
    {
        return this.dv.setUint8(offset, value);
    }

    setInt16(offset, value, endian)
    {
        return this.dv.setInt16(offset, value, endian != Endian.Big);
    }

    setUint16(offset, value, endian)
    {
        return this.dv.setUint16(offset, value, endian != Endian.Big);
    }

    setInt32(offset, value, endian)
    {
        return this.dv.setInt32(offset, value, endian != Endian.Big);
    }

    setUint32(offset, value, endian)
    {
        return this.dv.setUint32(offset, value, endian != Endian.Big);
    }

    setFloat32(offset, value, endian)
    {
        return this.dv.setFloat32(offset, value, endian != Endian.Big);
    }

    setFloat64(offset, value, endian)
    {
        return this.dv.setFloat64(offset, value, endian != Endian.Big);
    }

    getInt8Array(offset, length)
    {
        return new Int8Array(this.buffer, offset, length);
    }

    getUint8Array(offset, length)
    {
        return new Uint8Array(this.buffer, offset, length);
    }

    copy(offset, length, elementSize, func, dstType, endian) 
    {
        let rt = new dstType(length / elementSize);
        let d = 0, end = offset + length;
        for (let i = offset; i < end; i += elementSize)
            rt[d++] = func.call(this, i, endian);
        return rt;
    }

    paste(offset, length, elementSize, func) 
    {
        let rt = new dstType(length / elementSize);
        let d = 0, end = offset + length;
        for (let i = offset; i < end; i += elementSize)
            rt[d++] = func.call(this, i);
        return rt;
    }


    getInt16Array(offset, length, endian)
    {
        return this.copy(offset, length, 2, this.getInt16, Int16Array, endian);
        //return new Int16Array(this.clip(offset, length).buffer);
    }

    getUint16Array(offset, length, endian)
    {
        return this.copy(offset, length, 2, this.getUint16, Uint16Array, endian);
    }

    getInt32Array(offset, length, endian)
    {
        return this.copy(offset, length, 4, this.getInt32, Int32Array, endian);
    }


    getUint32Array(offset, length, endian)
    {
        return this.copy(offset, length, 4, this.getUint32, Uint32Array, endian);
    }

    getFloat32Array(offset, length, endian)
    {
        return this.copy(offset, length, 4, this.getFloat32, Float32Array, endian);
    }

    getFloat64Array(offset, length, endian)
    {       
        return this.copy(offset, length, 8, this.getFloat64, Float64Array, endian);
    }

    getInt64Array(offset, length, endian)
    {
        return this.copy(offset, length, 8, this.getInt64, Float64Array, endian);
    }


    getUint64Array(offset, length, endian)
    {
        return this.copy(offset, length, 8, this.getUint64, Float64Array, endian);
    }

    getBoolean(offset)
    {
        return this.getUint8(offset) > 0;
    }

    setBoolean(offset, value)
    {
        this.setUint8(offset, value ? 1: 0);
    }

    getBooleanArray(offset, length)
    {
        var rt = [];
        for(var i = 0; i < length; i++)
            rt.push(this.getBoolean(offset+i));
        return rt;
    }

    getChar(offset, endian)
    {
        return String.fromCharCode(this.getUint16(offset, endian));
    }

    setChar(offset, value, endian)
    {
        this.setUint16(offset, value.charCodeAt(0), endian);
    }

    getCharArray(offset, length, endian)
    {
        var rt = [];
        for(var i = 0; i < length; i+=2)
            rt.push(this.getChar(offset+i, endian));
        return rt;
    }

    toHex(offset, length)
    {
        var rt = "";
        if (length == null)
            length = this.byteLength;
        if (offset == null)
            offset = 0;
        for(var i = offset; i < offset + length; i++) {
            var h = this[i].toString(16);
            rt += h.length == 1 ? "0" + h : h;
        }

        return rt;
    }

    getString(offset, length)
    {
        if (typeof StringView != "undefined")
            return new StringView(this.buffer, "UTF-8", offset, length);
        else
        {
            var bytes = this.getUint8Array(offset, length);
            var encodedString = String.fromCharCode.apply(null, bytes),
                decodedString = decodeURIComponent(escape(encodedString));
            return decodedString;
        }
    }

    getStringArray(offset, length, endian)
    {
        var rt = [];
        var i = 0;

        while (i < length)
        {
            var cl = this.getUint32(offset + i, endian);
            i += 4;
            rt.push(this.getString(offset + i, cl));
            i += cl;
        }

        return rt;
    }

    // @TODO: Test numbers with bit 7 of h = 1 
    getInt64(offset, endian)
    {
        if (endian == Endian.Big) {
            let bi = BigInt(0);
    
            bi |= BigInt(this[offset++]) << 56n;
            bi |= BigInt(this[offset++]) << 48n;
            bi |= BigInt(this[offset++]) << 40n;
            bi |= BigInt(this[offset++]) << 32n;
            bi |= BigInt(this[offset++]) << 24n;
            bi |= BigInt(this[offset++]) << 16n;
            bi |= BigInt(this[offset++]) << 8n;
            bi |= BigInt(this[offset++]);
    
            return parseInt(bi);
          } else {
            let bi = BigInt(0);
    
            bi |= BigInt(this[offset++]);
            bi |= BigInt(this[offset++]) << 8n;
            bi |= BigInt(this[offset++]) << 16n;
            bi |= BigInt(this[offset++]) << 24n;
            bi |= BigInt(this[offset++]) << 32n;
            bi |= BigInt(this[offset++]) << 40n;
            bi |= BigInt(this[offset++]) << 48n;
            bi |= BigInt(this[offset++]) << 56n;
    
            return parseInt(bi);
          }
    
        // var h = this.getInt32(offset);
        // var l = this.getInt32(offset + 4);

        // return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }

    getUint64(offset, endian)
    {

        if (endian == Endian.Big) {
            let bi = BigInt(0);
    
            bi |= BigInt(this[offset++]) << 56n;
            bi |= BigInt(this[offset++]) << 48n;
            bi |= BigInt(this[offset++]) << 40n;
            bi |= BigInt(this[offset++]) << 32n;
            bi |= BigInt(this[offset++]) << 24n;
            bi |= BigInt(this[offset++]) << 16n;
            bi |= BigInt(this[offset++]) << 8n;
            bi |= BigInt(this[offset++]);
    
            return parseInt(bi);
          } else {
            let bi = BigInt(0);
    
            bi |= BigInt(this[offset++]);
            bi |= BigInt(this[offset++]) << 8n;
            bi |= BigInt(this[offset++]) << 16n;
            bi |= BigInt(this[offset++]) << 24n;
            bi |= BigInt(this[offset++]) << 32n;
            bi |= BigInt(this[offset++]) << 40n;
            bi |= BigInt(this[offset++]) << 48n;
            bi |= BigInt(this[offset++]) << 56n;
    
            return parseInt(bi);
        }

        //var h = this.getUint32(offset);
        //var l = this.getUint32(offset + 4);
        //return h * TWO_PWR_32 + ((l >= 0) ? l : TWO_PWR_32 + l);
    }

    setInt64(offset, value, endian)
    {

        var bi = BigInt(value);
        var byte = BigInt(0xFF);
  
        if (endian == Endian.Big) {
            this[offset++] = parseInt((bi >> 56n) & byte);
            this[offset++] = parseInt((bi >> 48n) & byte);
            this[offset++] = parseInt((bi >> 40n) & byte);
            this[offset++] = parseInt((bi >> 32n) & byte);
            this[offset++] = parseInt((bi >> 24n) & byte);
            this[offset++] = parseInt((bi >> 16n) & byte);
            this[offset++] = parseInt((bi >> 8n) & byte);
            this[offset++] = parseInt(bi & byte);
        } else {
            this[offset++] = parseInt(bi & byte);
            this[offset++] = parseInt((bi >> 8n) & byte);
            this[offset++] = parseInt((bi >> 16n) & byte);
            this[offset++] = parseInt((bi >> 24n) & byte);
            this[offset++] = parseInt((bi >> 32n) & byte);
            this[offset++] = parseInt((bi >> 40n) & byte);
            this[offset++] = parseInt((bi >> 48n) & byte);
            this[offset++] = parseInt((bi >> 56n) & byte);
        }
  
        //var l = (value % TWO_PWR_32) | 0;
        //var h = (value / TWO_PWR_32) | 0;
        //this.setInt32(offset, h);
        //this.setInt32(offset + 4, l);
    }

    setUint64(offset, value, endian)
    {
        
        var bi = BigInt(value);
        var byte = BigInt(0xFF);
  
        if (endian == Endian.Big) {
            this[offset++] = parseInt((bi >> 56n) & byte);
            this[offset++] = parseInt((bi >> 48n) & byte);
            this[offset++] = parseInt((bi >> 40n) & byte);
            this[offset++] = parseInt((bi >> 32n) & byte);
            this[offset++] = parseInt((bi >> 24n) & byte);
            this[offset++] = parseInt((bi >> 16n) & byte);
            this[offset++] = parseInt((bi >> 8n) & byte);
            this[offset++] = parseInt(bi & byte);
        } else {
            this[offset++] = parseInt(bi & byte);
            this[offset++] = parseInt((bi >> 8n) & byte);
            this[offset++] = parseInt((bi >> 16n) & byte);
            this[offset++] = parseInt((bi >> 24n) & byte);
            this[offset++] = parseInt((bi >> 32n) & byte);
            this[offset++] = parseInt((bi >> 40n) & byte);
            this[offset++] = parseInt((bi >> 48n) & byte);
            this[offset++] = parseInt((bi >> 56n) & byte);
        }
        
        // var l = (value % TWO_PWR_32) | 0;
        // var h = (value / TWO_PWR_32) | 0;
        // this.setInt32(offset, h);
        // this.setInt32(offset + 4, l);
    }

    setDateTime(offset, value, endian)
    {
        if (!isNaN(value)){
            // Unix Epoch
            var ticks = 621355968000000000 + (value.getTime() * 10000);
            this.setUint64(offset, ticks, endian);
        } else {
            this.setUint64(offset, 0, endian);
        }
    }

    getDateTime(offset, endian)
    {
        var ticks = this.getUint64(offset, endian);
        return new Date(Math.round((ticks-UNIX_EPOCH)/10000));
    }

    getDateTimeArray(offset, endian)
    {
        var rt = [];
        for(var i = 0; i < length; i+=8)
            rt.push(this.getDateTime(offset+i, endian));
        return rt;
    }

    getUUID(offset)
    {
        return new UUID(this.clip(offset, 16));

        /*
        var d = this.getUint8Array(offset, 16);
        var rt = "";
        for (var i = 0; i < 16; i++) {
            rt += String.fromCharCode(d[i]);
        }

        return btoa(rt);
        */
    }

    getUUIDArray(offset, length)
    {
        var rt = [];
        for(var i = 0; i < length; i+=16)
            rt.push(this.getUUID(offset+i));
        return rt;
    }

    sequenceEqual(ar)
    {
        if (ar.length != this.length)
            return false;
        else
        {
            for(var i = 0; i < this.length; i++)
                if (ar[i] != this[i])
                    return false;
        }

        return true;
    }
}

export function BL(){
    return new BinaryList();
};

export {DC};
