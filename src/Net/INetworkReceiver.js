import IDestructible from "../Core/IDestructible";

export default class INetworkReceiver extends IDestructible {
    networkClose(sender);
    networkReceive(sender, buffer);
    networkConnect(sender);
}