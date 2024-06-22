
//AuthorizationResults

export default class {
    response;
    destination;
    requiredFormat;
    clue;
    
    timeout; // 0 means no timeout
    reference; 
    
    issue = new Date();

    get expired (){
        this.timeout == 0 ? false : ((new Date() - this.issue) / 1000) > this.timeout;
    }   
}

