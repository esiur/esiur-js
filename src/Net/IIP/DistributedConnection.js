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
import Authentication from '../../Security/Authority/Authentication.js';
import AuthenticationType from "../../Security/Authority/AuthenticationType.js";

import SHA256 from '../../Security/Integrity/SHA256.js';
import { BL, DC } from '../../Data/DC.js';
import SendList from '../SendList.js';

import AsyncReply from '../../Core/AsyncReply.js';
import Codec from '../../Data/Codec.js';
import KeyList from '../../Data/KeyList.js';
import AsyncQueue from '../../Core/AsyncQueue.js';
import Warehouse from '../../Resource/Warehouse.js';

import IIPAuthPacket from "../Packets/IIPAuthPacket.js";
import IIPPacket from "../Packets/IIPPacket.js";
import IIPAuthPacketAction from "../Packets/IIPAuthPacketAction.js";
import IIPAuthPacketCommand from "../Packets/IIPAuthPacketCommand.js";
import AuthenticationMethod from "../../Security/Authority/AuthenticationMethod.js";

import IIPPacketAction from "../Packets/IIPPacketAction.js";
import IIPPacketCommand from "../Packets/IIPPacketCommand.js";
import IIPPacketEvent from "../Packets/IIPPacketEvent.js";
import IIPPacketReport from "../Packets//IIPPacketReport.js";

import ErrorType from "../../Core/ErrorType.js";
import ProgressType from "../../Core/ProgressType.js";
import ExceptionCode from "../../Core/ExceptionCode.js";

import DistributedResource from './DistributedResource.js';
import TypeTemplate from '../../Resource/Template/TypeTemplate.js';

import DistributedResourceQueueItem from './DistributedResourceQueueItem.js';
import DistributedResourceQueueItemType from './DistributedResourceQueueItemType.js';

import DistributedPropertyContext from './DistributedPropertyContext.js';
import { ResourceTrigger } from '../../Resource/IResource.js';

import Ruling from '../../Security/Permissions/Ruling.js';
import ActionType from '../../Security/Permissions/ActionType.js';
import AsyncException from '../../Core/AsyncException.js';
import WSocket from '../Sockets/WSocket.js';

import ClientAuthentication from "../../Security/Authority/ClientAuthentication.js";
import HostAuthentication from "../../Security/Authority/HostAuthentication.js";
import SocketState from "../Sockets/SocketState.js";
import TemplateType from '../../Resource/Template/TemplateType.js';
import AsyncBag from '../../Core/AsyncBag.js';

import {TransmissionType, TransmissionTypeIdentifier} from '../../Data/TransmissionType.js';

import PropertyValue from '../../Data/PropertyValue.js';
import PropertyValueArray from '../../Data/PropertyValueArray.js';

export default class DistributedConnection extends IStore {


    sendAll(data) {
        this.socket.sendAll(data.buffer);
    }

    sendParams(doneReply) {
        return new SendList(this, doneReply);
    }

    generateNonce(length) {
        var rt = new Uint8Array(length);
        for (var i = 0; i < length; i++)
            rt[i] = Math.random() * 255;

        return rt;
    }

    constructor(server) {

        super();

        this._register("ready");
        this._register("error");
        this._register("close");

        if (server != null)
        {
            this.session = new Session(new Authentication(AuthenticationType.Host), new Authentication(AuthenticationType.Client));
            this.server = server;
        }
        else
            this.session = new Session(new Authentication(AuthenticationType.Client), new Authentication(AuthenticationType.Host));

        this.packet = new IIPPacket();
        this.authPacket = new IIPAuthPacket();

        this.resources = new KeyList();//{};
        this.templates = new KeyList();
        this.requests = new KeyList();// {};
        //this.pathRequests = new KeyList();// {};
        this.templateRequests = new KeyList();
        this.templateByNameRequests = new KeyList();
        this.resourceRequests = new KeyList();// {};
        this.callbackCounter = 0;

        this.queue = new AsyncQueue();

        this.subscriptions = new Map();

        this.queue.then(function (x) {
            if (x.type == DistributedResourceQueueItemType.Event) {
                x.resource._emitEventByIndex(x.index, x.value);
            }
            else {
                x.resource._updatePropertyByIndex(x.index, x.value);
            }
        });

        this.localNonce = this.generateNonce(32);
    }



    _processPacket(msg, offset, ends, data) {


        var authPacket = this.authPacket;

        if (this.ready) {
            var packet = new IIPPacket();

            var rt = packet.parse(msg, offset, ends);


            //console.log("Inc " , rt, offset, ends);

            if (rt <= 0) {
                data.holdFor(msg, offset, ends - offset, -rt);
                return ends;
            }
            else {
                offset += rt;

                try {
                    if (packet.command == IIPPacketCommand.Event) {
                        switch (packet.event) {
                            case IIPPacketEvent.ResourceReassigned:
                                this.IIPEventResourceReassigned(packet.resourceId, packet.newResourceId);
                                break;
                            case IIPPacketEvent.ResourceDestroyed:
                                this.IIPEventResourceDestroyed(packet.resourceId);
                                break;
                            case IIPPacketEvent.PropertyUpdated:
                                this.IIPEventPropertyUpdated(packet.resourceId, packet.methodIndex, packet.dataType, msg);
                                break;
                            case IIPPacketEvent.EventOccurred:
                                this.IIPEventEventOccurred(packet.resourceId, packet.methodIndex, packet.dataType, msg);
                                break;

                            case IIPPacketEvent.ChildAdded:
                                this.IIPEventChildAdded(packet.resourceId, packet.childId);
                                break;
                            case IIPPacketEvent.ChildRemoved:
                                this.IIPEventChildRemoved(packet.resourceId, packet.childId);
                                break;
                            case IIPPacketEvent.Renamed:
                                this.IIPEventRenamed(packet.resourceId, packet.resourceName);
                                break;
                            case IIPPacketEvent.AttributesUpdated:
                                //@TODO: fix this
                                //this.IIPEventAttributesUpdated(packet.resourceId, packet.content);
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
                                // @TODO: implement this
                                // this.IIPRequestCreateResource(packet.callbackId, packet.storeId, packet.resourceId, packet.content);
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
                                this.IIPRequestRenameResource(packet.callbackId, packet.resourceId, packet.resourceName);
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

                            case IIPPacketAction.LinkTemplates:
                                this.IIPRequestLinkTemplates(packet.callbackId, packet.resourceLink);
                                break;
    
                            // Invoke
                            case IIPPacketAction.InvokeFunction:
                                this.IIPRequestInvokeFunction(packet.callbackId, packet.resourceId, packet.methodIndex, packet.dataType, msg);
                                break;
                        
                                
                            // case IIPPacketAction.GetProperty:
                            //     this.IIPRequestGetProperty(packet.callbackId, packet.resourceId, packet.methodIndex);
                            //     break;
                            // case IIPPacketAction.GetPropertyIfModified:
                            //     this.IIPRequestGetPropertyIfModifiedSince(packet.callbackId, packet.resourceId, packet.methodIndex, packet.resourceAge);
                            //     break;

                            case IIPPacketAction.Listen:
                                this.IIPRequestListen(packet.callbackId, packet.resourceId, packet.methodIndex);
                                break;
                            case IIPPacketAction.Unlisten:
                                this.IIPRequestUnlisten(packet.callbackId, packet.resourceId, packet.methodIndex);
                                break;

                            case IIPPacketAction.SetProperty:
                                this.IIPRequestSetProperty(packet.callbackId, packet.resourceId, packet.methodIndex, packet.dataType, msg);
                                break;

                                
                            // Attribute @TODO: implement these
                            case IIPPacketAction.GetAllAttributes:
                                // this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                                break;
                            case IIPPacketAction.UpdateAllAttributes:
                                // this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                                break;
                            case IIPPacketAction.ClearAllAttributes:
                                // this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, true);
                                break;
                            case IIPPacketAction.GetAttributes:
                                // this.IIPRequestGetAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                                break;
                            case IIPPacketAction.UpdateAttributes:
                                // this.IIPRequestUpdateAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                                break;
                            case IIPPacketAction.ClearAttributes:
                                // this.IIPRequestClearAttributes(packet.callbackId, packet.resourceId, packet.content, false);
                                break;

                        }
                    }
                    else if (packet.command == IIPPacketCommand.Reply) {
                        switch (packet.action) {
                            case IIPPacketAction.AttachResource:
                                this.IIPReply(packet.callbackId, packet.classId, packet.resourceAge, packet.resourceLink, packet.dataType, msg);
                                break;
                            case IIPPacketAction.ReattachResource:
                                this.IIPReply(packet.callbackId, packet.resourceAge, packet.dataType, msg);
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

                                if (packet.dataType != null) {
                                    var content = msg.clip(packet.dataType?.offset ?? 0,
                                        packet.dataType?.contentLength ?? 0);
                                        this.IIPReply(packet.callbackId, TypeTemplate.parse(content));
                                  } else {
                                    iipReportError(packet.callbackId, ErrorType.Management,
                                        ExceptionCode.TemplateNotFound.index, "Template not found");
                                  }
                    
                                break;

                            case IIPPacketAction.QueryLink:
                            case IIPPacketAction.ResourceChildren:
                            case IIPPacketAction.ResourceParents:
                            case IIPPacketAction.ResourceHistory:
                            case IIPPacketAction.LinkTemplates:
                                this.IIPReply(packet.callbackId, packet.dataType, msg);
                                break;

                            case IIPPacketAction.InvokeFunction:
                                this.IIPReplyInvoke(packet.callbackId, packet.dataType, msg);
                                break;

                            // case IIPPacketAction.GetProperty:
                            //     this.IIPReply(packet.callbackId, packet.content);
                            //     break;
                            // case IIPPacketAction.GetPropertyIfModified:
                            //     this.IIPReply(packet.callbackId, packet.content);
                            //     break;

                            case IIPPacketAction.Listen:
                            case IIPPacketAction.Unlisten:
                            case IIPPacketAction.SetProperty:
                                this.IIPReply(packet.callbackId);
                                break;

                            // Attribute
                            case IIPPacketAction.GetAllAttributes:
                            case IIPPacketAction.GetAttributes:
                                this.IIPReply(packet.callbackId, packet.dataType, msg);
                                break;

                            case IIPPacketAction.UpdateAllAttributes:
                            case IIPPacketAction.UpdateAttributes:
                            case IIPPacketAction.ClearAllAttributes:
                            case IIPPacketAction.ClearAttributes:
                                this.IIPReply(packet.callbackId);
                                break;

                        }

                    }
                    else if (packet.command == IIPPacketCommand.Report) {
                        switch (packet.report) {
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
                                this.IIPReportChunk(packet.callbackId, packet.dataType, msg);

                                break;
                        }

                    }
                } catch (ex) {
                    console.log("Esiur Error ", ex);
                }
            }
        }

        else {
            var rt = authPacket.parse(msg, offset, ends);

            //console.log("Auth", rt, authPacket.command);

            if (rt <= 0) {
                data.holdAllFor(msg, ends - rt);
                return ends;
            }
            else {
                offset += rt;

                if (this.session.localAuthentication.type == AuthenticationType.Host)
                {
                    if (authPacket.command == IIPAuthPacketCommand.Declare)
                    {
                        this.session.remoteAuthentication.method = authPacket.remoteMethod;

                        if (authPacket.remoteMethod == AuthenticationMethod.Credentials 
                            && authPacket.localMethod == AuthenticationMethod.None)
                        {
                            try
                            {
                                this.server.membership.userExists(authPacket.remoteUsername, authPacket.domain).then(x =>
                                {
                                    if (x)
                                    {
                                        this.session.remoteAuthentication.username = authPacket.remoteUsername;
                                        this.remoteNonce = authPacket.remoteNonce;
                                        this.session.remoteAuthentication.domain = authPacket.domain;
                                        this.sendParams()
                                                    .addUint8(0xa0)
                                                    .addUint8Array(this.localNonce)
                                                    .done();
                                    }
                                    else
                                    {
                                        this.sendParams().addUint8(0xc0)
                                                        .addUint8(ExceptionCode.UserOrTokenNotFound)
                                                        .addUint16(14)
                                                        .addString("User not found")
                                                        .done();
                                    }
                                });
                            }
                            catch (ex)
                            {
                                console.log(ex);

                                var errMsg = DC.stringToBytes(ex.message);

                                this.sendParams()
                                    .addUint8(0xc0)
                                    .addUint8(ExceptionCode.GeneralFailure)
                                    .addUint16(errMsg.length)
                                    .addUint8Array(errMsg)
                                    .done();
                            }
                        }
                        else if (authPacket.remoteMethod == AuthenticationMethod.Token 
                                && authPacket.localMethod == AuthenticationMethod.None)
                        {
                            try
                            {
                                // Check if user and token exists
                                this.server.membership.tokenExists(authPacket.remoteTokenIndex, authPacket.domain).then(x =>
                                {
                                    if (x != null)
                                    {
                                        this.session.remoteAuthentication.username = x;
                                        this.session.remoteAuthentication.tokenIndex = authPacket.remoteTokenIndex;
                                        this.remoteNonce = authPacket.remoteNonce;
                                        this.session.remoteAuthentication.domain = authPacket.domain;
                                        this.sendParams()
                                                    .addUint8(0xa0)
                                                    .addUint8Array(this.localNonce)
                                                    .done();
                                    }
                                    else
                                    {
                                        //Console.WriteLine("User not found");
                                        this.sendParams()
                                                        .addUint8(0xc0)
                                                        .addUint8(ExceptionCode.UserOrTokenNotFound)
                                                        .addUint16(15)
                                                        .addString("Token not found")
                                                        .done();
                                    }
                                });
                            }
                            catch (ex)
                            {
                                console.log(ex);

                                var errMsg = DC.stringToBytes(ex.message);

                                this.sendParams()
                                        .addUint8(0xc0)
                                        .addUint8(ExceptionCode.GeneralFailure)
                                        .addUint16(errMsg.length)
                                        .addUint8Array(errMsg)
                                        .done();
                            }
                        }

                        else if (authPacket.remoteMethod == AuthenticationMethod.None 
                            && authPacket.localMethod == AuthenticationMethod.None)
                        {
                            try
                            {
                                // Check if guests are allowed
                                if (this.server?.membership.guestsAllowed)
                                {
                                    this.session.remoteAuthentication.username = "g-" + Math.random().toString(36).substring(10);
                                    this.session.remoteAuthentication.domain = authPacket.domain;
                                    this.readyToEstablish = true;
                                    this.sendParams()
                                                .addUint8(0x80)
                                                .done();
                                }
                                else
                                {
                                    this.sendParams()
                                                .addUInt8(0xc0)
                                                .addUint8(ExceptionCode.AccessDenied)
                                                .addUint16(18)
                                                .addString("Guests not allowed")
                                                .done();
                                }
                            }
                            catch (ex)
                            {
                                var errMsg = DC.stringToBytes(ex.message);

                                this.sendParams()
                                        .addUInt8(0xc0)
                                        .addUint8(ExceptionCode.GeneralFailure)
                                        .addUint16(errMsg.length)
                                        .addUint8Array(errMsg)
                                        .done();
                            }
                        }

                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action)
                    {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash)
                        {
                            var remoteHash = authPacket.hash;
                            var reply = null;

                            try
                            {
                                if (this.session.remoteAuthentication.method == AuthenticationMethod.Credentials)
                                {
                                    reply = this.server.membership.getPassword(this.session.remoteAuthentication.username,
                                                                  this.session.remoteAuthentication.domain);
                                }
                                else if (this.session.remoteAuthentication.method == AuthenticationMethod.Token)
                                {
                                    reply = this.server.membership.getToken(this.session.remoteAuthentication.tokenIndex,
                                                                    this.session.remoteAuthentication.domain);
                                }
                                else
                                {
                                    // Error
                                }

                                reply.then((pw) =>
                                {
                                    if (pw != null)
                                    {
                                        var hash = SHA256.compute(BL()
                                                                                .addUint8Array(pw)
                                                                                .addUint8Array(this.remoteNonce)
                                                                                .addUint8Array(this.localNonce)
                                                                                .toArray());
                                        if (hash.sequenceEqual(remoteHash))
                                        {
                                            // send our hash
                                            var localHash = SHA256.compute(BL()
                                                                    .addUint8Array(this.localNonce)
                                                                    .addUint8Array(this.remoteNonce)
                                                                    .addUint8Array(pw)
                                                                    .toArray());
                                            
                                            this.sendParams()
                                                .addUint8(0)
                                                .addUint8Array(localHash)
                                                .done();

                                            this.readyToEstablish = true;
                                        }
                                        else
                                        {
                                            
                                            this.sendParams()
                                                            .addUint8(0xc0)
                                                            .addUint8(ExceptionCode.AccessDenied)
                                                            .addUint16(13)
                                                            .addString("Access Denied")
                                                            .done();
                                        }
                                    }
                                });
                            }
                            catch (ex)
                            {
                                console.log(ex);

                                var errMsg = DC.stringToBytes(ex.message);

                                this.sendParams()
                                    .addUint8(0xc0)
                                    .addUint8(ExceptionCode.GeneralFailure)
                                    .addUint16(errMsg.length)
                                    .addUint8Array(errMsg)
                                    .done();
                            }
                        }
                        else if (authPacket.action == IIPAuthPacketAction.NewConnection)
                        {
                            if (this.readyToEstablish)
                            {
                                this.session.Id = this.generateNonce(32);
                                
                                this.sendParams()
                                                .addUint8(0x28)
                                                .addUint8Array(this.session.Id)
                                                .done();

                                if (this.instance == null)
                                {
                                    Warehouse.put(this.localUsername, this, null, this.server).then(x =>
                                    {
    
                                        this.ready = true;
                                        this.openReply?.trigger(true);
                                        this._emit("ready", this);
                                        this.server?.membership.login(this.session);

                                    }).error( x=>
                                    {
                                        this.openReply?.triggerError(x);
                                    });
                                }
                                else
                                {
                                    this.ready = true;
                                    this.openReply?.trigger(true);
                                    this._emit("ready", this);
                                    this.server?.membership.login(this.session);
                                }
                            }
                            else
                            {
                                this.sendParams()
                                    .addUint8(0xc0)
                                    .addUint8(ExceptionCode.GeneralFailure)
                                    .addUint16(9)
                                    .addString("Not ready")
                                    .done();
    
                               //     this.close();
                            }    
                        }
                    }
                }
                else if (this.session.localAuthentication.type == AuthenticationType.Client)
                {
                    if (authPacket.command == IIPAuthPacketCommand.Acknowledge)
                    {
                        if (authPacket.remoteMethod == AuthenticationMethod.None)
                        {
                            // send establish
                            this.sendParams()
                                        .addUint8(0x20)
                                        .addUint16(0)
                                        .done();
                        }
                        else if (authPacket.remoteMethod == AuthenticationMethod.Credentials
                                || authPacket.remoteMethod == AuthenticationMethod.Token)
                        {

                            this.remoteNonce = authPacket.remoteNonce;

                            // send our hash
                            var localHash = SHA256.compute(BL()
                                                                .addUint8Array(this.localPasswordOrToken)
                                                                .addUint8Array(this.localNonce)
                                                                .addUint8Array(this.remoteNonce)
                                                                .toArray());

                            this.sendParams()
                                .addUint8(0)
                                .addUint8Array(localHash)
                                .done();
                        }

                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Action)
                    {
                        if (authPacket.action == IIPAuthPacketAction.AuthenticateHash)
                        {
                            // check if the server knows my password
                            var remoteHash = SHA256.compute(BL()
                                                                    .addUint8Array(this.remoteNonce)
                                                                    .addUint8Array(this.localNonce)
                                                                    .addUint8Array(this.localPasswordOrToken)
                                                                    .toArray());


                            if (remoteHash.sequenceEqual(authPacket.hash))
                            {
                                // send establish request
                                //SendParams((byte)0x20, (ushort)0);
                                this.sendParams()
                                            .addUint8(0x20)
                                            .addUint16(0)
                                            .done();
                            }
                            else
                            {
                                this.sendParams()
                                            .addUint8(0xc0)
                                            .addUint8(ExceptionCode.ChallengeFailed)
                                            .addUint16(16)
                                            .addString("Challenge Failed")
                                            .done();
                            }
                        }
                        else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished)
                        {
                            this.session.id = authPacket.sessionId;
                            this.ready = true;
                            this.openReply?.trigger(true);
                            this._emit("ready", this);

                            // put it in the warehouse
                            if (this.instance == null)
                            {
                                Warehouse.put(this.localUsername, this, null, this.server).then(x =>
                                {
                                    this.openReply?.trigger(true);
                                    this._emit("ready", this);
                                }).error(x=> this.openReply?.triggerError(x));
                            }
                            else
                            {
                                this.openReply?.trigger(true);
                                this._emit("ready", this);
                            }
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Error)
                    {
                        this.openReply?.triggerError(new AsyncException(ErrorType.Management, authPacket.errorCode, authPacket.errorMessage));
                        this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                        this.close();
                    }
                }



















                // if (this.session.localAuthentication.type == AuthenticationType.Host) {
                //     if (authPacket.command == IIPAuthPacketCommand.Declare) {
                //         if (authPacket.remoteMethod == AuthenticationMethod.Credentials
                //             && authPacket.localMethod == AuthenticationMethod.None) {

                //             console.log("Declare");
                //             this.session.remoteAuthentication.username = authPacket.remoteUsername;
                //             this.remoteNonce = authPacket.remoteNonce;
                //             this.domain = authPacket.domain;
                //             this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
                //         }
                //     }
                //     else if (authPacket.command == IIPAuthPacketCommand.Action) {
                //         if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                //             var remoteHash = authPacket.hash;

                //             this.server.membership.getPassword(this.session.remoteAuthentication.username, this.domain).then(function (pw) {
                //                 if (pw != null) {

                //                     //var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));
                //                     var hash = SHA256.compute(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toDC());


                //                     if (hash.sequenceEqual(remoteHash)) {
                //                         // send our hash
                //                         //var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
                //                         var localHash = SHA256.compute(BL().addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toDC());
                //                         this.sendParams().addUint8(0).addUint8Array(localHash).done();

                //                         this.readyToEstablish = true;
                //                     }
                //                     else {
                //                         // incorrect password
                //                         this.sendParams().addUint8(0xc0)
                //                             .addInt32(ExceptionCode.AccessDenied)
                //                             .addUint16(13)
                //                             .addString("Access Denied")
                //                             .done();
                //                     }
                //                 }
                //             });
                //         }
                //         else if (authPacket.action == IIPAuthPacketAction.NewConnection) {
                //             if (readyToEstablish) {
                //                 this.session.id = this.generateNonce(32);// new DC(32);
                //                 //window.crypto.getRandomValues(this.session.id);

                //                 this.sendParams().addUint8(0x28).addUint8Array(this.session.id).done();
                //                 this.ready = true;

                //                 this.openReply.trigger(this);
                //                 this.openReply = null;
                //                 //this._emit("ready", this);
                //             }
                //         }
                //     }
                // }
                // else if (this.session.localAuthentication.type == AuthenticationType.Client) {
                //     if (authPacket.command == IIPAuthPacketCommand.Acknowledge) {
                //         this.remoteNonce = authPacket.remoteNonce;

                //         // send our hash

                //         var localHash = SHA256.compute(BL().addUint8Array(this.localPasswordOrToken)
                //             .addUint8Array(this.localNonce)
                //             .addUint8Array(this.remoteNonce).toDC());

                //         this.sendParams().addUint8(0).addUint8Array(localHash).done();
                //     }
                //     else if (authPacket.command == IIPAuthPacketCommand.Action) {
                //         if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {

                //             var remoteHash = SHA256.compute(BL().addUint8Array(this.remoteNonce)
                //                 .addUint8Array(this.localNonce)
                //                 .addUint8Array(this.localPasswordOrToken).toDC());


                //             if (remoteHash.sequenceEqual(authPacket.hash)) {
                //                 // send establish request
                //                 this.sendParams().addUint8(0x20).addUint16(0).done();
                //             }
                //             else {
                //                 this.sendParams().addUint8(0xc0)
                //                     .addUint32(ExceptionCode.ChallengeFailed)
                //                     .addUint16(16)
                //                     .addString("Challenge Failed")
                //                     .done();
                //             }
                //         }
                //         else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished) {
                //             this.session.id = authPacket.sessionId;
                //             this.ready = true;
                //             this.openReply.trigger(this);
                //             this.openReply = null;

                //             //this._emit("ready", this);
                //         }
                //     }
                //     else if (authPacket.command == IIPAuthPacketCommand.Error) {
                //         this.openReply.triggerError(1, authPacket.errorCode, authPacket.errorMessage);
                //         this.openReply = null;
                //         //this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                //         this.close();
                //     }
                // }
            }
        }

        return offset;

        //if (offset < ends)
        //    this.processPacket(msg, offset, ends, data);
    }

    // dataReceived(data) {
    //     var msg = data.read();
    //     var offset = 0;
    //     var ends = msg.length;
    //     var packet = this.packet;

    //     //console.log("Data");

    //     while (offset < ends) {
    //         offset = this.processPacket(msg, offset, ends, data);
    //     }
    // }

    
    _dataReceived(data)
    {
        var msg = data.read();
        let offset = 0;
        let ends = msg.length;

        this.socket.hold();

        try
        {
            while (offset < ends)
            {
                offset = this._processPacket(msg, offset, ends, data);
            }
        }
        catch (ex)
        {
            console.log(ex);
        }

        this.socket?.unhold();
    }

    close(event) {
        try {
            this.socket.close();
        }
        catch {

        }
    }

    async reconnect() {
        try {
            if (await this.connect()) {
                try {
                    var bag = new AsyncBag();

                    for (var i = 0; i < this.resources.keys.length; i++) {
                        var index = this.resources.keys[i];
                        bag.add(this.fetch(index, null));
                    }

                    bag.seal();
                    await bag;
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
        catch (ex) {
            return false;
        }

        return true;
    }

    hold() {
        this.holdSending = true;
    }

    unhold() {
        if (this.holdSending) {
            this.holdSending = false;

            var msg = this.sendBuffer.read();

            if (msg == null || msg.length == 0)
                return;

            this.socket.sendAll(msg);
        }
    }

    trigger(trigger) {

        if (trigger == ResourceTrigger.Open) {
            if (this.server != null)
                return new AsyncReply(true);

            var { domain = null,
                secure = false,
                username = null,
                password = null,
                checkInterval = 30,
                connectionTimeout = 600,
                revivingTime = 120,
                tokenIndex = 0,
                token = null,
                debug = false } = this.instance.attributes.toObject();


            this.debug = debug;
            this.checkInterval = checkInterval * 1000; // check every 30 seconds
            this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
            this.revivingTime = revivingTime * 1000; // 2 minutes

            
            var host = this.instance.name.split(':');
            
            var address = host[0];
            var port = host.length > 1 ? parseInt(host[1]) : 10518;

            if (username != null 
                && password != null)
            {
                var pw = DC.stringToBytes(password);
                return this.connect(AuthenticationMethod.Credentials, null, address, port, username, null, pw, domain, secure);
            }
            else if (token != null)
            {
                var tk = token instanceof Uint8Array ? token : DC.stringToBytes(token);
                return this.connect(AuthenticationMethod.Token, null, address, port, null, tokenIndex, tk, domain, secure);
            }
            else
            {
                return this.connect(AuthenticationMethod.None, null, address, port, null, 0, null, domain, secure);
            }
        }

        return new AsyncReply(true);
    }


    connect(method = AuthenticationMethod.Certificate, socket = null, hostname = null, port = 0, 
        username = null, tokenIndex = 0, passwordOrToken = null, domain = null, secure = false)
    {
        
        if (this.openReply != null)
            throw new AsyncException(ErrorType.Exception, 0, "Connection in progress");

        this.openReply = new AsyncReply();

        if (hostname != null)
        {
            this.session = new Session(new ClientAuthentication()
                                        , new HostAuthentication());

            this.session.localAuthentication.method = method;
            this.session.localAuthentication.tokenIndex = tokenIndex;
            this.session.localAuthentication.domain = domain;
            this.session.localAuthentication.username = username;
            this.localPasswordOrToken = passwordOrToken;
        }

        if (this.session == null)
            throw new AsyncException(ErrorType.Exception, 0, "Session not initialized");

        if (socket == null)
            socket = new WSocket();// TCPSocket();

        if (port > 0)
            this._port = port;

        if (hostname != null)
            this._hostname = hostname;

        if (secure != null)
            this._secure = secure;

        let self = this;

        socket.connect(this._hostname, this._port, this._secure).then(x =>
        {
            self.assign(socket);
        }).error((x) =>
        {
            self.openReply?.triggerError(x);
            self.openReply = null;
        });

        return this.openReply;

    // //connect(secure, method, hostname, port, username, tokenIndex, passwordOrToken, domain) {
    //     this.openReply = new AsyncReply();


    //     if (secure !== undefined) {

    //         this.session.localAuthentication.method = method;
    //         this.session.localAuthentication.tokenIndex = tokenIndex;
        
    //         this.session.localAuthentication.domain = domain;
    //         this.session.localAuthentication.username = username;
    //         this.localPasswordOrToken = passwordOrToken;

    //         //this.url = `ws${secure ? 's' : ''}://${this.instance.name}`;
    //         this.url = `ws${secure ? 's' : ''}://${hostname}:${port}`;

    //         let socket = new WebSocket(this.url, "iip");
    //         socket.binaryType = "arraybuffer";
    //         socket.connection = this;

    //         this.assign(socket);

    //         return this.openReply;
    //     }
    }


    _declare() {
        // declare (Credentials -> No Auth, No Enctypt)
        var dmn = DC.stringToBytes(this.session.localAuthentication.domain);

        if (this.session.localAuthentication.method == AuthenticationMethod.Credentials) {
            var un = DC.stringToBytes(this.session.localAuthentication.username);

            this.sendParams()
                .addUint8(0x60)
                .addUint8(dmn.length)
                .addUint8Array(dmn)
                .addUint8Array(this.localNonce)
                .addUint8(un.length)
                .addUint8Array(un)
                .done();
        } 
        else if (this.session.localAuthentication.method == AuthenticationMethod.Token) {                
            this.sendParams()
                .addUint8(0x70)
                .addUint8(dmn.length)
                .addUint8Array(dmn)
                .addUint8Array(this.localNonce)
                .addUint64(this.session.localAuthentication.tokenIndex)
                .done();
        } 
        else if (this.session.localAuthentication.method == AuthenticationMethod.None) {
            
            this.sendParams()
                .addUint8(0x40)
                .addUint8(dmn.length)
                .addUint8Array(dmn)
                .done();
        }        
    }

    assign(socket)
    {
        this.socket = socket;
        socket.receiver = this;

        // this.session.remoteAuthentication.source.attributes[SourceAttributeType.IPv4] = socket.RemoteEndPoint.Address;
        // this.session.remoteAuthentication.source.attributes[SourceAttributeType.Port] = socket.RemoteEndPoint.Port;
        // this.session.localAuthentication.source.attributes[SourceAttributeType.IPv4] = socket.LocalEndPoint.Address;
        // this.session.localAuthentication.source.attributes[SourceAttributeType.Port] = socket.LocalEndPoint.Port;

        if (socket.state == SocketState.Established &&
            this.session.localAuthentication.type == AuthenticationType.Client)
            this._declare();
    }



    _unsubscribeAll()
    {
        for (let resource of this.subscriptions.keys()) {

            resource.instance.off("EventOccurred", this.#_instance_eventOccurred, this);
            resource.instance.off("PropertyModified", this.#_instance_propertyModified, this);
            resource.instance.off("ResourceDestroyed", this.#_instance_resourceDestroyed, this);    
        }
        
        this.subscriptions.clear();
    }

    destroy(){
        this._unsubscribeAll();
        super.destroy();
    }

    networkClose(socket)
    {
        this.readyToEstablish = false;

        try
        {
            this.requests.values.forEach((x) => x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed")));
            this.resourceRequests.values.forEach((x) => x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed")));
            this.templateRequests.values.forEach((x) => x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed")));
        }
        catch(ex)
        {
            // unhandled error
        }

        this.requests.clear();
        this.resourceRequests.clear();
        this.templateRequests.clear();

        this.resources.values.forEach((x) => x._suspend());

        this._unsubscribeAll();

        Warehouse.remove(this);

        if (this.ready)
            this.server?.membership.logout(this.session);

        this.ready = false;

        this._emit("close", this);
    }

    networkConnect(socket)
    {
        if (this.session.localAuthentication.Type == AuthenticationType.Client)
            this._declare();
        
        this._emit("connect", this);
    }

    networkReceive(sender, buffer)
    {
        try
        {
            // Unassigned ?
            if (this.socket == null)
                return;

            // Closed ?
            if (this.socket.state == SocketState.Closed)
                return;

            //this.lastAction = DateTime.Now;

            if (!this.processing)
            {
                this.processing = true;

                try
                {
                    while (buffer.available > 0 && !buffer.protected)
                    {
                        //console.log("RX", buffer.length );
                        this._dataReceived(buffer);
                    }
                }
                catch
                {

                }

                this.processing = false;
            }

        }
        catch (ex)
        {
            console.log(ex);
            //Global.Log("NetworkConnection", LogType.Warning, ex.ToString());
        }
    }

    reconnect() {

    }

    put(resource) {
        this.resources.add(parseInt(resource.instance.name), resource);
        return new AsyncReply(true);
    }

    remove(resource) {
        // nothing to do (IStore interface)
    }

    // Protocol Implementation
    sendRequest(action) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.requests.set(this.callbackCounter, reply);
        return this.sendParams(reply).addUint8(0x40 | action).addUint32(this.callbackCounter);
    }

    sendDetachRequest(instanceId)
    {
        try
        {
          return this.sendRequest(IIPPacketAction.DetachResource).addUint32(instanceId).done();
        }
        catch(ex)
        {
          return null;
        }
    }
    
    sendInvoke(instanceId, index, parameters) {
        var reply = new AsyncReply();

        var pb = Codec.compose(parameters, this);

        let callbackId = ++this.callbackCounter;
        this.sendParams()
            .addUint8(0x40 | IIPPacketAction.InvokeFunction)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .addUint8Array(pb)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }


    sendError(type, callbackId, errorCode, errorMessage = "") {
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

    sendProgress(callbackId, value, max) {
        this.sendParams()
            .addUint8(0xC0 | IIPPacketReport.ProgressReport)
            .addUint32(callbackId)
            .addInt32(value)
            .addInt32(max)
            .done();
    }

    sendChunk(callbackId, chunk) {
        var c = Codec.compose(chunk, this);
        this.sendParams()
            .addUint8(0xC0 | IIPPacketReport.ChunkStream)
            .addUint32(callbackId)
            .addUint8Array(c)
            .done();
    }

    IIPReply(callbackId) {

        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.requests.item(callbackId);
        this.requests.remove(callbackId);
        req.trigger(results);
    }

    IIPReplyInvoke(callbackId, dataType, data) {
        
        var req = this.requests.item(callbackId);

        if (req != null) {

            this.requests.remove(callbackId);

            Codec.parse(data, 0, this, null, dataType).reply.then(function (rt) {
                req.trigger(rt);
            });
        }
    }

    IIPReportError(callbackId, errorType, errorCode, errorMessage) {
        var req = this.requests.item(callbackId);
        if (req != null)
        {
            this.requests.remove(callbackId);
            req.triggerError(errorType, errorCode, errorMessage);
        }
    }

    IIPReportProgress(callbackId, type, value, max) {
        var req = this.requests.item(callbackId);
        if (req != null)
            req.triggerProgress(type, value, max);
    }

    IIPReportChunk(callbackId, dataType, data) {
        var req = this.requests.item(callbackId);
        if (req != null) {
            Codec.parse(data, 0, this, null, dataType).reply.then(function (x) {
                req.triggerChunk(x);
            });
        }
    }

    IIPEventResourceReassigned(resourceId, newResourceId) {

    }

    IIPEventResourceDestroyed(resourceId) {
        if (this.resources.item(resourceId)) {
            var r = this.resources.item(resourceId);
            this.resources.remove(resourceId);
            r.destroy();
        }
    }

    IIPEventPropertyUpdated(resourceId, index, dataType, data) {

        let self = this;

        this.fetch(resourceId, null).then(function (r) {

            let pt = r.instance.template.getPropertyTemplateByIndex(index);

            if (pt == null)
                return;  // ft found, fi not found, this should never happen

            // push to the queue to gaurantee serialization
            let item = new AsyncReply();
            self.queue.add(item);

            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
            }).error(function (ex) {
                self.queue.remove(item);
                console.log("Esiur Property Error", ex);
            });
        });
    }


    IIPEventEventOccurred(resourceId, index, dataType, data) {
        var self = this;

        this.fetch(resourceId, null).then(function (r) {
            let et = r.instance.template.getEventTemplateByIndex(index);

            if (et == null)
                return;  // ft found, fi not found, this should never happen

            // push to the queue to guarantee serialization
            var item = new AsyncReply();
            self.queue.add(item);

           // Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));

            }).error(function (ex) {
                self.queue.remove(item);
                console.log("Esiur Event Error", ex);
            });
        });
    }

    IIPEventChildAdded(resourceId, childId) {
        var self = this;

        this.fetch(resourceId, null).then(function (parent) {
            self.fetch(childId, null).then(function (child) {
                parent.instance.children.add(child);
            });
        });
    }

    IIPEventChildRemoved(resourceId, childId) {
        var self = this;

        this.fetch(resourceId, null).then(function (parent) {
            self.fetch(childId, null).then(function (child) {
                parent.instance.children.remove(child);
            });
        });
    }

    IIPEventRenamed(resourceId, name) {
        this.fetch(resourceId, null).then(function (resource) {
            resource.instance.attributes.set("name",  name);
        });
    }


    IIPEventAttributesUpdated(resourceId, attributes) {
        var self = this;

        this.fetch(resourceId, null).then(function (resource) {
            var attrs = attributes.getStringArray(0, attributes.length);

            self.getAttributes(resource, attrs).then(function (s) {
                resource.instance.setAttributes(s);
            });
        });
    }

    sendReply(action, callbackId) {
        return this.sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }

    sendEvent(evt) {
        return this.sendParams().addUint8(evt);
    }

    sendListenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.callbackCounter;

        this.sendParams()
            .addUint8(0x40 | IIPPacketAction.Listen)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }

    sendUnlistenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.callbackCounter;
        
        this.sendParams()
            .addUint8(0x40 | IIPPacketAction.Unlisten)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }

    IIPRequestAttachResource(callback, resourceId) {

        //var sl = this.sendParams();
        var self = this;


        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {


                if (r.instance.applicable(self.session, ActionType.Attach, null) == Ruling.Denied) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AttachDenied);
                    return;
                }

                self._unsubscribe(r);

                // reply ok
                var link = DC.stringToBytes(r.instance.link);

                if (r instanceof DistributedResource)
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.compose(r._serialize(), self))
                        .done();
                else
                    self.sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.compose(r.instance.serialize(), self))
                        .done();

        
                self._subscribe(r);
            }
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    _subscribe(resource)
    {
        resource.instance.on("EventOccurred", this.#_instance_eventOccurred, this);
        resource.instance.on("PropertyModified", this.#_instance_propertyModified, this);
        resource.instance.on("ResourceDestroyed", this.#_instance_resourceDestroyed, this);

        this.subscriptions.set(resource, []);
    }

    _unsubscribe(resource)
    {
        resource.instance.off("EventOccurred", this.#_instance_eventOccurred, this);
        resource.instance.off("PropertyModified", this.#_instance_propertyModified, this);
        resource.instance.off("ResourceDestroyed", this.#_instance_resourceDestroyed, this);

        this.subscriptions.delete(resource);
    }


    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {

                self._unsubscribe(r);
                self._subscribe(r);
                
                // reply ok
                self.sendReply(IIPPacketAction.ReattachResource, callback)
                    .addUint64(r.instance.age)
                    .addUint8Array(Codec.compose(r.instance.serialize(), self))
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

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                self._unsubscribe(r);
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
        Warehouse.getById(storeId).then(function (store) {
            if (store == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.StoreNotFound);
                return;
            }

            if (!(store instanceof IStore)) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceIsNotStore);
                return;
            }

            // check security
            if (store.instance.applicable(self.session, ActionType.CreateResource, null) != Ruling.Allowed) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.CreateDenied);
                return;
            }

            Warehouse.getById(parentId).then(function (parent) {

                // check security

                if (parent != null)
                    if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed) {
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

                if (type == null) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ClassNotFound);
                    return;
                }

                DataDeserializer.listParser(content, offset, cl, self, null).then(function (parameters) {
                    offset += cl;
                    cl = content.getUint32(offset);
                    DataDeserializer.typedMapParser(content, offset, cl, self, null).then(function (attributes) {
                        offset += cl;
                        cl = content.length - offset;

                        DataDeserializer.typedMapParser(content, offset, cl, self, null).then(function (values) {


                            var resource = new (Function.prototype.bind.apply(type, values));

                            Warehouse.put(name, resource, store, parent).then(function(ok){
                                self.sendReply(IIPPacketAction.CreateResource, callback)
                                .addUint32(resource.Instance.Id)
                                .done();
                            }).error(function(ex){
                                // send some error
                                self.sendError(ErrorType.Management, callback, ExceptionCode.AddToStoreFailed);
                            });
                        });
                    });
                });
            });
        });
    }

    IIPRequestDeleteResource(callback, resourceId) {
        var self = this;
        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(session, ActionType.Delete, null) != Ruling.Allowed) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteDenied);
                return;
            }

            if (Warehouse.remove(r))
                self.sendReply(IIPPacketAction.DeleteResource, callback).done();
            else
                self.sendError(ErrorType.Management, callback, ExceptionCode.DeleteFailed);
        });
    }

    IIPRequestLinkTemplates(callback, resourceLink)
    {
        var queryCallback = (r) =>
        {
            if (r == null)
                this.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = r.filter(x => x.instance.applicable(this.session, ActionType.ViewTemplate, null) != Ruling.Denied);

                if (list.length == 0)
                    this.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                else
                {
                    // get all templates related to this resource

                    var msg = new BinaryList();

                    var templates = [];
                    for (var i = 0; i < list.length; i++)
                        templates = templates
                                    .concat(TypeTemplate.getDependencies(list[i].instance.template)
                                    .filter(x => !templates.includes(x)));

                    for(var i = 0; i < templates.length; i++) {
                        msg.addInt32(templates[i].content.length)
                            .addUint8Array(templates[i].content);
                    }

                    // send
                    this.sendReply(IIPPacketAction.LinkTemplates, callback)
                        .addDC(TransmissionType.compose(TransmissionTypeIdentifier.RawData, msg))
                        .done();
                }
            }
        };

        if (this.server?.entryPoint != null)
            this.server.entryPoint.query(resourceLink, this).then(queryCallback);
        else
            Warehouse.query(resourceLink).then(queryCallback);
    }

    IIPRequestTemplateFromClassName(callback, className) {

        var self = this;

        var t = Warehouse.getTemplateByClassName(className);
        if (t != null) {
            self.sendReply(IIPPacketAction.TemplateFromClassName, callback)
                .addUint32(t.content.length)
                .addUint8Array(t.content)
                .done();
        } else {
            // reply failed
            self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var self = this;
        var t = Warehouse.getTemplateByClassId(classId);

        if (t != null)
            self.sendReply(IIPPacketAction.TemplateFromClassId, callback)
                .addDC(TransmissionType.compose(
                    TransmissionTypeIdentifier.RawData, t.content))
                .done();
        else {
            // reply failed
            self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {

        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null)
                self.sendReply(IIPPacketAction.TemplateFromResourceId, callback)
                    .addDC(TransmissionType.compose(
                        TransmissionTypeIdentifier.RawData, r.instance.template.content))
                    .done();
            else {
                // reply failed
                self.sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestInvokeFunction(callback, resourceId, index, dataType, data) {

        let self = this;
        
        Warehouse.getById(resourceId).then(function (r) {
            
            if (r == null) {
                this.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }
            
            let ft = r.instance.template.getFunctionTemplateByIndex(index);

            if (ft == null)
            {
                // no function at this index
                this.sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                return;
            }

            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                if (r instanceof DistributedResource) {
                    var rt = r._invoke(index, args);
                    if (rt != null) {
                        rt.then(function (res) {
                            self.sendReply(IIPPacketAction.InvokeFunction, callback)
                                .addUint8Array(Codec.compose(res, self))
                                .done();
                        });
                    }
                    else {
                        // function not found on a distributed object
                        this.sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }
                }
                else 
                {
                    var fi = r[ft.name];

                    if (!(fi instanceof Function)) {
                        // ft found, fi not found, this should never happen
                        this.sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }

                    if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied) {
                        self.sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                        return;
                    }

                    let indexedArgs = [];

                    for(let i = 0; i < ft.args.length; i++)
                        indexedArgs.push(args.get(i));
                    
                    indexedArgs.push(self);

                    let rt;
                        
                    try
                    {
                        rt = fi.apply(r, indexedArgs);
                    }
                    catch(ex)
                    {
                        self.sendError(ErrorType.Exception, callback, 0, ex.toString());
                        return;
                    }

                    // Is iterator ?
                    if (rt != null && rt[Symbol.iterator] instanceof Function) {
                        for (let v of rt)
                            self.sendChunk(callback, v);

                        self.sendReply(IIPPacketAction.InvokeFunction, callback)
                            .addUint8(DataType.Void)
                            .done();
                    }
                    else if (rt instanceof AsyncReply) {
                        rt.then(function (res) {
                            self.sendReply(IIPPacketAction.InvokeFunction, callback)
                                .addUint8Array(Codec.compose(res, self))
                                .done();
                        }).error(ex => {
                            self.sendError(ErrorType.Exception, callback, ex.code, ex.message);
                        }).progress((pt, pv, pm) =>
                        {
                            self.sendProgress(callback, pv, pm);
                        }).chunk(v =>
                        {
                            self.sendChunk(callback, v);
                        });
                    }
                    else if (rt instanceof Promise)
                    {
                        rt.then(function (res) {
                            self.sendReply(IIPPacketAction.InvokeFunction, callback)
                                .addUint8Array(Codec.compose(res, self))
                                .done();
                        }).catch(ex => {
                            self.sendError(ErrorType.Exception, callback, 0, ex.toString());
                        });
                    }
                    else {
                        self.sendReply(IIPPacketAction.InvokeFunction, callback)
                            .addUint8Array(Codec.compose(rt, self))
                            .done();
                    }
                    
                }
            });
        });
    }


    // IIPRequestGetProperty(callback, resourceId, index) {

    //     var self = this;

    //     Warehouse.getById(resourceId).then(function (r) {
    //         if (r != null) {
    //             var pt = r.instance.template.getFunctionTemplateByIndex(index);
    //             if (pt != null) {
    //                 if (r instanceof DistributedResource) {
    //                     self.sendReply(IIPPacketAction.GetProperty, callback)
    //                         .addUint8Array(Codec.compose(r._get(pt.index), self))
    //                         .done();
    //                 }
    //                 else {
    //                     var pv = r[pt.name];
    //                     self.sendReply(IIPPacketAction.GetProperty)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //             }
    //             else {
    //                 // pt not found
    //             }
    //         }
    //         else {
    //             // resource not found
    //         }
    //     });
    // }

    // IIPRequestGetPropertyIfModifiedSince(callback, resourceId, index, age) {

    //     var self = this;

    //     Warehouse.getById(resourceId).then(function (r) {
    //         if (r != null) {
    //             var pt = r.instance.template.getFunctionTemplateByIndex(index);
    //             if (pt != null) {
    //                 if (r.instance.getAge(index) > age) {
    //                     var pv = r[pt.name];
    //                     self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //                 else {
    //                     self.sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8(DataType.NotModified)
    //                         .done();
    //                 }
    //             }
    //             else {
    //                 // pt not found
    //             }
    //         }
    //         else {
    //             // resource not found
    //         }
    //     });
    // }

    IIPRequestListen(callback, resourceId, index)
    {
        let self = this;

        Warehouse.getById(resourceId).then((r) =>
        {
            if (r != null)
            {
                var et = r.instance.template.getEventTemplateByIndex(index);

                if (et != null)
                {
                    if (r instanceof DistributedResource)
                    {
                        r.listen(et).then(x =>
                       {
                           self.sendReply(IIPPacketAction.Listen, callback).done();
                       }).error(x => self.sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.subscriptions.has(r))
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (self.subscriptions.get(r).includes(index))
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.AlreadyListened);
                            return;
                        }

                        self.subscriptions.get(r).push(index);

                        self.sendReply(IIPPacketAction.Listen, callback).done();
                    }
                }
                else
                {
                    // pt not found
                    self.sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestUnlisten(callback, resourceId, index)
    {
        let self = this;

        Warehouse.getById(resourceId).then((r) =>
        {
            if (r != null)
            {
                var et = r.instance.template.getEventTemplateByIndex(index);

                if (et != null)
                {
                    if (r instanceof DistributedResource)
                    {
                        r.unlisten(et).then(x =>
                        {
                            self.sendReply(IIPPacketAction.Unlisten, callback).done();
                        }).error(x => self.sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.subscriptions.has(r))
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (!self.subscriptions.get(r).includes(index))
                        {
                            self.sendError(ErrorType.Management, callback, ExceptionCode.AlreadyUnlistened);
                            return;
                        }

                        let ar = self.subscriptions.get(r);
                        let i = ar.indexOf(index);
                        ar.splice(i, 1);
                        
                        self.sendReply(IIPPacketAction.Unlisten, callback).done();             
                    }
                }
                else
                {
                    // pt not found
                    self.sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestSetProperty(callback, resourceId, index, dataType, data) {

        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {


                var pt = r.instance.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    Codec.parse(data, 0, self, null, dataType).reply.then(function (value) {
                        if (r instanceof DistributedResource) {
                            // propagation
                            r._set(index, value).then(function (x) {
                                self.sendReply(IIPPacketAction.SetProperty, callback)
                                    .done();
                            }).error(function (x) {
                                self.sendError(x.type, callback, x.code, x.message)
                                    .done();
                            });
                        }
                        else {
                            if (r.instance.applicable(self.session, ActionType.SetProperty, pt) == Ruling.Denied) {
                                self.sendError(AsyncReply.ErrorType.Exception, callback, ExceptionCode.SetPropertyDenied);
                                return;
                            }

                            try {
                                if (r[pt.name] instanceof DistributedPropertyContext)
                                    value = new DistributedPropertyContext(this, value);

                                r[pt.name] = value;
                                self.sendReply(IIPPacketAction.SetProperty, callback).done();
                            }
                            catch (ex) {
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

    IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate) {
        var self = this;
        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                r.instance.store.getRecord(r, fromDate, toDate).then(function (results) {
                    var history = Codec.composeHistory(results, self, true);
                    self.sendReply(IIPPacketAction.ResourceHistory, callback)
                        .addUint8Array(history)
                        .done();
                });
            }
        });
    }

    IIPRequestQueryResources(callback, resourceLink) {
        var self = this;

        let queryCallback = function (resources) {

            if (resources == null)
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = resources.filter(function (r) { return r.instance.applicable(self.session, ActionType.Attach, null) != Ruling.Denied });

                if (list.length == 0)
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                else
                    self.sendReply(IIPPacketAction.QueryLink, callback)
                        .addUint8Array(Codec.compose(list, self))
                        .done();
            }
        };

        if (this.server?.entryPoint != null)
        {
            this.server?.entryPoint.query(resourceLink, this).then(queryCallback);
        }
        else
        {
            Warehouse.query(resourceLink).then(queryCallback);
        }
    }

    create(store, parent, className, parameters, attributes, values) {
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

        this.sendRequest(IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function (args) {
            var rid = args[0];

            self.fetch(rid, null).then(function (r) {
                reply.trigger(r);
            });
        });

        return reply;
    }

    query(resourceLink) {
        var reply = new AsyncReply();
        var self = this;

        var sb = DC.stringToBytes(resourceLink);

        this.sendRequest(IIPPacketAction.QueryLink)
            .addUint16(sb.length)
            .addUint8Array(sb)
            .done()
            .then(function (ar) {

                let dataType = ar[0];
                let data = ar[1];
      
                Codec.parse(data, 0, self, null, dataType).reply.then((resources) => {
                    reply.trigger((resources))
                }
                ).error((ex) => reply.triggerError(ex));
             
            }).error(function (ex) {
                reply.triggerError(ex);
            });

        return reply;
    }

    getTemplateByClassName(className) {

        let templates = this.templates.filter({ className: className });

        if (templates.length > 0)
            return new AsyncReply(templates[0]);
        else if (this.templateByNameRequests.contains(className))
            return this.templateByNameRequests.item(className);

        var reply = new AsyncReply();
        this.templateByNameRequests.add(className, reply);

        var self = this;

        let classNameBytes = DC.stringToBytes(className);

        this.sendRequest(IIPPacketAction.TemplateFromClassName)
            .addUint8(classNameBytes.length)
            .addUint8Array(classNameBytes)
            .done()
            .then(function (rt) {
                self.templateByNameRequests.remove(className);
                self.templates.add(rt[0].classId.valueOf(), rt[0]);
                Warehouse.putTemplate(rt[0]);
                reply.trigger(rt[0]);
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

        this.query(path).then(function (ar) {
            if (ar != null && ar.length > 0)
                rt.trigger(ar[0]);
            else
                rt.trigger(null);
        }).error(function (ex) { rt.triggerError(ex); });

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

        let r = this.resources.item(iid);
        
        return new AsyncReply(r);

        //for (var r in this.resources)
        //    if (this.resources[r].instance.id == iid)
        //        return new AsyncReply(r);
        //return new AsyncReply(null);
    }

    getLinkTemplates(link)
    {
        var reply = new AsyncReply();

        var l = DC.stringToBytes(link);

        this.sendRequest(IIPPacketAction.LinkTemplates)
        .addUint16(l.length)
        .addUint8Array(l)
        .done()
        .then((rt) =>
        {

            var templates = [];
            // parse templates


            let tt = rt[0];
            let data = rt[1] ;
  
            //var offset = 0;
            for (var offset = tt.offset; offset < tt.contentLength;) {
                var cs = data.getUint32(offset);
                offset += 4;
                templates.push(TypeTemplate.parse(data, offset, cs));
                offset += cs;
            }

            reply.trigger(templates);

        }).error((ex) =>
        {
            reply.triggerError(ex);
        });

        return reply;
    }

    // Get a resource from the other end
    fetch(id, requestSequence) {

        let resource = this.resources.item(id);
        let request = this.resourceRequests.item(id);

        if (request != null) {
            if (resource != null && (requestSequence?.contains(id) ?? false))
                return new AsyncReply(resource);
            else
                return request;
        }
        else if (resource != null && !resource._p.suspended) {
            return new AsyncReply(resource);
        }

        var reply = new AsyncReply();

        this.resourceRequests.set(id, reply);

        var newSequence =
           requestSequence != null ? [...requestSequence, id] : [id];

        var self = this;

        this.sendRequest(IIPPacketAction.AttachResource)
            .addUint32(id)
            .done()
            .then(function (rt) {

                if (rt == null) {
                    reply.triggerError(new AsyncException(ErrorType.Management,
                        ExceptionCode.ResourceNotFound, "Null response"));
                    return;
                }
          
                var dr;
                let classId = rt[0];
                let template = null;

                if (resource == null)
                {
                    template = Warehouse.getTemplateByClassId(classId, TemplateType.Wrapper);
                    if (template?.definedType != null)
                        dr = new template.getDependencies(self, id, rt[1], rt[2]);
                    else
                        dr = new DistributedResource(self, id, rt[1], rt[2]);
                }
                else
                    dr = resource;

                //let dr = resource || new DistributedResource(self, id, rt[1], rt[2]);

                let transmissionType = rt[3] ;
                let content = rt[4] ;
      
                let initResource = (ok) => {
                    Codec.parse(content, 0, self, newSequence, transmissionType)
                    .reply
                    .then((ar) => {
                        var pvs = new PropertyValueArray();

                        for (var i = 0; i < ar.length; i += 3)
                            pvs.push(new PropertyValue(
                                ar[i + 2], ar[i], ar[i + 1]));

                        dr._attach(pvs);

                        self.resourceRequests.remove(id);
                        reply.trigger(dr);
                    })
                    .error((ex) => reply.triggerError(ex));        
                };

                if (template == null)
                {
                    self.getTemplate(rt[0]).then(function (tmp) {
                        // ClassId, ResourceAge, ResourceLink, Content
                        if (resource == null) {
                            Warehouse.put(id.toString(), dr, self, null, tmp).then(function(ok){
                                initResource(ok);
                            }).error(function(ex){
                                reply.triggerError(ex);
                            });
                        }
                        else
                        {
                            initResource(ok);
                        }
                    }).error(function(ex){
                        reply.triggerError(ex);
                    });
                } else {
                    if (resource == null) {
                        Warehouse.put(id.toString(), dr, this, null, template)
                          .then(initResource)
                          .error((ex) => reply.triggerError(ex));
                      } else {
                        initResource(resource);
                      }        
                }

            }).error(function(ex){
                reply.triggerError(ex);
            });

        return reply;
    }

    getRecord(resource, fromDate, toDate) {
        if (resource instanceof DistributedResource) {

            if (resource._p.connection != this)
                return new AsyncReply(null);

            var reply = new AsyncReply();

            var self = this;

            this.sendRequest(IIPPacketAction.ResourceHistory)
                .addUint32(resource._p.instanceId)
                .addDateTime(fromDate).addDateTime(toDate)
                .done()
                .then(function (rt) {
                    Codec.historyParser(rt[0], 0, rt[0].length, resource, self, null).then(function (history) {
                        reply.trigger(history);
                    });
                });

            return reply;
        }
        else
            return new AsyncReply(null);
    }

    #_instance_resourceDestroyed = function(resource) {

        this._unsubscribe(resource);
        // compose the packet
        this.sendEvent(IIPPacketEvent.ResourceDestroyed)
            .addUint32(resource.instance.id)
            .done();
    }

    #_instance_propertyModified = function(info) {

        this.sendEvent(IIPPacketEvent.PropertyUpdated)
            .addUint32(info.resource.instance?.id)
            .addUint8(info.propertyTemplate.index)
            .addUint8Array(Codec.compose(info.value, this))
            .done();
      
    }

    #_instance_eventOccurred = function(info) {
 
 
        if (info.eventTemplate.listenable)
        {
            // check the client requested listen
            if (!this.subscriptions.has(resource))
                return;

            if (!this.subscriptions.get(resource).includes(et.index))
                return;
        }

        if (info.receivers instanceof Function)
            if (!info.receivers(this.sessions))
                return;
                
        if (info.resource.instance.applicable(this.session, 
            ActionType.ReceiveEvent, info.eventTemplate, info.issuer) == Ruling.Denied)
            return;


        // compose the packet
        this.sendEvent(IIPPacketEvent.EventOccurred)
            .addUint32(info.resource.instance.id)
            .addUint8(info.eventTemplate.index)
            .addUint8Array(Codec.compose(info.value, this))
            .done();

    }



    IIPRequestAddChild(callback, parentId, childId) {
        var self = this;
        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.AddParent, null) != Ruling.Allowed) {
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

    IIPRequestRemoveChild(callback, parentId, childId) {
        var self = this;

        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.RemoveChild, null) != Ruling.Allowed) {
                    self.sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.RemoveParent, null) != Ruling.Allowed) {
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

    IIPRequestRenameResource(callback, resourceId, name) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (resource.instance.applicable(self.session, ActionType.Rename, null) != Ruling.Allowed) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.RenameDenied);
                return;
            }

            resource.instance.name = name;
            self.sendReply(IIPPacketAction.RenameResource, callback)
                .done();
        });
    }

    IIPRequestResourceChildren(callback, resourceId) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceChildren, callback)
                .addUint8Array(Codec.compose(resource.instance.children.toArray(), self))
                .done();

        });
    }

    IIPRequestResourceParents(callback, resourceId) {
        var self = this;

        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.sendReply(IIPPacketAction.ResourceParents, callback)
                .addUint8Array(Codec.compose(resource.instance.parents.toArray(), self))
                .done();
        });
    }

    IIPRequestClearAttributes(callback, resourceId, attributes, all = false) {
        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
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

    IIPRequestUpdateAttributes(callback, resourceId, attributes, clearAttributes = false) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
                self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            DataDeserializer.typedListParser(attributes, 0, attributes.length, this, null)
                .then(function (attrs) {
                if (r.instance.setAttributes(attrs, clearAttributes))
                    self.sendReply(clearAttributes ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes,
                        callback)
                        .done();
                else
                    self.sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);
            });

        });

    }



    getChildren(resource) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceChildren)
            .addUint32(resource._p.instanceId)
            .done()
            .then(function (ar) {

            let dataType = ar[0];
            let data = ar[1];

            Codec.parse(data, 0, self, null, dataType).reply.then((resources) => {
                rt.trigger(resources);
            })
            .error((ex) => rt.triggerError(ex));

        });

        return rt;
    }

    getParents(resource) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.sendRequest(IIPPacketAction.ResourceParents)
            .addUint32(resource._p.instanceId)
            .done()
            .then(function (ar) {

                let dataType = ar[0] ;
                let data = ar[1];
                Codec.parse(data, 0, self, null, dataType).reply.then((resources) => {
                  rt.trigger(resources);
                })
                  .error((ex) => rt.triggerError(ex));
      
            });

        return rt;
    }

    removeAttributes(resource, attributes = null) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();

        if (attributes == null)
            this.sendRequest(IIPPacketAction.ClearAllAttributes)
                .addUint32(resource._p.instanceId)
                .done()
                .then(function (ar) {
                    rt.trigger(true);
                }).error(function (ex) { rt.triggerError(ex); });
        else {
            var attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.ClearAttributes)
                .addUint32(resource.instance.id)
                .addUint32(attrs.length)
                .addUint8Array(attrs)
                .done()
                .then(function (ar) {
                    rt.trigger(true);
                }).error(function (ex) { rt.triggerError(ex); });
        }

        return rt;
    }

    setAttributes(resource, attributes, clearAttributes = false) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();

        this.sendRequest(clearAttributes ? IIPPacketAction.UpdateAllAttributes : IIPPacketAction.UpdateAttributes)
            .addUint32(resource._p.instanceId)
            .addUint8Array(Codec.compose(attributes, this))
            .done()
            .then(function () {
                rt.trigger(true);
            }).error(function (ex) { rt.triggerError(ex); });

        return rt;
    }

    getAttributes(resource, attributes = null) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

            let rt = new AsyncReply();
            let self = this;

        if (attributes == null) {
            this.sendRequest(IIPPacketAction.GetAllAttributes)
                .addUint32(resource._p.instanceId)
                .done()
                .then(function (ar) {

                    let dataType = ar[0];
                    let data = ar[1];
        
                    Codec.parse(data, 0, self, null, dataType).reply.then((st) => {
                      resource.instance?.setAttributes(st);
                      rt.trigger(st);
                    })
                      .error((ex) => rt.triggerError(ex));
        
                }).error(function(ex) { rt.triggerError(ex); });
        }
        else {
            let attrs = DC.stringArrayToBytes(attributes);
            this.sendRequest(IIPPacketAction.GetAttributes)
                .addUint32(resource._p.instanceId)
                .addUint32(attrs.length)
                .addUint8Array(attrs)
                .done()
                .then(function (ar) {
                    
                    
                    let dataType = ar[0] ;
                    let data = ar[1] ;
        
                    Codec.parse(data, 0, self, null, dataType).reply
                      .then((st) => {
                        resource.instance?.setAttributes(st);
        
                        rt.trigger(st);
                      })
                      .error((ex) => rt.triggerError(ex));
                }).error((ex) => rt.triggerError(ex));;
        }

        return rt;
    }

}
