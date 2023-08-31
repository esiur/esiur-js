/*
* Copyright (c) 2017-2022 Ahmed Kh. Zamil
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
import { UInt8 } from '../../Data/ExtendedTypes.js';
import ConnectionStatus from './ConnectionStatus.js';
import { Prop, TemplateDescriber } from '../../Resource/Template/TemplateDescriber.js';

export default class DistributedConnection extends IStore {


    sendAll(data) {
        this.socket.sendAll(data.buffer);
    }

    _sendParams(doneReply) {
        return new SendList(this, doneReply);
    }

    _generateNonce(length) {
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
        this._register("resumed");

        if (server != null)
        {
            this.session = new Session(new Authentication(AuthenticationType.Host), new Authentication(AuthenticationType.Client));
            this.server = server;
        }
        else
            this.session = new Session(new Authentication(AuthenticationType.Client), new Authentication(AuthenticationType.Host));

        this._packet = new IIPPacket();
        this._authPacket = new IIPAuthPacket();

        //this.resources = new KeyList();//{};

        this._neededResources = new KeyList();
        this._attachedResources = new KeyList();
        this._suspendedResources = new KeyList();


        this.templates = new KeyList();
        this.requests = new KeyList();// {};

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

        this._localNonce = this._generateNonce(32);

        this.jitter = 0;
        this.keepAliveTime = 10;
        this.keepAliveInterval = 30;
        this.reconnectInterval = 5;
        this._invalidCredentials = false;

        this.autoReconnect = false;
    }



    _processPacket(msg, offset, ends, data) {


        var authPacket = this._authPacket;

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

                            case IIPPacketAction.KeepAlive:
                                this.IIPRequestKeepAlive(packet.callbackId, packet.currentTime, packet.interval);
                                break;
    
                            case IIPPacketAction.ProcedureCall:
                                this.IIPRequestProcedureCall(packet.callbackId, packet.procedure, packet.dataType, msg);
                                break;
    
                            case IIPPacketAction.StaticCall:
                                this.IIPRequestStaticCall(packet.callbackId, packet.classId, packet.methodIndex, packet.dataType, msg);
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
                            case IIPPacketAction.StaticCall:
                            case IIPPacketAction.ProcedureCall:
                        
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

                            case IIPPacketAction.KeepAlive:
                                this.IIPReply(packet.callbackId, packet.currentTime, packet.jitter);
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
                                        this._remoteNonce = authPacket.remoteNonce;
                                        this.session.remoteAuthentication.domain = authPacket.domain;
                                        this._sendParams()
                                                    .addUint8(0xa0)
                                                    .addUint8Array(this._localNonce)
                                                    .done();
                                    }
                                    else
                                    {
                                        this._sendParams().addUint8(0xc0)
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

                                this._sendParams()
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
                                        this._remoteNonce = authPacket.remoteNonce;
                                        this.session.remoteAuthentication.domain = authPacket.domain;
                                        this._sendParams()
                                                    .addUint8(0xa0)
                                                    .addUint8Array(this._localNonce)
                                                    .done();
                                    }
                                    else
                                    {
                                        //Console.WriteLine("User not found");
                                        this._sendParams()
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

                                this._sendParams()
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
                                    this._sendParams()
                                                .addUint8(0x80)
                                                .done();
                                }
                                else
                                {
                                    this._sendParams()
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

                                this._sendParams()
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
                                                                                .addUint8Array(this._remoteNonce)
                                                                                .addUint8Array(this._localNonce)
                                                                                .toArray());
                                        if (hash.sequenceEqual(remoteHash))
                                        {
                                            // send our hash
                                            var localHash = SHA256.compute(BL()
                                                                    .addUint8Array(this._localNonce)
                                                                    .addUint8Array(this._remoteNonce)
                                                                    .addUint8Array(pw)
                                                                    .toArray());
                                            
                                            this._sendParams()
                                                .addUint8(0)
                                                .addUint8Array(localHash)
                                                .done();

                                            this.readyToEstablish = true;
                                        }
                                        else
                                        {
                                            
                                            this._sendParams()
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

                                this._sendParams()
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
                                this.session.Id = this._generateNonce(32);
                                
                                this._sendParams()
                                                .addUint8(0x28)
                                                .addUint8Array(this.session.Id)
                                                .done();

                                if (this.instance == null)
                                {
                                    Warehouse.put(authPacket.remoteUsername.replaceAll("/", "_"), this, null, this.server).then(x =>
                                    {
    
                                        this.ready = true;
                                        this.status = ConnectionStatus.Connected;

                                        this._openReply?.trigger(true);
                                        this._openReply = null;
                                        
                                        this._emit("ready", this);
                                        this.server?.membership.login(this.session);

                                    }).error( x=>
                                    {
                                        this._openReply?.triggerError(x);
                                        this._openReply = null;
                                    });
                                }
                                else
                                {
                                    this.ready = true;
                                    this.status = ConnectionStatus.Connected;

                                    this._openReply?.trigger(true);
                                    this._openReply = null;

                                    this._emit("ready", this);
                                    this.server?.membership.login(this.session);
                                }
                            }
                            else
                            {
                                this._sendParams()
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
                            this._sendParams()
                                        .addUint8(0x20)
                                        .addUint16(0)
                                        .done();
                        }
                        else if (authPacket.remoteMethod == AuthenticationMethod.Credentials
                                || authPacket.remoteMethod == AuthenticationMethod.Token)
                        {

                            this._remoteNonce = authPacket.remoteNonce;

                            // send our hash
                            var localHash = SHA256.compute(BL()
                                                                .addUint8Array(this._localPasswordOrToken)
                                                                .addUint8Array(this._localNonce)
                                                                .addUint8Array(this._remoteNonce)
                                                                .toArray());

                            this._sendParams()
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
                                                                    .addUint8Array(this._remoteNonce)
                                                                    .addUint8Array(this._localNonce)
                                                                    .addUint8Array(this._localPasswordOrToken)
                                                                    .toArray());


                            if (remoteHash.sequenceEqual(authPacket.hash))
                            {
                                // send establish request
                                //SendParams((byte)0x20, (ushort)0);
                                this._sendParams()
                                            .addUint8(0x20)
                                            .addUint16(0)
                                            .done();
                            }
                            else
                            {
                                this._sendParams()
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
                            this.status = ConnectionStatus.Connected;

                            
                            // put it in the warehouse
                            if (this.instance == null)
                            {
                                Warehouse.put(this.localUsername.replaceAll("/", "_"), this, null, this.server).then(x =>
                                {
                                    this._openReply?.trigger(true);
                                    this._openReply = null;
                                    this._emit("ready", this);
                                }).error( x=> { 
                                    this._openReply?.triggerError(x);
                                    this._openReply = null;
                                });
                            }
                            else
                            {
                                this._openReply?.trigger(true);
                                this._openReply = null;
                                this._emit("ready", this);
                            }

                            // start perodic keep alive timer
                            this._keepAliveTimer = setTimeout(() => this._keepAliveTimerElapsed(), this.keepAliveInterval * 1000);
                        }
                    }
                    else if (authPacket.command == IIPAuthPacketCommand.Error)
                    {
                        this._invalidCredentials = true;
                        this._openReply?.triggerError(new AsyncException(ErrorType.Management, authPacket.errorCode, authPacket.errorMessage));
                        this._openReply = null;

                        this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                        this.close();
                    }
                }
            }
        }

        return offset;

    }
    
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

        console.log("Reconnecting...");

        try {
            if (!await this.connect()) 
                return false;

            try {
    
                let toBeRestored = [];
                for(var i = 0 ; i < this._suspendedResources.length; i++)
                {
                    var r = this._suspendedResources.values[i].deref();
                    if (r != null)
                        toBeRestored.push(r);
                }

                for(let r of toBeRestored)
                {
                    let link = DC.stringToBytes(r._p.link);
                    console.log("Restoring " + r._p.link);

                    try
                    {
                        var ar = await this._sendRequest(IIPPacketAction.QueryLink)
                                            .addUint16(link.length)
                                            .addUint8Array(link)
                                            .done();

                        var dataType = ar[0];
                        var data = ar[1];

                        if (dataType.identifier == TransmissionTypeIdentifier.ResourceList
                        || dataType.identifier == TransmissionTypeIdentifier.List)
                        {
                            // remove from suspended.
                            this._suspendedResources.remove(r._p.instanceId);

                            // parse them as int
                            var id = data.getUint32(8);

                            // id changed ?
                            if (id != r._p.instanceId)
                                r._p.instanceId = id;

                            this._neededResources.set(id, r);

                            await this.fetch(id, null);

                            console.log("Restored " + id);
                        } 
                    }
                    catch (ex)
                    {
                        if (ex.code == ExceptionCode.ResourceNotFound)
                        {
                            // skip this resource
                        }
                        else
                        {
                            break;
                        }
                    }
                }
            }
            catch (ex) {
                console.log(ex);
            }
        }
        catch (ex) {
            return false;
        }

        this._emit("resumed", this);

        return true;
    }

    // hold() {
    //     this.holdSending = true;
    // }

    // unhold() {
    //     if (this.holdSending) {
    //         this.holdSending = false;

    //         var msg = this.sendBuffer.read();

    //         if (msg == null || msg.length == 0)
    //             return;

    //         this.socket.sendAll(msg);
    //     }
    // }

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
                debug = false,
                autoReconnect = false,
                keepAliveInterval = 30,
                keepAliveTime = 10,
                reconnectInterval = 5} = this.instance.attributes.toObject();


            this.debug = debug;
            this.checkInterval = checkInterval * 1000; // check every 30 seconds
            this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
            this.revivingTime = revivingTime * 1000; // 2 minutes
            this.autoReconnect = autoReconnect;
            this.reconnectInterval = reconnectInterval;
            this.keepAliveInterval = keepAliveInterval;
            this.keepAliveTime = keepAliveTime;

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
        
        if (this._openReply != null)
            throw new AsyncException(ErrorType.Exception, 0, "Connection in progress");

        this.status = ConnectionStatus.Connecting;

        this._openReply = new AsyncReply();

        if (hostname != null)
        {
            this.session = new Session(new ClientAuthentication()
                                        , new HostAuthentication());

            this.session.localAuthentication.method = method;
            this.session.localAuthentication.tokenIndex = tokenIndex;
            this.session.localAuthentication.domain = domain;
            this.session.localAuthentication.username = username;
            this._localPasswordOrToken = passwordOrToken;
            this._invalidCredentials = false;
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

        this._connectSocket(socket);

        return this._openReply;

    }

    _connectSocket(socket){
        let self = this;

        socket.connect(this._hostname, this._port, this._secure).then(x =>
            {
                self.assign(socket);
            }).error((x) =>
            {
                if (self.autoReconnect){
                    console.log("Reconnecting socket...");
                    setTimeout(() => {
                        self._connectSocket(socket);
                    }, self.reconnectInterval * 1000);
                } else {
                    self._openReply?.triggerError(x);
                    self._openReply = null;
                }
            });
    }

    _declare() {
        // declare (Credentials -> No Auth, No Enctypt)
        var dmn = DC.stringToBytes(this.session.localAuthentication.domain);

        if (this.session.localAuthentication.method == AuthenticationMethod.Credentials) {
            var un = DC.stringToBytes(this.session.localAuthentication.username);

            this._sendParams()
                .addUint8(0x60)
                .addUint8(dmn.length)
                .addUint8Array(dmn)
                .addUint8Array(this._localNonce)
                .addUint8(un.length)
                .addUint8Array(un)
                .done();
        } 
        else if (this.session.localAuthentication.method == AuthenticationMethod.Token) {                
            this._sendParams()
                .addUint8(0x70)
                .addUint8(dmn.length)
                .addUint8Array(dmn)
                .addUint8Array(this._localNonce)
                .addUint64(this.session.localAuthentication.tokenIndex)
                .done();
        } 
        else if (this.session.localAuthentication.method == AuthenticationMethod.None) {
            
            this._sendParams()
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
        // clean up
        this.ready = false;
        this.status = ConnectionStatus.Closed;

        this.readyToEstablish = false;

        clearTimeout(this._keepAliveTimer);

        try
        {
            this.requests.values.forEach((x) => {
                try { 
                    x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });

            this.resourceRequests.values.forEach((x) => {
                try { 
                    x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });

            this.templateRequests.values.forEach((x) => {
                try { 
                    x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });
        }
        catch(ex)
        {
            // unhandled error
        }

        this.requests.clear();
        this.resourceRequests.clear();
        this.templateRequests.clear();

        for (let x of this._attachedResources.values)
        {
            let r = x.deref();
            if (r != null){
                r._suspend();
                this._suspendedResources.set(r._p.instanceId, x);
            }
        }

        if (this.server != null) {

            this._suspendedResources.clear();

            this._unsubscribeAll();
            Warehouse.remove(this);

            if (this.ready)
                this.server.membership.logout(this.session);
        }
        else if (this.autoReconnect && !this._invalidCredentials){
            let self = this;
            setTimeout(() => self.reconnect(), this.reconnectInterval * 1000);
        }
        else {
            this._suspendedResources.clear();
        }

        this._attachedResources.clear();
        
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


    put(resource) {
        if (Codec.isLocalResource(resource, this))
            this._neededResources.add(resource._p.instanceId, resource);

        return new AsyncReply(true);
    }

    remove(resource) {
        // nothing to do (IStore interface)
    }

    // Protocol Implementation
    _sendRequest(action) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.requests.set(this.callbackCounter, reply);
        return this._sendParams(reply).addUint8(0x40 | action).addUint32(this.callbackCounter);
    }


    async detachResource(instanceId){
        try
        {
            if (this._attachedResources.containsKey(instanceId))
                this._attachedResources.remove(instanceId);

            if (this._suspendedResources.containsKey(instanceId))
                this._suspendedResources.remove(instanceId);

            await this._sendDetachRequest(instanceId);
        }
        catch 
        {

        }
    }

    _sendDetachRequest(instanceId)
    {
        try
        {
          return this._sendRequest(IIPPacketAction.DetachResource).addUint32(instanceId).done();
        }
        catch(ex)
        {
          return null;
        }
    }
    
    _sendInvoke(instanceId, index, parameters) {
        var reply = new AsyncReply();

        var pb = Codec.compose(parameters, this);

        let callbackId = ++this.callbackCounter;
        this._sendParams()
            .addUint8(0x40 | IIPPacketAction.InvokeFunction)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .addUint8Array(pb)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }


    _sendError(type, callbackId, errorCode, errorMessage = "") {
        var msg = DC.stringToBytes(errorMessage);
        if (type == ErrorType.Management)
            this._sendParams()
                .addUint8(0xC0 | IIPPacketReport.ManagementError)
                .addUint32(callbackId)
                .addUint16(errorCode)
                .done();
        else if (type == ErrorType.Exception)
            this._sendParams()
                .addUint8(0xC0 | IIPPacketReport.ExecutionError)
                .addUint32(callbackId)
                .addUint16(errorCode)
                .addUint16(msg.length)
                .addUint8Array(msg)
                .done();
    }

    _sendProgress(callbackId, value, max) {
        this._sendParams()
            .addUint8(0xC0 | IIPPacketReport.ProgressReport)
            .addUint32(callbackId)
            .addInt32(value)
            .addInt32(max)
            .done();
    }

    _sendChunk(callbackId, chunk) {
        var c = Codec.compose(chunk, this);
        this._sendParams()
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

        if (this._attachedResources.contains(resourceId))
        {
            let r = this._attachedResources.get(resourceId).deref();
            r?.destroy();

            this._attachedResources.remove(resourceId);
        }
        else if (this._neededResources.contains(resourceId))
        {
            // @TODO: handle this mess
            this._neededResources.remove(resourceId);
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
        let self = this;

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

    _sendReply(action, callbackId) {
        return this._sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }

    _sendEvent(evt) {
        return this._sendParams().addUint8(evt);
    }

    _sendListenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.callbackCounter;

        this._sendParams()
            .addUint8(0x40 | IIPPacketAction.Listen)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }

    _sendUnlistenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.callbackCounter;
        
        this._sendParams()
            .addUint8(0x40 | IIPPacketAction.Unlisten)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.requests.set(callbackId, reply);

        return reply;
    }

    IIPRequestAttachResource(callback, resourceId) {

        //var sl = this._sendParams();
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {


                if (r.instance.applicable(self.session, ActionType.Attach, null) == Ruling.Denied) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.AttachDenied);
                    return;
                }

                self._unsubscribe(r);

                // reply ok
                var link = DC.stringToBytes(r.instance.link);

                if (r instanceof DistributedResource)
                    self._sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.compose(r._serialize(), self))
                        .done();
                else
                    self._sendReply(IIPPacketAction.AttachResource, callback)
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
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                self._sendReply(IIPPacketAction.ReattachResource, callback)
                    .addUint64(r.instance.age)
                    .addUint8Array(Codec.compose(r.instance.serialize(), self))
                    .done();
            }
            else {
                // reply failed
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                self._unsubscribe(r);
                // reply ok
                self._sendReply(IIPPacketAction.DetachResource, callback).done();
            }
            else {
                // reply failed
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestCreateResource(callback, storeId, parentId, content) {
        var self = this;
        Warehouse.getById(storeId).then(function (store) {
            if (store == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.StoreNotFound);
                return;
            }

            if (!(store instanceof IStore)) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceIsNotStore);
                return;
            }

            // check security
            if (store.instance.applicable(self.session, ActionType.CreateResource, null) != Ruling.Allowed) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.CreateDenied);
                return;
            }

            Warehouse.getById(parentId).then(function (parent) {

                // check security

                if (parent != null)
                    if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed) {
                        self._sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
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
                    self._sendError(ErrorType.Management, callback, ExceptionCode.ClassNotFound);
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
                                self._sendReply(IIPPacketAction.CreateResource, callback)
                                .addUint32(resource.Instance.Id)
                                .done();
                            }).error(function(ex){
                                // send some error
                                self._sendError(ErrorType.Management, callback, ExceptionCode.AddToStoreFailed);
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
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(session, ActionType.Delete, null) != Ruling.Allowed) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.DeleteDenied);
                return;
            }

            if (Warehouse.remove(r))
                self._sendReply(IIPPacketAction.DeleteResource, callback).done();
            else
                self._sendError(ErrorType.Management, callback, ExceptionCode.DeleteFailed);
        });
    }

    IIPRequestLinkTemplates(callback, resourceLink)
    {
        var queryCallback = (r) =>
        {
            if (r == null)
                this._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = r.filter(x => x.instance.applicable(this.session, ActionType.ViewTemplate, null) != Ruling.Denied);

                if (list.length == 0)
                    this._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                    this._sendReply(IIPPacketAction.LinkTemplates, callback)
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
            self._sendReply(IIPPacketAction.TemplateFromClassName, callback)
                .addUint32(t.content.length)
                .addUint8Array(t.content)
                .done();
        } else {
            // reply failed
            self._sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var self = this;
        var t = Warehouse.getTemplateByClassId(classId);

        if (t != null)
            self._sendReply(IIPPacketAction.TemplateFromClassId, callback)
                .addDC(TransmissionType.compose(
                    TransmissionTypeIdentifier.RawData, t.content))
                .done();
        else {
            // reply failed
            self._sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {

        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null)
                self._sendReply(IIPPacketAction.TemplateFromResourceId, callback)
                    .addDC(TransmissionType.compose(
                        TransmissionTypeIdentifier.RawData, r.instance.template.content))
                    .done();
            else {
                // reply failed
                self._sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestProcedureCall(callback, procedureCall, transmissionType, content)
    {

        if (this.server == null)
        {
            this._sendError(ErrorType.Management, callback, ExceptionCode.GeneralFailure);
            return;
        }

        var call = this.server.calls.get(procedureCall);

        if (call == null)
        {
            this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
            return;
        }

        let parsed = Codec.parse(content, 0, this, null, transmissionType);

        parsed.Then(results =>
        {
            
            // un hold the socket to send data immediately
            this.socket.unhold();

            // @TODO: Make managers for procedure calls
            //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
            //{
            //    SendError(ErrorType.Management, callback,
            //        (ushort)ExceptionCode.InvokeDenied);
            //    return;
            //}

            this._invokeFunction(call.method, callback, results, IIPPacketAction.ProcedureCall, call.target);

        }).error(x =>
        {
            this._sendError(ErrorType.Management, callback, ExceptionCode.ParseError);
        });
    }

    IIPRequestStaticCall(callback, classId, index, transmissionType, content)
    {
        let template = Warehouse.getTemplateByClassId(classId);

        if (template == null)
        {
            this._sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            return;
        }

        let ft = template.getFunctionTemplateByIndex(index);

        if (ft == null)
        {
            // no function at this index
            this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
            return;
        }

        let parsed = Codec.parse(content, 0, this, null, transmissionType);

        parsed.then(results =>
        {
            // un hold the socket to send data immediately
            this.socket.unhold();

            var fi = ft.methodInfo;

            if (fi == null)
            {
                // ft found, fi not found, this should never happen
                this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                return;
            }

            // @TODO: Make managers for static calls
            //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
            //{
            //    SendError(ErrorType.Management, callback,
            //        (ushort)ExceptionCode.InvokeDenied);
            //    return;
            //}

            this._invokeFunction(fi, callback, results, IIPPacketAction.StaticCall, null);

        }).error(x =>
        {
            this._sendError(ErrorType.Management, callback, ExceptionCode.ParseError);
        });
    }


    IIPRequestInvokeFunction(callback, resourceId, index, dataType, data) {

        let self = this;
        
        Warehouse.getById(resourceId).then(function (r) {
            
            if (r == null) {
                this._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }
            
            let ft = r.instance.template.getFunctionTemplateByIndex(index);

            if (ft == null)
            {
                // no function at this index
                this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                return;
            }

            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                if (r instanceof DistributedResource) {
                    var rt = r._invoke(index, args);
                    if (rt != null) {
                        rt.then(function (res) {
                            self._sendReply(IIPPacketAction.InvokeFunction, callback)
                                .addUint8Array(Codec.compose(res, self))
                                .done();
                        });
                    }
                    else {
                        // function not found on a distributed object
                        this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }
                }
                else 
                {
                    var fi = r[ft.name];

                    if (!(fi instanceof Function)) {
                        // ft found, fi not found, this should never happen
                        this._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }

                    if (r.instance.applicable(self.session, ActionType.Execute, ft) == Ruling.Denied) {
                        self._sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                        return;
                    }

                    self._invokeFunction(fi, callback, args, IIPPacketAction.InvokeFunction, r);

                }
            });
        });
    }

    _invokeFunction(fi, callback, parameters, actionType, target = null)
    {

        let self = this;
        let indexedArgs = [];

        for(let [k,v] of parameters.entries())
            indexedArgs[k] = v;

        indexedArgs.push(self);

        let rt;
            
        try
        {
            rt = fi.apply(target, indexedArgs);
        }
        catch(ex)
        {
            this._sendError(ErrorType.Exception, callback, 0, ex.toString());
            return;
        }

        // Is iterator ?
        if (rt != null && rt[Symbol.iterator] instanceof Function) {
            for (let v of rt)
            this._sendChunk(callback, v);

            this._sendReply(actionType, callback)
                .addUint8(DataType.Void)
                .done();
        }
        else if (rt instanceof AsyncReply) {
            rt.then(function (res) {
                self._sendReply(actionType, callback)
                    .addUint8Array(Codec.compose(res, self))
                    .done();
            }).error(ex => {
                self._sendError(ErrorType.Exception, callback, ex.code, ex.message);
            }).progress((pt, pv, pm) =>
            {
                self._sendProgress(callback, pv, pm);
            }).chunk(v =>
            {
                self._sendChunk(callback, v);
            });
        }
        else if (rt instanceof Promise)
        {
            rt.then(function (res) {
                self._sendReply(actionType, callback)
                    .addUint8Array(Codec.compose(res, self))
                    .done();
            }).catch(ex => {
                self._sendError(ErrorType.Exception, callback, 0, ex.toString());
            });
        }
        else {
            self._sendReply(actionType, callback)
                .addUint8Array(Codec.compose(rt, self))
                .done();
        }

    }
    // IIPRequestGetProperty(callback, resourceId, index) {

    //     var self = this;

    //     Warehouse.getById(resourceId).then(function (r) {
    //         if (r != null) {
    //             var pt = r.instance.template.getFunctionTemplateByIndex(index);
    //             if (pt != null) {
    //                 if (r instanceof DistributedResource) {
    //                     self._sendReply(IIPPacketAction.GetProperty, callback)
    //                         .addUint8Array(Codec.compose(r._get(pt.index), self))
    //                         .done();
    //                 }
    //                 else {
    //                     var pv = r[pt.name];
    //                     self._sendReply(IIPPacketAction.GetProperty)
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
    //                     self._sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //                 else {
    //                     self._sendReply(IIPPacketAction.GetPropertyIfModified, callback)
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
                           self._sendReply(IIPPacketAction.Listen, callback).done();
                       }).error(x => self._sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.subscriptions.has(r))
                        {
                            self._sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (self.subscriptions.get(r).includes(index))
                        {
                            self._sendError(ErrorType.Management, callback, ExceptionCode.AlreadyListened);
                            return;
                        }

                        self.subscriptions.get(r).push(index);

                        self._sendReply(IIPPacketAction.Listen, callback).done();
                    }
                }
                else
                {
                    // pt not found
                    self._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                            self._sendReply(IIPPacketAction.Unlisten, callback).done();
                        }).error(x => self._sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.subscriptions.has(r))
                        {
                            self._sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (!self.subscriptions.get(r).includes(index))
                        {
                            self._sendError(ErrorType.Management, callback, ExceptionCode.AlreadyUnlistened);
                            return;
                        }

                        let ar = self.subscriptions.get(r);
                        let i = ar.indexOf(index);
                        ar.splice(i, 1);
                        
                        self._sendReply(IIPPacketAction.Unlisten, callback).done();             
                    }
                }
                else
                {
                    // pt not found
                    self._sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                                self._sendReply(IIPPacketAction.SetProperty, callback)
                                    .done();
                            }).error(function (x) {
                                self._sendError(x.type, callback, x.code, x.message)
                                    .done();
                            });
                        }
                        else {
                            if (r.instance.applicable(self.session, ActionType.SetProperty, pt) == Ruling.Denied) {
                                self._sendError(AsyncReply.ErrorType.Exception, callback, ExceptionCode.SetPropertyDenied);
                                return;
                            }

                            try {
                                if (r[pt.name] instanceof DistributedPropertyContext)
                                    value = new DistributedPropertyContext(this, value);

                                r[pt.name] = value;
                                self._sendReply(IIPPacketAction.SetProperty, callback).done();
                            }
                            catch (ex) {
                                self._sendError(AsyncReply.ErrorType.Exception, callback, 0, ex.toString()).done();
                            }
                        }

                    });
                }
                else {
                    // property not found
                    self._sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
                }
            }
            else {
                // resource not found
                self._sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound).done();
            }
        });
    }

    IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate) {
        var self = this;
        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                r.instance.store.getRecord(r, fromDate, toDate).then(function (results) {
                    var history = Codec.composeHistory(results, self, true);
                    self._sendReply(IIPPacketAction.ResourceHistory, callback)
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
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = resources.filter(function (r) { return r.instance.applicable(self.session, ActionType.Attach, null) != Ruling.Denied });

                if (list.length == 0)
                    self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                else
                    self._sendReply(IIPPacketAction.QueryLink, callback)
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

        this._sendRequest(IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function (args) {
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

        this._sendRequest(IIPPacketAction.QueryLink)
            .addUint16(sb.length)
            .addUint8Array(sb)
            .done()
            .then(function (ar) {

                let dataType = ar[0];
                let data = ar[1];
      
                Codec.parse(data, 0, self, null, dataType)
                .reply.then((resources) => {
                    reply.trigger((resources))
                }).error((ex) => reply.triggerError(ex));
             
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

        this._sendRequest(IIPPacketAction.TemplateFromClassName)
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

        this._sendRequest(IIPPacketAction.TemplateFromClassId)
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

        this._sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
                        .addUint16(.then(function (rt) {
            delete self.pathRequests[path];

            self.fetch(rt[1]).then(function (r) {
                reply.trigger(r);
            });
        });


        return reply;
        */
    }

    // retrieve(iid) {

    //     let r = this.resources.item(iid);
        
    //     return new AsyncReply(r);

    //     //for (var r in this.resources)
    //     //    if (this.resources[r].instance.id == iid)
    //     //        return new AsyncReply(r);
    //     //return new AsyncReply(null);
    // }

    getLinkTemplates(link)
    {
        var reply = new AsyncReply();

        var l = DC.stringToBytes(link);

        this._sendRequest(IIPPacketAction.LinkTemplates)
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

    
        let resource = this._attachedResources.item(id)?.deref();

        if (resource != null)
            return new AsyncReply(resource);

        resource = this._neededResources.item(id);

        let request = this.resourceRequests.item(id);

        if (request != null) {
            if (resource != null && (requestSequence?.includes(id) ?? false))
                return new AsyncReply(resource);
            else
                return request;
        }
        else if (resource != null && !resource._p.suspended) {

            // @REVIEW: this should never happen
            console.log("DCON", LogType.Error, "Resource not moved to attached.");
            return new AsyncReply(resource);
        }

        var reply = new AsyncReply();

        this.resourceRequests.set(id, reply);

        var newSequence =
           requestSequence != null ? [...requestSequence, id] : [id];

        var self = this;

        this._sendRequest(IIPPacketAction.AttachResource)
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
                    template = Warehouse.getTemplateByClassId(classId, TemplateType.Resource);
                    if (template?.definedType != null && template?.isWrapper)
                        dr = new template.definedType(self, id, rt[1], rt[2]);
                    else
                        dr = new DistributedResource(self, id, rt[1], rt[2]);
                }
                else {
                    dr = resource;
                    template = resource.instance.template;
                }

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
                        // move from needed to attached
                        self._neededResources.remove(id);
                        self._attachedResources.set(id, new WeakRef(dr));
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
                        Warehouse.put(id.toString(), dr, self, null, template)
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

            this._sendRequest(IIPPacketAction.ResourceHistory)
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
        this._sendEvent(IIPPacketEvent.ResourceDestroyed)
            .addUint32(resource.instance.id)
            .done();
    }

    #_instance_propertyModified = function(info) {

        this._sendEvent(IIPPacketEvent.PropertyUpdated)
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
        this._sendEvent(IIPPacketEvent.EventOccurred)
            .addUint32(info.resource.instance.id)
            .addUint8(info.eventTemplate.index)
            .addUint8Array(Codec.compose(info.value, this))
            .done();

    }



    IIPRequestAddChild(callback, parentId, childId) {
        var self = this;
        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.AddChild, null) != Ruling.Allowed) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.AddParent, null) != Ruling.Allowed) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.add(child);

                self._sendReply(IIPPacketAction.AddChild, callback)
                    .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRemoveChild(callback, parentId, childId) {
        var self = this;

        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.session, ActionType.RemoveChild, null) != Ruling.Allowed) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.session, ActionType.RemoveParent, null) != Ruling.Allowed) {
                    self._sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.remove(child);

                self._sendReply(IIPPacketAction.RemoveChild, callback)
                    .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRenameResource(callback, resourceId, name) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (resource.instance.applicable(self.session, ActionType.Rename, null) != Ruling.Allowed) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.RenameDenied);
                return;
            }

            resource.instance.name = name;
            self._sendReply(IIPPacketAction.RenameResource, callback)
                .done();
        });
    }

    IIPRequestResourceChildren(callback, resourceId) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self._sendReply(IIPPacketAction.ResourceChildren, callback)
                .addUint8Array(Codec.compose(resource.instance.children.toArray(), self))
                .done();

        });
    }

    IIPRequestResourceParents(callback, resourceId) {
        var self = this;

        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self._sendReply(IIPPacketAction.ResourceParents, callback)
                .addUint8Array(Codec.compose(resource.instance.parents.toArray(), self))
                .done();
        });
    }

    IIPRequestClearAttributes(callback, resourceId, attributes, all = false) {
        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            var attrs = [];

            if (!all)
                attrs = attributes.getStringArray(0, attributes.length);

            if (r.instance.removeAttributes(attrs))
                self._sendReply(all ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes, callback)
                    .done();
            else
                self._sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);

        });
    }

    IIPRequestUpdateAttributes(callback, resourceId, attributes, clearAttributes = false) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
                self._sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            DataDeserializer.typedListParser(attributes, 0, attributes.length, this, null)
                .then(function (attrs) {
                if (r.instance.setAttributes(attrs, clearAttributes))
                    self._sendReply(clearAttributes ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes,
                        callback)
                        .done();
                else
                    self._sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);
            });

        });

    }



    getChildren(resource) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this._sendRequest(IIPPacketAction.ResourceChildren)
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

        this._sendRequest(IIPPacketAction.ResourceParents)
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
            this._sendRequest(IIPPacketAction.ClearAllAttributes)
                .addUint32(resource._p.instanceId)
                .done()
                .then(function (ar) {
                    rt.trigger(true);
                }).error(function (ex) { rt.triggerError(ex); });
        else {
            var attrs = DC.stringArrayToBytes(attributes);
            this._sendRequest(IIPPacketAction.ClearAttributes)
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

        this._sendRequest(clearAttributes ? IIPPacketAction.UpdateAllAttributes : IIPPacketAction.UpdateAttributes)
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
            this._sendRequest(IIPPacketAction.GetAllAttributes)
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
            this._sendRequest(IIPPacketAction.GetAttributes)
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


    _keepAliveTimerElapsed()
    {
        // @TODO: port this
        // if (!this.isConnected)
        //     return;
      
        let self = this;
        let now = new Date();

        let interval = this._lastKeepAliveSent == null ? 0 :
                        (now - this._lastKeepAliveSent);

        this._lastKeepAliveSent = now;

        this._sendRequest(IIPPacketAction.KeepAlive)
                .addDateTime(now)
                .addUint32(interval)
                .done()
                .then(x =>
                {
                    self.jitter = x[1];
                    self._keepAliveTimer = setTimeout(() => self._keepAliveTimerElapsed(), self.keepAliveInterval * 1000);
                    //console.log("Keep Alive Received " + self.jitter);
                    
                    // run GC
                    let toBeRemoved =[];
                    
                    for(let i = 0; i < self._attachedResources.length; i++){
                        let r = self._attachedResources.values[i].deref();

                        if (r == null) {
                            let id = self._attachedResources.keys[i];
                            // send detach
                            self._sendDetachRequest(id);
                            toBeRemoved.push(id);
                        }
                    }

                    if (toBeRemoved.length > 0)
                        console.log("GC: " + toBeRemoved.length);
                        
                    for(let id of toBeRemoved)
                        self._attachedResources.remove(id);

                }).error((ex) =>
                {
                    console.log(ex);
                    self.close();
                }).timeout(self.keepAliveTime * 1000);

        //console.log("Keep alive sent ");

    }


    staticCall(classId, index, parameters)
    {
        var pb = Codec.compose(parameters, this); 

        var reply = new AsyncReply();
        var c = this.callbackCounter++;
        this.requests.add(c, reply);


        this._sendParams()
            .addUint8(0x40 | IIPPacketAction.StaticCall)
            .addUint32(c)
            .addGuid(classId)
            .addUint8(index)
            .addUint8Array(pb)
            .done();

        return reply;
    }

    call(procedureCall)
    {
        var args = Map.from(UInt8, Object);

        for (var i = 0; i < arguments.Length - 2; i++)
            args.add(i, arguments[i+1]);
        return this.callArgs(procedureCall, args);
    }

    callArgs(procedureCall, parameters)
    {
        var pb = Codec.Compose(parameters, this);

        var reply = new AsyncReply();
        var c = this.callbackCounter++;
        this.requests.add(c, reply);

        var callName = DC.stringToBytes(procedureCall);

        sendParams()
            .addUint8(0x40 | IIPPacketAction.ProcedureCall)
            .addUint32(c)
            .addUint16(callName.length)
            .addUint8Array(callName)
            .addUint8Array(pb)
            .done();

        return reply;
    }


    IIPRequestKeepAlive(callbackId, peerTime, interval)
    {

        let jitter = 0;

        let now = new Date();

        if (this._lastKeepAliveReceived != null)
        {
            var diff = now - this._lastKeepAliveReceived;
            //Console.WriteLine("Diff " + diff + " " + interval);

            jitter = Math.abs(diff - interval);
        }

        this._sendParams()
            .addUint8(0x80 | IIPPacketAction.KeepAlive)
            .addUint32(callbackId)
            .addDateTime(now)
            .addUint32(jitter)
            .done();

        this._lastKeepAliveReceived = now;
    }


    static get template() {
        return new TemplateDescriber("Esiur", [new Prop("status", UInt8)]);
    }
}
