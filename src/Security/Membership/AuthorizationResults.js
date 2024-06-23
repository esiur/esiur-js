
//AuthorizationResults

import AuthorizationResultsResponse from './AuthorizationResultsResponse.js';

export default class AuthorizationResults {
    response = AuthorizationResultsResponse.Failed;
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

    constructor(response = AuthorizationResultsResponse.Failed){
        this.response = response;
    }
}

