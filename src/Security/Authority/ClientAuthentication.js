import Authentication from "./Authentication.js";
import AuthenticationType from "./AuthenticationType.js";

export default class ClientAuthentication extends Authentication
{
    constructor()
    {
        super(AuthenticationType.Client);
    }
}