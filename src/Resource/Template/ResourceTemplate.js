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

"use strict";

import FunctionTemplate from './FunctionTemplate.js';
import PropertyTemplate from './PropertyTemplate.js';
import EventTemplate from './EventTemplate.js';
import SHA256 from '../../Security/Integrity/SHA256.js';
import {DC, BL} from '../../Data/DataConverter.js';

export default class ResourceTemplate {

    getEventTemplateByName(eventName) {
        for (var i = 0; i < this.events.length; i++)
            if (this.events[i].name == eventName)
                return this.events[i];
        return null;
    }

    getEventTemplateByIndex(index) {
        for (var i = 0; i < this.events.length; i++)
            if (this.events[i].index == index)
                return this.events[i];
        return null;
    }

    getFunctionTemplateByName(functionName) {
        for (var i = 0; i < this.functions.length; i++)
            if (this.functions[i].name == functionName)
                return this.functions[i];
        return null;
    }

    getFunctionTemplateByIndex(index) {
        for (var i = 0; i < this.functions.length; i++)
            if (this.functions[i].index == index)
                return this.functions[i];
        return null;
    }

    getPropertyTemplateByName(propertyName) {
        for (var i = 0; i < this.properties.length; i++)
            if (this.properties[i].name == propertyName)
                return this.properties[i];
        return null;
    }

    getPropertyTemplateByIndex(index) {
        for (var i = 0; i < this.properties.length; i++)
            if (this.properties[i].index == index)
                return this.properties[i];
        return null;
    }


    /*

     template: {
     properties: [
     {name: 'size', read: null, write: null}
     ],
     functions: [

     ],
     events: [

     ]
     }
     */

    constructor(type) {


        this.properties = [];
        this.events = [];
        this.functions = [];
        this.members = [];

        if (type === undefined)
            return;

        var template = type.template;

        // set guid
        this.className = template.namespace + "." + type.prototype.constructor.name;

        this.classId = SHA256.compute(DC.stringToBytes(this.className)).getGuid(0);

        //byte currentIndex = 0;

        for (var i = 0; i < template.properties.length; i++) {
            var pt = new PropertyTemplate();
            pt.name = template.properties[i].name;
            pt.index = i;
            pt.readExpansion = template.properties[i].read;
            pt.writeExpansion = template.properties[i].write;
            pt.recordable = template.properties[i].recordable;
            this.properties.push(pt);
        }

        for (var i = 0; i < template.events.length; i++) {
            var et = new EventTemplate();
            et.name = template.events[i].name;
            et.index = i;
            et.expansion = template.events[i].help;
            this.events.push(et);
        }

        for (var i = 0; i < template.functions.length; i++) {
            var ft = new FunctionTemplate();
            ft.name = template.functions[i].name;
            ft.index = i;
            ft.isVoid = template.functions[i].void;
            ft.expansion = template.functions[i].help;
            this.functions.push(ft);
        }


        // append signals
        for (var i = 0; i < this.events.length; i++)
            this.members.push(this.events[i]);
        // append slots
        for (var i = 0; i < this.functions.length; i++)
            this.members.push(this.functions[i]);
        // append properties
        for (var i = 0; i < this.properties.length; i++)
            this.members.push(this.properties[i]);

        // bake it binarily
        var b = BL();
        var cls = DC.stringToBytes(this.className);
        b.addUint8Array(this.classId.value)
            .addUint8(cls.length)
            .addUint8Array(cls)
            .addUint32(template.version)
            .addUint16(this.members.length);

        for (var i = 0; i < this.functions.length; i++)
            b.addUint8Array(this.functions[i].compose());

        for (var i = 0; i < this.properties.length; i++)
            b.addUint8Array(this.properties[i].compose());

        for (var i = 0; i < this.events.length; i++)
            b.addUint8Array(this.events[i].compose());

        this.content = b.toArray();
    }

    static getFunctionParameters(func)
    {
        var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    static parse(data, offset = 0, contentLength = -1) {

        if (contentLength == -1)
            contentLength = data.length;

        var ends = offset + contentLength;

        var oOffset = offset;

        // start parsing...

        var od = new ResourceTemplate();
        od.content = data.clip(offset, contentLength);

        od.classId = data.getGuid(offset);
        offset += 16;
        od.className = data.getString(offset + 1, data.getUint8(offset));
        offset += data.getUint8(offset) + 1;

        od.version = data.getInt32(offset);
        offset += 4;

        var methodsCount = data.getUint16(offset);
        offset += 2;

        var functionIndex = 0;
        var propertyIndex = 0;
        var eventIndex = 0;

        for (var i = 0; i < methodsCount; i++) {
            var type = data.getUint8(offset) >> 5;

            if (type == 0) // function
            {
                var ft = new FunctionTemplate();
                ft.index = functionIndex++;
                var expansion = ((data.getUint8(offset) & 0x10) == 0x10);
                ft.isVoid = ((data.getUint8(offset++) & 0x08) == 0x08);
                var len = data.getUint8(offset++);
                ft.name = data.getString(offset, len);
                offset += len;

                if (expansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    ft.expansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.functions.push(ft);
            }
            else if (type == 1)    // property
            {

                var pt = new PropertyTemplate();
                pt.index = propertyIndex++;
                var readExpansion = ((data.getUint8(offset) & 0x8) == 0x8);
                var writeExpansion = ((data.getUint8(offset) & 0x10) == 0x10);
                pt.recordable = ((data.getUint8(offset) & 1) == 1);
                pt.permission = ((data.getUint8(offset++) >> 1) & 0x3);
                var len = data.getUint8(offset++);
                pt.name = data.getString(offset, len);
                offset += len;

                if (readExpansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    pt.readExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                if (writeExpansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    pt.writeExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.properties.push(pt);
            }
            else if (type == 2) // Event
            {
                var et = new EventTemplate();
                et.index = eventIndex++;
                var expansion = ((data.getUint8(offset++) & 0x10) == 0x10);
                var len = data.getUint8(offset++);
                et.name = data.getString(offset, len);
                offset += len;

                if (expansion) // expansion ?
                {
                    var cs = data.getUint32(offset);
                    offset += 4;
                    et.expansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.events.push(et);

            }
        }

        // append signals
        for (var i = 0; i < od.events.length; i++)
            od.members.push(od.events[i]);
        // append slots
        for (var i = 0; i < od.functions.length; i++)
            od.members.push(od.functions[i]);
        // append properties
        for (var i = 0; i < od.properties.length; i++)
            od.members.push(od.properties[i]);


        return od;
    }
}