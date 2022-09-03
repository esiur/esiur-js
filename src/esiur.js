
import TypedMap from './Data/TypedMap.js';
import TypedList from './Data/TypedList.js';

import DistributedResource from './Net/IIP/DistributedResource.js'
import MemoryStore from './Stores/MemoryStore.js';
import IndexedDBStore from './Stores/IndexedDBStore.js';
import IResource from './Resource/IResource.js';

import ResourceProxy from './Proxy/ResourceProxy.js';
import TemplateGenerator from './Proxy/TemplateGenerator.js';

import DistributedConnection from './Net/IIP/DistributedConnection.js';
import IIPAuthPacket from './Net/Packets/IIPAuthPacket.js';
import IIPPacketCommand from './Net/Packets/IIPPacketCommand.js';
import IIPPacketEvent from './Net/Packets/IIPPacketEvent.js';
import IIPPacketReport from './Net/Packets/IIPPacketReport.js';
import ISocket from './Net/Sockets/ISocket.js';
import SocketState from './Net/Sockets/SocketState.js';
import WSocket from './Net/Sockets/WSocket.js';
import AsyncReply from './Core/AsyncReply.js';
import AsyncException from './Core/AsyncException.js';
import AsyncQueue from './Core/AsyncQueue.js';
import ErrorType from './Core/ErrorType.js';
import ExceptionCode from './Core/ExceptionCode.js';
import IDestructible from './Core/IDestructible.js';
import IEventHandler from './Core/IEventHandler.js';
import ProgressType from './Core/ProgressType.js';
import AutoList from './Data/AutoList.js';
import AutoMap from './Data/AutoMap.js';
import BinaryList from './Data/BinaryList.js';
import Codec from './Data/Codec.js';
import DC from './Data/DC.js';
import Guid from './Data/Guid.js';
import IRecord from './Data/IRecord.js';
import KeyList from './Data/KeyList.js';
import NotModified from './Data/NotModified.js';
import PropertyValue from './Data/PropertyValue.js';
import Record from './Data/Record.js';
import ResourceArrayType from './Data/ResourceArrayType.js';
import ResourceArray from './Data/ResourceArray.js';
import INetworkReceiver from './Net/INetworkReceiver.js';
import NetworkBuffer from './Net/NetworkBuffer.js';
import NetworkConnections from './Net/NetworkConnections.js';
import NetworkServer from './Net/NetworkServer.js';
import NetworkSession from './Net/NetworkSession.js';
import SendList from './Net/SendList.js';

import DistributedPropertyContext from './Net/IIP/DistributedPropertyContext.js';
import DistributedResourceQueueItem from './Net/IIP/DistributedResourceQueueItem.js';
import DistributedResourceQueueItemType from './Net/IIP/DistributedResourceQueueItemType.js';
import DistributedServer from './Net/IIP/DistributedServer.js';
import EntryPoint from './Net/IIP/EntryPoint.js';
import IIPAuthePacketAction from './Net/Packets/IIPAuthPacketAction.js';
import IIPAuthPacketCommand from './Net/Packets/IIPAuthPacketCommand.js';
import IIPPacketAction from './Net/Packets/IIPPacketAction.js';
import IIPPacket from './Net/Packets/IIPPacket.js';

import CustomResourceEvent from './Resource/CustomResourceEvent.js';
import Instance from './Resource/Instance.js';
import IStore from './Resource/IStore.js';
import Warehouse from './Resource/Warehouse.js';

import ArgumentTemplate from './Resource/Template/ArgumentTemplate.js';
import EventTemplate from './Resource/Template/EventTemplate.js';
import FunctionTemplate from './Resource/Template/FunctionTemplate.js';
import MemberTemplate from './Resource/Template/MemberTemplate.js';
import MemberType from './Resource/Template/MemberType.js';
import PropertyTemplate from './Resource/Template/PropertyTemplate.js';
import TemplateType from './Resource/Template/TemplateType.js';
import TypeTemplate from './Resource/Template/TypeTemplate.js';

import {RepresentationType, RepresentationTypeIdentifier} from './Data/RepresentationType.js';
import {TransmissionType, TransmissionTypeIdentifier} from './Data/TransmissionType.js';

import Authentication from './Security/Authority/Authentication.js';
import AuthenticationMethod from './Security/Authority/AuthenticationMethod.js';
import AuthenticationType from './Security/Authority/AuthenticationType.js';
import ClientAuthentication from './Security/Authority/ClientAuthentication.js';
import HostAuthentication from './Security/Authority/HostAuthentication.js';
import Session from './Security/Authority/Session.js';
import SHA256 from './Security/Integrity/SHA256.js';
import IMembership from './Security/Membership/IMembership.js';

import ActionType from './Security/Permissions/ActionType.js';
import IPermissionsManager from './Security/Permissions/IPermissionsManager.js';
import Ruling from './Security/Permissions/Ruling.js';

import { Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, Int128, UInt128, Float32, Float64, Float128, Char16, Char8 } from './Data/ExtendedTypes.js';
import Tuple from './Data/Tuple.js';
import Nullable from './Data/Nullable.js';
import Void from './Data/Void.js';

const namespace = {
    Core: { AsyncReply, AsyncException, AsyncQueue, ErrorType, ExceptionCode, IDestructible, IEventHandler, ProgressType},
    Data: {AutoList, AutoMap, BinaryList, Codec, DC, TypedList, TypedMap, Guid, IRecord, KeyList, NotModified, ResourceArrayType,
        PropertyValue, Record, ResourceArray, RepresentationType, RepresentationTypeIdentifier, TransmissionType, TransmissionTypeIdentifier,
        Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, Int128, UInt128, Float32, Float64, Float128, Char16, Char8, Tuple, 
        Nullable, Void
    },
    Net: {INetworkReceiver, NetworkBuffer, NetworkConnections, NetworkServer, NetworkSession, SendList,        
            IIP: {DistributedConnection, DistributedPropertyContext, DistributedResource, DistributedResourceQueueItem, 
                DistributedResourceQueueItemType, DistributedServer, EntryPoint},
            Packets: {IIPAuthPacket, IIPAuthePacketAction, IIPAuthPacketCommand, IIPPacket, IIPPacketAction, IIPPacketCommand, IIPPacketEvent, IIPPacketReport},
            Sockets: {ISocket, SocketState, WSocket}
        
    },
    Proxy: {ResourceProxy, TemplateGenerator},
    Resource: {CustomResourceEvent, Instance, IResource, IStore, Warehouse,
                Template: {
                    ArgumentTemplate, EventTemplate, FunctionTemplate, MemberTemplate,
                    MemberType, PropertyTemplate, TemplateType, TypeTemplate
                }
              },
    Security: {
        Authority: {Authentication, AuthenticationMethod, AuthenticationType, ClientAuthentication, HostAuthentication,
                    Session},
        Integrity: {
            SHA256
        },
        Membership: {IMembership},
        Permissions: {ActionType, IPermissionsManager, Ruling},
    },
    Stores: {IndexedDBStore, MemoryStore},
    Generated: {},
};

namespace.define = function(type, className) {
    let sc = className.split('.');
    let target = namespace.Generated;

    for(let i = 0; i < sc.length; i++) {
        if (target[sc[i]] == undefined)
            target[sc[i]] = {};
        target = target[sc[i]];
    }

    target[sc[sc.length - 1]] = type;
}


if (typeof window !== 'undefined') 
{
    window.wh = Warehouse;
    window.TypedMap = TypedMap;
    window.TypedList = TypedList;
    window.DistributedResource = DistributedResource;
    window.MemoryStore = MemoryStore;
    window.IndexedDBStore = IndexedDBStore;
    window.IResource = IResource;
    window.ResourceProxy = ResourceProxy;
    window.DistributedConnection = DistributedConnection;

    window.Esiur = namespace;
}
else if (typeof global !== 'undefined') 
{
    global.wh = Warehouse;
    global.TypedMap = TypedMap;
    global.TypedList = TypedList;
    global.DistributedResource = DistributedResource;
    global.MemoryStore = MemoryStore;
    global.IndexedDBStore = IndexedDBStore;
    global.IResource = IResource;
    global.DistributedConnection = DistributedConnection;
    global.Esiur = namespace;
}

export default namespace;