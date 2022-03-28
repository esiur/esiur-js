//import TemplateDescriber from '../Resource/Template/TemplateDescriber.js';

export default class IEnum {

  constructor(index, value, name, template){
    this.index = index;
    this.value = value;
    this.name = name;
    this.template = template;
  } 

  // get template () {
  //     //return new TemplateDescriber("IEnum");
  // }
  
  toString() {
    return `${this.name}<${this.value}>`;
  }
}
