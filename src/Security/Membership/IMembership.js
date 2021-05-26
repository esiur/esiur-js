import AsyncReply from "../../Core/AsyncReply.js";
import IResource from "../../Resource/IResource.js";

export default class IMembership extends IResource
{
    userExists(username, domain){
        return new AsyncReply(false);
    }

    getPassword(username, domain)
    {
        return new AsyncReply(null);
    }

    get guestsAllowed() {
        return false;
    }

    getToken(tokenIndex, domain)
    {
        return new AsyncReply(null);
    }
    
    login(session)
    {

    }

    logout(session)
    {

    }

    tokenExists(tokenIndex, domain)
    {

    }
}