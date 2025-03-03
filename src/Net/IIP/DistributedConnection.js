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
import IIPAuthPacketCommand from "../Packets/IIPAuthPacketCommand.js";
import IIPAuthPacketHeader from '../../Net/Packets/IIPAuthPacketHeader.js';
import IIPAuthPacketInitialize from '../../Net/Packets/IIPAuthPacketInitialize.js';
import IIPAuthPacketAcknowledge from '../../Net/Packets/IIPAuthPacketAcknowledge.js';
import IIPAuthPacketAction from '../../Net/Packets/IIPAuthPacketAction.js';
import IIPAuthPacketEvent from '../../Net/Packets/IIPAuthPacketEvent.js';



import AuthenticationMethod from "../../Security/Authority/AuthenticationMethod.js";

import IIPPacket from "../Packets/IIPPacket.js";
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
import TypedMap from '../../Data/TypedMap.js';
import Global from '../../Misc/Global.js';
import IIPAuthPacketHashAlgorithm from '../../Net/Packets/IIPAuthPacketHashAlgorithm.js';
import AuthorizationResultsResponse from '../../Security/Membership/AuthorizationResultsResponse.js';
import IIPAuthPacketIAuthHeader from '../../Net/Packets/IIPAuthPacketIAuthHeader.js';
import AuthorizationRequest from '../../Security/Membership/AuthorizationRequest.js';

import DistributedResourceAttachRequestInfo from './DistributedResourceAttachRequestInfo.js';

export default class DistributedConnection extends IStore {

    // fields
    #port;
    #hostname;
    #secure;
    #socket;

    #lastKeepAliveSent;
    #lastKeepAliveReceived;

    #status;
    #readyToEstablish = false;
    #openReply;

    #session = new Session();
    #packet = new IIPPacket();
    #authPacket = new IIPAuthPacket();

    #neededResources = new KeyList();
    
    #attachedResources = new KeyList();
    #suspendedResources = new KeyList();

    #invalidCredentials = false;
    #localPasswordOrToken = null;

    #keepAliveTimer;

    #loginDate;

    #jitter = 0;



    keepAliveTime = 10;
    keepAliveInterval = 30;
    reconnectInterval = 5;
    autoReconnect = false;


    #server;
    #templates = new KeyList();
    #requests = new KeyList();// {};

    #templateRequests = new KeyList();
    #templateByNameRequests = new KeyList();
    #resourceRequests = new KeyList();// {};
    #callbackCounter = 0;

    #queue = new AsyncQueue();
    #subscriptions = new Map();
    #ready;

    get jitter() {
        return this.#jitter;
    }

    get session() {
        return this.#session;
    }

    get status () {
        return this.#status;
    }

    _sendAll(data) {
        this.#socket.sendAll(data.buffer);
    }

    #sendParams(doneReply) {
        return new SendList(this, doneReply);
    }





    constructor(server) {

        super();

        this.#session.authenticationType = AuthenticationType.Host;
        this.#session.localMethod = AuthenticationMethod.None;
        this.#session.localHeaders.set(IIPAuthPacketHeader.Nonce, Global.generateBytes(32));

        this.#server = server;
  
        this._register("ready");
        this._register("error");
        this._register("close");
        this._register("resumed");


        this.#queue.then(function (x) {
            if (x.type == DistributedResourceQueueItemType.Event) {
                x.resource._emitEventByIndex(x.index, x.value);
            }
            else {
                x.resource._updatePropertyByIndex(x.index, x.value);
            }
        });

                // set local nonce


    }



    #processPacket(msg, offset, ends, data) {

        if (this.#ready) {

            let packet = this.#packet;

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
            let authPacket = this.#authPacket;

            let rt = authPacket.parse(msg, offset, ends);

            if (rt <= 0) {
                data.holdAllFor(msg, ends - rt);
                return ends;
            }
            else {
                offset += rt;

                if (this.#session.authenticationType == AuthenticationType.Host) {
                    this.#processHostAuth(msg);
                }
                else if (this.#session.authenticationType == AuthenticationType.Client) {
                    this.#processClientAuth(msg);
                }
            }
        }

        return offset;

    }


    #processClientAuth(data)
    {

        let authPacket = this.#authPacket;
        let session = this.#session;

      if (authPacket.command == IIPAuthPacketCommand.Acknowledge)
          {
              // if there is a mismatch in authentication
              if (session.localMethod != authPacket.remoteMethod
                  || session.remoteMethod != authPacket.localMethod)
              {
                  this.#openReply?.triggerError(new Exception("Peer refused authentication method."));
                  this.#openReply = null;
              }
  
              // Parse remote headers
  
              var dataType = authPacket.dataType;
  
              var pr = Codec.parse(data, dataType.offset, this, null, dataType);
  
              var rt= pr.reply.result;
  
              session.remoteHeaders = rt;
  
              if (session.localMethod == AuthenticationMethod.None)
              {
                  // send establish
                  this.#sendParams()
                              .addUint8(IIPAuthPacketAction.EstablishNewSession)
                              .done();
              }
              else if (session.localMethod == AuthenticationMethod.Credentials
                      || session.localMethod == AuthenticationMethod.Token)
              {
                  var remoteNonce = session.remoteHeaders.get(IIPAuthPacketHeader.Nonce);
                  var localNonce = session.localHeaders.get(IIPAuthPacketHeader.Nonce);
  
                  // send our hash
                  // local nonce + password or token + remote nonce
                  var challenge = SHA256.compute((BL()
                                                      .addDC(localNonce)
                                                      .addDC(this.#localPasswordOrToken)
                                                      .addDC(remoteNonce))
                                                      .toDC());
  
  
                  this.#sendParams()
                      .addUint8(IIPAuthPacketAction.AuthenticateHash)
                      .addUint8(IIPAuthPacketHashAlgorithm.SHA256)
                      .addUint16(challenge.length)
                      .addDC(challenge)
                      .done();
              }
  
          }
          else if (authPacket.command == IIPAuthPacketCommand.Action)
          {
              if (authPacket.action == IIPAuthPacketAction.AuthenticateHash)
              {
                  var remoteNonce = session.remoteHeaders.get(IIPAuthPacketHeader.Nonce);
                  var localNonce = session.localHeaders.get(IIPAuthPacketHeader.Nonce);
  
                  // check if the server knows my password
  
                  var challenge = SHA256.compute((BL()
                                                          .addDC(remoteNonce)
                                                          .addDC(this.#localPasswordOrToken)
                                                          .addDC(localNonce)
                                                    ).toDC());
  
  
                  if (challenge.sequenceEqual(authPacket.challenge))
                  {
                      // send establish request
                      this.#sendParams()
                                  .addUint8(IIPAuthPacketAction.EstablishNewSession)
                                  .done();
                  }
                  else
                  {
                      this.#sendParams()
                                  .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                  .addUint8(ExceptionCode.ChallengeFailed.index)
                                  .addUint16(16)
                                  .addString("Challenge Failed")
                                  .done();
  
                  }
              }
          }
          else if (authPacket.command == IIPAuthPacketCommand.Event)
          {
              if (authPacket.event == IIPAuthPacketEvent.ErrorTerminate
                  || authPacket.event == IIPAuthPacketEvent.ErrorMustEncrypt
                  || authPacket.event == IIPAuthPacketEvent.ErrorRetry)
              {
                  this.#invalidCredentials = true;
                  this.#openReply?.triggerError(new AsyncException(ErrorType.Management, authPacket.errorCode, authPacket.message));
                  this.#openReply = null;
  
                  var ex = new AsyncException(ErrorType.Management, authPacket.errorCode,
                    authPacket.message);
  
                  this._emit("error", this, ex);
  
                  this.close();
              }
              else if (authPacket.event == IIPAuthPacketEvent.IndicationEstablished)
              {
                  session.id = authPacket.sessionId;
                  session.authorizedAccount = authPacket.accountId.getString(0, authPacket.accountId.length);

                  this.#ready = true;
                  this.#status = ConnectionStatus.Connected;
  
                  // put it in the warehouse
  
                  if (this.instance == null)
                  {
                      Warehouse.put(session.authorizedAccount.replaceAll("/", "_"), this, null, this.#server).then((x) =>
                      {
                          this.#openReply?.trigger(true);
  
                          this._emit("ready", this);
                          this.#openReply = null;
  
                      }).error((x) =>
                      {
                          this.#openReply?.triggerError(x);
                          this.#openReply = null;
                      });
                  }
                  else
                  {
                      this.#openReply?.trigger(true);
                      this.#openReply = null;
                      this._emit("ready", this);
                  }
  
                  // start perodic keep alive timer
                  this.#keepAliveTimer = setInterval(this.#keepAliveTimerElapsed.bind(this), this.keepAliveInterval * 1000);  
  
              }
              else if (authPacket.event == IIPAuthPacketEvent.IAuthPlain)
              {
                  let dataType = authPacket.dataType;
                  let pr = Codec.parse(data, dataType.offset, this, null, dataType);
                  let headers = pr.reply.result;
                  let iAuthRequest = new AuthorizationRequest(headers);

  
                  if (authenticator == null)
                  {
                      this.#sendParams()
                       .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                       .addUint8(ExceptionCode.NotSupported.index)
                       .addUint16(13)
                       .addString("Not supported")
                       .done();
                  }
                  else
                  {
                      this.authenticator(iAuthRequest).then((response) =>
                      {
                          this.#sendParams()
                              .addUint8(IIPAuthPacketAction.IAuthPlain)
                              .addUint32(headers.get(IIPAuthPacketIAuthHeader.Reference))
                              .addDC(Codec.compose(response, this))
                              .done();
                      })
                      .timeout(iAuthRequest.timeout * 1000,
                           () => {
                              this.#sendParams()
                                  .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                  .addUint8(ExceptionCode.Timeout.index)
                                  .addUint16(7)
                                  .addString("Timeout")
                                  .done();
                          }
                         );
                  }
              }
              else if (authPacket.event == IIPAuthPacketEvent.IAuthHashed)
              {
                  let dataType = authPacket.dataType;
                  let parsed = Codec.parse(data, dataType.offset, this, null, dataType);
                  let headers = parsed.reply.result;
                  let iAuthRequest = new AuthorizationRequest(headers);

                  if (this.authenticator == null)
                  {
                      this.#sendParams()
                       .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                       .addUint8(ExceptionCode.NotSupported.index)
                       .addUint16(13)
                       .addString("Not supported")
                       .done();
                  }
                  else
                  {
                      this.authenticator(iAuthRequest).then((response) =>
                      {
  
                          var hash = SHA256.compute((BL()
                              .addDC(session.localHeaders.get(IIPAuthPacketHeader.Nonce))
                              .addDC(Codec.compose(response, this))
                              .addDC(session.remoteHeaders.get(IIPAuthPacketHeader.Nonce))
                          ).toDC());
  
                          this.#sendParams()
                              .addUint8(IIPAuthPacketAction.IAuthHashed)
                              .addUint32(headers.get(IIPAuthPacketIAuthHeader.Reference))
                              .addUint8(IIPAuthPacketHashAlgorithm.SHA256)
                              .addUint16(hash.length)
                              .addDC(hash)
                              .done();
                      })
                      .timeout(iAuthRequest.timeout * 1000,
                           () => {
                          this.#sendParams()
                              .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                              .addUint8(ExceptionCode.Timeout.index)
                              .addUint16(7)
                              .addString("Timeout")
                              .done();
                      });
                  }
              }
              else if (authPacket.event == IIPAuthPacketEvent.IAuthEncrypted)
              {
                  throw new Exception("IAuthEncrypted not implemented.");
              }
          }
      }
  
      #processHostAuth(data)
      {
          let authPacket = this.#authPacket;
          let session = this.#session;

          if (authPacket.command == IIPAuthPacketCommand.Initialize)
          {
              // Parse headers
  
              var dataType = authPacket.dataType;
  
              var parsed = Codec.parse(data, dataType.offset, this, null, dataType);
  
              let rt = parsed.reply.result;
  
  
              session.remoteHeaders = rt;
              session.remoteMethod = authPacket.localMethod;
  
  
              if (authPacket.initialization == IIPAuthPacketInitialize.CredentialsNoAuth)
              {
                  try
                  {
  
                      var username = session.remoteHeaders.get(IIPAuthPacketHeader.Username);
                      var domain = session.remoteHeaders.get(IIPAuthPacketHeader.Domain);
  
                      if (this.#server?.membership == null)
                      {
                          var errMsg = DC.stringToBytes("Membership not set.");
  
                          this.#sendParams()
                              .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                              .addUint8(ExceptionCode.GeneralFailure.index)
                              .addUint16(errMsg.length)
                              .addDC(errMsg)
                              .done();
                      }
                      else {
                        this.#server.membership.userExists(username, domain).then((x) =>
                        {
                            if (x != null)
                            {
                                session.authorizedAccount = x;
    
                                var localHeaders = session.localHeaders;
    
                                this.#sendParams()
                                            .addUint8(IIPAuthPacketAcknowledge.NoAuthCredentials)
                                            .addDC(Codec.compose(localHeaders, this))
                                            .done();
                            }
                            else
                            {
                                // Send user not found error
                                this.#sendParams()
                                            .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                            .addUint8(ExceptionCode.UserOrTokenNotFound.index)
                                            .addUint16(14)
                                            .addString("User not found")
                                            .done();
                            }
                        });
                     }
                  }
                  catch (ex)
                  {
                      // Send the server side error
                      let errMsg = DC.stringToBytes(ex.toString());
  
                      this.#sendParams()
                          .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                          .addUint8(ExceptionCode.GeneralFailure.index)
                          .addUint16(errMsg.length)
                          .addDC(errMsg)
                          .done();
                  }
              }
              else if (authPacket.initialization == IIPAuthPacketInitialize.TokenNoAuth)
              {
                  try
                  {
                      if (this.#server?.membership == null)
                      {
                          this.#sendParams()
                              .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                              .addUint8(ExceptionCode.UserOrTokenNotFound.index)
                              .addUint16(15)
                              .addString("Token not found")
                              .done();
                      }
                      // Check if user and token exists
                      else
                      {
                          let tokenIndex = session.remoteHeaders.get(IIPAuthPacketHeader.TokenIndex);
                          let domain = session.remoteHeaders.get(IIPAuthPacketHeader.Domain);
  
  
                          this.#server?.membership?.tokenExists(tokenIndex, domain).then((x) =>
                          {
                              if (x != null)
                              {
                                  session.authorizedAccount = x;
  
                                  let localHeaders = session.localHeaders;
  
                                  this.#sendParams()
                                              .addUint8(IIPAuthPacketAcknowledge.NoAuthToken)
                                              .addDC(Codec.compose(localHeaders, this))
                                              .done();
  
                              }
                              else
                              {
                                  // Send token not found error.
                                  this.#sendParams()
                                              .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                              .addUint8(ExceptionCode.UserOrTokenNotFound.index)
                                              .addUint16(15)
                                              .addString("Token not found")
                                              .done();
                              }
                          });
                      }
                  }
                  catch (ex)
                  {
                      // Sender server side error.
  
                      let errMsg = DC.stringToBytes(ex.toString());
  
                      this.#sendParams()
                          .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                          .addUint8(ExceptionCode.GeneralFailure.index)
                          .addUint16(errMsg.length)
                          .addDC(errMsg)
                          .done();
                  }
              }
              else if (authPacket.initialization == IIPAuthPacketInitialize.NoAuthNoAuth)
              {
                  try
                  {
                      // Check if guests are allowed
                      if (this.#server?.membership?.guestsAllowed ?? true)
                      {
                          let localHeaders = session.localHeaders;
  
                          session.authorizedAccount = "g-" + Global.generateCode();
  
                          this.#readyToEstablish = true;
  
                          this.#sendParams()
                                      .addUint8(IIPAuthPacketAcknowledge.NoAuthNoAuth)
                                      .addDC(Codec.compose(localHeaders, this))
                                      .done();
                      }
                      else
                      {
                          // Send access denied error because the server does not allow guests.
                          this.#sendParams()
                                      .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                      .addUint8(ExceptionCode.AccessDenied.index)
                                      .addUint16(18)
                                      .addString("Guests not allowed")
                                      .done();
                      }
                  }
                  catch (ex)
                  {
                      // Send the server side error.
                      let errMsg = DC.stringToBytes(ex.toString());
  
                      this.#sendParams()
                          .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                          .addUint8(ExceptionCode.GeneralFailure.index)
                          .addUint16(errMsg.length)
                          .addDC(errMsg)
                          .done();
                  }
              }
  
          }
          else if (authPacket.command == IIPAuthPacketCommand.Action)
          {
              if (authPacket.action == IIPAuthPacketAction.AuthenticateHash)
              {
                  let remoteHash = authPacket.challenge;
                  let reply;
  
                  try
                  {
                      if (session.remoteMethod == AuthenticationMethod.Credentials)
                      {
                          reply = this.#server.membership.getPassword(session.remoteHeaders.get(IIPAuthPacketHeader.Username),
                                                        session.remoteHeaders.get(IIPAuthPacketHeader.Domain));
                      }
                      else if (session.remoteMethod == AuthenticationMethod.Token)
                      {
                          reply = this.#server.membership.getToken(session.remoteHeaders.get(IIPAuthPacketHeader.TokenIndex),
                                                        session.remoteHeaders.get(IIPAuthPacketHeader.Domain));
                      }
                      else
                      {
                        // Error
                        throw Exception("Unsupported authentication method");
                      }
  
                      reply.then((pw) => 
                      {
                          if (pw != null)
                          {
                              let localNonce = session.localHeaders.get(IIPAuthPacketHeader.Nonce);
                              let remoteNonce = session.remoteHeaders.get(IIPAuthPacketHeader.Nonce);
  
  
                              let hash = SHA256.compute((BL()
                                                                  .addDC(remoteNonce)
                                                                  .addDC(pw)
                                                                  .addDC(localNonce)
                                                         ).toDC());
  
                              if (hash.sequenceEqual(remoteHash))
                              {
                                  // send our hash
                                  let localHash = SHA256.compute((BL()
                                                      .addDC(localNonce)
                                                      .addDC(pw)
                                                      .addDC(remoteNonce)
                                                    ).toDC());
  
                                  this.#sendParams()
                                      .addUint8(IIPAuthPacketAction.AuthenticateHash)
                                      .addUint8(IIPAuthPacketHashAlgorithm.SHA256)
                                      .addUint16(localHash.length)
                                      .addDC(localHash)
                                      .done();
  
                                  this.#readyToEstablish = true;
                              }
                              else
                              {
                                  this.#sendParams()
                                      .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                                      .addUint8(ExceptionCode.AccessDenied.index)
                                      .addUint16(13)
                                      .addString("Access Denied")
                                      .done();
                              }
                          }
                      });
                  }
                  catch (ex)
                  {
                      var errMsg = DC.stringToBytes(ex.toString());
  
                      this.#sendParams()
                          .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                          .addUint8(ExceptionCode.GeneralFailure.index)
                          .addUint16(errMsg.length)
                          .addDC(errMsg)
                          .done();
                  }
              }
              else if (authPacket.action == IIPAuthPacketAction.IAuthPlain)
              {
                  var reference = authPacket.reference;
                  var dataType = authPacket.dataType;
  
                  var parsed = Codec.parse(data, dataType.offset, this, null, dataType);
  
                  var value = parsed.reply.result;
  
                  this.#server?.membership?.authorizePlain(session, reference, value)
                      .then((x) => this.#processAuthorization(x));
  
  
              }
              else if (authPacket.action == IIPAuthPacketAction.IAuthHashed)
              {
                  let reference = authPacket.reference;
                  let value = authPacket.challenge;
                  let algorithm = authPacket.hashAlgorithm;
  
                  let self = this;
                  this.#server?.membership?.authorizeHashed(session, reference, algorithm, value)
                      .then((x) => self.#processAuthorization(x));
  
              }
              else if (authPacket.action == IIPAuthPacketAction.IAuthEncrypted)
              {
                  let reference = authPacket.reference;
                  let value = authPacket.challenge;
                  let algorithm = authPacket.publicKeyAlgorithm;
                  let self = this;

                  this.#server?.membership?.authorizeEncrypted(session, reference, algorithm, value)
                      .then((x) => self.#processAuthorization(x));
              }
              else if (authPacket.action == IIPAuthPacketAction.EstablishNewSession)
              {
                  if (this.#readyToEstablish)
                  {
  
                      if (this.#server?.membership == null)
                      {
                          this.#processAuthorization(null);
                      }
                      else
                      {
                          let self = this;
                          this.#server?.membership?.authorize(session).then((x) =>
                          {
                              self.#processAuthorization(x);
                          });
                      }
  
                  }
                  else
                  {
                      this.#sendParams()
                          .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                          .addUint8(ExceptionCode.GeneralFailure.index)
                          .addUint16(9)
                          .addString("Not ready")
                          .done();
                  }
              }
          }
      }
  
      #processAuthorization(results)
      {
          if (results == null || results.response == AuthorizationResultsResponse.Success)
          {
              this.#session.id = Global.generateCode(32);
  
              let accountId = DC.stringToBytes(this.#session.authorizedAccount);

              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.IndicationEstablished)
                  .addUint8(this.#session.id.length)
                  .addUint8Array(this.#session.id)
                  .addUint8(accountId.length)
                  .addUint8Array(accountId)
                  .done();
  
              if (this.instance == null)
              {
                  Warehouse.put(this.#session.authorizedAccount.replaceAll("/", "_"), this, null, this.#server).then((x) =>
                  {
                      this.#ready = true;
                      this.#status = ConnectionStatus.Connected;
                      this.#openReply?.trigger(true);
                      this.#openReply = null;
                      this._emit("ready", this);
  
                      this.#server?.membership?.login(this.#session);
                      this.#loginDate = new Date();
  
                  }).error((x) =>
                  {
                      this.#openReply?.triggerError(x);
                      this.#openReply = null;
                  });
              }
              else
              {
                  this.#ready = true;
                  this.#status = ConnectionStatus.Connected;
  
                  this.#openReply?.trigger(true);
                  this.#openReply = null;
  
                  this._emit("ready", this);
  
                  this.#server?.membership?.login(session);
              }
          }
          else if (results.response == AuthorizationResultsResponse.Failed)
          {
              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                  .addUint8(ExceptionCode.ChallengeFailed.index)
                  .addUint16(21)
                  .addString("Authentication failed")
                  .done();
          }
          else if (results.response == AuthorizationResultsResponse.Expired)
          {
              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                  .addUint8(ExceptionCode.Timeout.index)
                  .addUint16(22)
                  .addString("Authentication expired")
                  .done();
          }
          else if (results.response == AuthorizationResultsResponse.ServiceUnavailable)
          {
              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.ErrorTerminate)
                  .addUint8(ExceptionCode.GeneralFailure.index)
                  .addUint16(19)
                  .addString("Service unavailable")
                  .done();
          }
          else if (results.response == AuthorizationResultsResponse.IAuthPlain)
          {
              var args = new (TypedMap.of(UInt8, Object))();
              args.set(IIPAuthPacketIAuthHeader.Reference, results.reference);
              args.set(IIPAuthPacketIAuthHeader.Destination, results.destination);
              args.set(IIPAuthPacketIAuthHeader.Expire, results.expire);
              args.set(IIPAuthPacketIAuthHeader.Clue, results.clue);
              args.set(IIPAuthPacketIAuthHeader.RequiredFormat, results.requiredFormat);
  
              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.IAuthPlain)
                  .addDC(Codec.compose(args, this))
                  .done();
  
          }
          else if (results.response == AuthorizationResultsResponse.IAuthHashed)
          {
            var args = new (TypedMap.of(UInt8, Object))();
            args.set(IIPAuthPacketIAuthHeader.Reference, results.reference);
            args.set(IIPAuthPacketIAuthHeader.Destination, results.destination);
            args.set(IIPAuthPacketIAuthHeader.Expire, results.expire);
            args.set(IIPAuthPacketIAuthHeader.Clue, results.clue);
            args.set(IIPAuthPacketIAuthHeader.RequiredFormat, results.requiredFormat);

              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.IAuthHashed)
                  .addDC(Codec.compose(args, this))
                  .done();
  
          }
          else if (results.response == AuthorizationResultsResponse.IAuthEncrypted)
          {
            var args = new (TypedMap.of(UInt8, Object))();
            args.set(IIPAuthPacketIAuthHeader.Reference, results.reference);
            args.set(IIPAuthPacketIAuthHeader.Destination, results.destination);
            args.set(IIPAuthPacketIAuthHeader.Expire, results.expire);
            args.set(IIPAuthPacketIAuthHeader.Clue, results.clue);
            args.set(IIPAuthPacketIAuthHeader.RequiredFormat, results.requiredFormat);

              this.#sendParams()
                  .addUint8(IIPAuthPacketEvent.IAuthEncrypted)
                  .addDC(Codec.compose(args, this))
                  .done();
          }
    }
  
    
    #dataReceived(data)
    {
        var msg = data.read();
        let offset = 0;
        let ends = msg.length;

        this.#socket.hold();

        try
        {
            while (offset < ends)
            {
                offset = this.#processPacket(msg, offset, ends, data);
            }
        }
        catch (ex)
        {
            console.log(ex);
        }

        this.#socket?.unhold();
    }

    close(event) {
        try {
            this.#socket.close();
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
                for(var i = 0 ; i < this.#suspendedResources.length; i++)
                {
                    var r = this.#suspendedResources.values[i].deref();
                    if (r != null)
                        toBeRestored.push(r);
                }

                for(let r of toBeRestored)
                {
                    let link = DC.stringToBytes(r._p.link);
                    console.log("Restoring " + r._p.link);

                    try
                    {
                        var ar = await this.#sendRequest(IIPPacketAction.QueryLink)
                                            .addUint16(link.length)
                                            .addUint8Array(link)
                                            .done();

                        var dataType = ar[0];
                        var data = ar[1];

                        if (dataType.identifier == TransmissionTypeIdentifier.ResourceList
                        || dataType.identifier == TransmissionTypeIdentifier.List)
                        {
                            // remove from suspended.
                            this.#suspendedResources.remove(r._p.instanceId);

                            // parse them as int
                            var id = data.getUint32(8);

                            // id changed ?
                            if (id != r._p.instanceId)
                                r._p.instanceId = id;

                            this.#neededResources.set(id, r);

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
                reconnectInterval = 5,
                authenticator = null} = this.instance.attributes.toObject();


            this.authenticator = authenticator;
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
        
        if (this.#openReply != null)
            throw new AsyncException(ErrorType.Exception, 0, "Connection in progress");

        this.#status = ConnectionStatus.Connecting;

        this.#openReply = new AsyncReply();

        if (hostname != null) {
            this.#session = new Session();
      
            this.#session.authenticationType = AuthenticationType.Client;
            this.#session.localMethod = method;
            this.#session.remoteMethod = AuthenticationMethod.None;
      
            this.#session.localHeaders.set(IIPAuthPacketHeader.Domain, domain);
            this.#session.localHeaders.set(IIPAuthPacketHeader.Nonce, Global.generateBytes(32));
      
            if (method == AuthenticationMethod.Credentials)
            {
                this.#session.localHeaders.set(IIPAuthPacketHeader.Username, username);
            }
            else if (method == AuthenticationMethod.Token)
            {
                this.#session.localHeaders.set(IIPAuthPacketHeader.TokenIndex, tokenIndex);
            }
            else if (method == AuthenticationMethod.Certificate)
            {
              throw Exception("Unsupported authentication method.");
            }
      
            this.#localPasswordOrToken = passwordOrToken;
            this.#invalidCredentials = false;
      
        }
      


        if (this.session == null)
            throw new AsyncException(ErrorType.Exception, 0, "Session not initialized");

        if (socket == null)
            socket = new WSocket();// TCPSocket();

        if (port > 0)
            this.#port = port;

        if (hostname != null)
            this.#hostname = hostname;

        if (secure != null)
            this.#secure = secure;

        this.#connectSocket(socket);

        return this.#openReply;

    }

    #connectSocket(socket){
        let self = this;

        socket.connect(this.#hostname, this.#port, this.#secure).then(x =>
            {
                self.assign(socket);
            }).error((x) =>
            {
                if (self.autoReconnect){
                    console.log("Reconnecting socket...");
                    setTimeout(() => {
                        self.#connectSocket(socket);
                    }, self.reconnectInterval * 1000);
                } else {
                    self.#openReply?.triggerError(x);
                    self.#openReply = null;
                }
            });
    }

    #declare() {


        if (this.#session.localMethod == AuthenticationMethod.Credentials
            && this.#session.remoteMethod == AuthenticationMethod.None)
        {
            // change to Map<byte, object> for compatibility
            let headers = Codec.compose(this.#session.localHeaders, this);
  
            // declare (Credentials -> No Auth, No Enctypt)
            this.#sendParams()
                .addUint8(IIPAuthPacketInitialize.CredentialsNoAuth)
                .addDC(headers)
                .done();
  
        }
        else if (this.#session.localMethod == AuthenticationMethod.Token
            && this.#session.remoteMethod == AuthenticationMethod.None)
        {
            // change to Map<byte, object> for compatibility
            let headers = Codec.compose(this.#session.localHeaders, this);
  
            this.#sendParams()
                .addUint8(IIPAuthPacketInitialize.TokenNoAuth)
                .addDC(headers)
                .done();
        }
        else if (this.#session.localMethod == AuthenticationMethod.None
            && this.#session.remoteMethod == AuthenticationMethod.None)
        {
            // change to Map<byte, object> for compatibility
            let headers = Codec.compose(this.#session.localHeaders, this);
  
            // @REVIEW: MITM Attack can still occure
            this.#sendParams()
                .addUint8(IIPAuthPacketInitialize.NoAuthNoAuth)
                .addDC(headers)
                .done();
        }
        else
        {
            throw new Exception("Authentication method is not implemented.");
        }    
    }

    assign(socket)
    {
        this.#socket = socket;
        socket.receiver = this;

        // @TODO: add referer
        // this.#session.LocalHeaders[IIPAuthPacketHeader.IPv4] = socket.remoteEndPoint.Address.Address;

        if (socket.state == SocketState.Established &&
            this.#session.authenticationType == AuthenticationType.Client)
        {
            this.#declare();
        }
    }



    #unsubscribeAll()
    {
        for (let resource of this.#subscriptions.keys()) {

            resource.instance.off("EventOccurred", this.#instance_eventOccurred, this);
            resource.instance.off("PropertyModified", this.#instance_propertyModified, this);
            resource.instance.off("ResourceDestroyed", this.#instance_resourceDestroyed, this);    
        }
        
        this.#subscriptions.clear();
    }

    destroy(){
        this.#unsubscribeAll();
        super.destroy();
    }

    networkClose(socket)
    {
        // clean up
        this.#ready = false;
        this.#status = ConnectionStatus.Closed;

        this.#readyToEstablish = false;

        clearTimeout(this.#keepAliveTimer);

        try
        {
            this.#requests.values.forEach((x) => {
                try { 
                    x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });

            this.#resourceRequests.values.forEach((x) => {
                try { 
                    x.reply.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });

            this.#templateRequests.values.forEach((x) => {
                try { 
                    x.triggerError(new AsyncException(ErrorType.Management, 0, "Connection closed"));
                 } catch (ex) { }
            });
        }
        catch(ex)
        {
            // unhandled error
        }

        this.#requests.clear();
        this.#resourceRequests.clear();
        this.#templateRequests.clear();

        for (let x of this.#attachedResources.values)
        {
            let r = x.deref();
            if (r != null){
                r._suspend();
                this.#suspendedResources.set(r._p.instanceId, x);
            }
        }

        if (this.server != null) {

            this.#suspendedResources.clear();

            this.#unsubscribeAll();
            Warehouse.remove(this);

            if (this.ready)
                this.server.membership.logout(this.session);
        }
        else if (this.autoReconnect && !this.#invalidCredentials){
            let self = this;
            setTimeout(() => self.reconnect(), this.reconnectInterval * 1000);
        }
        else {
            this.#suspendedResources.clear();
        }

        this.#attachedResources.clear();
        
        this._emit("close", this);
    }

    networkConnect(socket)
    {
        if (this.session.localAuthentication.Type == AuthenticationType.Client)
            this.#declare();
        
        this._emit("connect", this);
    }

    networkReceive(sender, buffer)
    {
        try
        {
            // Unassigned ?
            if (this.#socket == null)
                return;

            // Closed ?
            if (this.#socket.state == SocketState.Closed)
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
                        this.#dataReceived(buffer);
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
            this.#neededResources.add(resource._p.instanceId, resource);

        return new AsyncReply(true);
    }

    remove(resource) {
        // nothing to do (IStore interface)
    }

    // Protocol Implementation
    #sendRequest(action) {
        var reply = new AsyncReply();
        this.#callbackCounter++;
        this.#requests.set(this.#callbackCounter, reply);
        return this.#sendParams(reply)
                .addUint8(0x40 | action)
                .addUint32(this.#callbackCounter);
    }


    _sendDetachRequest(instanceId)
    {
        try
        {
            let sendDetach = false;

            if (this.#attachedResources.containsKey(instanceId)){
                this.#attachedResources.remove(instanceId);
                sendDetach = true;
            }

            if (this.#suspendedResources.containsKey(instanceId)){
                this.#suspendedResources.remove(instanceId);
                sendDetach = true;
            }

            if (sendDetach)
                return this.#sendRequest(IIPPacketAction.DetachResource)
                            .addUint32(instanceId)
                            .done();
        }
        catch(ex)
        {
          return null;
        }
    }
    
    _sendInvoke(instanceId, index, parameters) {

        var reply = new AsyncReply();

        var pb = Codec.compose(parameters, this);

        let callbackId = ++this.#callbackCounter;
        this.#sendParams()
            .addUint8(0x40 | IIPPacketAction.InvokeFunction)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .addUint8Array(pb)
            .done();

        this.#requests.set(callbackId, reply);

        return reply;
    }

    _sendSetProperty(instanceId, index, value){

        var cv = Codec.compose(value, this);

        return this.#sendRequest(IIPPacketAction.SetProperty)
            .addUint32(instanceId)
            .addUint8(index)
            .addUint8Array(cv)
            .done()
    }


    #sendError(type, callbackId, errorCode, errorMessage = "") {
        var msg = DC.stringToBytes(errorMessage);
        if (type == ErrorType.Management)
            this.#sendParams()
                .addUint8(0xC0 | IIPPacketReport.ManagementError)
                .addUint32(callbackId)
                .addUint16(errorCode)
                .done();
        else if (type == ErrorType.Exception)
            this.#sendParams()
                .addUint8(0xC0 | IIPPacketReport.ExecutionError)
                .addUint32(callbackId)
                .addUint16(errorCode)
                .addUint16(msg.length)
                .addUint8Array(msg)
                .done();
    }

    #sendProgress(callbackId, value, max) {
        this.#sendParams()
            .addUint8(0xC0 | IIPPacketReport.ProgressReport)
            .addUint32(callbackId)
            .addInt32(value)
            .addInt32(max)
            .done();
    }

    #sendChunk(callbackId, chunk) {
        var c = Codec.compose(chunk, this);
        this.#sendParams()
            .addUint8(0xC0 | IIPPacketReport.ChunkStream)
            .addUint32(callbackId)
            .addUint8Array(c)
            .done();
    }

    IIPReply(callbackId) {

        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.#requests.item(callbackId);
        this.#requests.remove(callbackId);
        req.trigger(results);
    }

    IIPReplyInvoke(callbackId, dataType, data) {
        
        var req = this.#requests.item(callbackId);

        if (req != null) {

            this.#requests.remove(callbackId);

            Codec.parse(data, 0, this, null, dataType).reply.then(function (rt) {
                req.trigger(rt);
            });
        }
    }

    IIPReportError(callbackId, errorType, errorCode, errorMessage) {
        var req = this.#requests.item(callbackId);
        if (req != null)
        {
            this.#requests.remove(callbackId);
            req.triggerError(errorType, errorCode, errorMessage);
        }
    }

    IIPReportProgress(callbackId, type, value, max) {
        var req = this.#requests.item(callbackId);
        if (req != null)
            req.triggerProgress(type, value, max);
    }

    IIPReportChunk(callbackId, dataType, data) {
        var req = this.#requests.item(callbackId);
        if (req != null) {
            Codec.parse(data, 0, this, null, dataType).reply.then(function (x) {
                req.triggerChunk(x);
            });
        }
    }

    IIPEventResourceReassigned(resourceId, newResourceId) {

    }

    IIPEventResourceDestroyed(resourceId) {

        if (this.#attachedResources.contains(resourceId))
        {
            let r = this.#attachedResources.get(resourceId).deref();
            // remove from attached to avoid sending unnecessary deattach request when destroy() is called
            this.#attachedResources.remove(resourceId);
            r?.destroy();
        }
        else if (this.#neededResources.contains(resourceId))
        {
            // @TODO: handle this mess
            this.#neededResources.remove(resourceId);
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
            self.#queue.add(item);

            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
            }).error(function (ex) {
                self.#queue.remove(item);
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
            self.#queue.add(item);

           // Codec.parseVarArray(content, 0, content.length, self).then(function (args) {
            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                item.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));

            }).error(function (ex) {
                self.#queue.remove(item);
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

    #sendReply(action, callbackId) {
        return this.#sendParams().addUint8(0x80 | action).addUint32(callbackId);
    }

    #sendEvent(evt) {
        return this.#sendParams().addUint8(evt);
    }

    _sendListenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.#callbackCounter;

        this.#sendParams()
            .addUint8(0x40 | IIPPacketAction.Listen)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.#requests.set(callbackId, reply);

        return reply;
    }

    _sendUnlistenRequest(instanceId, index)
    {
        var reply = new AsyncReply();
        let callbackId = ++this.#callbackCounter;
        
        this.#sendParams()
            .addUint8(0x40 | IIPPacketAction.Unlisten)
            .addUint32(callbackId)
            .addUint32(instanceId)
            .addUint8(index)
            .done();

        this.#requests.set(callbackId, reply);

        return reply;
    }

    IIPRequestAttachResource(callback, resourceId) {

        //var sl = this.#sendParams();
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {


                if (r.instance.applicable(self.#session, ActionType.Attach, null) == Ruling.Denied) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.AttachDenied);
                    return;
                }

                self.#unsubscribe(r);

                // reply ok
                var link = DC.stringToBytes(r.instance.link);

                if (r instanceof DistributedResource)
                    self.#sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.compose(r._serialize(), self))
                        .done();
                else
                    self.#sendReply(IIPPacketAction.AttachResource, callback)
                        .addUint8Array(r.instance.template.classId.value)
                        .addUint64(r.instance.age)
                        .addUint16(link.length)
                        .addUint8Array(link)
                        .addUint8Array(Codec.compose(r.instance.serialize(), self))
                        .done();

        
                self.#subscribe(r);
            }
            else {
                // reply failed
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    #subscribe(resource)
    {
        resource.instance.on("EventOccurred", this.#instance_eventOccurred, this);
        resource.instance.on("PropertyModified", this.#instance_propertyModified, this);
        resource.instance.on("ResourceDestroyed", this.#instance_resourceDestroyed, this);

        this.#subscriptions.set(resource, []);
    }

    #unsubscribe(resource)
    {
        resource.instance.off("EventOccurred", this.#instance_eventOccurred, this);
        resource.instance.off("PropertyModified", this.#instance_propertyModified, this);
        resource.instance.off("ResourceDestroyed", this.#instance_resourceDestroyed, this);

        this.#subscriptions.delete(resource);
    }


    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {

                self.#unsubscribe(r);
                self.#subscribe(r);
                
                // reply ok
                self.#sendReply(IIPPacketAction.ReattachResource, callback)
                    .addUint64(r.instance.age)
                    .addUint8Array(Codec.compose(r.instance.serialize(), self))
                    .done();
            }
            else {
                // reply failed
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                self.#unsubscribe(r);
                // reply ok
                self.#sendReply(IIPPacketAction.DetachResource, callback).done();
            }
            else {
                // reply failed
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            }
        });
    }

    IIPRequestCreateResource(callback, storeId, parentId, content) {
        var self = this;
        Warehouse.getById(storeId).then(function (store) {
            if (store == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.StoreNotFound);
                return;
            }

            if (!(store instanceof IStore)) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceIsNotStore);
                return;
            }

            // check security
            if (store.instance.applicable(self.#session, ActionType.CreateResource, null) != Ruling.Allowed) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.CreateDenied);
                return;
            }

            Warehouse.getById(parentId).then(function (parent) {

                // check security

                if (parent != null)
                    if (parent.instance.applicable(self.#session, ActionType.AddChild, null) != Ruling.Allowed) {
                        self.#sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
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
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.ClassNotFound);
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
                                self.#sendReply(IIPPacketAction.CreateResource, callback)
                                .addUint32(resource.Instance.Id)
                                .done();
                            }).error(function(ex){
                                // send some error
                                self.#sendError(ErrorType.Management, callback, ExceptionCode.AddToStoreFailed);
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
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(session, ActionType.Delete, null) != Ruling.Allowed) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.DeleteDenied);
                return;
            }

            if (Warehouse.remove(r))
                self.#sendReply(IIPPacketAction.DeleteResource, callback).done();
            else
                self.#sendError(ErrorType.Management, callback, ExceptionCode.DeleteFailed);
        });
    }

    IIPRequestLinkTemplates(callback, resourceLink)
    {
        var queryCallback = (r) =>
        {
            if (r == null)
                this.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = r.filter(x => x.instance.applicable(this.session, ActionType.ViewTemplate, null) != Ruling.Denied);

                if (list.length == 0)
                    this.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                else
                {
                    // get all templates related to this resource

                    var msg = BL();

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
                    this.#sendReply(IIPPacketAction.LinkTemplates, callback)
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
            self.#sendReply(IIPPacketAction.TemplateFromClassName, callback)
                .addUint32(t.content.length)
                .addUint8Array(t.content)
                .done();
        } else {
            // reply failed
            self.#sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var self = this;
        var t = Warehouse.getTemplateByClassId(classId);

        if (t != null)
            self.#sendReply(IIPPacketAction.TemplateFromClassId, callback)
                .addDC(TransmissionType.compose(
                    TransmissionTypeIdentifier.RawData, t.content))
                .done();
        else {
            // reply failed
            self.#sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
        }
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {

        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r != null)
                self.#sendReply(IIPPacketAction.TemplateFromResourceId, callback)
                    .addDC(TransmissionType.compose(
                        TransmissionTypeIdentifier.RawData, r.instance.template.content))
                    .done();
            else {
                // reply failed
                self.#sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            }
        });
    }

    IIPRequestProcedureCall(callback, procedureCall, transmissionType, content)
    {

        if (this.server == null)
        {
            this.#sendError(ErrorType.Management, callback, ExceptionCode.GeneralFailure);
            return;
        }

        var call = this.server.calls.get(procedureCall);

        if (call == null)
        {
            this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
            return;
        }

        let parsed = Codec.parse(content, 0, this, null, transmissionType);

        parsed.Then(results =>
        {
            
            // un hold the socket to send data immediately
            this.#socket.unhold();

            // @TODO: Make managers for procedure calls
            //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
            //{
            //    SendError(ErrorType.Management, callback,
            //        (ushort)ExceptionCode.InvokeDenied);
            //    return;
            //}

            this.#invokeFunction(call.method, callback, results, IIPPacketAction.ProcedureCall, call.target);

        }).error(x =>
        {
            this.#sendError(ErrorType.Management, callback, ExceptionCode.ParseError);
        });
    }

    IIPRequestStaticCall(callback, classId, index, transmissionType, content)
    {
        let template = Warehouse.getTemplateByClassId(classId);

        if (template == null)
        {
            this.#sendError(ErrorType.Management, callback, ExceptionCode.TemplateNotFound);
            return;
        }

        let ft = template.getFunctionTemplateByIndex(index);

        if (ft == null)
        {
            // no function at this index
            this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
            return;
        }

        let parsed = Codec.parse(content, 0, this, null, transmissionType);

        parsed.then(results =>
        {
            // un hold the socket to send data immediately
            this.#socket.unhold();

            var fi = ft.methodInfo;

            if (fi == null)
            {
                // ft found, fi not found, this should never happen
                this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                return;
            }

            // @TODO: Make managers for static calls
            //if (r.Instance.Applicable(session, ActionType.Execute, ft) == Ruling.Denied)
            //{
            //    SendError(ErrorType.Management, callback,
            //        (ushort)ExceptionCode.InvokeDenied);
            //    return;
            //}

            this.#invokeFunction(fi, callback, results, IIPPacketAction.StaticCall, null);

        }).error(x =>
        {
            this.#sendError(ErrorType.Management, callback, ExceptionCode.ParseError);
        });
    }


    IIPRequestInvokeFunction(callback, resourceId, index, dataType, data) {

        let self = this;
        
        Warehouse.getById(resourceId).then(function (r) {
            
            if (r == null) {
                this.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }
            
            let ft = r.instance.template.getFunctionTemplateByIndex(index);

            if (ft == null)
            {
                // no function at this index
                this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                return;
            }

            Codec.parse(data, 0, self, null, dataType).reply.then(function (args) {
                if (r instanceof DistributedResource) {
                    var rt = r._invoke(index, args);
                    if (rt != null) {
                        rt.then(function (res) {
                            self.#sendReply(IIPPacketAction.InvokeFunction, callback)
                                .addUint8Array(Codec.compose(res, self))
                                .done();
                        });
                    }
                    else {
                        // function not found on a distributed object
                        this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }
                }
                else 
                {
                    var fi = r[ft.name];

                    if (!(fi instanceof Function)) {
                        // ft found, fi not found, this should never happen
                        this.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                        return;
                    }

                    if (r.instance.applicable(self.#session, ActionType.Execute, ft) == Ruling.Denied) {
                        self.#sendError(ErrorType.Management, callback, ExceptionCode.InvokeDenied);
                        return;
                    }

                    self.#invokeFunction(fi, callback, args, IIPPacketAction.InvokeFunction, r);

                }
            });
        });
    }

    #invokeFunction(fi, callback, parameters, actionType, target = null)
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
            this.#sendError(ErrorType.Exception, callback, 0, ex.toString());
            return;
        }

        // Is iterator ?
        if (rt != null && rt[Symbol.iterator] instanceof Function) {
            for (let v of rt)
            this.#sendChunk(callback, v);

            this.#sendReply(actionType, callback)
                .addUint8(DataType.Void)
                .done();
        }
        else if (rt instanceof AsyncReply) {
            rt.then(function (res) {
                self.#sendReply(actionType, callback)
                    .addUint8Array(Codec.compose(res, self))
                    .done();
            }).error(ex => {
                self.#sendError(ErrorType.Exception, callback, ex.code, ex.message);
            }).progress((pt, pv, pm) =>
            {
                self.#sendProgress(callback, pv, pm);
            }).chunk(v =>
            {
                self.#sendChunk(callback, v);
            });
        }
        else if (rt instanceof Promise)
        {
            rt.then(function (res) {
                self.#sendReply(actionType, callback)
                    .addUint8Array(Codec.compose(res, self))
                    .done();
            }).catch(ex => {
                self.#sendError(ErrorType.Exception, callback, 0, ex.toString());
            });
        }
        else {
            self.#sendReply(actionType, callback)
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
    //                     self.#sendReply(IIPPacketAction.GetProperty, callback)
    //                         .addUint8Array(Codec.compose(r._get(pt.index), self))
    //                         .done();
    //                 }
    //                 else {
    //                     var pv = r[pt.name];
    //                     self.#sendReply(IIPPacketAction.GetProperty)
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
    //                     self.#sendReply(IIPPacketAction.GetPropertyIfModified, callback)
    //                         .addUint8Array(Codec.compose(pv, self))
    //                         .done();
    //                 }
    //                 else {
    //                     self.#sendReply(IIPPacketAction.GetPropertyIfModified, callback)
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
                           self.#sendReply(IIPPacketAction.Listen, callback).done();
                       }).error(x => self.#sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.#subscriptions.has(r))
                        {
                            self.#sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (self.#subscriptions.get(r).includes(index))
                        {
                            self.#sendError(ErrorType.Management, callback, ExceptionCode.AlreadyListened);
                            return;
                        }

                        self.#subscriptions.get(r).push(index);

                        self.#sendReply(IIPPacketAction.Listen, callback).done();
                    }
                }
                else
                {
                    // pt not found
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                            self.#sendReply(IIPPacketAction.Unlisten, callback).done();
                        }).error(x => self.#sendError(ErrorType.Exception, callback, ExceptionCode.GeneralFailure));
                    }
                    else
                    {
                        if (!self.#subscriptions.has(r))
                        {
                            self.#sendError(ErrorType.Management, callback, ExceptionCode.NotAttached);
                            return;
                        }

                        if (!self.#subscriptions.get(r).includes(index))
                        {
                            self.#sendError(ErrorType.Management, callback, ExceptionCode.AlreadyUnlistened);
                            return;
                        }

                        let ar = self.#subscriptions.get(r);
                        let i = ar.indexOf(index);
                        ar.splice(i, 1);
                        
                        self.#sendReply(IIPPacketAction.Unlisten, callback).done();             
                    }
                }
                else
                {
                    // pt not found
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.MethodNotFound);
                }
            }
            else
            {
                // resource not found
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
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
                                self.#sendReply(IIPPacketAction.SetProperty, callback)
                                    .done();
                            }).error(function (x) {
                                self.#sendError(x.type, callback, x.code, x.message);
                            });
                        }
                        else {
                            if (r.instance.applicable(self.#session, ActionType.SetProperty, pt) == Ruling.Denied) {
                                self.#sendError(AsyncReply.ErrorType.Exception, callback, ExceptionCode.SetPropertyDenied);
                                return;
                            }

                            try {
                                if (r[pt.name] instanceof DistributedPropertyContext)
                                    value = new DistributedPropertyContext(this, value);

                                r[pt.name] = value;
                                self.#sendReply(IIPPacketAction.SetProperty, callback).done();
                            }
                            catch (ex) {
                                self.#sendError(AsyncReply.ErrorType.Exception, callback, 0, ex.toString());
                            }
                        }

                    });
                }
                else {
                    // property not found
                    self.#sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound);
                }
            }
            else {
                // resource not found
                self.#sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.PropertyNotFound);
            }
        });
    }

    IIPRequestInquireResourceHistory(callback, resourceId, fromDate, toDate) {
        var self = this;
        Warehouse.getById(resourceId).then(function (r) {
            if (r != null) {
                r.instance.store.getRecord(r, fromDate, toDate).then(function (results) {
                    var history = Codec.composeHistory(results, self, true);
                    self.#sendReply(IIPPacketAction.ResourceHistory, callback)
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
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
            else
            {
                var list = resources.filter(function (r) { return r.instance.applicable(self.#session, ActionType.Attach, null) != Ruling.Denied });

                if (list.length == 0)
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                else
                    self.#sendReply(IIPPacketAction.QueryLink, callback)
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

        this.#sendRequest(IIPPacketAction.CreateResource).addUint8Array(pkt.ToArray()).done().then(function (args) {
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

        this.#sendRequest(IIPPacketAction.QueryLink)
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

        let templates = this.#templates.filter({ className: className });

        if (templates.length > 0)
            return new AsyncReply(templates[0]);
        else if (this.#templateByNameRequests.contains(className))
            return this.#templateByNameRequests.item(className);

        var reply = new AsyncReply();
        this.#templateByNameRequests.add(className, reply);

        var self = this;

        let classNameBytes = DC.stringToBytes(className);

        this.#sendRequest(IIPPacketAction.TemplateFromClassName)
            .addUint8(classNameBytes.length)
            .addUint8Array(classNameBytes)
            .done()
            .then(function (rt) {
                self.#templateByNameRequests.remove(className);
                self.#templates.add(rt[0].classId.valueOf(), rt[0]);
                Warehouse.putTemplate(rt[0]);
                reply.trigger(rt[0]);
            });

        return reply;
    }

    getTemplate(classId) {
        if (this.#templates.contains(classId))
            return new AsyncReply(this.#templates.item(classId));
        else if (this.#templateRequests.contains(classId))
            return this.#templateRequests.item(classId);

        var reply = new AsyncReply();
        this.#templateRequests.add(classId.valueOf(), reply);

        var self = this;

        this.#sendRequest(IIPPacketAction.TemplateFromClassId)
            .addUint8Array(classId.value)
            .done()
            .then(function (rt) {
                self.#templateRequests.remove(classId);
                self.#templates.add(rt[0].classId.valueOf(), rt[0]);
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

        this.#sendRequest(IIPPacketAction.ResourceIdFromResourceLink)
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

        this.#sendRequest(IIPPacketAction.LinkTemplates)
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

    
        let resource = this.#attachedResources.item(id)?.deref();

        if (resource != null)
            return new AsyncReply(resource);

        resource = this.#neededResources.item(id);

        let requestInfo = this.#resourceRequests.item(id);

        if (requestInfo != null) {
            if (resource != null && (requestSequence?.includes(id) ?? false)){
                return new AsyncReply(resource);
            }
            else if (resource != null && requestInfo.requestSequence.includes(id)) {
                console.log("Avoid deadlock...", id, requestSequence, requestInfo.requestSequence );
                return new AsyncReply(resource);
            }
            else {
                return requestInfo.reply;
            }
        }
        else if (resource != null && !resource._p.suspended) {

            // @REVIEW: this should never happen
            console.log("DCON: Resource not moved to attached.", resource);
            return new AsyncReply(resource);
        }

        var reply = new AsyncReply();


        var newSequence =
           requestSequence != null ? [...requestSequence, id] : [id];

        this.#resourceRequests.set(id, new DistributedResourceAttachRequestInfo(reply, newSequence));

        var self = this;

        this.#sendRequest(IIPPacketAction.AttachResource)
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
                        self.#resourceRequests.remove(id);
                        // move from needed to attached
                        self.#neededResources.remove(id);
                        self.#attachedResources.set(id, new WeakRef(dr));
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

            this.#sendRequest(IIPPacketAction.ResourceHistory)
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

    #instance_resourceDestroyed = function(resource) {

        this.#unsubscribe(resource);
        // compose the packet
        this.#sendEvent(IIPPacketEvent.ResourceDestroyed)
            .addUint32(resource.instance.id)
            .done();
    }

    #instance_propertyModified = function(info) {

        this.#sendEvent(IIPPacketEvent.PropertyUpdated)
            .addUint32(info.resource.instance?.id)
            .addUint8(info.propertyTemplate.index)
            .addUint8Array(Codec.compose(info.value, this))
            .done();
      
    }

    #instance_eventOccurred = function(info) {
 
 
        if (info.eventTemplate.listenable)
        {
            // check the client requested listen
            if (!this.#subscriptions.has(resource))
                return;

            if (!this.#subscriptions.get(resource).includes(et.index))
                return;
        }

        if (info.receivers instanceof Function)
            if (!info.receivers(this.sessions))
                return;
                
        if (info.resource.instance.applicable(this.session, 
            ActionType.ReceiveEvent, info.eventTemplate, info.issuer) == Ruling.Denied)
            return;


        // compose the packet
        this.#sendEvent(IIPPacketEvent.EventOccurred)
            .addUint32(info.resource.instance.id)
            .addUint8(info.eventTemplate.index)
            .addUint8Array(Codec.compose(info.value, this))
            .done();

    }



    IIPRequestAddChild(callback, parentId, childId) {
        var self = this;
        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.#session, ActionType.AddChild, null) != Ruling.Allowed) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.#session, ActionType.AddParent, null) != Ruling.Allowed) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.add(child);

                self.#sendReply(IIPPacketAction.AddChild, callback)
                    .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRemoveChild(callback, parentId, childId) {
        var self = this;

        Warehouse.getById(parentId).then(function (parent) {
            if (parent == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            Warehouse.getById(childId).then(function (child) {
                if (child == null) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                    return;
                }

                if (parent.instance.applicable(self.#session, ActionType.RemoveChild, null) != Ruling.Allowed) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.AddChildDenied);
                    return;
                }

                if (child.instance.applicable(self.#session, ActionType.RemoveParent, null) != Ruling.Allowed) {
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.AddParentDenied);
                    return;
                }

                parent.instance.children.remove(child);

                self.#sendReply(IIPPacketAction.RemoveChild, callback)
                    .done();
                //child.Instance.Parents
            });

        });
    }

    IIPRequestRenameResource(callback, resourceId, name) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (resource.instance.applicable(self.#session, ActionType.Rename, null) != Ruling.Allowed) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.RenameDenied);
                return;
            }

            resource.instance.name = name;
            self.#sendReply(IIPPacketAction.RenameResource, callback)
                .done();
        });
    }

    IIPRequestResourceChildren(callback, resourceId) {
        var self = this;
        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.#sendReply(IIPPacketAction.ResourceChildren, callback)
                .addUint8Array(Codec.compose(resource.instance.children.toArray(), self))
                .done();

        });
    }

    IIPRequestResourceParents(callback, resourceId) {
        var self = this;

        Warehouse.getById(resourceId).then(function (resource) {
            if (resource == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            self.#sendReply(IIPPacketAction.ResourceParents, callback)
                .addUint8Array(Codec.compose(resource.instance.parents.toArray(), self))
                .done();
        });
    }

    IIPRequestClearAttributes(callback, resourceId, attributes, all = false) {

        let self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.#session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            var attrs = [];

            if (!all)
                attrs = attributes.getStringArray(0, attributes.length);

            if (r.instance.removeAttributes(attrs))
                self.#sendReply(all ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes, callback)
                    .done();
            else
                self.#sendError(AsyncReply.ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);

        });
    }

    IIPRequestUpdateAttributes(callback, resourceId, attributes, clearAttributes = false) {
        var self = this;

        Warehouse.getById(resourceId).then(function (r) {
            if (r == null) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.ResourceNotFound);
                return;
            }

            if (r.instance.store.instance.applicable(self.#session, ActionType.UpdateAttributes, null) != Ruling.Allowed) {
                self.#sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeDenied);
                return;
            }

            DataDeserializer.typedListParser(attributes, 0, attributes.length, this, null)
                .then(function (attrs) {
                if (r.instance.setAttributes(attrs, clearAttributes))
                    self.#sendReply(clearAttributes ? IIPPacketAction.ClearAllAttributes : IIPPacketAction.ClearAttributes,
                        callback)
                        .done();
                else
                    self.#sendError(ErrorType.Management, callback, ExceptionCode.UpdateAttributeFailed);
            });

        });

    }



    getChildren(resource) {
        if (resource._p.connection != this)
            return new AsyncReply(null);

        var rt = new AsyncReply();
        var self = this;

        this.#sendRequest(IIPPacketAction.ResourceChildren)
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

        this.#sendRequest(IIPPacketAction.ResourceParents)
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
            this.#sendRequest(IIPPacketAction.ClearAllAttributes)
                .addUint32(resource._p.instanceId)
                .done()
                .then(function (ar) {
                    rt.trigger(true);
                }).error(function (ex) { rt.triggerError(ex); });
        else {
            var attrs = DC.stringArrayToBytes(attributes);
            this.#sendRequest(IIPPacketAction.ClearAttributes)
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

        this.#sendRequest(clearAttributes ? IIPPacketAction.UpdateAllAttributes : IIPPacketAction.UpdateAttributes)
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
            this.#sendRequest(IIPPacketAction.GetAllAttributes)
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
            this.#sendRequest(IIPPacketAction.GetAttributes)
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


    #keepAliveTimerElapsed()
    {
        // @TODO: port this
        // if (!this.isConnected)
        //     return;
      
        let self = this;
        let now = new Date();

        let interval = this.#lastKeepAliveSent == null ? 0 :
                        (now - this.#lastKeepAliveSent);

        this.#lastKeepAliveSent = now;

        this.#sendRequest(IIPPacketAction.KeepAlive)
                .addDateTime(now)
                .addUint32(interval)
                .done()
                .then(x =>
                {
                    self.#jitter = x[1];
                    self.#keepAliveTimer = setTimeout(() => self.#keepAliveTimerElapsed(), self.keepAliveInterval * 1000);
                    //console.log("Keep Alive Received " + self.jitter);
                    
                    // run GC
                    let toBeRemoved =[];
                    
                    for(let i = 0; i < self.#attachedResources.length; i++){
                        let r = self.#attachedResources.values[i].deref();

                        if (r == null) {
                            let id = self.#attachedResources.keys[i];
                            // send detach
                            self._sendDetachRequest(id);
                            toBeRemoved.push(id);
                        }
                    }

                    if (toBeRemoved.length > 0)
                        console.log("GC: " + toBeRemoved.length);
                        
                    for(let id of toBeRemoved)
                        self.#attachedResources.remove(id);

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
        var c = this.#callbackCounter++;
        this.#requests.add(c, reply);


        this.#sendParams()
            .addUint8(0x40 | IIPPacketAction.StaticCall)
            .addUint32(c)
            .addUUID(classId)
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
        var c = this.#callbackCounter++;
        this.#requests.add(c, reply);

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

        if (this.#lastKeepAliveReceived != null)
        {
            var diff = now - this.#lastKeepAliveReceived;
            //Console.WriteLine("Diff " + diff + " " + interval);

            jitter = Math.abs(diff - interval);
        }

        this.#sendParams()
            .addUint8(0x80 | IIPPacketAction.KeepAlive)
            .addUint32(callbackId)
            .addDateTime(now)
            .addUint32(jitter)
            .done();

        this.#lastKeepAliveReceived = now;
    }


    static get template() {
        return new TemplateDescriber("Esiur", [new Prop("status", UInt8)]);
    }
}
