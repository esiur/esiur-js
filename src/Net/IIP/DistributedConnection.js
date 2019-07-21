/*
* Copyright (c) 2017 Ahmed Kh. Zamil
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

/**
 * Created by Ahmed Zamil on 25/07/2017.
 */

"use strict";  

import IStore from '../../Resource/IStore.js';
import Session from '../../Security/Authority/Session.js';
import Authentication  from '../../Security/Authority/Authentication.js';
import AuthenticationType from "../../Security/Authority/AuthenticationType.js";

import SHA256 from '../../Security/Integrity/SHA256.js';
import {BL, DC} from '../../Data/DataConverter.js';
import SendList from '../SendList.js';

import AsyncReply from '../../Engine/AsyncReply.js';
import Codec from '../../Data/Codec.js';
import NetworkBuffer from '../Sockets/NetworkBuffer.js';
import KeyList from '../../Data/KeyList.js';
import AsyncQueue from '../../Engine/AsyncQueue.js';
import Warehouse from '../../Resource/Warehouse.js';

import IIPAuthPacket from "../Packets/IIPAuthPacket.js";
import IIPPacket from "../Packets/IIPPacket.js";
import IIPAuthPacketAction from "../Packets/IIPAuthPacketAction.js";
import IIPAuthPacketCommand from "../Packets/IIPAuthPacketCommand.js";
import IIPAuthPacketMethod from "../Packets/IIPAuthPacketMethod.js";

import IIPPacketAction from "../Packets/IIPPacketAction.js";
import IIPPacketCommand from "../Packets/IIPPacketCommand.js";
import IIPPacketEvent from "../Packets/IIPPacketEvent.js";
import IIPPacketReport from "../Packets//IIPPacketReport.js";

import ErrorType from "../../Engine/ErrorType.js";
import ProgressType from "../../Engine/ProgressType.js";
import ExceptionCode from "../../Engine/ExceptionCode.js";

import DistributedResource from './DistributedResource.js';
import ResourceTemplate from '../../Resource/Template/ResourceTemplate.js';

import DistributedResourceQueueItem from './DistributedResourceQueueItem.js';
import DistributedResourceQueueItemType from './DistributedResourceQueueItemType.js';

import DistributedPropertyContext from './DistributedPropertyContext.js';

export default class DistributedConnection extends IStore {

    send(data) {
        //console.log("Send", data.length);
        this.socket.send(data.buffer);
    }

    sendParams(doneReply) {
        return new SendList(this, doneReply);
    }

    generateNonce(length)
    {
        var rt = new Uint8Array(length);
        for(var i = 0; i < length; i++)
            rt[i] = Math.random() * 255;

        return rt;
    }

    constructor() {

        super();

        //Instance.Name = Global.GenerateCode(12);
        
        //this.hostType = AuthenticationType.Client;
        //this.domain = domain;
        //this.localUsername = username;
        
        //this._register("ready");
        //this._register("error");
        this._register("close");

        this.session = new Session(new Authentication(AuthenticationType.Client), new Authentication(AuthenticationType.Host));

        this.packet = new IIPPacket();
        this.authPacket = new IIPAuthPacket();

        this.resources = {};
        this.templates = new KeyList();
        this.requests = {};
        this.pathRequests = {};
        this.templateRequests = new KeyList();
        this.resourceRequests = {};
        this.callbackCounter = 0;

        this.queue = new AsyncQueue();

        this.queue.then(function (x) {
            if (x.type == DistributedResourceQueueItemType.Event) {
                x.resource._emitEventByIndex(x.index, x.value);
            }
            else {
                x.resource._updatePropertyByIndex(x.index, x.value);
            }
        });

        this.localNonce = this.generateNonce(32);// new Uint8Array(32);
        //window.crypto.getRandomValues(this.localNonce);

        // declare (Credentials -> No Auth, No Enctypt)
        //this.socket.onerror = function(event)
        //{
        //    self.close(event);
        //};
    }


    open(settings = {})
    {

        var { domain = null, 
            secure = false,
             username = "guest", 
             password = "", 
             checkInterval = 30, 
             connectionTimeout = 600, 
             revivingTime = 120, 
             debug = false} = settings;

        this.openReply = new AsyncReply();

        var hostname = this.instance.name.split("://", 2)[1].split("/", 2)[0];

        // assign domain from hostname if not provided
        domain = domain ? domain : hostname.split(":")[0];

        this.session.localAuthentication.domain = domain;
        this.session.localAuthentication.username = username;

        this.localPassword = DC.stringToBytes(password);

        var url = `ws${secure ? 's' : ''}://${hostname}`;


        this.debug = debug;
        this.totalReceived = 0;
        this.totalSent = 0;

        this.checkInterval = checkInterval * 1000; // check every 30 seconds
        this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
        this.revivingTime = revivingTime * 1000; // 2 minutes
        this.lastAction = Date.now();

        this.socket = new WebSocket(url, "iip");
        this.socket.binaryType = "arraybuffer";
        this.socket.connection = this;
        this.socket.networkBuffer = new NetworkBuffer();

        var un = DC.stringToBytes(username);
        var dmn = DC.stringToBytes(domain);
        var self = this;

        this.socket.onopen = function () {
            var bl = BL();
            bl.addUint8(0x60).addUint8(dmn.length).addUint8Array(dmn).addUint8Array(self.localNonce).addUint8(un.length).addUint8Array(un);
            self.send(bl.toArray());
        };

        this.socket.onmessage = function (msg) {

            //console.log("Rec", msg.data.byteLength);

            this.networkBuffer.writeAll(msg.data);

            self.lastAction = new Date();

            while (this.networkBuffer.available > 0 && !this.networkBuffer.protected)
                self.receive(this.networkBuffer);


        };

        this.socket.onclose = function(event)
        {
            if (this.connection.openReply)
                this.connection.openReply.triggerError(0, 0, "Host not reachable");

            self.close(event);
        };

        return this.openReply;
    }

    processPacket(msg, offset, ends, data)
    {

        
        var authPacket = this.authPacket;
        
        if (this.ready) {
            var packet = new IIPPacket();

            var rt = packet.parse(msg, offset, ends);
            if (rt <= 0) {
                data.holdFor(msg, offset, ends - offset, -rt);
                return ends;
            }
            else {
                offset += rt;

                if (packet.command == IIPPacketCommand.Event) {
                    switch (packet.event) {
                        case IIPPacketEvent.ResourceReassigned:
                            this.IIPEventResourceReassigned(packet.resourceId, packet.newResourceId);
                            break;
                        case IIPPacketEvent.ResourceDestroyed:
                            this.IIPEventResourceDestroyed(packet.resourceId);
                            break;
                        case IIPPacketEvent.PropertyUpdated:
                            this.IIPEventPropertyUpdated(packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketEvent.EventOccurred:
                            this.IIPEventEventOccurred(packet.resourceId, packet.methodIndex, packet.content);
                            break;

                        case IIPPacketEvent.ChildAdded:
                            this.IIPEventChildAdded(packet.resourceId, packet.childId);
                            break;
                        case IIPPacketEvent.ChildRemoved:
                            this.IIPEventChildRemoved(packet.resourceId, packet.childId);
                            break;
                        case IIPPacketEvent.Renamed:
                            this.IIPEventRenamed(packet.resourceId, packet.content);
                            break;
                        case IIPPacketEvent.AttributesUpdated:
                            this.IIPEventAttributesUpdated(packet.resourceId, packet.content);
                            break;

                    }
                }
                else if (packet.command == IIPPacketCommand.Request) {
                    switch (packet.action) {

                        // Manage
                        case IIPPacketAction.AttachResource:
                            this.IIPRequestAttachResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ReattachResource:
                            this.IIPRequestReattachResource(packet.callbackId, packet.resourceId, packet.resourceAge);
                            break;
                        case IIPPacketAction.DetachResource:
                            this.IIPRequestDetachResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.CreateResource:
                            this.IIPRequestCreateResource(packet.callbackId, packet.storeId, packet.resourceId, packet.content);
                            break;
                        case IIPPacketAction.DeleteResource:
                            this.IIPRequestDeleteResource(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.AddChild:
                            this.IIPRequestAddChild(packet.callbackId, packet.resourceId, packet.childId);
                            break;
                        case IIPPacketAction.RemoveChild:
                            this.IIPRequestRemoveChild(packet.callbackId, packet.resourceId, packet.childId);
                            break;
                        case IIPPacketAction.RenameResource:
                            this.IIPRequestRenameResource(packet.callbackId, packet.resourceId, packet.content);
                            break;

                        // Inquire
                        case IIPPacketAction.TemplateFromClassName:
                            this.IIPRequestTemplateFromClassName(packet.callbackId, packet.className);
                            break;
                        case IIPPacketAction.TemplateFromClassId:
                            this.IIPRequestTemplateFromClassId(packet.callbackId, packet.classId);
                            break;
                        case IIPPacketAction.TemplateFromResourceId:
                            this.IIPRequestTemplateFromResourceId(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.QueryLink:
                            this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
                            break;
                        case IIPPacketAction.ResourceChildren:
                            this.IIPRequestResourceChildren(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ResourceParents:
                            this.IIPRequestResourceParents(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.ResourceHistory:
                            this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
                            break;

                        // Invoke
                        case IIPPacketAction.InvokeFunctionArrayArguments:
                            this.IIPRequestInvokeFunctionArrayArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketAction.InvokeFunctionNamedArguments:
                            this.IIPRequestInvokeFunctionNamedArguments(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;    
                        case IIPPacketAction.GetProperty:
                            this.IIPRequestGetProperty(packet.callbackId, packet.resourceId, packet.methodIndex);
                            break;
                        case IIPPacketAction.GetPropertyIfModified:
                            this.IIPRequestGetPropertyIfModifiedSince(packet.callbackId, packet.resourceId, packet.methodIndex, packet.resourceAge);
                            break;
                        case IIPPacketAction.SetProperty:
                            this.IIPRequestSetProperty(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
                            break;
                        case IIPPacketAction.ResourceHistory:
                            this.IIPRequestInquireResourceHistory(packet.callbackId, packet.resourceId, packet.fromDate, packet.toDate);
                            break;
                        case IIPPacketAction.QueryLink:
                            this.IIPRequestQueryResources(packet.callbackId, packet.resourceLink);
                            break;

                            // Attribute
                        case IIPPacketAction.GetAllAttributes:
                            this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.UpdateAllAttributes:
                            this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.ClearAllAttributes:
                            this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                            break;
                        case IIPPacketAction.GetAttributes:
                            this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;
                        case IIPPacketAction.UpdateAttributes:
                            this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;
                        case IIPPacketAction.ClearAttributes:
                            this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                            break;

                    }
                }
                else if (packet.command == IIPPacketCommand.Reply) {
                    switch (packet.action) {
                        case IIPPacketAction.AttachResource:
                            this.IIPReply(packet.callbackId, packet.classId, packet.resourceAge, packet.resourceLink, packet.content);
                            break;
                        case IIPPacketAction.ReattachResource:
                            this.IIPReply(packet.callbackId, packet.resourceAge, packet.content);
                            break;
                        case IIPPacketAction.DetachResource:
                            this.IIPReply(packet.callbackId);
                            break;
                        case IIPPacketAction.CreateResource:
                            this.IIPReply(packet.callbackId, packet.resourceId);
                            break;
                        case IIPPacketAction.DeleteResource:
                        case IIPPacketAction.AddChild:
                        case IIPPacketAction.RemoveChild:
                        case IIPPacketAction.RenameResource:
                            this.IIPReply(packet.callbackId);
                            break;
                        case IIPPacketAction.TemplateFromClassName:
                        case IIPPacketAction.TemplateFromClassId:
                        case IIPPacketAction.TemplateFromResourceId:
                            this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                            break;

                        case IIPPacketAction.QueryLink:
                        case IIPPacketAction.ResourceChildren:
                        case IIPPacketAction.ResourceParents:
                        case IIPPacketAction.ResourceHistory:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.InvokeFunctionArrayArguments:
                        case IIPPacketAction.InvokeFunctionNamedArguments:
                            this.IIPReplyInvoke(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.GetProperty:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;
                        case IIPPacketAction.GetPropertyIfModified:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;
                        case IIPPacketAction.SetProperty:
                            this.IIPReply(packet.callbackId);
                            break;

                        // Attribute
                        case IIPPacketAction.GetAllAttributes:
                        case IIPPacketAction.GetAttributes:
                            this.IIPReply(packet.callbackId, packet.content);
                            break;

                        case IIPPacketAction.UpdateAllAttributes:
                        case IIPPacketAction.UpdateAttributes:
                        case IIPPacketAction.ClearAllAttributes:
                        case IIPPacketAction.ClearAttributes:
                            this.IIPReply(packet.callbackId);
                            break;

                        }

                }
                else if (packet.command == IIPPacketCommand.Report)
                {
                    switch (packet.report)
                    {
                        case IIPPacketReport.ManagementError:
                            this.IIPReportError(packet.callbackId, ErrorType.Management, packet.errorCode, null);
                            break;
                        case IIPPacketReport.ExecutionError:
                            this.IIPReportError(packet.callbackId, ErrorType.Exception, packet.errorCode, packet.errorMessage);
                            break;
                        case IIPPacketReport.ProgressReport:
                            this.IIPReportProgress(packet.callbackId, ProgressType.Execution, packet.progressValue, packet.progressMax);
                            break;
                        case IIPPacketReport.ChunkStream:
                            this.IIPReportChunk(packet.callbackId, packet.content);

                            break;
                    }
                }

            }
        }

        else {
            var rt = authPacket.parse(msg, offset, ends);


            if (rt <= 0) {
                data.holdAllFor(msg, ends - rt);
                return ends;
            }
            else {
                offset += rt;

                if (this.session.localAuthentication.type == AuthenticationType.Host) {
                    if (authPacket.command == IIPAuthPacketCommand.Declare) {
                        if (authPacket.remoteMethod == IIPAuthPacketMethod.credentials
                            && authPacket.localMethod == IIPAuthPacketMethod.None) {
                            this.session.remoteAuthentication.username = authPacket.remoteUsername;
                            this.remoteNonce = authPacket.remoteNonce;
                            this.domain = authPacket.domain;
                            this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action) {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                            var remoteHash = authPacket.hash;

                            this.server.membership.getPassword(this.session.remoteAuthentication.username, this.domain).then(function (pw) {
                                if (pw != null) {

                                    //var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));
                                    var hash = SHA256.compute(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toDC());
                                    

                                    if (hash.sequenceEqual(remoteHash)) {
                                        // send our hash
                                        //var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
                                        var localHash = SHA256.compute(BL().addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toDC());
                                        this.sendParams().addUint8(0).addUint8Array(localHash).done();

                                        this.readyToEstablish = true;
                                    }
                                    else {
                                        // incorrect password
                                        this.sendParams().addUint8(0xc0).addInt32(1).addUint16(5).addString("Error").done();
                                    }
                                }
                            });
                        }
                        else if (authPacket.action == IIPAuthPacketAction.NewConnection) {
                            if (readyToEstablish) {
                                this.session.id = this.generateNonce(32);// new DC(32);
                                //window.crypto.getRandomValues(this.session.id);

                                this.sendParams().addUint8(0x28).addUint8Array(this.session.id).done();
                                this.ready = true;

                                this.openReply.trigger(this);
                                
                                //this._emit("ready", this);
                            }
                        }
                    }
                }
                else if (this.session.localAuthentication.type == AuthenticationType.Client) {
                    if (authPacket.command == IIPAuthPacketCommand.Acknowledge) {
                        this.remoteNonce = authPacket.remoteNonce;

                        // send our hash

                        //var localHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.localPassword)
                        //    .addUint8Array(this.localNonce)
                        //    .addUint8Array(this.remoteNonce).toArray()));

                        var localHash = SHA256.compute(BL().addUint8Array(this.localPassword)
                            .addUint8Array(this.localNonce)
                            .addUint8Array(this.remoteNonce).toDC());

                        this.sendParams().addUint8(0).addUint8Array(localHash).done();
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action) {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                            // check if the server knows my password
                            //var remoteHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.remoteNonce)
                            //    .addUint8Array(this.localNonce)
                            //    .addUint8Array(this.localPassword).toArray()
                            //));

                            var remoteHash = SHA256.compute(BL().addUint8Array(this.remoteNonce)
                                .addUint8Array(this.localNonce)
                                .addUint8Array(this.localPassword).toDC());


                            if (remoteHash.sequenceEqual(authPacket.hash)) {
                                // send establish request
                                this.sendParams().addUint8(0x20).addUint16(0).done();
                            }
                            else {
                                this.sendParams().addUint8(0xc0).addUint32(1).addUint16(5).addString("Error").done();
                            }
                        }
                        else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished) {
                            this.session.id = authPacket.sessionId;
                            this.ready = true;
                            this.openReply.trigger(this);

                            //this._emit("ready", this);
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Error)
                    {
                        this.openReply.triggerError(1, authPacket.errorCode, authPacket.errorMessage);

                        //this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                        this.close();
                    }
                }
            }
        }

        return offset;

        //if (offset < ends)
        //    this.processPacket(msg, offset, ends, data);
    }

    receive(data) {
        var msg = data.read();
        var offset = 0;
        var ends = msg.length;
        var packet = this.packet;

        //console.log("Data");

        while (offset < ends) {
            offset = this.processPacket(msg, offset, ends, data);   
        }
    }

    close(event)
    {
        this._emit("close", event);
        
        Warehouse.remove(this);

        if (this.socket.readyState != this.socket.CLOSED)
        {
            this.socket.close();
        }
    }

    trigger(trigger) {
        return true;
    }

    put(resource) {
        this.resources[parseInt(resource.instance.name)] = resource;
        return true;
    }

    remove(resource)
    {
        // nothing to do (IStore interface)
    }

    // Protocol Implementation

    sendRequest2(action, binaryList) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.sendParams().addUint8(0x40 | action).addUint32(this.callbackCounter).addRange(binaryList).done();
        this.requests[this.callbackCounter] = reply;
        return reply;
    }

    sendRequest(action) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.requests[this.callbackCounter] = reply;
        return this.sendParams(reply).addUint8(0x40 | action).addUint32(this.callbackCounter);        
    }

    sendInvokeByArrayArguments(instanceId, index, parameters)
    {
        var reply = new AsyncReply();
        
        var pb = Codec.composeVarArray(parameters, this, true);

        this.callbackCounter++;
        this.sendParams()
                        .addUint8(0x40 | IIPPacketAction.InvokeFunctionArrayArguments)
                        .addUint32(this.callbackCounter)
                        .addUint32(instanceId)
                        .addUint8(index)
                        .addUint8Array(pb)
                        .done();

        this.requests[this.callbackCounter] = reply;

        return reply; 
    }

    sendInvokeByNamedArguments(instanceId, index, parameters)
    {
        var reply = new AsyncReply();
        
        var pb = Codec.composeStructure(parameters, this, true, true, true);

        this.callbackCounter++;
        this.sendParams()
                        .addUint8(0x40 | IIPPacketAction.InvokeFunctionNamedArguments)
                        .addUint32(this.callbackCounter)
                        .addUint32(instanceId)
                        .addUint8(index)
                        .addUint8Array(pb)
                        .done();

        this.requests[this.callbackCounter] = reply;

        return reply; 
    }


    sendError(type, callbackId, errorCode, errorMessage = "")
    {
        var msg = DC.stringToBytes(errorMessage);
        if (type == ErrorType.Management)
            this.sendParams()
                            .addUint8(0xC0 | IIPPacketReport.ManagementError)
                            .addUint32(callbackId)
                            .addUint16(errorCode)
                            .done();
        else if (type == ErrorType.Exception)
            this.sendParams()
                            .addUint8(0xC0 | IIPPacketReport.ExecutionError)
                            .addUint32(callbackId)
                            .addUint16(errorCode)
                            .addUint16(msg.length)
                            .addUint8Array(msg)
                            .done();
    }

    sendProgress(callbackId, value, max)
    {
        this.sendParams()
                        .addUint8(0xC0 | IIPPacketReport.ProgressReport)
                        .addUint32(callbackId)
                        .addInt32(value)
                        .addInt32(max)
                        .done();
    }

    sendChunk(callbackId, chunk)
    {
        var c = Codec.compose(chunk, this, true);
        this.sendParams()
                        .addUint8(0xC0 | IIPPacketReport.ChunkStream)
                        .addUint32(callbackId)
                        .addUint8Array(c)
                        .done();
    }

    IIPReply(callbackId) {

        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.requests[callbackId];

        //console.log("Reply " + callbackId, req);

        delete this.requests[callbackId];
        req.trigger(results);
    }

    IIPReplyInvoke(callbackId, result)
    {
        var req = this.requests[callbackId];
        delete this.requests[callbackId];

        Codec.parse(result, 0, {}, this).then(function(rt)
        {
            req.trigger(rt);
        });
    }

    IIPReportError(callbackId, errorType, errorCode, errorMessage)
    {
        var req = this.requests[callbackId];
        delete this.requests[callbackId];
        req.triggerError(errorType, errorCode, errorMessage);
    }

    IIPReportProgress(callbackId, type, value, max)
    {
        var req = this.requests[callbackId];
        req.triggerProgress(type, value, max);
    }

    IIPReportChunk(callbackId, data)
    {
        if (this.requests[callbackId])
        {
            var req = this.requests[callbackId];
            Codec.parse(data, 0, {}, this).then(function(x)
            {
                req.triggerChunk(x);
            });
        }
    }

    IIPEventResourceReassigned(resourceId, newResourceId) {

    }

    IIPEventResourceDestroyed(resourceId) {
        if (this.resources[resourceId]) {
            var r = this.resources[resourceId];
            delete this.resources[resourceId];
            r.destroy();
        }
    }

    IIPEventPropertyUpdated(resourceId, index, content) {

        var self = this;
        
        this.fetch(resourceId).then(function(r){
                // push to the queue to gaurantee serialization
                var item = new AsyncReply();
                self.queue.add(item);
    
                Codec.parse(content, 0, {}, self).then(function (args) {
                    var pt = r.instance.template.getPropertyTemplateByIndex(index);
                    if (pt != null) {
                        item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
                    }
                    else {    // ft found, fi not found, this should never happen
                        self.queue.remove(item);
                    }
                });
        });
    }


    IIPEventEventOccurred(resourceId, index, content) {
        var self = this;

        this.fetch(resourceId).then(function(r){
            // push to the queue to guarantee serialization
            var item = new AsyncReply();
            var r = self.resources[resourceId];

            self.queue.add(item);

            Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
                var et = r.instance.template.getEventTemplateByIndex(index);
                if (et != null) {
                    item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    self.queue.remove(item);
                }
            });
        });
    }

    IIPEventChildAdded(resourceId, childId)
    {
        var self = this;

        this.fetch(resourceId).then(function(parent)
        {
            self.fetch(childId).then(function(child)
            {
                parent.instance.children.add(child);
            });
        });
    }

    IIPEventChildRemoved(resourceId, childId)
    {
        var self = this;

        this.fetch(resourceId).then(function(parent)
        {
            self.fetch(childId).then(function(child)
            {
                parent.instance.children.remove(child);
            });
        });
    }

    IIPEventRenamed(resourceId, name)
    {
        this.fetch(resourceId).then(function(resource)
        {
            resource.instance.attributes.set("name", name.getString(0, name.length));
        });
    }


    IIPEventAttributesUpdated(resourceId, attributes)
    {
        var self = this;

        this.fetch(resourceId).then(function(resource)
        {
            var attrs = attributes.getStringArray(0, attributes.length);

            self.getAttributes(resource, attrs).then(function(s)
            {
                resource.instance.setAttributes(s);
            });
        });
    }

    sendReply(action, callbackId)
    {
        return this.sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }

    sendEvent(evt)
    {
        return this.sendParams().addUint8(evt);
    }

    IIPRequestAttachResource(callback, resourceId) {

        //var sl = this.sendParams();
        var self = this;


        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {

                if (r.instance.applicable(self.session, ActionType.Attach, null) == Ruling.Denied)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AttachDenied);
                    return;
                }

                r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
                r.instance.on("ResourceModified", self.instance_propertyModified, self);
                r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self);
                // reply ok

                var link = DC.stringToBytes(r.instance.link);

                if (r instanceof DistributedResource)
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.composePropertyValueArray(r._serialize(), self, true))
                        .done();
                else
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.composePropertyValueArray(r.instance.serialize(), self, true))
                        .done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);                
            }
        });
    }

    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (res != null) {
                r.instance.on("ResourceEventOccurred", self.instance_eventOccurred, self);
                r.instance.on("ResourceModified", self.instance_propertyModified, self);
                r.instance.on("ResourceDestroyed", self.instance_resourceDestroyed, self);
                // reply ok
                self.sendReply(IIPPacketAction.ReattachResource, callback)
                        .addUint64(r.instance.age)
                        .addUint8Array(Codec.composePropertyValueArray(r.instance.serialize(), self, true))
                        .done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.off("ResourceEventOccurred", self.instance_eventOccurred);
                r.instance.off("ResourceModified", self.instance_propertyModified);
                r.instance.off("ResourceDestroyed", self.instance_resourceDestroyed);

                // reply ok
                self.sendReply(IIPPacketAction.DetachResource, callback).done();
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestCreateResource(callback, storeId, parentId, content) {
        var self = this;
        Warehouse.get(storeId).then(function(store)
            {
                if (store == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.StoreNotFound);
                    return;
                }

                if (!(store instanceof IStore))
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceIsNotStore);
                    return;
                }

                // check security
                if (store.instance.applicable(self.session, ActionType.CreateResource, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.CreateDenied);
                    return;
                }

                Warehouse.get(parentId).then(function(parent)
                {

                    // check security

                    if (parent != null)
                        if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed)
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                            return;
                        }

                    var offset = 0;

                    var className = content.getString(offset + 1, content[0]);
                    offset += 1 + content[0];

                    var nameLength = content.getUint16(offset);
                    offset += 2;
                    var name = content.getString(offset, nameLength);

                    var cl = content.getUint32(offset);
                    offset += 4;

                    var type = window[className];

                    if (type == null)
                    {
                        self.sendError(ErrorType.Management, callback, ExceptionCode.ClassNotFound);
                        return;
                    }

                    Codec.parseVarArray(content, offset, cl, self).then(function(parameters)
                    {
                        offset += cl;
                        cl = content.getUint32(offset);
                        Codec.parseStructure(content, offset, cl, self).then(function(attributes)
                        {
                            offset += cl;
                            cl = content.length - offset;

                            Codec.parseStructure(content, offset, cl, self).then(function(values)
                            {


                                var resource = new (Function.prototype.bind.apply(type, values));
                            
                                Warehouse.put(resource, name, store, parent);


                                self.sendReply(IIPPacketAction.CreateResource, callback)
                                            .addUint32(resource.Instance.Id)
                                            .done();
                               
                            });
                        });
                    });
                });
            });
    }

    IIPRequestDeleteResource(callback, resourceId) {
        var self = this;
        Warehouse.get(resourceId).then(function(r)
            {
                if (r == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (r.instance.store.instance.applicable(session, ActionType.Delete, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteDenied);
                    return;
                }

                if (Warehouse.remove(r))
                    self.sendReply(IIPPacketAction.DeleteResource, callback).done();
                else
                    self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteFailed);
            });
    }

    IIPRequestTemplateFromClassName(callback, className) {
        
        var self = this;

        Warehouse.getTemplateByClassName(className).then(function (t) {
            if (t != null)
                self.sendReply(IIPPacketAction.TemplateFromClassName, callback)
                                .addUint32(t.content.length)
                                .addUint8Array(t.content)
                                .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var self = this;
        Warehouse.getTemplateByClassId(classId).then(function (t) {
            if (t != null)
                self.sendReply(IIPPacketAction.TemplateFromClassId, callback)
                            .addUint32(t.content.length)
                            .addUint8Array(t.content)
                            .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null)
                self.sendReply(IIPPacketAction.TemplateFromResourceId, callback)
                            .addUint32(r.instance.template.content.length)
                            .addUint8Array(r.instance.template.content)
                            .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);                
            }
        });
    }

    IIPRequestInvokeFunctionArrayArguments(callback, resourceId, index, content) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invokeByArrayArguments(index, args);
                            if (rt != null) {
                                rt.then(function (res) {
                                    self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                    .addUint8Array(Codec.compose(res, self))
                                                    .done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];

                            if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied)
                            {
                                self.sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                                return;
                            }

                            if (fi instanceof Function) {
                                args.push(self);

                                var rt = fi.apply(r, args);

                                function* itt() {
                                    
                                };

                                // Is iterator ?
                                if (rt[Symbol.iterator] instanceof Function)
                                {
                                    for (let v of rt)
                                        self.sendChunk(callback, v);

                                    self.sendReply(IIPPacket.IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                    .addUint8(DataType.Void)
                                                    .done();
                                }
                                else if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                      .addUint8Array(Codec.compose(res, self))
                                                      .done();
                                    });
                                }
                                else {
                                    self.sendReply(IIPPacketAction.InvokeFunctionArrayArguments, callback)
                                                    .addUint8Array(Codec.compose(rt, self))
                                                    .done();
                                }
                            }
                            else {
                                // ft found, fi not found, this should never happen
                            }
                        }
                    }
                    else {
                        // no function at this index
                    }
                });
            }
            else {
                // no resource with this id
            }
        });
    }

    
    IIPRequestInvokeFunctionNamedArguments(callback, resourceId, index, content) {

        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseStructure(content, 0, content.Length, self).then(function (namedArgs) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invokeByNamedArguments(index, namedArgs);
                            if (rt != null) {
                                rt.then(function (res) {
                                    self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                    .addUint8Array(Codec.compose(res, self))
                                                    .done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];

                            if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied)
                            {
                                self.sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                                return;
                            }

                            if (fi instanceof Function) {

                                var pi = ResourceTemplate.getFunctionParameters(fi);
                                var args = new Array(pi.length);

                                for (var i = 0; i < pi.Length; i++)
                                {
                                    if (namedArgs[pi[i]] !== undefined)
                                        args[i] = namedArgs[pi[i]];
                                }

                                // pass this to the last argument if it is undefined
                                if (args[args.length-1] === undefined)
                                    args[args.length-1] = self;

                                var rt = fi.apply(r, args);

                                // Is iterator ?
                                if (rt[Symbol.iterator] instanceof Function)
                                {
                                    for (let v of rt)
                                        self.sendChunk(callback, v);

                                    self.sendReply(IIPPacket.IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                    .addUint8(DataType.Void)
                                                    .done();
                                }
                                else if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                      .addUint8Array(Codec.compose(res, self))
                                                      .done();
                                    });
                                }
                                else {
                                    self.sendReply(IIPPacketAction.InvokeFunctionNamedArguments, callback)
                                                    .addUint8Array(Codec.compose(rt, self))
                                                    .done();
                                }
                            }
                            else {
                                // ft found, fi not found, this should never happen
                            }
                        }
                    }
                    else {
                        // no function at this index
                    }
                });
            }
            else {
                // no resource with this id
            }
        });
    }

    IIPRequestGetProperty(callback, resourceId, index) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r instanceof DistributedResource) {
                        self.sendReply(IIPPacketAction.GetProperty, callback)
                                        .addUint8Array(Codec.compose(r._get(pt.index), self))
                                        .done();
                    }
                    else {
                        var pv = r[pt.name];
                        self.sendReply(IIPPacketAction.GetProperty)
                                    .addUint8Array(Codec.compose(pv, self))
                                    .done();
                    }
                }
                else {
                    // pt not found
                }
            }
            else {
                // resource not found
            }
        });
    }

    IIPRequestGetPropertyIfModifiedSince(callback, resourceId, index, age) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r.instance.getAge(index) > age) {
                        var pv = r[pt.name];
                        self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
                                        .addUint8Array(Codec.compose(pv, self))
                                        .done();
                    }
                    else 
                    {
                        self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
                                        .addUint8(DataType.NotModified)
                                        .done();
                    }
                }
                else {
                    // pt not found
                }
            }
            else {
                // resource not found
            }
        });
    }

    IIPRequestSetProperty(callback, resourceId, index, content) {
        
        var self = this;

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {


                var pt = r.instance.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    Codec.parse(content, 0, {}, this).then(function (value) {
                        if (r instanceof DistributedResource) {
                            // propagation
                            r._set(index, value).then(function (x) {
                                self.sendReply(IIPPacketAction.SetProperty, callback)
                                                .done();
                            }).error(function(x){
                                self.sendError(x.type, callback, x.code, x.message)
                                    .done();
                            });
                        }
                        else 
                        {
                            if (r.instance.applicable(self.session, ActionType.SetProperty, pt) == Ruling.Denied)
                            {
                                self.sendError(AsyncReply.ErrorType.Exception, callback, ExceptionCode.SetPropertyDenied);
                                return;
                            }
                            
                            try
                            {
                                if (r[pt.name] instanceof DistributedPropertyContext)
                                    value = new DistributedPropertyContext(this, value);

                                r[pt.name] = value;
                                self.sendReply(IIPPacketAction.SetProperty, callback).done();
                            }
                            catch(ex)
                            {
                                self.sendError(AsyncReply.ErrorType.Exception, callback, 0, ex.toString()).done();
                            }
                        }

                    });
                }
                else {
                    // property not found
                    self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
                }
            }
            else {
                // resource not found
                self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
            }
        });
    }

    IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(r)
        {
            if (r != null)
            {
                r.instance.store.getRecord(r, fromDate, toDate).then(function(results)
                {
                    var history = Codec.composeHistory(results, self, true);
                    self.sendReply(IIPPacketAction.ResourceHistory, callback)
                                    .addUint8Array(history)
                                    .done();
                });
            }
        });
    }

    IIPRequestQueryResources(callback, resourceLink)
    {
        var self = this;

        Warehouse.query(resourceLink).then(function(resources)
        {

            var list = resources.filter(function(r){return r.instance.applicable(self.session, ActionType.Attach, null) !=  Ruling.Denied});

            if (list.length == 0)
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
                self.sendReply(IIPPacketAction.QueryLink, callback)
                    .addUint8Array(Codec.composeResourceArray(list, self, true))
                    .done();
        });
    }

    create(store, parent, className, parameters, attributes, values)
    {
        var reply = new AsyncReply();
        var sb = DC.stringToBytes(className);

        var pkt = BL().addUint32(store.instance.id)
                      .addUint32(parent.instance.id)
                      .addUint32(sb.length)
                      .addUint8Array(sb)
                      .addUint8Array(Codec.composeVarArray(parameters, this, true))
                      .addUint8Array(Codec.composeStructure(attributes, this, true, true, true))
                      .addUint8Array(Codec.composeStructure(values, this));

        pkt.addUint32(pkt.length, 8);

        this.sendRequest(IIPPacket.IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function(args)
        {
            var rid = args[0];

            self.fetch(rid).then(function(r)
            {
                reply.trigger(r);
            });

        });

        return reply;
    }

    query(resourceLink)
    {
        var reply = new AsyncReply();
        var self = this;

        var sb = DC.stringToBytes(resourceLink);

        this.sendRequest(IIPPacketAction.QueryLink)
                        .addUint16(sb.length)
                        .addUint8Array(sb)
                        .done()
                        .then(function(args)
        {
            Codec.parseResourceArray(args[0], 0, args[0].length, self).then(function(resources) {
                reply.trigger(resources);
            });
        }).error(function(ex){
            reply.triggerError(ex);
        });

        return reply;
    }

    getTemplate(classId) {
        if (this.templates.contains(classId))
            return new AsyncReply(this.templates.item(classId));
        else if (this.templateRequests.contains(classId))
            return this.templateRequests.item(classId);

        var reply = new AsyncReply();
        this.templateRequests.add(classId.valueOf(), reply);

        var self = this;

        this.sendRequest(IIPPacketAction.TemplateFromClassId)
                        .addUint8Array(classId.value)
                        .done()
                        .then(function (rt) {
                            self.templateRequests.remove(classId);
                            self.templates.add(rt[0].classId.valueOf(), rt[0]);
                            Warehouse.putTemplate(rt[0]);
                            reply.trigger(rt[0]);
                        });

        return reply;
    }

// IStore interface
    get(path) {

        var rt = new AsyncReply();
        
        this.query(path).then(function(ar)
        {
            if (ar != null && ar.length > 0)
                rt.trigger(ar[0]);
            else
                rt.trigger(null);
        }).error(function(ex) {rt.triggerError(ex);});

        return rt;
        
        /*
        if (this.pathRequests[path])
            return this.pathRequests[path];

        var reply = new AsyncReply();
        this.pathRequests[path] = reply;

        var bl = new BinaryList();
        bl.addString(path);
        bl.addUint16(bl.length, 0);

        var link = data.get
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
                        .addUint16(.then(function (rt) {
            delete self.pathRequests[path];

            self.fetch(rt[1]).then(function (r) {
                reply.trigger(r);
            });
        });


        return reply;
        */
    }

    retrieve(iid) {
        for (var r in this.resources)
            if (this.resources[r].instance.id == iid)
                return new AsyncReply(r);
        return new AsyncReply(null);
    }

// Get a resource from the other end
    fetch(id) {
        if (this.resourceRequests[id] && this.resources[id]) {
            // dig for dead locks
            // or not
            return new AsyncReply(this.resources[id]);
            //return this.resourceRequests[id];
        }
        else if (this.resourceRequests[id])
            return this.resourceRequests[id];
        else if (this.resources[id])
            return new AsyncReply(this.resources[id]);

        var reply = new AsyncReply();

        this.resourceRequests[id] = reply;

        var self = this;

        this.sendRequest(IIPPacketAction.AttachResource)
                    .addUint32(id)
                    .done()
                    .then(function (rt) {
                        var dr = new DistributedResource(self, id, rt[1], rt[2]);
                        //var dr = new DistributedResource(self, tmp, id, rt[1], rt[2]);

                            self.getTemplate(rt[0]).then(function (tmp) {

                            // ClassId, ResourceAge, ResourceLink, Content
                            Warehouse.put(dr, id.toString(), self, null, tmp);

                    
                            Codec.parsePropertyValueArray(rt[3], 0, rt[3].length, self).then(function (ar) {
                                dr._attached(ar);
                                delete self.resourceRequests[id];
                                reply.trigger(dr);
                            });
                        });
                    });

        return reply;
    }

    getRecord(resource, fromDate, toDate)
    {
        if (resource instanceof DistributedResource)
        {

            if (resource._p.connection != this)
                return new AsyncReply(null);

            var reply = new AsyncReply();

            var self = this;

            this.sendRequest(IIPPacketAction.ResourceHistory)
                            .addUint32(resource._p.instanceId)
                            .addDateTime(fromDate).addDateTime(toDate)
                            .done()
                            .then(function(rt)
                            {
                                Codec.parseHistory(rt[0], 0, rt[0].length, resource, self).then(function(history)
                                {
                                    reply.trigger(history);
                                });
                            });

            return reply;
        }
        else
            return new AsyncReply(null);
    }

    instance_resourceDestroyed(resource) {
        // compose the packet
        this.sendEvent(IIPPacketEvent.ResourceDestroyed)
                        .addUint32(resource.instance.id)
                        .done();
    }

    instance_propertyModified(resource, name, newValue) {
        var pt = resource.instance.template.getPropertyTemplateByName(name);

        if (pt == null)
            return;

        this.sendEvent(IIPPacketEvent.PropertyUpdated)
                            .addUint32(resource.instance.id)
                            .addUint8(pt.index)
                            .addUint8Array(Codec.compose(newValue, this))
                            .done();
    }

    instance_eventOccurred(resource, issuer, receivers, name, args) {
        var et = resource.instance.template.getEventTemplateByName(name);

        if (et == null)
            return;

        if (receivers != null)
            if (receivers.indexOf(this.session) < 0)
                return;

        if (resource.instance.applicable(this.session, ActionType.ReceiveEvent, et, issuer) == Ruling.Denied)
            return;

        // compose the packet
        this.sendEvent(IIPPacketEvent.EventOccurred)
                        .addUint32(resource.instance.id)
                        .addUint8(et.index)
                        .addUint8Array(Codec.composeVarArray(args, this, true))
                        .done();

    }



    IIPRequestAddChild(callback, parentId, childId)
    {
        var self = this;
        Warehouse.get(parentId).then(function(parent)
        {
            if (parent == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.get(childId).then(function(child)
            {
                if (child == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.AddParent, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.add(child);

                self.sendReply(IIPPacketAction.AddChild, callback)
                                .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRemoveChild(callback, parentId, childId)
    {
        var self = this;

        Warehouse.get(parentId).then(function(parent)
        {
            if (parent == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.get(childId).then(function(child)
            {
                if (child == null)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.RemoveChild, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.RemoveParent, null) != Ruling.Allowed)
                {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.remove(child);

                self.sendReply(IIPPacketAction.RemoveChild, callback)
                                .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRenameResource(callback, resourceId, name)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (resource.instance.applicable(self.session, ActionType.Rename, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.RenameDenied);
                return;
            }

            resource.instance.name = name.getString(0, name.length);
            self.sendReply(IIPPacketAction.RenameResource, callback)
                            .done();
        });
     }

    IIPRequestResourceChildren(callback, resourceId)
    {
        var self = this;
        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceChildren, callback)
                        .addUint8Array(Codec.composeResourceArray(resource.instance.children.toArray(), this, true))
                        .done();
            
        });
    }

    IIPRequestResourceParents(callback, resourceId)
    {
        var self = this;

        Warehouse.get(resourceId).then(function(resource)
        {
            if (resource == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceParents, callback)
                            .addUint8Array(Codec.composeResourceArray(resource.instance.parents.toArray(), this, true))
                            .done();
        });
    }

    IIPRequestClearAttributes(callback, resourceId, attributes, all = false)
    {
        Warehouse.get(resourceId).then(function(r)
        {
            if (r == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            var attrs = [];

            if (!all)
                attrs = attributes.getStringArray(0, attributes.length);

            if (r.instance.removeAttributes(attrs))
                self.sendReply(all ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes, callback)
                              .done();
            else
                self.sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);

        });
    }

    IIPRequestUpdateAttributes(callback, resourceId, attributes, clearAttributes = false)
    {
        var self = this;

        Warehouse.get(resourceId).then(function(r)
        {
            if (r == null)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed)
            {
                self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            Codec.parseStructure(attributes, 0, attributes.Length, this).then(function(attrs) {
                if (r.instance.setAttributes(attrs, clearAttributes))
                    self.sendReply(clearAttributes ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes,
                              callback)
                              .done();
                else
                    self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);
            });
           
        });

    }


    
    getChildren(resource)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceChildren)
                        .addUint32(resource._p.instanceId)
                        .done()
                        .then(function(d)
        {
            
            Codec.parseResourceArray(d, 0, d.length, self).then(function(resources)
            {
                rt.trigger(resources);
            }).error(function(ex) { rt.triggerError(ex); });
        });

        return rt;
    }

    getParents(resource)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceParents)
                        .addUint32(resource._p.instanceId)
                        .done()
                        .then(function(d)
        {
            Codec.parseResourceArray(d, 0, d.length, this).then(function(resources)
            {
                rt.trigger(resources);
            }).error(function(ex) { rt.triggerError(ex);});
        });

        return rt;
    }

    removeAttributes(resource, attributes = null)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();

        if (attributes == null)
            this.sendRequest(IIPPacketAction.ClearAllAttributes)
                            .addUint32(resource._p.instanceId)
                            .done()
                            .then(function(ar)
            {
                rt.trigger(true);
            }).error(function(ex) { rt.triggerError(ex); });
        else
        {
            var attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.ClearAttributes)
                            .addUint32(resource.instance.id)
                            .addUint32(attrs.length)
                            .addUint8Array(attrs)
                            .done()
                            .then(function(ar)
            {
                rt.trigger(true);
            }).error(function(ex) { rt.triggerChunk(ex); });
        }

        return rt;
    }

    setAttributes(resource, attributes, clearAttributes = false)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        
        this.sendRequest(clearAttributes ? IIPPacketAction.UpdateAllAttributes : IIPPacketAction.UpdateAttributes)
                        .addUint32(resource._p.instanceId)
                        .addUint8Array(Codec.composeStructure(attributes, this, true, true, true))
                        .done()
                        .then(function(ar)
                                {
                                    rt.trigger(true);
                                }).error(function(ex) {rt.triggerError(ex);});
    
        return rt;
    }

    getAttributes(resource, attributes = null)
    {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        if (attributes == null)
        {
            this.sendRequest(IIPPacketAction.GetAllAttributes)
                            .addUint32(resource._p.instanceId)
                            .done()
                            .then(function(ar)
                            {
                                Codec.parseStructure(ar[0], 0, ar[0].length, this).then(function(st)
                                {
                                    for (var a in st)
                                       resource.instance.attributes.set(a, st[a]);
                                    rt.trigger(st);
                                }).error(function(ex) { rt.triggerError(ex); });
                            });
        }
        else
        {
            var attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.GetAttributes)
                            .addUint32(resource._p.instanceId)
                            .addUint32(attrs.length)
                            .addUint8Array(attrs)
                            .done()
                            .then(function(ar)
            {
                Codec.parseStructure(ar[0], 0, ar[0].length, self).then(function(st)
                {
                    for (var a in st)
                        resource.instance.attributes.set(a, st[a]);
                    rt.trigger(st);
                }).error(function(ex) { rt.triggerError(ex); });
            });
        }

        return rt;
    }

}
