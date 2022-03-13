//import TemplateDescriber from '../Resource/Template/TemplateDescriber.js';

export default class IEnum {

   IEnum(index, value, name){
    this.index = index;
    this.value = value;
    this.name = name;
  } 

  get template () {
      //return new TemplateDescriber("IEnum");
  }
  
  toString() {
    return `${this.name}<${this.value}>`;
  }
}
