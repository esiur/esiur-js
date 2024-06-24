import Warehouse from "../../src/Resource/Warehouse.js";

import { createRequire } from 'module'
import AsyncReply from "../../src/Core/AsyncReply.js";
import DistributedServer from "../../src/Net/IIP/DistributedServer.js";
import IMembership from "../../src/Security/Membership/IMembership.js";
import AuthorizationResults from "../../src/Security/Membership/AuthorizationResults.js";
import WSocket from "../../src/Net/Sockets/WSocket.js";
import MemoryStore from "../../src/Stores/MemoryStore.js";
import DC from "../../src/Data/DC.js";
import IResource from "../../src/Resource/IResource.js";
import TransmissionType, { TransmissionTypeIdentifier } from "../../src/Data/TransmissionType.js";
import TypedMap from "../../src/Data/TypedMap.js";
import { Arg, Evt, Func, Prop, TemplateDescriber } from "../../src/Resource/Template/TemplateDescriber.js";
import { Int32 } from "../../src/Data/ExtendedTypes.js";

import AuthorizationResultsResponse from "../../src/Security/Membership/AuthorizationResultsResponse.js";
import IIPAuthPacketIAuthDestination from '../../src/Net/Packets/IIPAuthPacketIAuthDestination.js';
import IIPAuthPacketIAuthFormat from '../../src/Net/Packets/IIPAuthPacketIAuthFormat.js';
import IIPAuthPacketHeader from '../../src/Net/Packets/IIPAuthPacketHeader.js';
import Codec from '../../src/Data/Codec.js';
import BinaryList from "../../src/Data/BinaryList.js";
import SHA256 from "../../src/Security/Integrity/SHA256.js";

const require = createRequire(import.meta.url);




const WebSocket = require('ws');
const http = require("http");
const fs = require("fs");

const wss = new WebSocket.Server({port: 8001});

class MyMembership extends IMembership {
  userExists(username, domain) {
    return new AsyncReply(username);
  }
  getPassword(username, domain) {
    return new AsyncReply(DC.stringToBytes("1234"));
  }

  authorize(session){

    let results = new AuthorizationResults();

    if (session.authorizedAccount == "admin")
    {
      results.clue = "What is 5 + 2 ?";
      results.destination = IIPAuthPacketIAuthDestination.Self;
      results.requiredFormat = IIPAuthPacketIAuthFormat.Number;
      results.response = AuthorizationResultsResponse.IAuthHashed;
      results.expire = new Date(new Date().getTime() + 30000);
      results.reference = Math.round(Math.random() * 100000);
    }
    else if (session.authorizedAccount == "demo")
    {
      results.clue = "What is 10 * 2 ?";
      results.destination = IIPAuthPacketIAuthDestination.Self;
      results.requiredFormat = IIPAuthPacketIAuthFormat.Number;
      results.response = AuthorizationResultsResponse.IAuthPlain;
      results.expire = new Date(new Date().getTime() + 30000);
      results.reference = Math.round(Math.random() * 100000);
    }
    else {
      results.response = AuthorizationResultsResponse.Success;
    }

    return new AsyncReply(results);
  }

  authorizeHashed(session, reference, algorithm, value){

      // compute hash
      let remoteNonce = session.remoteHeaders.get(IIPAuthPacketHeader.Nonce);
      let localNonce = session.localHeaders.get(IIPAuthPacketHeader.Nonce);

      // local nonce + password or token + remote nonce
      var challenge = SHA256.compute(new BinaryList()
                                          .addUint8Array(remoteNonce)
                                          .addUint8Array(Codec.compose(7, null)) // answer is 7
                                          .addUint8Array(localNonce)
                                          .toArray());

      if (challenge.sequenceEqual(value))
          return new AsyncReply(new AuthorizationResults(AuthorizationResultsResponse.Success));
      else
          return new AsyncReply(new AuthorizationResults(AuthorizationResultsResponse.Failed));

  }

  authorizePlain(session, reference, value) {
      if (value == 20)
        return new AsyncReply(new AuthorizationResults(AuthorizationResultsResponse.Success));
      else
        return new AsyncReply(new AuthorizationResults(AuthorizationResultsResponse.Failed));
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
        return server.connections.map(x=>x.session.authorizedAccount);
    }

    send(msg, sender)
    {
      let s = new TypedMap({ msg, usr: sender.session.authorizedAccount, date: new Date()});
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
    chat._emit("login", x.session.authorizedAccount);
  }).on("close", (x)=>{
    chat._emit("logout", x.session.authorizedAccount);
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
