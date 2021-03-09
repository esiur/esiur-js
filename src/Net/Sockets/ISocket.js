"use strict";  

import IDestructible from "../../Core/IDestructible.js";
import SocketState from "./SocketState.js";

export default class ISocket extends IDestructible
{
    //SocketState State { get; }
    //INetworkReceiver<ISocket> Receiver { get; set; }

    constructor(){
        super();
        this.state = SocketState.Initial;
    }
//    get state() {}

    sendAsync(message, offset, length) { }

    send(message, offset, length) {}
    close() {}
    connect(hostname, port) {}

    begin() {}
    beginAsync() {}
    acceptAsync() {}
    accept() {}

    get remoteEndPoint(){}
    get localEndPoint() {}

    hold() {}

    unhold() {}
}
