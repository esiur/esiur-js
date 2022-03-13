
import {DC, BL} from '../../Data/DC.js';
import RepresentationType from '../../Data/RepresentationType.js';

import ParseResult from "../../Data/ParseResult.js";

export default class ArgumentTemplate {

    static parse(data, offset, index) {
    var optional = (data[offset++] & 0x1) == 0x1;

    var cs = data[offset++];
    var name = data.getString(offset, cs);
    offset += cs;
    var tdr = RepresentationType.parse(data, offset);

    return new ParseResult(
        cs + 2 + tdr.size, new ArgumentTemplate(name, tdr.type, optional, index));
  }

  constructor(name, type, optional, index){
      this.name = name;
      this.type = type;
      this.optional = optional;
      this.index = index;
  }

  compose() {
    var name = DC.stringToBytes(this.name);

    return (BL()
          .addUint8(this.optional ? 1 : 0)
          .addUint8(name.length)
          .addDC(name)
          .addDC(this.type.compose()))
        .toDC();
  }
}
