import IDestructible from "../Core/IDestructible.js";

export default class INetworkReceiver extends IDestructible {
    networkClose(sender){}
    networkReceive(sender, buffer){}
    networkConnect(sender){}
}