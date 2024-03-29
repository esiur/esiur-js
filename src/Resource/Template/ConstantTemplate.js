import {DC, BL} from '../../Data/DC.js';
import MemberTemplate from './MemberTemplate.js';
import Codec from '../../Data/Codec.js';

export default class ConstantTemplate extends MemberTemplate {

  constructor(template, index, name,
      inherited, valueType, value, annotation){
        super(template, index, name, inherited) ;
        this.valueType = valueType;
        this.value = value;
        this.annotation = annotation;
 }

  compose() {
    var name = super.compose();
    var hdr = this.inherited ? 0x80 : 0;

    if (this.annotation != null) {
      var exp = DC.stringToBytes(this.annotation);
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
