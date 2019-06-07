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
 * Created by Ahmed Zamil on 27/08/2017.
 */

"use strict";  

const PropertyPermission = {
    Read: 1,
    Write: 2,
    ReadWrite: 3
};

class PropertyTemplate extends MemberTemplate
{

    constructor()
    {
        super();
        this.type = MemberType.Property;
    }

    compose()
    {
        var name = super.compose();
        var rt = new BinaryList();
        var pv = (this.permission >> 1) | (this.recordable ? 1 : 0);

        if (this.writeExpansion != null && this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            var wexp = DC.stringToBytes(this.writeExpansion);
            return rt.addUint8(0x38 | pv)
                .addUint32(wexp.length)
                .addUint8Array(wexp)
                .addUint32(rexp.length)
                .addUint8Array(rexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else if (this.writeExpansion != null)
        {
            var wexp = DC.stringToBytes(this.writeExpansion);
            return rt.addUint8(0x30 | pv)
                .addUint32(wexp.length)
                .addUint8Array(wexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else if (this.readExpansion != null)
        {
            var rexp = DC.stringToBytes(this.readExpansion);
            return rt.addUint8(0x28 | pv)
                .addUint32(rexp.length)
                .addUint8Array(rexp)
                .addUint8(name.length)
                .addUint8Array(name).toArray();
        }
        else
            return rt.addUint8(0x20 | pv)
                .addUint32(name.length)
                .addUint8Array(name).toArray();
    }
}
