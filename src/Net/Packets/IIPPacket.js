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

import IIPPacketAction from "./IIPPacketAction.js";
import IIPPacketCommand from "./IIPPacketCommand.js";
import IIPPacketEvent from "./IIPPacketEvent.js";
import IIPPacketReport from "./IIPPacketReport.js";
import DataType from '../../Data/DataType.js';
import TransmissionType from '../../Data/TransmissionType.js';

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
        //this.content = [];
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
        this.resourceName = "";
        this.dataType = null;
    }

    notEnough(offset, ends, needed)
    {
        if (offset + needed > ends)
        {
            this.dataLengthNeeded = needed - (ends - offset);
//            this.dataLengthNeeded = needed - (ends - this.originalOffset);
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

                let cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceName = data.getString(offset, cl);
                offset += cl;
            }
            else if (this.event == IIPPacketEvent.PropertyUpdated 
                    || this.event == IIPPacketEvent.EventOccurred)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                this.methodIndex = data[offset++];

                var parsed = TransmissionType.parse(data, offset, ends);

                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;
        
            }
            // Attribute
            else if (this.event == IIPPacketEvent.AttributesUpdated)
            {
                if (this.notEnough(offset, ends, 4))
                    return -this.dataLengthNeeded;

                let cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                //@TODO: fix this
                //this.content = data.clip(offset, cl);

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
                    return -this.dataLengthNeeded;

                this.storeId = data.getUint32(offset);
                offset += 4;
                this.resourceId = data.getUint32(offset);
                offset += 4;

                let cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                //@TODO: fix this
                //this.content = data.clip(offset, cl);
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

                let cl = data.getUint16(offset);
                offset += 2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceName = data.getString(offset, cl);
                offset += cl;

            }
            else if (this.action == IIPPacketAction.TemplateFromClassName)
            {
                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                let cl = data.getUint8(offset++);

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
            else if (this.action == IIPPacketAction.QueryLink
                || this.action == IIPPacketAction.LinkTemplates)
            {
                if (this.notEnough(offset, ends, 2))
                    return -this.dataLengthNeeded;

                let cl = data.getUint16(offset);
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
            else if (  this.action == IIPPacketAction.InvokeFunction )
            {
                
                if (this.notEnough(offset, ends, 9))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

                
                let parsed = TransmissionType.parse(data, offset, ends);

                if (parsed.type == null) return -parsed.size;

                this.dataType = parsed.type;
                offset += parsed.size;

            }
            else if (this.action == IIPPacketAction.Listen 
                  || this.action == IIPPacketAction.Unlisten)
                //this.action == IIPPacketAction.GetProperty)
            {
                if (this.notEnough(offset, ends, 5))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data.getUint8(offset++);

            }
            // else if (this.action == IIPPacketAction.GetPropertyIfModified)
            // {
            //     if (this.notEnough(offset, ends, 9))
            //         return -this.dataLengthNeeded;

            //     this.resourceId = data.getUint32(offset);
            //     offset += 4;

            //     this.methodIndex = data[offset++];

            //     this.resourceAge = data.getUint64(offset);
            //     offset += 8;

            // }
            else if (this.action == IIPPacketAction.SetProperty)
            {
                if (this.notEnough(offset, ends, 6))
                    return -this.dataLengthNeeded;

                this.resourceId = data.getUint32(offset);
                offset += 4;

                this.methodIndex = data[offset++];
                let parsed = TransmissionType.parse(data, offset, ends);

                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;
        
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
                let cl = data.getUint32(offset);
                offset += 4;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                // @TODO: fix this
                //this.content = data.clip(offset, cl);
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

                let cl = data.getUint16(offset);
                offset+=2;

                if (this.notEnough(offset, ends, cl))
                    return -this.dataLengthNeeded;

                this.resourceLink = data.getString(offset, cl);
                offset += cl;

                let parsed = TransmissionType.parse(data, offset, ends);

                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;
        
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
                || this.action == IIPPacketAction.LinkTemplates

                // Attribute
                || this.action == IIPPacketAction.GetAllAttributes
                || this.action == IIPPacketAction.GetAttributes)
            {

                if (this.notEnough(offset, ends, 1)) return -this.dataLengthNeeded;

                let parsed = TransmissionType.parse(data, offset, ends);
        
                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;

            }
            else if (this.action == IIPPacketAction.InvokeFunction)
            {

                if (this.notEnough(offset, ends, 1))
                    return -this.dataLengthNeeded;

                let parsed = TransmissionType.parse(data, offset, ends);

                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;
            
            }
            else if (this.action == IIPPacketAction.SetProperty 
                || this.action == IIPPacketAction.Listen 
                || this.action == IIPPacketAction.Unlisten)
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

                let cl = data.getUint16(offset);
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
                if (this.notEnough(offset, ends, 1)) 
                    return -this.dataLengthNeeded;

                let parsed = TransmissionType.parse(data, offset, ends);
        
                if (parsed.type == null) return -parsed.size;
        
                this.dataType = parsed.type;
                offset += parsed.size;
          
            }
        }

        return offset - this.originalOffset;
    }
}