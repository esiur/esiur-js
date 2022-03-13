import Session from '../Security/Authority/Session.js';
import IResource from './IResource.js';
import EventTemplate from './Template/EventTemplate.js';

export default class EventOccurredInfo {
  
  get name(){
    return this.eventTemplate.name;
  } 


  constructor(resource, eventTemplate, value, issuer,
      receivers) {
        this.resource =resource;
        this.eventTemplate = eventTemplate;
        this.value = value;
        this.issuer = issuer;
        this.receivers = receivers;
      }
}
