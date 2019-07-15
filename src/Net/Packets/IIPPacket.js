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

export const IIPPacketCommand =
{
    Event: 0,
    Request: 1,
    Reply: 2,
    Report: 3
};

export const IIPPacketReport = 
{
    ManagementError: 0,
    ExecutionError: 1,
    ProgressReport: 0x8,
    ChunkStream: 0x9
};

export const IIPPacketEvent =
{
    // Event Manage
    ResourceReassigned : 0,
    ResourceDestroyed: 1,
    ChildAdded: 2,
    ChildRemoved: 3,
    Renamed: 4,

    // Event Invoke
    PropertyUpdated : 0x10,
    EventOccurred: 0x11,

    // Attribute
    AttributesUpdated: 0x18
                
};

export const IIPPacketAction =
{
    // Request Manage
    AttachResource: 0,
    ReattachResource: 1,
    DetachResource: 2,
    CreateResource: 3,
    DeleteResource: 4,
    AddChild: 5,
    RemoveChild: 6,
    RenameResource: 7,

    // Request Inquire
    TemplateFromClassName: 8,
    TemplateFromClassId: 9,
    TemplateFromResourceId: 10,
    QueryLink: 11,
    ResourceHistory: 12,
    ResourceChildren: 13,
    ResourceParents: 14,

    // Request Invoke
    InvokeFunctionArrayArguments: 16,
    GetProperty: 17,
    GetPropertyIfModified: 18,
    SetProperty: 19,
    InvokeFunctionNamedArguments: 20,

    // Request Attribute
    GetAllAttributes: 24,
    UpdateAllAttributes: 25,
    ClearAllAttributes: 26,
    GetAttributes: 27,
    UpdateAttributes: 28,
    ClearAttributes: 29
};


export default class IIPPacket
{
    constructor()
    {
        this.command = 0;
        this.action = 0;
        this.event = 0;
        this.resourceId = 0;
        this.newResourceId = 0;
        this.resourceAge = 0;
        this.content = [];
        this.errorCode = 0;
        this.errorMessage = "";
        this.className = "";
        this.resourceLink = "";
        this.classId = "";
        this.methodIndex = "";
        this.methodName = "";
        this.callbackId = 0;
        this.dataLengthNeeded = 0;
        this.originalOffset = 0;
    }

    notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.dataLengthNeeded = needed - (ends - this.originalOffset);
            return true;
        }
        else
            return false;
    }

    parse(data, offset, ends)
    {
        this.originalOffset = offset;

        if (this.notEnough(offset, ends, 1))
            return -this.dataLengthNeeded;

        this.command =  (data.getUint8(offset) >> 6);

        if (this.command == IIPPacketCommand.Event)
        {
            this.event =  (data.getUint8(offset++) & 0x3f);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.resourceId = data.getUint32(offset);
            offset += 4;
        }
        else if (this.command == IIPPacketCommand.Report)
        {
            this.report = (data.getUint8(offset++) & 0x3f);
            
            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);
            offset += 4;
        }
        else
        {
            this.action = (data.getUint8(offset++) & 0x3f);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);
            offset += 4;
        }

        if (this.command == IIPPacketCommand.Event)
        {
            if (this.event == IIPPacketEvent.ResourceReassigned)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.newResourceId = data.getUint32( offset);
                offset += 4;

            }
            else if (this.event == IIPPacketEvent.ResourceDestroyed)
            {
                // nothing to parse
            }
            else if (this.event == IIPPacketEvent.ChildAdded
                || this.event == IIPPacketEvent.ChildRemoved)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.childId = data.getUint32(offset);
                offset += 4;
            }
            else if(this.event == IIPPacketEvent.Renamed)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);

                offset += cl;
            }
            else if (this.event == IIPPacketEvent.PropertyUpdated)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.methodIndex = data[offset++];

                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
            else if (this.event == IIPPacketEvent.EventOccurred)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            // Attribute
            else if (this.event == IIPPacketEvent.AttributesUpdated)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);

                offset += cl;
            }
        }
        else if (this.command == IIPPacketCommand.Request)
        {
            if (this.action == IIPPacketAction.AttachResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ReattachResource)
            {
                if (this.notEnough(offset, ends, 12))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint64(offset);
                offset += 8;
            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.CreateResource)
            {
                if (this.notEnough(offset, ends, 12))
                    return -dataLengthNeeded;

                this.storeId = data.getUint32(offset);
                offset += 4;
                this.resourceId = data.getUint32(offset);
                offset += 4;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -dataLengthNeeded;

                this.content = data.clip(offset, cl);
            }
            else if (this.action == IIPPacketAction.DeleteResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.AddChild
                    || this.action == IIPPacketAction.RemoveChild)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.childId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.RenameResource)
            {
                if (this.notEnough(offset, ends, 6))
                    return -this.dataLengthNeeded;
                
                this.resourceId = data.getUint32(offset);
                offset += 4;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.TemplateFromClassName)
            {
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var cl = data.getUint8(offset++);

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.className = data.getString(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.TemplateFromClassId)
            {
                if (this.notEnough(offset, ends, 16))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;
            }
            else if (this.action == IIPPacketAction.TemplateFromResourceId)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.QueryLink)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceLink = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.ResourceChildren
                    || this.action == IIPPacketAction.ResourceParents)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ResourceHistory)
            {
                if (this.notEnough(offset, ends, 20))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4; 

                this.fromDate = data.getDateTime(offset);
                offset += 8;

                this.toDate = data.getDateTime(offset);
                offset += 8;

            }
            else if (  this.action == IIPPacket.InvokeFunctionArrayArguments 
                    || this.action == IIPPacketAction.InvokeFunctionNamedArguments)
            {
                if (this.notEnough(offset, ends, 9))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.GetProperty)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

            }
            else if (this.action == IIPPacketAction.GetPropertyIfModified)
            {
                if (this.notEnough(offset, ends, 9))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data[offset++];

                this.resourceAge = data.getUint64(offset);
                offset += 8;

            }
            else if (this.action == IIPPacketAction.SetProperty)
            {
                if (this.notEnough(offset, ends, 6))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data[offset++];


                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset-5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                      return -this.dataLengthNeeded;

                    this.content = data.clip(offset-1, size + 1);
                    offset += size;
                }
            }

            // Attribute
            else if (this.action == IIPPacketAction.UpdateAllAttributes
                || this.action == IIPPacketAction.GetAttributes
                || this.action == IIPPacketAction.UpdateAttributes
                || this.action == IIPPacketAction.ClearAttributes)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }

        }
        else if (this.command == IIPPacketCommand.Reply)
        {
            if (this.action == IIPPacketAction.AttachResource
                || this.action == IIPPacketAction.ReattachResource)
            {
                if (this.notEnough(offset, ends, 26))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;

                this.resourceAge = data.getUint64(offset);
                offset += 8;

                var cl = data.getUint16(offset);
                offset+=2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceLink = data.getString(offset, cl);
                offset += cl;

                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.CreateResource)
            {
                if (this.notEnough(offset, ends, 20))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.TemplateFromClassName
                || this.action == IIPPacketAction.TemplateFromClassId
                || this.action == IIPPacketAction.TemplateFromResourceId
                || this.action == IIPPacketAction.QueryLink
                || this.action == IIPPacketAction.ResourceChildren
                || this.action == IIPPacketAction.ResourceParents
                || this.action == IIPPacketAction.ResourceHistory
                // Attribute
                || this.action == IIPPacketAction.GetAllAttributes
                || this.action == IIPPacketAction.GetAttributes)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                var cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.content = data.clip(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.InvokeFunctionArrayArguments
                || this.action == IIPPacketAction.InvokeFunctionNamedArguments
                || this.action == IIPPacketAction.GetProperty
                || this.action == IIPPacketAction.GetPropertyIfModified)
            {
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                         return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
            else if (this.action == IIPPacketAction.SetProperty)
            {
                // nothing to do
            }
        }
        else if (this.command == IIPPacketCommand.Report)
        {
            if (this.report == IIPPacketReport.ManagementError)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.errorCode = data.getUint16(offset);
                offset += 2;
            }
            else if (this.report == IIPPacketReport.ExecutionError)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.errorCode = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                var cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.errorMessage = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.report == IIPPacketReport.ProgressReport)
            {
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.progressValue = data.getInt32(offset);
                offset += 4;
                this.progressMax = data.getInt32(offset);
                offset += 4;
            }
            else if (this.report == IIPPacketReport.ChunkStream)
            {
                var dt = data.getUint8(offset++);
                var size = DataType.sizeOf(dt);

                if (size < 0)
                {
                    if (this.notEnough(offset, ends, 4))
                        return -this.dataLengthNeeded;

                    var cl = data.getUint32(offset);
                    offset += 4;

                    if (this.notEnough(offset, ends, cl))
                        return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 5, cl + 5);
                    offset += cl;
                }
                else
                {
                    if (this.notEnough(offset, ends, size))
                         return -this.dataLengthNeeded;

                    this.content = data.clip(offset - 1, size + 1);
                    offset += size;
                }
            }
        }

        return offset - this.originalOffset;
    }
}