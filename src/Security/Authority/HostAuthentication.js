import Authentication from "./Authentication.js";
import AuthenticationType from "./AuthenticationType.js";

export default class HostAuthentication extends Authentication
{
    constructor()
    {
        super(AuthenticationType.Host);
    }
}