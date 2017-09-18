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


var IIPPacketCommand =
{
    Event: 0,
    Request: 1,
    Reply: 2,
    Error: 3
};

var IIPPacketEvent =
{
    // Event Manage
    ResourceReassigned : 0,
    ResourceDestroyed: 1,

    // Event Invoke
    PropertyUpdated : 0x10,
    EventOccured: 0x11
};

var IIPPacketAction =
{
    // Request Manage
    AttachResource: 0,
    ReattachResource: 1,
    DetachResource: 2,
    CreateResource: 3,
    DeleteResource: 4,

    // Request Inquire
    TemplateFromClassName: 0x8,
    TemplateFromClassId: 0x9,
    TemplateFromResourceLink: 0xA,
    TemplateFromResourceId: 0xB,
    ResourceIdFromResourceLink: 0xC,

    // Request Invoke
    InvokeFunction: 0x10,
    GetProperty: 0x11,
    GetPropertyIfModified: 0x12,
    SetProperty: 0x13
};





class IIPPacket
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
    }

    notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.dataLengthNeeded = needed - (ends - offset);
            return true;
        }
        else
            return false;
    }

    parse(data, offset, ends)
    {
        var oOffset = offset;

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
            else if (this.event == IIPPacketEvent.EventOccured)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.methodIndex = data.getUint8(offset++);

                var cl = data.getUint32(offset);
                offset += 4;

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
                if (this.notEnough(offset, ends, 8))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint32(offset);
                offset += 4;
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
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                var cl = data.getUint8(offset++);

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.className = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.action == IIPPacketAction.DeleteResource)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

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
            else if (this.action == IIPPacketAction.TemplateFromResourceLink)
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
            else if (this.action == IIPPacketAction.TemplateFromResourceId)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.ResourceIdFromResourceLink)
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
            else if (this.action == IIPPacketAction.InvokeFunction)
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

                this.resourceAge = data.getUint32(offset);
                offset += 4;

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

                this.resourceAge = data.getUint32(offset);
                offset += 4;

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

                this.classId = data.GetGuid(offset);
                offset += 16;

                this.resourceId = data.getUint32(offset);
                offset += 4;

            }
            else if (this.action == IIPPacketAction.DetachResource)
            {
                // nothing to do
            }
            else if (this.action == IIPPacketAction.TemplateFromClassName
                || this.action == IIPPacketAction.TemplateFromClassId
                || this.action == IIPPacketAction.TemplateFromResourceLink
                || this.action == IIPPacketAction.TemplateFromResourceId)
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
            else if (this.action == IIPPacketAction.ResourceIdFromResourceLink)
            {
                if (this.notEnough(offset, ends, 24))
                    return -this.dataLengthNeeded;

                this.classId = data.getGuid(offset);
                offset += 16;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.resourceAge = data.getUint32(offset);
                offset += 4;
            }
            else if (this.action == IIPPacketAction.InvokeFunction
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
        else if (this.command == IIPPacketCommand.Error)
        {
            // Error
            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            this.callbackId = data.getUint32(offset);

            if (this.notEnough(offset, ends, 1))
                return -this.dataLengthNeeded;

            this.errorCode = data.getUint8(offset++);

            if (this.notEnough(offset, ends, 4))
                return -this.dataLengthNeeded;

            var cl = data.getUint32(offset);
            offset += 4;

            if (this.notEnough(offset, ends, cl))
                return -this.dataLengthNeeded;

            this.errorMessage = data.getString(offset, cl);
            offset += cl;
        }

        return offset - oOffset;
    }
}