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

import {DC, BL} from '../../Data/DC.js';
import MemberTemplate from './MemberTemplate.js';

export default class PropertyTemplate extends MemberTemplate {

  compose() {
    var name = super.compose();
    var pv = (this.permission << 1) | (this.recordable ? 1 : 0);

    if (this.inherited) pv |= 0x80;

    if (this.writeExpansion != null && this.readExpansion != null) {
      let rexp = DC.stringToBytes(this.readExpansion);
      let wexp = DC.stringToBytes(this.writeExpansion);
      return (BL()
            .addUint8(0x38 | pv)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose())
            .addInt32(wexp.length)
            .addDC(wexp)
            .addInt32(rexp.length)
            .addDC(rexp))
          .toDC();
    } else if (this.writeExpansion != null) {
      let wexp = DC.stringToBytes(this.writeExpansion);
      return (BL()
            .addUint8(0x30 | pv)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose())
            .addInt32(wexp.length)
            .addDC(wexp))
          .toDC();
    } else if (this.readExpansion != null) {
      let rexp = DC.stringToBytes(this.readExpansion);
      return (BL()
            .addUint8(0x28 | pv)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose())
            .addInt32(rexp.length)
            .addDC(rexp))
          .toDC();
    } else
      return (BL()
            .addUint8(0x20 | pv)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose()))
          .toDC();
  }

  constructor(template, index, name,
      inherited, valueType, readExpansion = null, writeExpansion = null, recordable = false)
      {
        super(template, index, name, inherited);
        this.valueType = valueType;
        this.readExpansion = readExpansion;
        this.writeExpansion  = writeExpansion;
        this.recordable = recordable;
      }
}
