/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
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

import {DC, BL} from '../../Data/DC.js';
import MemberTemplate from './MemberTemplate.js';

export default class FunctionTemplate extends MemberTemplate {
   compose() {
    var name = super.compose();

    var bl = new BL()
      .addUint8(name.length)
      .addDC(name)
      .addDC(this.returnType.compose())
      .addUint8(this.args.length);

    for (var i = 0; i < this.args.length; i++) bl.addDC(this.args[i].compose());

    if (this.expansion != null) {
      var exp = DC.stringToBytes(this.expansion);
      bl
        .addInt32(exp.length)
        .addDC(exp);
      bl.insertUint8(0, this.inherited ? 0x90 : 0x10);
    } else
      bl.insertUint8(0, this.inherited ? 0x80 : 0x0);

    return bl.toDC();
  }

  constructor(template, index, name, inherited, args, returnType, expansion = null){
        super(template, index, name, inherited);

        this.args = args;
        this.returnType = returnType;
        this.expansion = expansion;
      }
}
