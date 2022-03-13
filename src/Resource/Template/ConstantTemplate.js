import {DC, BL} from '../../Data/DC.js';
import MemberTemplate from './MemberTemplate.js';
import Codec from '../../Data/Codec.js';

export default class ConstantTemplate extends MemberTemplate {
  //final dynamic value;
  //final String? expansion;
  //final RepresentationType valueType;

  constructor(template, index, name,
      inherited, valueType, value, expansion){
        super(template, index, name, inherited) ;
        this.valueType = valueType;
        this.value = value;
        this.expansion = expansion;
 }

  compose() {
    var name = super.compose();
    var hdr = this.inherited ? 0x80 : 0;

    if (this.expansion != null) {
      var exp = DC.stringToBytes(this.expansion);
      hdr |= 0x70;
      return (BL()
            .addUint8(hdr)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose())
            .addDC(Codec.compose(this.value, null))
            .addInt32(exp.length)
            .addDC(exp))
          .toDC();
    } else {
      hdr |= 0x60;

      return (BL()
            .addUint8(hdr)
            .addUint8(name.length)
            .addDC(name)
            .addDC(this.valueType.compose())
            .addDC(Codec.compose(this.value, null)))
          .toDC();
    }
  }
}
