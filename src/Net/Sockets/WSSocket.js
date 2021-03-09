import AsyncReply from "../../Core/AsyncReply.js";
import ErrorType from "../../Core/ErrorType.js";
import ExceptionCode from "../../Core/ExceptionCode.js";
import ISocket from "./ISocket.js";
import SocketState from "./SocketState.js";
import NetworkBuffer from "../NetworkBuffer.js";

export default class WSSocket extends ISocket
{
      //SocketState State { get; }
    //INetworkReceiver<ISocket> Receiver { get; set; }
    constructor(websocket){
        super();
        this.receiveNetworkBuffer = new NetworkBuffer();
        this.sendNetworkBuffer = new NetworkBuffer();
        this.held = false;

        if (websocket != null)// instanceof WebSocket)
        {
            //websocket.onerror = () => {
            //    self.state = SocketState.Closed;
            //};   
            websocket.onopen = () => {
                self.state = SocketState.Established;
            };
    
            websocket.onerror = () => {
                self.state = SocketState.Closed;
            };
    
            this._assign(websocket);
        }
    }

    destroy(){
        this.close();   
        this.receiveNetworkBuffer = null;

        this.receiver = null;
        thsi.ws = null;
        this._emit("destroy");
    }

    sendAsync(message, offset, length) { 
        
    }

    sendAll(message)
    {
        if (this.held)
            this.sendNetworkBuffer.writeAll(message);
        else
        {
            try
            {
                this.ws.send(message);
            } catch {
                this.state = SocketState.Closed;
            }
        }
    }

    send(message, offset, length) {
        this.sendAll(message.clip(offset, length));
    }

    close() {
        this.ws.close();
    }
    
    connect(hostname, port, secure = false) {

        let self = this;

        var rt = new AsyncReply();

        this.state = SocketState.Connecting;

        this.url = `ws${secure ? 's' : ''}://${hostname}:${port}`;

        let ws = new WebSocket(this.url, "iip");
        ws.binaryType = "arraybuffer";

        ws.onopen = () => {
            self.state = SocketState.Established;
            rt.trigger(true);
        };

        ws.onerror = () => {
            self.state = SocketState.Closed;
            rt.triggerError(ErrorType.Management, ExceptionCode.HostNotReachable);
        };

        this._assign(ws);
        
        return rt;// new AsyncReply(true);
    }

    _assign(ws)
    {        
        let self = this;

        ws.onclose = () => {
            self.state = SocketState.Closed;
            self.receiver?.networkClose(self);
        };

        ws.onmessage = function(msg) {
            self.receiveNetworkBuffer.writeAll(msg.data);
            self.receiver.networkReceive(this, self.receiveNetworkBuffer);
            //self.lastAction = new Date();
        };

        this.ws = ws;
    }

    begin() {

    }

    beginAsync() {

    }

    acceptAsync() {

    }

    accept() {

    }

    get remoteEndPoint(){}
    get localEndPoint() {}

    hold()
    {
        this.held = true;
    }

    unhold()
    {       
        this.held = false;

        var message = this.sendNetworkBuffer.read();

    
        if (message == null)
            return;
//            totalSent += message.Length;
                
        try { 
            this.ws.send(message); 
        } catch {
            this.state = SocketState.Closed;
        }
    }
}

    // if (this.holdSending) {
    //     //console.log("hold ", data.length);
    //     this.sendBuffer.writeAll(data);
    // }
    // else
    //     //console.log("Send", data.length);