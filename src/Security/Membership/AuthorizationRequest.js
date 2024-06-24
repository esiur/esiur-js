
//AuthorizationResults
import IIPAuthPacketIAuthHeader from '../../Net/Packets/IIPAuthPacketIAuthHeader.js';

export default class AuthorizationRequest {
    reference;
    destination;
    clue;
    requiredFormat;
    contentFormat;
    content;
    trials;
    issue = new Date();
    expire;
    
    get expired (){
        return new Date() > this.expire;
    }

    get timeout() {
        if (this.expire != null)
            return (this.expire - new Date()) / 1000;
        else
            return 30;
    }

    constructor(headers){
        this.reference = headers.get(IIPAuthPacketIAuthHeader.Reference);
        this.destination = headers.get(IIPAuthPacketIAuthHeader.Destination);
        this.clue = headers.get(IIPAuthPacketIAuthHeader.Clue);
    
        if (headers.has(IIPAuthPacketIAuthHeader.RequiredFormat))
            this.requiredFormat = headers.get(IIPAuthPacketIAuthHeader.RequiredFormat);
    
        if (headers.has(IIPAuthPacketIAuthHeader.ContentFormat))
            this.contentFormat = headers.get(IIPAuthPacketIAuthHeader.ContentFormat);
    
        if (headers.has(IIPAuthPacketIAuthHeader.Content))
            this.content = headers.get(IIPAuthPacketIAuthHeader.Content);
    
        if (headers.has(IIPAuthPacketIAuthHeader.Trials))
            this.trials = headers.get(IIPAuthPacketIAuthHeader.Trials);

        if (headers.has(IIPAuthPacketIAuthHeader.Issue))
            this.issue = headers.get(IIPAuthPacketIAuthHeader.Issue);

        if (headers.has(IIPAuthPacketIAuthHeader.Expire))
            this.expire = headers.get(IIPAuthPacketIAuthHeader.Expire);
      
    }
}

