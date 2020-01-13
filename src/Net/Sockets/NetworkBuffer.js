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
 * Created by Ahmed Zamil on 01/09/2017.
 */

"use strict";  

import DC from '../../Data/DataConverter.js';

export default class NetworkBuffer {
    constructor() {
        this.neededDataLength = 0;
        this.data = new DC(0);
    }

    get protected() {
        return this.neededDataLength > this.data.length;
    }

    get available() {

        return this.data.length;
    }

    holdAllForNextWrite(src) {
        this.holdFor(src, src.length + 1);
    }

    holdForNextWrite(src, offset, size) {
        this.holdFor(src, offset, size, size + 1);
    }


    holdFor(src, offset, size, needed) {
        if (size >= needed)
            throw new Error("Size >= Needed !");

        this.data = DC.combine(src, offset, size, this.data, 0, this.data.length);
        this.neededDataLength = needed;
    }

    holdAllFor(src, needed) {
        this.holdFor(src, 0, src.length, needed);
    }

    protect(data, offset, needed) {
        var dataLength = data.length - offset;

        // protection
        if (dataLength < needed) {
            this.holdFor(data, offset, dataLength, needed);
            return true;
        }
        else
            return false;
    }

    writeAll(src) {
        this.write(src, 0, src.length ? src.length : src.byteLength);
    }

    write(src, offset, length) {
        this.data = this.data.append(src, offset, length);
    }

    get canRead() {
        if (this.data.length == 0)
            return false;
        else if (this.data.length < this.neededDataLength)
            return false;
        return true;
    }

    read() {
        if (this.data.length == 0)
            return null;

        var rt = null;

        if (this.neededDataLength == 0) {
            rt = this.data;
            this.data = new DC(0);
        }
        else {
            if (this.data.length >= this.neededDataLength) {
                rt = this.data;
                this.data = new DC(0);
                this.neededDataLength = 0;
                return rt;
            }
            else {
                return null;
            }
        }

        return rt;
    }
}
