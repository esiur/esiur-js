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
import ArgumentTemplate from './ArgumentTemplate.js';
import TemplateDataType from "./TemplateDataType.js";
import IResource from '../IResource.js';
import IRecord from '../../Data/IRecord.js';
import TemplateType from './TemplateType.js'
import Warehouse from '../Warehouse.js';
import DistributedConnection from '../../Net/IIP/DistributedConnection.js';

export default class TypeTemplate {

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

     
     static getTypeGuid(type) {
        return this.getTypeGuidByName(type.template.namespace + "." + type.prototype.constructor.name);
     }

     static getTypeGuidByName(typeName)
     {
         return SHA256.compute(DC.stringToBytes(typeName)).getGuid(0);
     }


     static getDependencies(template)
     {

         var list = [];

         list.add(template);

         var getDependenciesFunc = null;

         getDependenciesFunc = (tmp, bag) =>
         {
             if (template.definedType == null)
                 return;

             // functions
             for(let i = 0; i < tmp.functions.length; i++)
             {
                 let ft = tmp.functions[i];

                 var frtt = Warehouse.getTemplateByType(ft.methodInfo.returnType);
                 if (frtt != null)
                 {
                     if (!bag.includes(frtt))
                     {
                         list.push(frtt);
                         getDependenciesFunc(frtt, bag);
                     }
                 }

                 var args = ft.methodInfo.parameters;

                 for(let j = 0; j < args.length - 1; j++)
                 {
                     var fpt = Warehouse.getTemplateByType(args[j].parameterType);
                     if (fpt != null)
                     {
                         if (!bag.includes(fpt))
                         {
                             bag.push(fpt);
                             getDependenciesFunc(fpt, bag);
                         }
                     }
                 }

                 // skip DistributedConnection argument
                 if (args.length > 0)
                 {
                     var last = args[args.length - 1];
                     if (last.parameterType == DistributedConnection)
                     {
                         let fpt = Warehouse.getTemplateByType(last.parameterType);
                         if (fpt != null)
                         {
                             if (!bag.includes(fpt))
                             {
                                 bag.push(fpt);
                                 getDependenciesFunc(fpt, bag);
                             }
                         }
                     }
                 }

             }

             // properties
             for (let i = 0; i < tmp.properties.length; i++)
             {
                 var p = tmp.properties[i];
                 var pt = Warehouse.getTemplateByType(p.propertyInfo.propertyType);
                 if (pt != null)
                 {
                     if (!bag.includes(pt))
                     {
                         bag.push(pt);
                         getDependenciesFunc(pt, bag);
                     }
                 }
             }

             // events
             for(let i = 0; i < tmp.events.length; i++)
             {
                 var e = tmp.events[i];
                 var et = Warehouse.getTemplateByType(e.eventInfo.eventHandlerType);

                 if (et != null)
                 {
                     if (!bag.includes(et))
                     {
                         bag.Add(et);
                         getDependenciesFunc(et, bag);
                     }
                 }
             }
         };

         getDependenciesFunc(template, list);
         return list;
     }

     get type() {
        return this.templateType;
     }

    constructor(type, addToWarehouse) {


        this.properties = [];
        this.events = [];
        this.functions = [];
        this.members = [];

        if (type === undefined)
            return;
            
        if (type.prototype instanceof IRecord)
            this.templateType = TemplateType.Record;
        else if (type.prototype instanceof IResource)
            this.templateType = TemplateType.Resource;
        else
            throw new Error("Type is neither a resource nor a record.");

        this.definedType = type;

        var template = type.template;

        // set guid
        this.className = template.namespace + "." + type.prototype.constructor.name;

        this.classId = SHA256.compute(DC.stringToBytes(this.className)).getGuid(0);


        if (addToWarehouse)
            addToWarehouse.putTemplate(this);

        //byte currentIndex = 0;

        if (template.properties != null)
            for (var i = 0; i < template.properties.length; i++) {
                //[name, type, {read: comment, write: comment, recordable: }]
                var pi = template.properties[i];
                var pt = new PropertyTemplate();
                pt.name = pi[0];
                pt.index = i;
                pt.valueType = TemplateDataType.fromType(pi[1]);
                pt.readExpansion = pi[2]?.read;
                pt.writeExpansion = pi[2]?.write;
                pt.recordable = pi[2]?.recordable;
                pt.propertyInfo = pi;
                this.properties.push(pt);
            }

        if (this.templateType == TemplateType.Resource)
        {

            if (template.events != null)
            {
                for (let i = 0; i < template.events.length; i++) {

                    // [name, type, {listenable: true/false, help: ""}]
                    var ei = template.events[i];
                    var et = new EventTemplate();
                    et.name = ei[0];
                    et.index = i;
                    et.argumentType = TemplateDataType.fromType(ei[1]),
                    et.expansion = ei[2]?.help;
                    et.listenable = ei[2]?.listenable;
                    et.eventInfo = ei;
                    this.events.push(et);
                }
            }

            if (template.functions != null)
            {
                for (let i = 0; i < template.functions.length; i++) {

                    var fi = template.functions[i];

                // [name, {param1: type, param2: int}, returnType, "Description"]
                    var ft = new FunctionTemplate();
                    ft.name = fi[0];
                    ft.index = i;
                    ft.returnType = TemplateDataType.fromType(fi[2]);
                    ft.expansion = fi[3];
                    ft.arguments = [];

                    for(var arg in fi[1])
                        ft.arguments.push(new ArgumentTemplate(arg, TemplateDataType.fromType(fi[1][arg])))

                    ft.methodInfo = fi;

                    this.functions.push(ft);
                }
            }
        }


        // append signals
        for (let i = 0; i < this.events.length; i++)
            this.members.push(this.events[i]);
        // append slots
        for (let i = 0; i < this.functions.length; i++)
            this.members.push(this.functions[i]);
        // append properties
        for (let i = 0; i < this.properties.length; i++)
            this.members.push(this.properties[i]);

        // bake it binarily
        var b = BL();
        var cls = DC.stringToBytes(this.className);
        b.addUint8(this.templateType)
            .addUint8Array(this.classId.value)
            .addUint8(cls.length)
            .addUint8Array(cls)
            .addUint32(template.version)
            .addUint16(this.members.length);

        for (let i = 0; i < this.functions.length; i++)
            b.addUint8Array(this.functions[i].compose());

        for (let i = 0; i < this.properties.length; i++)
            b.addUint8Array(this.properties[i].compose());

        for (let i = 0; i < this.events.length; i++)
            b.addUint8Array(this.events[i].compose());

        this.content = b.toArray();
    }

    static getFunctionParameters(func)
    {
        var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
        //var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    static _getParamNames(func) {
        var fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
        if(result === null)
            result = [];
        return result;
    }

    static parse(data, offset = 0, contentLength = -1) {

        if (contentLength == -1)
            contentLength = data.length;

        //var ends = offset + contentLength;
        //var oOffset = offset;

        // start parsing...

        var od = new TypeTemplate();
        od.content = data.clip(offset, contentLength);

        od.templateType = data.getUint8(offset++);

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
                let ft = new FunctionTemplate();
                ft.index = functionIndex++;
                let hasExpansion = ((data.getUint8(offset++) & 0x10) == 0x10);

                let len = data.getUint8(offset++);
                ft.name = data.getString(offset, len);
                offset += len;

                // return type
                let {size, value: returnType} = TemplateDataType.parse(data, offset);
                offset += size;

                ft.returnType = returnType;

                // arguments count
                var argsCount = data.getUint8(offset++);
                var args = [];

                for (var a = 0; a < argsCount; a++)
                {
                    let {size: argSize, value: argType} = ArgumentTemplate.parse(data, offset);
                    args.push(argType);
                    offset += argSize;
                }

                ft.arguments = args;
                
                if (hasExpansion) // expansion ?
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

                let pt = new PropertyTemplate();
                pt.index = propertyIndex++;
                let hasReadExpansion = ((data.getUint8(offset) & 0x8) == 0x8);
                let hasWriteExpansion = ((data.getUint8(offset) & 0x10) == 0x10);
                pt.recordable = ((data.getUint8(offset) & 1) == 1);
                pt.permission = ((data.getUint8(offset++) >> 1) & 0x3);
                let len = data.getUint8(offset++);
                pt.name = data.getString(offset, len);
                offset += len;

                let {size, value: valueType} = TemplateDataType.parse(data, offset);

                offset += size;

                pt.valueType = valueType;

                if (hasReadExpansion) // expansion ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    pt.readExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                if (hasWriteExpansion) // expansion ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    pt.writeExpansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.properties.push(pt);
            }
            else if (type == 2) // Event
            {
                let et = new EventTemplate();
                et.index = eventIndex++;
                let hasExpansion = ((data.getUint8(offset) & 0x10) == 0x10);
                et.listenable = ((data.getUint8(offset++) & 0x8) == 0x8);
                let len = data.getUint8(offset++);
                et.name = data.getString(offset, len);

                offset += len;

                let {size, value: argType} = TemplateDataType.parse(data, offset);
                    
                offset += size;
                et.argumentType = argType;

                if (hasExpansion) // expansion ?
                {
                    let cs = data.getUint32(offset);
                    offset += 4;
                    et.expansion = data.getString(offset, cs);
                    offset += cs;
                }

                od.events.push(et);

            }
        }

        // append signals
        for (let i = 0; i < od.events.length; i++)
            od.members.push(od.events[i]);
        // append slots
        for (let i = 0; i < od.functions.length; i++)
            od.members.push(od.functions[i]);
        // append properties
        for (let i = 0; i < od.properties.length; i++)
            od.members.push(od.properties[i]);


        return od;
    }
}