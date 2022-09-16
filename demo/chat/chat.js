import Warehouse from "../../src/Resource/Warehouse.js";

import { createRequire } from 'module'
import AsyncReply from "../../src/Core/AsyncReply.js";
import DistributedServer from "../../src/Net/IIP/DistributedServer.js";
import IMembership from "../../src/Security/Membership/IMembership.js";
import WSocket from "../../src/Net/Sockets/WSocket.js";
import MemoryStore from "../../src/Stores/MemoryStore.js";
import DC from "../../src/Data/DC.js";
import IResource from "../../src/Resource/IResource.js";
import TransmissionType, { TransmissionTypeIdentifier } from "../../src/Data/TransmissionType.js";
import TypedMap from "../../src/Data/TypedMap.js";
import { Arg, Evt, Func, Prop, TemplateDescriber } from "../../src/Resource/Template/TemplateDescriber.js";
import { Int32 } from "../../src/Data/ExtendedTypes.js";

const require = createRequire(import.meta.url);




const WebSocket = require('ws');
const http = require("http");
const fs = require("fs");

const wss = new WebSocket.Server({port: 8001});

class MyMembership extends IMembership {
  userExists(username, domain) {
    return new AsyncReply(true);
  }
  getPassword(username, domain) {
    return new AsyncReply(DC.stringToBytes("1234"));
  }
};

var server;

class MyChat extends IResource {
    
 
    static get template() {
      return new TemplateDescriber("Chat",[
        new Prop("title", String), new Prop("messages", Array), new Prop("users", Array),
        new Func("send", null, [new Arg("msg", String, true)]), 
        new Evt("message", Map), new Evt("voice", Int32, true), new Evt("login"), new Evt("logout")]
        );
    }

    constructor() {
      super();
      this.messages = [new TypedMap({usr: "Admin", msg: "Welcome to Esiur", date: new Date()})];
      this.title = "Chat Room";
    }

    get users() {
        return server.connections.map(x=>x.session.remoteAuthentication.username);
    }

    send(msg, sender)
    {
      let s = new TypedMap({ msg, usr: sender.session.remoteAuthentication.username, date: new Date()});
      this.messages.push(s);
      this._emit("message", s);
    }

    query(path, sender) {
      return new AsyncReply([this]);
    }
}



let sys = await Warehouse.new(MemoryStore, "sys");

let ms = await Warehouse.new(MyMembership, "ms");
let chat  = await Warehouse.new(MyChat, "chat", sys);

server = await Warehouse.new(DistributedServer, "dss", sys, null, null, {membership: ms, entryPoint: chat});


wss.on('connection', function connection(ws) 
{
  let con = server.add();
  con.assign(new WSocket(ws));
  con.on("ready", (x)=>{
    chat._emit("login", x.session.remoteAuthentication.username);
  }).on("close", (x)=>{
    chat._emit("logout", x.session.remoteAuthentication.username);
  });
});


http.createServer(function (req, res) {
  fs.readFile("." + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
    } else {
      res.writeHead(200, {"Content-Type": req.url.split('.').pop() == "js" ? "text/javascript" : "text/html"});
      res.end(data);
    }
  });
}).listen(8000);


console.log(`HTTP Server running http://localhost:8000/demo/chat/index.html`);
console.log(`IIP Server running iip://localhost:8001`);
