import IResource from './IResource.js'; 
import PropertyTemplate from './Template/PropertyTemplate.js';

export default class PropertyModificationInfo {
 
  get name(){
    return this.propertyTemplate.name;
  } 

  constructor(
      resource, propertyTemplate, value, age) {
        this.resource = resource;
        this.propertyTemplate = propertyTemplate;
        this.value = value;
        this.age = age;
      }
}
