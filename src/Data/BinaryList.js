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

import DC from './DC.js';

export default class BinaryList
{

    constructor()
    {
        this.list = [];
        //this.data = [];
    }

    addDateTime(value, endian) {
        this.addDC(DC.dateTimeToBytes(value, endian));
        return this;
    }
    
    insertDateTime(position, value, endian) {
        this.insertDC(position, DC.dateTimeToBytes(value, endian));
        return this;
    }
    
    addDateTimeArray(value, endian) {
        this.addDC(DC.dateTimeArrayToBytes(value, endian));
        return this;
    }
    
    insertDateTimeArray(position, value, endian) {
        this.insertDC(position, DC.dateTimeArrayToBytes(value, endian));
        return this;
    }
    
    addUUID(value) {
        this.addDC(DC.uuidToBytes(value));
        return this;
    }
    
    insertUUID(position, value) {
        this.insertDC(position, DC.uuidToBytes(value));
        return this;
    }
    
    addUint8Array(value) {
        this.addDC(value);
        return this;
    }
    
    addDC(value) {
        // this is bad, will cause Maximum stack execution exception for large arrays
        // this.list.push(...value); 
        // Fixed
        this.list =  this.list.concat(Array.from(value));
        return this;
    }

    insertDC(position, value){
        this.list = this.list.slice(0, position).concat(value).concat(this.list.slice(position));
    }
    
    insertUint8Array(position, value) {
        this.insertDC(position, value);
        return this;
    }
    
    addString(value) {
        this.addDC(DC.stringToBytes(value));
        return this;
    }
    
    insertString(position, value) {
        this.insertDC(position, DC.stringToBytes(value));
        return this;
    }
    
    insertUint8(position, value) {
        this.list.splice(position, 0, value);
        return this;
    }
    
    addUint8(value) {
       this.list.push(value);
       return this;
    }
    
    addInt8(value) {
        this.list.push(value);
        return this;
    }
    
    insertInt8(position, value) {
        this.list.splice(position, 0, value);
        return this;
    }
    
    addChar(value) {
        this.addDC(DC.charToBytes(value));
        return this;
    }
    
    insertChar(position, value) {
        this.insertDC(position, DC.charToBytes(value));
        return this;
    }
    
    addBoolean(value) {
        this.addDC(DC.boolToBytes(value));
        return this;
    }
    
    insertBoolean(position, value) {
        this.insertDC(position, DC.boolToBytes(value));
        return this;
     }
    
    addUint16(value, endian) {
        this.addDC(DC.uint16ToBytes(value, endian));
        return this;
    }
    
    insertUint16(position, value, endian) {
        this.insertDC(position, DC.uint16ToBytes(value, endian));
        return this;
    }
    
    addInt16(value, endian) {
        this.addDC(DC.int16ToBytes(value, endian));
        return this;
    }
    
    insertInt16(position, value, endian) {
        this.insertDC(position, DC.int16ToBytes(value, endian));
        return this;
    }
    
    addUint32(value, endian) {
        this.addDC(DC.uint32ToBytes(value, endian));
        return this;
    }
    
    insertUint32(position, value,  endian ) {
        this.insertDC(position, DC.uint32ToBytes(value, endian));
        return this;
    }
    
    addInt32(value,  endian) {
        this.addDC(DC.int32ToBytes(value, endian));
        return this;
    }
    
    insertInt32(position, value,  endian) {
        this.insertDC(position, DC.int32ToBytes(value, endian));
        return this;
      }
    
    addUint64(value,  endian) {
        this.addDC(DC.uint64ToBytes(value, endian));
        return this;
      }
    
    insertUint64( position,  value,  endian) {
        this.insertDC(position, DC.uint64ToBytes(value, endian));
        return this;
      }
    
    addInt64(value,  endian) {
        this.addDC(DC.int64ToBytes(value, endian));
        return this;
    }
    
    insertInt64(position, value, endian) {
        this.insertDC(position, DC.int64ToBytes(value, endian));
        return this;
      }
    
    addFloat32(value, endian) {
        this.addDC(DC.float32ToBytes(value, endian));
        return this;
      }
    
      insertFloat32(position, value, endian ) {
        this.insertDC(position, DC.float32ToBytes(value, endian));
        return this;
      }
    
      addFloat64(value, endian) {
        this.addDC(DC.float64ToBytes(value, endian));
        return this;
      }
    
      insertFloat64(position, value, endian) {
        this.insertDC(position, DC.float64ToBytes(value, endian));
        return this;
      }
    


    get length()
    {
        return this.list.length;
    }

    toArray()
    {
        return new Uint8Array(this.list);
    }

    toDC()
    {
        return new DC(this.list);
    }
}