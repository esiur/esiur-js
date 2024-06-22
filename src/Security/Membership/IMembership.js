import AsyncReply from "../../Core/AsyncReply.js";
import IResource from "../../Resource/IResource.js";

export default class IMembership extends IResource
{
    userExists(username, domain){
        return new AsyncReply(false);
    }

    tokenExists(tokenIndex, domain) {
        return new AsyncReply(false);
    }

    getPassword(username, domain) {
        return new AsyncReply(null);
    }

    getToken(tokenIndex, domain) {
        return new AsyncReply(null);
    }
    
    authorize(session){
        return new AsyncReply(new AuthorizationResults());
    }

    authorizePlain(session, reference, value){
        return new AsyncReply(new AuthorizationResults());
    }

    authorizeHashed(session, reference, algorithm, value) {
        return new AsyncReply(new AuthorizationResults());
    }

    authorizeEncrypted(session, reference, algorithm,  value) {
        return new AsyncReply(new AuthorizationResults());
    }

    login(session) {
        return new AsyncReply(true);
    }

    logout(session){
        return new AsyncReply(true);
    }

    get guestsAllowed() {
        return false;
    }

}