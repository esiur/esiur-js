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

import {DC, BL} from '../../Data/DataConverter.js';
import MemberTemplate from './MemberTemplate.js';

export default class FunctionTemplate extends MemberTemplate {
    compose() {
        var name = super.compose();
        var rt = BL();

        if (this.expansion != null) {
            var exp = DC.stringToBytes(this.expansion);

            return rt.addUint8(0x10 | (this.isVoid ? 0x8 : 0x0))
                    .addUint8(name.length).addUint8Array(name)
                    .addUint32(exp.length).addUint8Array(exp).toArray();
        }
        else
            return rt.addUint8(this.isVoid ? 0x8 : 0x0).addUint8(name.length).addUint8Array(name).toArray();
    }

    constructor() {
        super();
        this.type = MemberType.Function;
    }
}
