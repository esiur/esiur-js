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

var AuthenticationType =
{
    Host: 0,
    CoHost: 1,
    Client: 2,
    Alien: 3
};

class DistributedConnection extends IStore {

    send(data) {
        this.socket.send(data.buffer);
    }

    sendParams() {
        return new SendList(this);
    }

    constructor(url, domain, username, password, checkInterval = 30, connectionTimeout = 600, revivingTime = 120) {

        super();

        //Instance.Name = Global.GenerateCode(12);
        this.hostType = AuthenticationType.Client;
        this.domain = domain;
        this.localUsername = username;
        this.localPassword = DC.stringToBytes(password);

        this.socket = new WebSocket(url, "iip");
        this.socket.binaryType = "arraybuffer";
        this.socket.connection = this;
        this.socket.networkBuffer = new NetworkBuffer();

        this.debug = false;
        this.totalReceived = 0;
        this.totalSent = 0;

        this.checkInterval = checkInterval * 1000; // check every 30 seconds
        this.connectionTimeout = connectionTimeout * 1000; // 10 minutes (4 pings failed)
        this.revivingTime = revivingTime * 1000; // 2 minutes
        this.lastAction = Date.now();

        this.packet = new IIPPacket();
        this.authPacket = new IIPAuthPacket();

        this.resources = {};
        this.templates = {};
        this.requests = {};
        this.pathRequests = {};
        this.templateRequests = {};
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

        this.localNonce = new Uint8Array(32);
        window.crypto.getRandomValues(this.localNonce);

        // declare (Credentials -> No Auth, No Enctypt)
        var un = DC.stringToBytes(username);
        var dmn = DC.stringToBytes(domain);
        var self = this;

        this.socket.onopen = function () {
            var bl = new BinaryList();
            bl.addUint8(0x60).addUint8(dmn.length).addUint8Array(dmn).addUint8Array(self.localNonce).addUint8(un.length).addUint8Array(un);
            self.send(bl.toArray());
        };

        this.socket.onmessage = function (msg) {

            //console.log(msg);

            this.networkBuffer.writeAll(msg.data);

            self.lastAction = new Date();

            while (this.networkBuffer.available > 0 && !this.networkBuffer.protected)
                self.receive(this.networkBuffer);


        };
    }


    receive(data) {
        var msg = data.read();
        var offset = 0;
        var ends = msg.length;
        var packet = this.packet;
        var authPacket = this.authPacket;

        //console.log("Data");

        while (offset < ends) {

            if (this.ready) {
                var rt = packet.parse(msg, offset, ends);
                if (rt <= 0) {
                    data.holdFor(msg, offset, ends - offset, -rt);
                    return;
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
                            case IIPPacketEvent.EventOccured:
                                this.IIPEventEventOccured(packet.resourceId, packet.methodIndex, packet.content);
                                break;
                        }
                    }
                    else if (packet.command == IIPPacketCommand.Request) {
                        switch (packet.action) {
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
                                this.IIPRequestCreateResource(packet.callbackId, packet.className);
                                break;
                            case IIPPacketAction.DeleteResource:
                                this.IIPRequestDeleteResource(packet.callbackId, packet.resourceId);
                                break;
                            case IIPPacketAction.TemplateFromClassName:
                                this.IIPRequestTemplateFromClassName(packet.callbackId, packet.className);
                                break;
                            case IIPPacketAction.TemplateFromClassId:
                                this.IIPRequestTemplateFromClassId(packet.callbackId, packet.classId);
                                break;
                            case IIPPacketAction.TemplateFromResourceLink:
                                this.IIPRequestTemplateFromResourceLink(packet.callbackId, packet.resourceLink);
                                break;
                            case IIPPacketAction.TemplateFromResourceId:
                                this.IIPRequestTemplateFromResourceId(packet.callbackId, packet.resourceId);
                                break;
                            case IIPPacketAction.ResourceIdFromResourceLink:
                                this.IIPRequestResourceIdFromResourceLink(packet.callbackId, packet.resourceLink);
                                break;
                            case IIPPacketAction.InvokeFunction:
                                this.IIPRequestInvokeFunction(packet.callbackId, packet.resourceId, packet.methodIndex, packet.content);
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
                                this.IIPReply(packet.callbackId, packet.classId, packet.resourceId);
                                break;
                            case IIPPacketAction.DeleteResource:
                                this.IIPReply(packet.callbackId);
                                break;
                            case IIPPacketAction.TemplateFromClassName:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromClassId:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromResourceLink:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.TemplateFromResourceId:
                                this.IIPReply(packet.callbackId, ResourceTemplate.parse(packet.content));
                                break;
                            case IIPPacketAction.ResourceIdFromResourceLink:
                                this.IIPReply(packet.callbackId, packet.classId, packet.resourceId, packet.resourceAge);
                                break;
                            case IIPPacketAction.InvokeFunction:
                                this.IIPReply(packet.callbackId, packet.content);
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
                        }

                    }

                }
            }

            else {
                var rt = authPacket.parse(msg, offset, ends);


                if (rt <= 0) {
                    data.holdAllFor(msg, ends - rt);
                    return;
                }
                else {
                    offset += rt;

                    if (this.hostType == AuthenticationType.Host) {
                        if (authPacket.command == IIPAuthPacketCommand.Declare) {
                            if (authPacket.remoteMethod == IIPAuthPacketMethod.credentials
                                && authPacket.localMethod == IIPAuthPacketMethod.None) {
                                this.remoteUsername = authPacket.remoteUsername;
                                this.remoteNonce = authPacket.remoteNonce;
                                this.domain = authPacket.domain;
                                this.sendParams().addUint8(0xa0).addUint8Array(this.localNonce).done();
                            }
                        }
                        else if (authPacket.command == IIPAuthPacketCommand.Action) {
                            if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                                var remoteHash = authPacket.hash;

                                this.server.membership.getPassword(this.remoteUsername, this.domain).then(function (pw) {
                                    if (pw != null) {

                                        var hash = new DC(sha256.arrayBuffer(BL().addString(pw).addUint8Array(remoteNonce).addUint8Array(this.localNonce).toArray()));


                                        if (hash.sequenceEqual(remoteHash)) {
                                            // send our hash
                                            var localHash = new DC(sha256.arrayBuffer((new BinaryList()).addUint8Array(this.localNonce).addUint8Array(remoteNonce).addUint8Array(pw).toArray()));
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
                                    this.sessionId = new DC(32);
                                    window.crypto.getRandomValues(this.sessionId);

                                    this.sendParams().addUint8(0x28).addUint8Array(this.sessionId).done();
                                    this.ready = true;
                                    this._emit("ready", this);
                                }
                            }
                        }
                    }
                    else if (this.hostType == AuthenticationType.Client) {
                        if (authPacket.command == IIPAuthPacketCommand.Acknowledge) {
                            this.remoteNonce = authPacket.remoteNonce;

                            // send our hash

                            var localHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.localPassword)
                                .addUint8Array(this.localNonce)
                                .addUint8Array(this.remoteNonce).toArray()));
                            this.sendParams().addUint8(0).addUint8Array(localHash).done();
                        }
                        else if (authPacket.command == IIPAuthPacketCommand.Action) {
                            if (authPacket.action == IIPAuthPacketAction.AuthenticateHash) {
                                // check if the server knows my password
                                var remoteHash = new DC(sha256.arrayBuffer(BL().addUint8Array(this.remoteNonce)
                                    .addUint8Array(this.localNonce)
                                    .addUint8Array(this.localPassword).toArray()
                                ));

                                if (remoteHash.sequenceEqual(authPacket.hash)) {
                                    // send establish request
                                    this.sendParams().addUint8(0x20).addUint16(0).done();
                                }
                                else {
                                    this.sendParams().addUint8(0xc0).addUint32(1).addUint16(5).addString("Error").done();
                                }
                            }
                            else if (authPacket.action == IIPAuthPacketAction.ConnectionEstablished) {
                                this.sessionId = authPacket.sessionId;
                                this.ready = true;
                                this._emit("ready", this);
                            }
                        }
                        else if (authPacket.command == IIPAuthPacketCommand.Error)
                        {
                            this._emit("error", this, authPacket.errorCode, authPacket.errorMessage);
                            this.close();
                        }
                    }
                }
            }
        }

    }

    close()
    {
        this.socket.close();
    }

    trigger(trigger) {
        return true;
    }

    put(resource) {
        this.resources[parseInt(resource.instance.name)] = resource;
        return true;
    }


    // Protocol Implementation

    sendRequest(action, binaryList) {
        var reply = new AsyncReply();
        this.callbackCounter++;
        this.sendParams().addUint8(0x40 | action).addUint32(this.callbackCounter).addRange(binaryList).done();
        this.requests[this.callbackCounter] = reply;
        return reply;
    }

    IIPReply(callbackId) {
        var results = Array.prototype.slice.call(arguments, 1);
        var req = this.requests[callbackId];
        delete this.requests[callbackId];
        req.trigger(results);
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
        if (this.resources[resourceId]) {
            // push to the queue to gaurantee serialization
            var reply = new AsyncReply();
            this.queue.add(reply);

            var r = this.resources[resourceId];
            Codec.parse(content, 0, this).then(function (args) {
                var pt = r._p.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    reply.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Propery, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    this.queue.remove(reply);
                }
            });
        }
    }


    IIPEventEventOccured(resourceId, index, content) {
        if (this.resources[resourceId]) {
            // push to the queue to guarantee serialization
            var reply = new AsyncReply();
            var r = this.resources[resourceId];

            this.queue.add(reply);

            Codec.parseVarArray(content, 0, content.length, this).then(function (args) {
                var et = r._p.template.getEventTemplateByIndex(index);
                if (et != null) {
                    reply.trigger(new DistributedResourceQueueItem(r, DistributedResourceQueueItemType.Event, args, index));
                }
                else {    // ft found, fi not found, this should never happen
                    this.queue.remove(reply);
                }
            });
        }
    }

    IIPRequestAttachResource(callback, resourceId) {

        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.on("ResourceEventOccured", this.instance_eventOccured);
                r.instance.on("ResourceModified", this.instance_propertyModified);
                r.instance.on("ResourceDestroyed", this.instance_resourceDestroyed);
                // reply ok

                var link = DC.stringToBytes(r.instance.link);

                sl.addUint8(0x80)
                    .addUint32(callback)
                    .addUint8Array(r.instance.template.classId.value)
                    .addUint32(r.instance.age)
                    .addUint16(link.length)
                    .addUint8Array(link)
                    .addUint8Array(Codec.composeVarArray(r.instance.serialize(), this, true))
                    .done();
            }
            else {
                // reply failed
                //SendParams(0x80, r.Instance.Id, r.Instance.Age, r.Instance.Serialize(false, this));
            }
        });
    }

    IIPRequestReattachResource(callback, resourceId, resourceAge) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (res != null) {
                r.instance.on("ResourceEventOccured", this.instance_eventOccured);
                r.instance.on("ResourceModified", this.instance_propertyModified);
                r.instance.on("ResourceDestroyed", this.instance_resourceDestroyed);
                // reply ok
                sl.addUint8(0x81)
                    .addUint32(callback)
                    .addUint32(r.instance.age)
                    .addUint8Array(Codec.composeVarArray(r.instance.serialize(), this, true))
                    .done();
            }
            else {
                // reply failed
            }
        });
    }

    IIPRequestDetachResource(callback, resourceId) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                r.instance.off("ResourceEventOccured", this.instance_eventOccured);
                r.instance.off("ResourceModified", this.instance_propertyModified);
                r.instance.off("ResourceDestroyed", this.instance_resourceDestroyed);

                // reply ok
                sl.addUint8(0x82).addUint32(callback).done();
            }
            else {
                // reply failed
            }
        });
    }

    IIPRequestCreateResource(callback, className) {
        // not implemented
    }

    IIPRequestDeleteResource(callback, resourceId) {
        // not implemented
    }

    IIPRequestTemplateFromClassName(callback, className) {
        var sl = this.sendParams();

        Warehouse.getTemplateByClassName(className).then(function (t) {
            if (t != null)
                sl.addUint8(0x88).addUint32(callback).addUint8Array(t.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromClassId(callback, classId) {
        var sl = this.sendParams();

        Warehouse.getTemplateByClassId(classId).then(function (t) {
            if (t != null)
                sl.addUint8(0x89)
                    .addUint32(callback)
                    .addUint32(t.content.length)
                    .addUint8Array(t.content)
                    .done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromResourceLink(callback, resourceLink) {
        var sl = this.sendParams();

        Warehouse.getTemplate(resourceLink).then(function (t) {
            if (t != null)
                sl.addUint8(0x8a).addUint32(callback).addUint8Array(t.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestTemplateFromResourceId(callback, resourceId) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null)
                sl.addUint8(0x8b).addUint32(callback).addUint8Array(r.instance.template.content).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestResourceIdFromResourceLink(callback, resourceLink) {

        var sl = this.sendParams();

        Warehouse.get(resourceLink).then(function (r) {
            if (r != null)
                sl.addUint8(0x8c)
                    .addUint32(callback)
                    .addUint8Array(r.instance.template.classId.value)
                    .addUint32(r.instance.id)
                    .addUint32(r.instance.age).done();
            else {
                // reply failed
            }
        });
    }

    IIPRequestInvokeFunction(callback, resourceId, index, content) {
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                Codec.parseVarArray(content, 0, content.length, sl.connection).then(function (args) {
                    var ft = r.instance.template.getFunctionTemplateByIndex(index);
                    if (ft != null) {
                        if (r instanceof DistributedResource) {
                            var rt = r._invoke(index, args);
                            if (rt != null) {
                                rt.then(function (res) {
                                    sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(res, sl.connection)).done();
                                });
                            }
                            else {
                                // function not found on a distributed object
                            }
                        }
                        else {

                            var fi = r[ft.name];
                            if (fi instanceof Function) {
                                args.push(sl.connection);

                                var rt = fi.apply(r, args);


                                if (rt instanceof AsyncReply) {
                                    rt.then(function (res) {
                                        sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(res, sl.connection)).done();
                                    });
                                }
                                else {
                                    sl.addUint8(0x90).addUint32(callback).addUint8Array(Codec.compose(rt, sl.connection)).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r instanceof DistributedResource) {
                        sl.addUint8(0x91).addUint32(callback).addUint8Array(Codec.compose(r._get(pt.index), sl.connection)).done();
                    }
                    else {
                        var pv = r[pt.name];
                        sl.addUint8(0x91).addUint32(callback).addUint8Array(Codec.compose(pv, sl.connection)).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {
                var pt = r.instance.template.getFunctionTemplateByIndex(index);
                if (pt != null) {
                    if (r.instance.getAge(index) > age) {
                        var pv = r[pt.name];
                        sl.addUint8(0x92).addUint32(callback).addUint8Array(Codec.compose(pv, sl.connection)).done();
                    }
                    else {
                        sl.addUint8(0x92).addUint32(callback).addUint8(DataType.NotModified).done();
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
        var sl = this.sendParams();

        Warehouse.get(resourceId).then(function (r) {
            if (r != null) {


                var pt = r.instance.template.getPropertyTemplateByIndex(index);
                if (pt != null) {
                    Codec.parse(content, 0, this).then(function (value) {
                        if (r instanceof DistributedResource) {
                            // propagation
                            r._set(index, value).then(function (x) {
                                sl.addUint8(0x93).addUint32(callback).done();
                            });
                        }
                        else {
                            r[pt.name] = value;
                            sl.addUint8(0x93).addUint32(callback).done();
                        }

                    });
                }
                else {
                    // property not found
                }
            }
            else {
                // resource not found
            }
        });
    }


    getTemplate(classId) {
        if (this.templates[classId])
            return new AsyncReply(this.templates[classId]);
        else if (this.templateRequests[classId])
            return this.templateRequests[classId];

        var reply = new AsyncReply();
        this.templateRequests[classId] = reply;

        var self = this;

        this.sendRequest(IIPPacketAction.TemplateFromClassId, BL().addUint8Array(classId.value)).then(function (rt) {
            delete self.templateRequests[classId];
            self.templates[rt[0].classId] = rt[0];
            reply.trigger(rt[0]);
        });

        return reply;
    }

// IStore interface
    get(path) {
        if (this.pathRequests[path])
            return this.pathRequests[path];

        var reply = new AsyncReply();
        this.pathRequests[path] = reply;

        var bl = new BinaryList();
        bl.addString(path);
        bl.addUint16(bl.length, 0);

        var self = this;

        this.sendRequest(IIPPacketAction.ResourceIdFromResourceLink, bl).then(function (rt) {
            delete self.pathRequests[path];

            self.fetch(rt[1]).then(function (r) {
                reply.trigger(r);
            });
        });


        return reply;
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
            return this.resourceRequests[id];
        }
        else if (this.resourceRequests[id])
            return this.resourceRequests[id];
        else if (this.resources[id])
            return new AsyncReply(this.resources[id]);

        var reply = new AsyncReply();

        var self = this;

        this.sendRequest(IIPPacketAction.AttachResource, BL().addUint32(id)).then(function (rt) {
                self.getTemplate(rt[0]).then(function (tmp) {

                var dr = new DistributedResource(self, tmp, id, rt[1], rt[2]);
                Warehouse.put(dr, id.toString(), self);

                Codec.parseVarArray(rt[3], 0, rt[3].length, self).then(function (ar) {
                    dr._attached(ar);
                    delete self.resourceRequests[id];
                    reply.trigger(dr);
                });
            });
        });

        return reply;
    }

    instance_resourceDestroyed(resource) {
        // compose the packet
        this.sendParams().addUint8(0x1).addUint32(resource.instance.id).done();
    }

    instance_propertyModified(resource, name, newValue, oldValue) {
        var pt = resource.instance.template.getPropertyTemplateByName(name);

        if (pt == null)
            return;

        // compose the packet
        if (newValue instanceof Function)
            sendParams().addUint8(0x10)
                .addUint32(resource.instance.id)
                .addUint8(pt.index)
                .addUint8Array(Codec.compose(newValue(this), this))
                .done();
        else
            sendParams().addUint8(0x10)
                .addUint32(resource.instance.id)
                .addUint8(pt.index)
                .addUint8Array(Codec.compose(newValue, this))
                .done();
    }

    instance_eventOccured(resource, name, receivers, args) {
        var et = resource.instance.template.getEventTemplateByName(name);

        if (et == null)
            return;

        if (receivers != null)
            if (receivers.indexOf(this.remoteUsername) < 0)
                return;

        var clientArgs = [];//new object[args.Length];
        for (var i = 0; i < args.Length; i++)
            if (args[i] instanceof Function)
                clientArgs[i] = args[i](this);
            else
                clientArgs[i] = args[i];


        // compose the packet
        sendParams().addUint8(0x11)
            .addUint32(resource.instance.id)
            .addUint8(et.index)
            .addUint8Array(Codec.composeVarArray(args, this, true))
            .done();

    }

}
